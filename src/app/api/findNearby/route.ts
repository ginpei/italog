import { NextRequest } from "next/server";
import { toError } from "@/components/lib/error/errorUtil";
import { Place } from "@/components/lib/place/Place";
import { savePlaces } from "@/components/lib/place/pladeDb";
import { queryPlaceApi } from "@/components/pages/register/queryPlaceApi";

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

    const places = await queryPlaceApi(lat, long);

    const t = Date.now();
    const pSavePlace = savePlaces(places);
    await pSavePlace
      .catch((error) => {
        console.info("savePlaces()", places);
        console.error("Error saving places:", error);
      })
      .finally(() => {
        console.log(
          `Tried to save ${places.length} places in`,
          Date.now() - t,
          "ms",
        );
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
