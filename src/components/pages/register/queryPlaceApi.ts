import { Place } from "@/components/lib/place/Place";
import { PlaceType } from "@/components/lib/place/placeTypes";

// TODO find official types
interface NearbySearchApiResponse {
  /**
   * If no places are found, this field is omitted from the response.
   */
  places?: Array<{
    id: string;
  }>;
}

interface PlaceDetailsApiResponse {
  formattedAddress: string;
  displayName: {
    text: string;
  };
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  googleMapsUri: string;
  primaryTypeDisplayName?: {
    text: string;
  };
  websiteUri: string;
}

/**
 * @returns Place IDs
 * @see https://developers.google.com/maps/documentation/places/web-service/nearby-search
 */
export async function queryNearbySearch(
  includedTypes: PlaceType[],
  lat: number,
  long: number,
): Promise<string[]> {
  const endpoint = "https://places.googleapis.com/v1/places:searchNearby";

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  if (!GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY is not set");
  }

  const url = new URL(endpoint);

  const res = await fetch(url, {
    body: JSON.stringify({
      includedTypes: includedTypes,
      maxResultCount: 10,
      rankPreference: "DISTANCE",
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: long,
          },
          radius: 1000.0,
        },
      },
    }),
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_API_KEY,
      "X-Goog-FieldMask": "places.id",
    },
    method: "POST",
  });

  const data = await res.json();
  if (data.error) {
    console.log("Response data:", data);
    throw new Error(data.error?.message ?? "Unknown error on fetch");
  }
  const ids = (data as NearbySearchApiResponse).places?.map((v) => v.id) ?? [];
  return ids;
}

export async function queryPlaceDetails(id: string): Promise<Place> {
  const url = `https://places.googleapis.com/v1/places/${id}`;

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  if (!GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY is not set");
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_API_KEY,
      "X-Goog-FieldMask":
        "id,displayName,formattedAddress,location,googleMapsUri,primaryTypeDisplayName,websiteUri",
    },
    method: "GET",
  });

  const data = await res.json();
  if (data.error) {
    console.log("queryPlaceDetails:", url, data);
    throw new Error(data.error.message ?? "Unknown error on fetch");
  }

  const places = resToPlace(data);
  return places;
}

function resToPlace(data: PlaceDetailsApiResponse): Place {
  return {
    address: data.formattedAddress,
    displayName: data.displayName.text,
    id: data.id,
    latitude: data.location.latitude,
    longitude: data.location.longitude,
    mapUrl: data.googleMapsUri,
    typeDisplayName: data.primaryTypeDisplayName?.text,
    webUrl: data.websiteUri,
  };
}
