"use client";

import { useState } from "react";
import { PlaceItem } from "./PlaceItem";
import { PlaceResult } from "./queryPlaceApi";
import { FindNearbyResponse } from "@/app/api/findNearby/route";
import { toError } from "@/components/lib/error/errorUtil";

export function RegisterForm(): JSX.Element {
  const [error, setError] = useState<Error | GeolocationPositionError | null>(
    null,
  );
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [latLong, setLatLong] = useState<{ lat: number; long: number } | null>(
    null,
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

  const onPlaceClick = (place: PlaceResult) => {
    console.log("Place clicked", place);
    alert(place.displayName);
  };

  return (
    <div className="RegisterForm flex flex-col gap-4">
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
          <PlaceItem key={place.id} onClick={onPlaceClick} place={place} />
        ))}
      </div>
    </div>
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
