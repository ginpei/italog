import { getSession } from "@auth0/nextjs-auth0";
import { Profile } from "./Profile";
import { getProfileRecord } from "./profileDb";

export async function getSessionProfile(): Promise<Profile | null> {
  const session = await getSession();
  const userId = session?.user.sub;
  const profile = userId ? await getProfileRecord(userId) : null;
  return profile;
}
