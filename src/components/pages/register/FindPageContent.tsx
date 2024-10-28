"use client";

import { useState } from "react";
import { PlaceItem } from "./PlaceItem";
import { PlaceResult } from "./queryPlaceApi";
import { FindNearbyResponse } from "@/app/api/findNearby/route";
import { toError } from "@/components/lib/error/errorUtil";
import { H1 } from "@/components/lib/style/Hn";

export function FindPageContent(): JSX.Element {
  const [error, setError] = useState<Error | GeolocationPositionError | null>(
    null,
  );

  const formContext = loadContext();
  const [places, setPlaces] = useState<PlaceResult[]>(
    formContext?.places ?? [],
  );
  const [latLong, setLatLong] = useState<{ lat: number; long: number } | null>(
    formContext?.location ?? null,
  );

  const onFindClick = () => {
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatLong({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        findNearby(position.coords.latitude, position.coords.longitude)
          .then((data) => {
            if (!data.ok) {
              throw new Error(data.message ?? "Unknown error on fetch");
            }
            saveContext({
              location: {
                lat: position.coords.latitude,
                long: position.coords.longitude,
              },
              places: data.places,
            });
            setPlaces(data.places);
          })
          .catch((error) => {
            console.error(error);
            setError(toError(error));
          });
      },
      (error) => {
        console.error(error);
        setError(error);
      },
    );
  };

  return (
    <>
      <H1>Find</H1>
      {error && <p className="text-rose-800">⚠️ {error.message}</p>}
      <button
        className="border border-stone-400 bg-stone-50 p-4"
        onClick={onFindClick}
      >
        Find by location
      </button>
      <p>
        Location:
        {latLong ? `${latLong.lat},${latLong.long}` : ""}
      </p>
      <div className="flex flex-col gap-1">
        {places.map((place) => (
          <PlaceItem key={place.id} place={place} />
        ))}
      </div>
    </>
  );
}

async function findNearby(
  lat: number,
  long: number,
): Promise<FindNearbyResponse> {
  const endpoint = "/api/findNearby";
  const params = new URLSearchParams({
    lat: String(lat),
    long: String(long),
  });
  const url = `${endpoint}?${params}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

interface RegisterFormContext {
  location: { lat: number; long: number };
  places: PlaceResult[];
}

function saveContext(context: RegisterFormContext): void {
  const key = "places";
  window.localStorage.setItem(key, JSON.stringify(context));
}

function loadContext(): RegisterFormContext | null {
  // TODO solve error on SSR
  // ReferenceError: window is not defined

  const key = "places";
  const data = window.localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
}
