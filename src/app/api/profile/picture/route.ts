import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { ResultOrError } from "@/components/api/apiTypes";
import { runTransaction } from "@/components/db/transaction";
import { updateProfilePictureRecord } from "@/components/user/profileDb";
import { getSessionProfile } from "@/components/user/profileSession";

// export interface DeleteProfilePicturePayload {
// }

export type DeleteProfilePictureResult = ResultOrError<{
  ok: true;
}>;

export async function DELETE(): Promise<
  NextResponse<DeleteProfilePictureResult>
> {
  const profile = await getSessionProfile();
  if (!profile) {
    return NextResponse.json(
      { error: "Unauthorized", ok: false },
      { status: 401 },
    );
  }

  if (!profile.imageUrl) {
    return NextResponse.json({
      ok: true,
    } satisfies DeleteProfilePictureResult);
  }

  await del(profile.imageUrl);

  return runTransaction(async (db) => {
    await updateProfilePictureRecord(db, {
      id: profile.id,
      imageUrl: undefined,
    });
    return NextResponse.json({
      ok: true,
    } satisfies DeleteProfilePictureResult);
  });
}
