"use client";

import { useEffect, useState } from "react";
import { PlaceItem } from "./PlaceItem";
import { FindNearbyResponse } from "@/app/api/findNearby/route";
import { toError } from "@/components/lib/error/errorUtil";
import { VStack } from "@/components/lib/layout/VStack";
import { Place } from "@/components/lib/place/Place";
import { Button } from "@/components/lib/style/Button";
import { H1 } from "@/components/lib/style/Hn";

export function FindPageContent(): JSX.Element {
  const [error, setError] = useState<Error | GeolocationPositionError | null>(
    null,
  );
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

  const onFindClick = () => {
    setError(null);
    setLatLong(null);
    setPlaces([]);

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
            saveContext(window, {
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
    <VStack>
      <H1>Find</H1>
      {error && <p className="text-rose-800">⚠️ {error.message}</p>}
      <Button onClick={onFindClick}>Find by location</Button>
      <p>
        Location:
        {latLong ? `${latLong.lat},${latLong.long}` : ""}
      </p>
      <div className="flex flex-col gap-1">
        {places.map((place) => (
          <PlaceItem key={place.id} place={place} />
        ))}
      </div>
    </VStack>
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
