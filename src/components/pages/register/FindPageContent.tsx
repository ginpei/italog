"use client";

import { useEffect, useState } from "react";
import { EmbeddedMap } from "./Map";
import { PlaceItem } from "./PlaceItem";
import { SearchNearbyForm } from "./SearchNearbyForm";
import {
  FindNearbyParams,
  FindNearbyResponse,
} from "@/app/api/findNearby/route";
import { toError } from "@/components/lib/error/errorUtil";
import { VStack } from "@/components/lib/layout/VStack";
import { Place } from "@/components/lib/place/Place";
import { PlaceTypeCategory } from "@/components/lib/place/placeTypes";
import { H1 } from "@/components/lib/style/Hn";

export function FindPageContent(): JSX.Element {
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<Error | GeolocationPositionError | null>(
    null,
  );
  const [params, setParams] = useState<FindNearbyParams>({
    category: "food_and_drink",
    lat: NaN,
    long: NaN,
    q: "",
  });
  const [places, setPlaces] = useState<Place[]>([]);
  const [latLong, setLatLong] = useState<{ lat: number; long: number } | null>(
    null,
  );

  useEffect(() => {
    const formContext = loadContext(window);
    if (formContext) {
      setPlaces(formContext.places);
      setLatLong(formContext.location);
    }
  }, []);

  const onSubmit = async (params: FindNearbyParams) => {
    setSearching(true);
    setError(null);
    setLatLong(null);
    setPlaces([]);

    try {
      const position = await getLocation();
      setLatLong({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
      const data = await findNearby(
        params.category,
        position.coords.latitude,
        position.coords.longitude,
      );
      if (!data.ok) {
        throw new Error(data.message ?? "Unknown error on fetch");
      }

      setPlaces(data.places);
      saveContext(window, {
        location: {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        },
        places: data.places,
      });
    } catch (error) {
      console.error(error);
      setError(toError(error));
    } finally {
      setSearching(false);
    }
  };

  return (
    <VStack>
      <H1>Find</H1>
      {error && <p className="text-rose-800">⚠️ {error.message}</p>}
      <SearchNearbyForm
        disabled={searching}
        onChange={setParams}
        onSubmit={onSubmit}
        params={params}
      />
      <p>
        Location:
        {latLong ? `${latLong.lat},${latLong.long}` : ""}
      </p>
      <div className="sticky top-0 h-[40vh] bg-white py-1">
        {latLong && (
          <EmbeddedMap
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            lat={latLong.lat}
            long={latLong.long}
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        {places.map((place) => (
          <PlaceItem key={place.id} place={place} />
        ))}
      </div>
    </VStack>
  );
}

async function findNearby(
  category: PlaceTypeCategory,
  lat: number,
  long: number,
): Promise<FindNearbyResponse> {
  const endpoint = "/api/findNearby";

  const searchParams = new URLSearchParams({
    category,
    lat: String(lat),
    long: String(long),
  });
  const url = `${endpoint}?${searchParams}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

interface RegisterFormContext {
  location: { lat: number; long: number };
  places: Place[];
}

function saveContext(w: Window, context: RegisterFormContext): void {
  const key = "places";
  w.localStorage.setItem(key, JSON.stringify(context));
}

function loadContext(w: Window): RegisterFormContext | null {
  const key = "places";
  const data = w.localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
}

function getLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
