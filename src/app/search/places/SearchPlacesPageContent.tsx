"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { EmbeddedMap } from "./Map";
import { PlaceItem } from "./PlaceItem";
import { PlaceItemSkeleton } from "./PlaceItemSkeleton";
import { SearchNearbyForm } from "./SearchNearbyForm";
import { FindPlaceParams, FindPlaceResponse } from "@/app/api/findNearby/route";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { Place } from "@/components/place/Place";
import { H1 } from "@/components/style/Hn";
import { sleep } from "@/components/time/timer";

export function SearchPlacesPageContent(): JSX.Element {
  const [working, setWorking] = useState(true);
  const [error, setError] = useState<Error | GeolocationPositionError | null>(
    null,
  );
  const [params, setParams] = useState<FindPlaceParams>({
    category: "food_and_drink",
    lat: NaN,
    long: NaN,
    textQuery: "",
  });
  const [lastParams, setLastParams] = useState<FindPlaceParams>(params);
  const [places, setPlaces] = useState<Place[]>([]);

  const latLong = useMemo(
    () => ({ lat: params.lat, long: params.long }),
    [params.lat, params.long],
  );

  useEffect(() => {
    const formContext = loadContext(window);
    if (formContext) {
      setParams(formContext.params);
      setPlaces(formContext.places);
    }
    setWorking(false);
  }, []);

  const onSubmit = useCallback(
    async (params: FindPlaceParams) => {
      const lastPlaces = places;
      setWorking(true);
      setError(null);
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
          lastParams.textQuery === newParams.textQuery &&
          lastParams.lat === newParams.lat &&
          lastParams.long === newParams.long;

        if (sameConditions) {
          await sleep(500);
          setPlaces(lastPlaces);
          return;
        }
        setLastParams(newParams);

        const data = await findNearby(params);
        if (!data.ok) {
          throw new Error(data.message ?? "Unknown error on fetch");
        }

        setPlaces(data.places);
        saveContext(window, {
          params: newParams,
          places: data.places,
        });
      } catch (error) {
        console.error(error);
        setError(toError(error));
      } finally {
        setWorking(false);
      }
    },
    [
      lastParams.category,
      lastParams.lat,
      lastParams.long,
      lastParams.textQuery,
      places,
    ],
  );

  return (
    <VStack>
      <H1>Search places</H1>
      {error && <p className="text-rose-800">⚠️ {error.message}</p>}
      <SearchNearbyForm
        disabled={working}
        onChange={setParams}
        onSubmit={onSubmit}
        params={params}
      />
      <p>
        Location:
        {!Number.isNaN(latLong.lat) ? `${params.lat},${params.long}` : ""}
      </p>
      <div className="sticky top-0 h-[30vh] bg-white py-1">
        {!Number.isNaN(latLong.lat) && !working ? (
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
        {working && (
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

async function findNearby(params: FindPlaceParams): Promise<FindPlaceResponse> {
  const endpoint = "/api/findNearby";

  const searchParams = new URLSearchParams(Object.entries(params));
  const url = `${endpoint}?${searchParams}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

interface RegisterFormContext {
  params: FindPlaceParams;
  places: Place[];
}

function saveContext(w: Window, context: RegisterFormContext): void {
  const key = "/search/places#context";
  w.localStorage.setItem(key, JSON.stringify(context));
}

function loadContext(w: Window): RegisterFormContext | null {
  const key = "/search/places#context";
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
