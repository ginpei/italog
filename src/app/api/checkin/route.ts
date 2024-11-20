import { NextResponse } from "next/server";
import { getDateInUserTimeZone } from "@/components/time/time";
import { ResultOrError } from "@/components/api/apiTypes";
import { CheckinRow } from "@/components/checkin/Checkin";
import { createCheckinRecord } from "@/components/checkin/checkinDb";
import { UserError } from "@/components/error/UserError";
import { getSessionProfile } from "@/components/user/profileSession";

export interface PostCheckinPayload {
  checkin: Omit<CheckinRow, "createdAt" | "id" | "userId" | "userDate">;
  timezoneOffset: number;
}

export type PostCheckinResult = ResultOrError<{
  checkinId: string;
  ok: true;
}>;

export async function POST(
  req: Request,
): Promise<NextResponse<PostCheckinResult>> {
  try {
    const [profile] = await Promise.all([getSessionProfile()]);
    if (!profile) {
      return NextResponse.json(
        { error: "Unauthorized", ok: false },
        { status: 401 },
      );
    }

    const body: PostCheckinPayload = await req.json();

    const now = Date.now();
    const checkinId = await createCheckinRecord({
      ...body.checkin,
      userId: profile.id,
      createdAt: now,
      userDate: getDateInUserTimeZone(now, body.timezoneOffset),
    });

    return NextResponse.json({ checkinId, ok: true });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof UserError ? error.message : "Internal Server Error";

    return NextResponse.json({ error: message, ok: false }, { status: 500 });
  }
}
