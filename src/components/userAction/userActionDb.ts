import { db } from "@vercel/postgres";
import { Profile } from "../user/Profile";
import { UserAction } from "./UserAction";

export async function createUserActionRecord(
  profile: Pick<Profile, "id" | "displayName"> | null,
  action: Omit<UserAction, "id" | "createdAt" | "userId" | "userDisplayName">,
): Promise<void> {
  await db.query(
    /* sql */ `
    INSERT INTO user_action (
      user_id,
      title,
      user_display_name,
      detail_json,
      created_at
    ) VALUES (
      $1, $2, $3, $4, $5
    )
  `,
    [
      profile?.id ?? "",
      action.title,
      profile?.displayName ?? "",
      JSON.stringify(action.detail),
      Date.now(),
    ],
  );
}
