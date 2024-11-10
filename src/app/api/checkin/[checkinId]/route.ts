import { NextResponse } from "next/server";
import { ResultOrError } from "@/components/api/apiTypes";
import { CheckinRow } from "@/components/checkin/Checkin";
import {
  getCheckinRecord,
  updateCheckinRecord,
  deleteCheckinRecord,
} from "@/components/checkin/checkinDb";
import { UserError } from "@/components/error/UserError";
import { getSessionProfile } from "@/components/user/profileSession";

export interface UpdateCheckinPayload {
  checkin: Omit<
    CheckinRow,
    "boardId" | "createdAt" | "id" | "userId" | "userDate"
  >;
}

export type UpdateCheckinResult = ResultOrError<{
  ok: true;
}>;

export type DeleteCheckinResult = ResultOrError<{
  ok: true;
}>;

export async function PATCH(
  req: Request,
  { params }: { params: { checkinId: string } },
): Promise<Response> {
  try {
    const [profile, checkin] = await Promise.all([
      getSessionProfile(),
      getCheckinRecord(params.checkinId),
    ]);
    if (!profile || (checkin && checkin.userId !== profile.id)) {
      return NextResponse.json(
        { error: "Unauthorized", ok: false } satisfies UpdateCheckinResult,
        { status: 401 },
      );
    }

    if (!checkin) {
      return NextResponse.json(
        { error: "Not Found", ok: false } satisfies UpdateCheckinResult,
        { status: 404 },
      );
    }

    const body: UpdateCheckinPayload = await req.json();

    await updateCheckinRecord({
      ...body.checkin,
      id: params.checkinId,
    });

    return Response.json({ ok: true } satisfies UpdateCheckinResult);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof UserError ? error.message : "Internal Server Error";

    return NextResponse.json(
      { error: message, ok: false } satisfies UpdateCheckinResult,
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { checkinId: string } },
): Promise<Response> {
  try {
    const [profile, checkin] = await Promise.all([
      getSessionProfile(),
      getCheckinRecord(params.checkinId),
    ]);

    if (!profile || (checkin && checkin.userId !== profile.id)) {
      return NextResponse.json(
        { error: "Unauthorized", ok: false } satisfies DeleteCheckinResult,
        { status: 401 },
      );
    }

    if (!checkin) {
      return NextResponse.json(
        { error: "Not Found", ok: false } satisfies DeleteCheckinResult,
        { status: 404 },
      );
    }

    await deleteCheckinRecord(params.checkinId);

    return NextResponse.json({ ok: true } satisfies DeleteCheckinResult);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof UserError ? error.message : "Internal Server Error";

    return NextResponse.json(
      { error: message, ok: false } satisfies DeleteCheckinResult,
      { status: 500 },
    );
  }
}
