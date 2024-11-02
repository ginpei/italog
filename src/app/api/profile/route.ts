import { NextResponse } from "next/server";
import { ResultOrError } from "@/components/api/apiTypes";
import { Profile } from "@/components/user/Profile";
import { updateProfileRecord } from "@/components/user/profileDb";
import { getSessionProfile } from "@/components/user/profileSession";

export interface PostProfilePayload {
  profile: Profile;
}

export type PostProfileResult = ResultOrError<{
  ok: true;
  profile: Profile;
}>;

export async function POST(
  req: Request,
): Promise<NextResponse<PostProfileResult>> {
  const data: PostProfilePayload = await req.json();

  const profile = await getSessionProfile();
  if (!profile || profile.id !== data.profile.id) {
    return NextResponse.json(
      { error: "Unauthorized", ok: false },
      { status: 401 },
    );
  }

  await updateProfileRecord(data.profile);
  return NextResponse.json({
    ok: true,
    profile: data.profile,
  } satisfies PostProfileResult);
}
