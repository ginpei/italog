import { sql } from "@vercel/postgres";
import { runTransaction } from "../db/transaction";
import { Profile } from "./Profile";

export async function getProfileRecord(id: string): Promise<Profile | null> {
  const result = await sql`
    SELECT * FROM profile WHERE id = ${id}
  `;

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  const profile: Profile = {
    displayName: row.display_name,
    id: row.id,
  };
  return profile;
}

export async function getProfileRecordByAuth(
  type: "auth0",
  authId: string,
): Promise<Profile | null> {
  const authResult = await sql`
    SELECT user_id FROM auth_profile WHERE auth_type = ${type} AND auth_id = ${authId}
  `;

  const userId = authResult.rows[0]?.user_id;
  if (!userId) {
    return null;
  }

  const profileResult = await sql`
    SELECT * FROM profile WHERE id = ${userId}
  `;

  const row = profileResult.rows[0];
  const profile: Profile = {
    displayName: row.display_name,
    id: row.id,
  };
  return profile;
}

export async function createProfileRecordSet(
  authType: "auth0",
  authId: string,
  profile: Omit<Profile, "id">,
): Promise<void> {
  return runTransaction(async (client) => {
    const profileResult = await client.query(
      /*sql*/ `
        INSERT INTO profile (display_name) VALUES ($1)
        RETURNING id
      `,
      [profile.displayName],
    );
    const userId = profileResult.rows[0].id;

    await client.query(
      /*sql*/ `
        INSERT INTO auth_profile (auth_type, auth_id, user_id) VALUES ($1, $2, $3)
      `,
      [authType, authId, userId],
    );
  });
}
