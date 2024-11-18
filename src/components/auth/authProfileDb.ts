import { db, QueryResultRow } from "@vercel/postgres";
import { AuthProfile } from "./AuthProfile";

export async function getAuthProfileRecord(
  authId: string,
): Promise<AuthProfile | null> {
  const authResult = await db.query(
    /*sql*/ `SELECT * FROM auth_profile WHERE auth_id = $1`,
    [authId],
  );

  const row = authResult.rows[0];
  if (!row) {
    return null;
  }

  const authProfile = rowToAuthProfile(row);
  return authProfile;
}

export async function getAuthProfileRecordByUserId(
  userId: string,
): Promise<AuthProfile | null> {
  const authResult = await db.query(
    /*sql*/ `SELECT * FROM auth_profile WHERE user_id = $1`,
    [userId],
  );

  const row = authResult.rows[0];
  if (!row) {
    return null;
  }

  const authProfile = rowToAuthProfile(row);
  return authProfile;
}

export async function updateAuthProfileRecord(
  authId: string,
  profile: Pick<AuthProfile, "email">,
): Promise<void> {
  await db.query(
    /*sql*/ `
      UPDATE auth_profile
      SET email = COALESCE($1, email)
      WHERE auth_id = $2
    `,
    [profile.email, authId],
  );
}

function rowToAuthProfile(row: QueryResultRow): AuthProfile {
  const profile: AuthProfile = {
    authId: row.auth_id,
    authType: row.auth_type,
    email: row.email,
    userId: row.user_id,
  };
  return profile;
}
