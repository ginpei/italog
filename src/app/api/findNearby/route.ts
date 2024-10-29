import { NextRequest } from "next/server";
import { toError } from "@/components/lib/error/errorUtil";
import { savePlaces } from "@/components/lib/place/db";
import {
  PlaceResult,
  queryPlaceApi,
} from "@/components/pages/register/queryPlaceApi";

export type FindNearbyResponse =
  | {
      places: PlaceResult[];
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

    const places = await queryPlaceApi(lat, long);

    const t = Date.now();
    const pSavePlace = savePlaces(places);
    pSavePlace.then(() =>
      console.log(`Saved ${places.length} places in`, Date.now() - t, "ms"),
    );
    pSavePlace.catch((error) => {
      console.error("Error saving places:", error);
    });

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
