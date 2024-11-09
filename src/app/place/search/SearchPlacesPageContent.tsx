"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EmbeddedMap } from "../../../components/timeline/EmbeddedMap";
import { PlaceItem } from "./PlaceItem";
import { PlaceItemSkeleton } from "./PlaceItemSkeleton";
import { SearchNearbyForm } from "./SearchNearbyForm";
import { FindPlaceParams, FindPlaceResponse } from "@/app/api/findNearby/route";
import { ErrorBlock } from "@/components/error/ErrorBlock";
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
  const [primaryPlaceId, setPrimaryPlaceId] = useState<string>("");

  const latLong = useMemo(
    () => ({ lat: params.lat, long: params.long }),
    [params.lat, params.long],
  );

  const placeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const formContext = loadContext(window);
    if (formContext) {
      setParams(formContext.params);
      setPlaces(formContext.places);
    }
    setWorking(false);
  }, []);

  // scroll to the primary place
  useEffect(() => {
    const element = placeRefs.current.get(primaryPlaceId);
    if (!primaryPlaceId || !element) {
      return;
    }

    const mapWrapperHeight = mapWrapperRef.current?.offsetHeight || 0;
    const rect = element.getBoundingClientRect();
    const isVisible =
      rect.top >= mapWrapperHeight && rect.bottom <= window.innerHeight;
    if (!isVisible) {
      const scrollOffset = element.offsetTop - mapWrapperHeight;
      window.scrollTo({ top: scrollOffset, behavior: "smooth" });
    }
  }, [primaryPlaceId]);

  const onSubmit = useCallback(
    async (params: FindPlaceParams) => {
      const lastPlaces = places;
      setWorking(true);
      setError(null);
      setPlaces([]);
      setPrimaryPlaceId("");

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
        setParams(newParams);

        const data = await findNearby(newParams);
        if (!data.ok) {
          throw new Error(data.message ?? "Unknown error on fetch");
        }

        setLastParams(newParams);
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
      <ErrorBlock error={error} />
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
      <div ref={mapWrapperRef} className="sticky top-0 h-[30vh] bg-white py-1">
        {working ? (
          <div className="size-full animate-pulse bg-gray-300" />
        ) : Number.isNaN(latLong.lat) ? (
          <div className="size-full bg-gray-100" />
        ) : (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <EmbeddedMap
              center={params}
              onPlaceClick={setPrimaryPlaceId}
              places={places.map((v) => [v, v.boardId])}
              primaryPlaceKey={primaryPlaceId}
            />
          </APIProvider>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {working ? (
          <>
            <PlaceItemSkeleton />
            <PlaceItemSkeleton />
            <PlaceItemSkeleton />
          </>
        ) : places.length === 0 ? (
          <div className="h-[30vh] text-gray-500">Nothing found around</div>
        ) : (
          places.map((place) => (
            <div
              key={place.boardId}
              ref={(el) => {
                if (el) placeRefs.current.set(place.boardId, el);
                else placeRefs.current.delete(place.boardId);
              }}
            >
              <PlaceItem
                onShowClick={() => setPrimaryPlaceId(place.boardId)}
                place={place}
                selected={
                  place.boardId === (primaryPlaceId || places[0].boardId)
                }
              />
            </div>
          ))
        )}
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
  const key = "/search/place#context";
  w.sessionStorage.setItem(key, JSON.stringify(context));
}

function loadContext(w: Window): RegisterFormContext | null {
  const key = "/search/place#context";
  const data = w.sessionStorage.getItem(key);
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
