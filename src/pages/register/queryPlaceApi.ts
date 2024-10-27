export interface PlaceResult {
  address: string;
  displayName: string;
  id: string;
  latitude: number;
  longitude: number;
  mapUrl: string;
  typeDisplayName?: string;
  webUrl?: string;
}

// TODO find official types
interface PlaceApiResponse {
  places: Array<{
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
  }>;
}

export async function queryPlaceApi(
  lat: number,
  long: number,
): Promise<PlaceResult[]> {
  const endpoint = "https://places.googleapis.com/v1/places:searchNearby";

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  if (!GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY is not set");
  }

  const url = new URL(endpoint);

  const res = await fetch(url, {
    body: JSON.stringify({
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
      "X-Goog-FieldMask": "places",
    },
    method: "POST",
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    console.log("Response data:", data);
    throw new Error(
      data.error_message ?? data.error?.message ?? "Unknown error on fetch",
    );
  }

  const places = (data as PlaceApiResponse).places.map((v) => toPlaceResult(v));
  return places;
}

function toPlaceResult(data: PlaceApiResponse["places"][number]): PlaceResult {
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
