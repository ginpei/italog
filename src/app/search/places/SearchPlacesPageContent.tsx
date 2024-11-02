"use client";

import { useCallback, useEffect, useState } from "react";
import { EmbeddedMap } from "./Map";
import { PlaceItem } from "./PlaceItem";
import { PlaceItemSkeleton } from "./PlaceItemSkeleton";
import { SearchNearbyForm } from "./SearchNearbyForm";
import {
  FindNearbyParams,
  FindNearbyResponse,
} from "@/app/api/findNearby/route";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { PlaceTypeCategory } from "@/components/place/placeTypes";
import { H1 } from "@/components/style/Hn";
import { sleep } from "@/components/time/timer";

export function SearchPlacesPageContent(): JSX.Element {
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
  const [lastParams, setLastParams] = useState<FindNearbyParams>(params);
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

  const onSubmit = useCallback(
    async (params: FindNearbyParams) => {
      const lastLatLong = latLong;
      const lastPlaces = places;
      setSearching(true);
      setError(null);
      setLatLong(null);
      setPlaces([]);

      try {
        const position = await getLocation();
        const newLatLong = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        const newParams = {
          ...params,
          lat: newLatLong.lat,
          long: newLatLong.long,
        };
        const sameConditions =
          lastParams.category === newParams.category &&
          lastParams.lat === newParams.lat &&
          lastParams.long === newParams.long;

        if (sameConditions) {
          await sleep(500);
          setLatLong(lastLatLong);
          setPlaces(lastPlaces);
          return;
        }
        setLastParams(newParams);

        setLatLong(newLatLong);
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
    },
    [lastParams.category, lastParams.lat, lastParams.long, latLong, places],
  );

  return (
    <VStack>
      <H1>Search places</H1>
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
      <div className="sticky top-0 h-[30vh] bg-white py-1">
        {latLong && !searching ? (
          <EmbeddedMap
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            lat={latLong.lat}
            long={latLong.long}
          />
        ) : (
          <div className="size-full animate-pulse bg-gray-300" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        {searching && (
          <>
            <PlaceItemSkeleton />
            <PlaceItemSkeleton />
            <PlaceItemSkeleton />
          </>
        )}
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
