import { db, QueryResultRow, VercelPoolClient } from "@vercel/postgres";
import { runTransaction } from "../db/transaction";
import { Profile } from "./Profile";

export async function getProfileRecord(id: string): Promise<Profile | null> {
  const result = await db.query(
    /*sql*/ `
      SELECT * FROM profile WHERE id = $1
    `,
    [id],
  );

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  const profile = rowToProfile(row);
  return profile;
}

export async function getFriendProfileRecords(
  userId: string,
): Promise<Profile[]> {
  const result = await db.query(
    /*sql*/ `
      SELECT p.id, p.display_name
      FROM profile p
      JOIN user_user uu ON p.id = uu.friend_id
      WHERE uu.user_id = $1
    `,
    [userId],
  );

  const profiles = result.rows.map((v) => rowToProfile(v));
  return profiles;
}

export async function getProfileRecordByAuth(
  type: "auth0",
  authId: string,
): Promise<Profile | null> {
  const authResult = await db.query(
    /*sql*/ `
      SELECT user_id FROM auth_profile WHERE auth_type = $1 AND auth_id = $2
    `,
    [type, authId],
  );

  const userId = authResult.rows[0]?.user_id;
  if (!userId) {
    return null;
  }

  const profileResult = await db.query(
    /*sql*/ `
      SELECT * FROM profile WHERE id = $1
    `,
    [userId],
  );

  const row = profileResult.rows[0];
  if (!row) {
    return null;
  }

  const profile = rowToProfile(row);
  return profile;
}

export async function createProfileRecordSet(
  authType: "auth0",
  authId: string,
  profile: Omit<Profile, "id">,
): Promise<void> {
  return runTransaction(async (db) => {
    const profileResult = await db.query(
      /*sql*/ `
        INSERT INTO profile (display_name) VALUES ($1)
        RETURNING id
      `,
      [profile.displayName],
    );
    const userId = profileResult.rows[0].id;

    await db.query(
      /*sql*/ `
        INSERT INTO auth_profile (auth_type, auth_id, user_id) VALUES ($1, $2, $3)
      `,
      [authType, authId, userId],
    );
  });
}

export async function updateProfileRecord(
  profile: Pick<Profile, "id" | "displayName">,
): Promise<void> {
  await db.query(
    /*sql*/ `
      UPDATE profile SET display_name = $1 WHERE id = $2
    `,
    [profile.displayName, profile.id],
  );
}

export async function updateProfilePictureRecord(
  db: VercelPoolClient,
  profile: Pick<Profile, "id" | "imageUrl">,
): Promise<void> {
  await db.query(/*sql*/ `UPDATE profile SET image_url = $1 WHERE id = $2`, [
    profile.imageUrl,
    profile.id,
  ]);
}

function rowToProfile(row: QueryResultRow): Profile {
  return {
    displayName: row.display_name,
    id: row.id,
    imageUrl: row.image_url,
  };
}
