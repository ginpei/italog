"use client";

import { StarIcon as NoStarIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon, StarIcon } from "@heroicons/react/24/solid";
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
  const onRegisterVisitSubmit = (visit: Visit) => {
    console.log("# visit", visit);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">{place.displayName || "(No name)"}</h1>
      <p>
        <StarIcon className="inline size-4 text-yellow-600" />
        <StarIcon className="inline size-4 text-yellow-600" />
        <StarIcon className="inline size-4 text-yellow-600" />
        <StarIcon className="inline size-4 text-yellow-600" />
        <NoStarIcon className="inline size-4 text-yellow-600" /> {"4.0"}
      </p>
      <p>
        Map:{" "}
        <Link href={place.mapUrl} target="_blank">
          {place.address}
          <ArrowTopRightOnSquareIcon className="inline size-4" />
        </Link>
      </p>
      <p>
        Web site:{" "}
        {place.webUrl ? (
          <Link href={place.webUrl} target="_blank">
            {place.webUrl}{" "}
            <ArrowTopRightOnSquareIcon className="inline size-4" />
          </Link>
        ) : (
          "(No web site)"
        )}
      </p>
      <hr />
      <RegisterVisitForm onSubmit={onRegisterVisitSubmit} placeId={place.id} />
    </>
  );
}
