import {
  queryNearbySearch,
  queryPlaceDetails,
  queryTextSearch,
} from "@/app/api/findNearby/queryPlaceApi";
import { toError } from "@/components/error/errorUtil";
import { Place } from "@/components/place/Place";
import { getPlaceRecords, savePlaceRecord } from "@/components/place/placeDb";
import {
  isPlaceTypeCategory,
  PlaceTypeCategory,
  placeTypes,
} from "@/components/place/placeTypes";

export interface FindPlaceParams {
  category: PlaceTypeCategory;
  lat: number;
  long: number;
  textQuery: string;
}

export type FindPlaceResponse =
  | {
      places: Place[];
      ok: true;
    }
  | {
      message: string;
      ok: false;
    };

export async function GET(request: Request) {
  // avoid DynamicServerError on next-build
  const url = request.url;

  try {
    const reqParams = Object.fromEntries(new URL(url).searchParams.entries());

    const category = reqParams.category;
    if (!category || !isPlaceTypeCategory(category)) {
      return new Response(
        JSON.stringify({ message: "Invalid category", ok: false }),
        { status: 400 },
      );
    }

    const includedTypes = placeTypes
      .filter((v) => v.category === category)
      .map((v) => v.typeKey);

    const textQuery = reqParams.q;

    const lat = Number(reqParams.lat);
    const long = Number(reqParams.long);
    if (Number.isNaN(lat) || Number.isNaN(long)) {
      return new Response(
        JSON.stringify({ message: "Location is required", ok: false }),
        { status: 400 },
      );
    }

    const ids = textQuery
      ? await queryTextSearch(textQuery, category, lat, long)
      : await queryNearbySearch(includedTypes, lat, long);
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

    const jsonData: FindPlaceResponse = { places, ok: true };
    return Response.json(jsonData);
  } catch (errorish) {
    const error = toError(errorish);
    console.error(error);

    return new Response(JSON.stringify({ message: error.message, ok: false }), {
      status: 500,
    });
  }
}
