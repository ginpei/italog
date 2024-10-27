import { PlaceResult } from "@/components/pages/register/queryPlaceApi";

const placeDb = new Map<string, PlaceResult>();

export function savePlaces(places: PlaceResult[]): void {
  places.forEach((place) => {
    placeDb.set(place.id, place);
  });
}

export function getPlace(id: string): PlaceResult | undefined {
  return placeDb.get(id);
}
