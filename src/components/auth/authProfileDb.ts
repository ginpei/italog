import { QueryResultRow, sql } from "@vercel/postgres";
import { AuthProfile } from "./AuthProfile";

export async function getAuthProfileRecord(
  authId: string,
): Promise<AuthProfile | null> {
  const authResult = await sql`
    SELECT user_id FROM auth_profile WHERE auth_id = ${authId}
  `;

  const row = authResult.rows[0];
  if (!row) {
    return null;
  }

  const authProfile = rowToAuthProfile(row);
  return authProfile;
}

export async function updateAuthProfileRecord(
  authId: string,
  profile: Pick<AuthProfile, "email" | "picture">,
): Promise<void> {
  await sql`
    UPDATE auth_profile
    SET
      email = COALESCE(${profile.email}, email),
      picture = COALESCE(${profile.picture}, picture)
    WHERE auth_id = ${authId}
  `;
}

function rowToAuthProfile(row: QueryResultRow): AuthProfile {
  const profile: AuthProfile = {
    authId: row.auth_id,
    authType: row.auth_type,
    email: row.email,
    picture: row.picture,
    userId: row.user_id,
  };
  return profile;
}
