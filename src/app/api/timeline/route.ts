import { NextResponse } from "next/server";
import { ResultOrError } from "@/components/api/apiTypes";
import { Checkin } from "@/components/checkin/Checkin";
import { getUserCheckinRecords } from "@/components/checkin/checkinDb";
import { Place } from "@/components/place/Place";
import { getPlaceRecords } from "@/components/place/placeDb";
import { Product } from "@/components/product/Product";
import { getProductRecords } from "@/components/product/productDb";
import { getSessionProfile } from "@/components/user/profileSession";

export type GetTimelineResult = ResultOrError<{
  checkins: Checkin[];
  ok: true;
  places: Place[];
  products: Product[];
}>;

export async function GET(): Promise<NextResponse<GetTimelineResult>> {
  try {
    const profile = await getSessionProfile();
    if (!profile) {
      return NextResponse.json(
        { error: "Unauthorized", ok: false },
        { status: 401 },
      );
    }

    const checkins = await getUserCheckinRecords(profile.id);
    const [places, products] = await Promise.all([
      getPlaceRecords(
        checkins
          .filter((v) => v.board.boardType === "place")
          .map((v) => v.boardId),
      ),
      getProductRecords(
        checkins
          .filter((v) => v.board.boardType === "product")
          .map((v) => v.boardId),
      ),
    ]);

    return NextResponse.json({
      checkins,
      ok: true,
      places,
      products,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "WOW" });
  }
}
