import { sql } from "@vercel/postgres";
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

export async function createProfileRecord(profile: Profile): Promise<void> {
  await sql`
    INSERT INTO profile (id, display_name) VALUES (${profile.id}, ${profile.displayName})
  `;
}
