"use client";

import { GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";
import { PlaceResult } from "../register/queryPlaceApi";
import { RegisterVisitForm } from "./RegisterVisitForm";
import { requestRegisterVisit } from "@/components/lib/place/registerVisitRequest";
import { H2 } from "@/components/lib/style/Hn";
import { Link } from "@/components/lib/style/Link";
import { Visit } from "@/components/lib/visit/Visit";

export interface PlacePageContentProps {
  place: PlaceResult;
  userVisits: Visit[];
  visited: boolean;
}

export function PlacePageContent({
  place,
  userVisits,
  visited,
}: PlacePageContentProps): JSX.Element {
  const [formWorking, setFormWorking] = useState(false);
  const siteHostName = useHostNameOf(place.webUrl);

  const onRegisterVisitSubmit = async (visit: Visit) => {
    setFormWorking(true);
    await requestRegisterVisit({ visit, visited });
    setFormWorking(false);
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
      <RegisterVisitForm
        disabled={formWorking}
        onSubmit={onRegisterVisitSubmit}
        placeId={place.id}
        visited={visited}
      />
      <hr />
      <H2>Your visits</H2>
      <ul className="ms-4 list-disc">
        {userVisits.map((visit) => (
          <li key={visit.id}>
            {new Date(visit.createdAt).toLocaleDateString()}{" "}
            {visit.starred && "⭐ "}
            {visit.comment}
          </li>
        ))}
        {userVisits.length < 1 && <li>No visits yet</li>}
      </ul>
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
