import { NextRequest } from "next/server";
import { toError } from "@/components/lib/error/errorUtil";
import { Place } from "@/components/lib/place/Place";
import { getPlaceRecords, savePlaceRecord } from "@/components/lib/place/placeDb";
import {
  queryNearbySearch,
  queryPlaceDetails,
} from "@/components/pages/register/queryPlaceApi";

export type FindNearbyResponse =
  | {
      places: Place[];
      ok: true;
    }
  | {
      message: string;
      ok: false;
    };

export async function GET(request: NextRequest) {
  try {
    const reqParams = new URL(request.url).searchParams;
    const lat = Number(reqParams.get("lat"));
    const long = Number(reqParams.get("long"));
    if (Number.isNaN(lat) || Number.isNaN(long)) {
      return new Response(
        JSON.stringify({ message: "Location is required", ok: false }),
        { status: 400 },
      );
    }

    const ids = await queryNearbySearch(lat, long);
    const existingPlaces = await getPlaceRecords(ids);
    const newPlaceIds = ids.filter(
      (id) => !existingPlaces.find((p) => p.id === id),
    );
    const newPlaces = await Promise.all(
      newPlaceIds.map(async (id) => {
        const place = await queryPlaceDetails(id);
        await savePlaceRecord(place);
        return place;
      }),
    );
    const places = ids.map(
      (id) =>
        existingPlaces.find((p) => p.id === id) ||
        newPlaces.find((p) => p.id === id)!,
    );

    const jsonData: FindNearbyResponse = { places, ok: true };
    return Response.json(jsonData);
  } catch (errorish) {
    const error = toError(errorish);
    console.error(error);

    return new Response(JSON.stringify({ message: error.message, ok: false }), {
      status: 500,
    });
  }
}
