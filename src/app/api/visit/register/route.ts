import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { UserError } from "@/components/lib/error/UserError";
import { getSessionProfile } from "@/components/lib/user/profileSession";
import { Visit } from "@/components/lib/visit/Visit";
import {
  createVisitRecord,
  updateVisitRecord,
} from "@/components/lib/visit/visitDb";

export interface RegisterVisitPayload {
  timezoneOffset: number;
  visit: Visit;
  visited: boolean;
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const profile = await getSessionProfile();
    if (!profile) {
      // TODO handle
      throw new Error("User not authenticated");
    }

    const body: RegisterVisitPayload = await req.json();
    const visit = body.visit;

    const now = Date.now();
    const data: Visit = {
      comment: visit.comment,
      createdAt: now,
      date: getDateInUserTimeZone(now, body.timezoneOffset),
      placeId: visit.placeId,
      starred: visit.starred,
      userId: profile.id,
    };

    if (body.visited) {
      await updateVisitRecord(data);
    } else {
      await createVisitRecord(data);
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
