import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { CheckinRow } from "@/components/checkin/Checkin";
import {
  createCheckinRecord,
  updateCheckinRecord,
} from "@/components/checkin/checkinDb";
import { UserError } from "@/components/error/UserError";
import { getSessionProfile } from "@/components/user/profileSession";

export interface RegisterCheckinPayload {
  checkedIn: boolean;
  checkin: CheckinRow;
  timezoneOffset: number;
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const profile = await getSessionProfile();
    if (!profile) {
      // TODO handle
      throw new Error("User not authenticated");
    }

    const body: RegisterCheckinPayload = await req.json();
    const checkin = body.checkin; // TODO

    const now = Date.now();
    const data: CheckinRow = {
      boardId: checkin.boardId,
      comment: checkin.comment,
      createdAt: now,
      id: "",
      starred: checkin.starred,
      userDate: getDateInUserTimeZone(now, body.timezoneOffset),
      userId: profile.id,
    };

    if (body.checkedIn) {
      await updateCheckinRecord(data);
    } else {
      await createCheckinRecord(data);
    }

    return Response.json({ ok: true });
  } catch (error) {
    // TODO handle
    console.error(error);
    res.status(500);
    res.json({ error: "Internal server error", ok: false });
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
