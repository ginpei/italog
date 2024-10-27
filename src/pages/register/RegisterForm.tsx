"use client";

import { useState } from "react";
import { toError } from "@/components/error/errorUtil";

export function RegisterForm(): JSX.Element {
  const [error, setError] = useState<Error | GeolocationPositionError | null>(
    null,
  );

  const onFindClick = () => {
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        findNearby(position.coords.latitude, position.coords.longitude)
          .then((data) => {
            if (!data.ok) {
              throw new Error(data.message);
            }
            console.log("# data", data);
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
    <div className="RegisterForm">
      {error && <p className="text-rose-800">⚠️ {error.message}</p>}
      <button
        className="size-16 border border-stone-400 bg-stone-50"
        onClick={onFindClick}
      >
        Find
      </button>
    </div>
  );
}

async function findNearby(lat: number, long: number) {
  const endpoint = "/api/findNearby";
  const params = new URLSearchParams({
    location: `${lat},${long}`,
  });
  const url = `${endpoint}?${params}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
