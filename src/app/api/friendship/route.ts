import { NextRequest, NextResponse } from "next/server";
import { ResultOrError } from "@/components/api/apiTypes";
import {
  createFriendshipRecord,
  deleteFriendshipRecord,
} from "@/components/user/friendshipDb";
import { getSessionProfile } from "@/components/user/profileSession";

export interface PostFriendshipPayload {
  targetUserId: string;
}

export type PostFriendshipResult = ResultOrError<{
  ok: true;
}>;

export interface DeleteFriendshipPayload {
  targetUserId: string;
}

export type DeleteFriendshipResult = ResultOrError<{
  ok: true;
}>;

export async function POST(
  req: NextRequest,
): Promise<NextResponse<PostFriendshipResult>> {
  try {
    const profile = await getSessionProfile();
    if (!profile) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const payload: PostFriendshipPayload = await req.json();
    await createFriendshipRecord(profile.id, payload.targetUserId, Date.now());

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
): Promise<NextResponse<DeleteFriendshipResult>> {
  try {
    const profile = await getSessionProfile();
    if (!profile) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const payload: DeleteFriendshipPayload = await req.json();
    await deleteFriendshipRecord(profile.id, payload.targetUserId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
