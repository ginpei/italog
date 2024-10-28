"use client";

import { GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";
import { PlaceResult } from "../register/queryPlaceApi";
import { RegisterVisitForm } from "./RegisterVisitForm";
import { Link } from "@/components/lib/style/Link";
import { Visit } from "@/components/lib/visit/Visit";

export interface PlacePageContentProps {
  place: PlaceResult;
}

export function PlacePageContent({
  place,
}: PlacePageContentProps): JSX.Element {
  const siteHostName = useHostNameOf(place.webUrl);

  const onRegisterVisitSubmit = (visit: Visit) => {
    console.log("# visit", visit);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">{place.displayName || "(No name)"}</h1>
      <Link href={place.mapUrl} target="_blank">
        <span className="flex gap-2">
          <MapPinIcon className="inline size-8 shrink-0" />
          <span>
            {place.address}
            <ArrowTopRightOnSquareIcon className="inline size-4" />
          </span>
        </span>
      </Link>
      {place.webUrl && (
        <Link href={place.webUrl} target="_blank">
          <span className="flex gap-2">
            <GlobeAltIcon className="inline size-8 shrink-0" />
            <span>
              {siteHostName}{" "}
              <ArrowTopRightOnSquareIcon className="inline size-4" />
            </span>
          </span>
        </Link>
      )}
      <hr />
      <RegisterVisitForm onSubmit={onRegisterVisitSubmit} placeId={place.id} />
    </>
  );
}

function useHostNameOf(url: string | undefined): string | undefined {
  return useMemo(() => {
    if (!url) {
      return undefined;
    }

    const urlObj = new URL(url);
    return urlObj.hostname;
  }, [url]);
}
