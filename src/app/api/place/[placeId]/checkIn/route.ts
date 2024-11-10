import { NextResponse } from "next/server";
import { ResultOrError } from "@/components/api/apiTypes";
import { CheckinRow } from "@/components/checkin/Checkin";
import { createCheckinRecord } from "@/components/checkin/checkinDb";
import { UserError } from "@/components/error/UserError";
import { getSessionProfile } from "@/components/user/profileSession";

export interface CreateCheckinPayload {
  checkin: Omit<CheckinRow, "boardId" | "createdAt" | "id" | "userId">;
  timezoneOffset: number;
}

export type CreateCheckinResult = ResultOrError<{
  // checkin: CheckinRow;
  ok: true;
}>;

export async function POST(
  req: Request,
  { params }: { params: { placeId: string } },
): Promise<Response> {
  try {
    const profile = await getSessionProfile();
    if (!profile) {
      return NextResponse.json(
        { error: "Unauthorized", ok: false } satisfies CreateCheckinResult,
        { status: 401 },
      );
    }

    const body: CreateCheckinPayload = await req.json();
    const now = Date.now();

    const checkinData: Omit<CheckinRow, "id"> = {
      boardId: params.placeId,
      comment: body.checkin.comment,
      createdAt: now,
      rate: body.checkin.rate,
      userDate: getDateInUserTimeZone(now, body.timezoneOffset),
      userId: profile.id,
    };

    await createCheckinRecord(checkinData);

    return Response.json({ ok: true } satisfies CreateCheckinResult);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof UserError ? error.message : "Internal Server Error";

    return NextResponse.json(
      { error: message, ok: false } satisfies CreateCheckinResult,
      { status: 500 },
    );
  }
}

/**
 * @param date `Date.now()` on server
 * @param offset `new Date().getTimezoneOffset()` that passed from the client
 * @returns e.g. `2021-09-01`
 */
function getDateInUserTimeZone(time: number, offset: number): string {
  if (offset < -720 || 840 < offset) {
    throw new UserError("Invalid offset (-720 to 840)");
  }

  const date = new Date(time);
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const userDate = new Date(utcDate.getTime() + offset * 60000);
  const sDate = userDate.toISOString().slice(0, 10);
  return sDate;
}
