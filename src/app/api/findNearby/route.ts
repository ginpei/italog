import {
  queryNearbySearch,
  queryPlaceDetails,
} from "@/app/api/findNearby/queryPlaceApi";
import { toError } from "@/components/lib/error/errorUtil";
import { Place } from "@/components/lib/place/Place";
import {
  getPlaceRecords,
  savePlaceRecord,
} from "@/components/lib/place/placeDb";
import {
  isPlaceTypeCategory,
  PlaceTypeCategory,
  placeTypes,
} from "@/components/lib/place/placeTypes";

export interface FindNearbyParams {
  category: PlaceTypeCategory;
  lat: number;
  long: number;
  q?: string;
}

export type FindNearbyResponse =
  | {
      places: Place[];
      ok: true;
    }
  | {
      message: string;
      ok: false;
    };

export async function GET(request: Request) {
  try {
    const reqParams = new URL(request.url).searchParams;

    const typeCategory = reqParams.get("category");
    if (!typeCategory || !isPlaceTypeCategory(typeCategory)) {
      return new Response(
        JSON.stringify({ message: "Invalid category", ok: false }),
        { status: 400 },
      );
    }

    const includedTypes = placeTypes
      .filter((v) => v.category === typeCategory)
      .map((v) => v.typeKey);

    const lat = Number(reqParams.get("lat"));
    const long = Number(reqParams.get("long"));
    if (Number.isNaN(lat) || Number.isNaN(long)) {
      return new Response(
        JSON.stringify({ message: "Location is required", ok: false }),
        { status: 400 },
      );
    }

    const ids = await queryNearbySearch(includedTypes, lat, long);
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
