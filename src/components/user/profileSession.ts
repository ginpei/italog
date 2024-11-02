import { getSession } from "@auth0/nextjs-auth0";
import { Profile } from "./Profile";
import { getProfileRecordByAuth } from "./profileDb";

export async function getSessionProfile(): Promise<Profile | null> {
  const session = await getSession();
  const authId: string | undefined = session?.user.sub;
  if (!authId) {
    return null;
  }

  const profile = getProfileRecordByAuth("auth0", authId);
  return profile;
}
