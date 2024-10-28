"use client";

import { StarIcon as NoStarIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon, StarIcon } from "@heroicons/react/24/solid";
import { PlaceResult } from "../register/queryPlaceApi";
import { Button } from "@/components/lib/style/Button";
import { H2 } from "@/components/lib/style/Hn";
import { Link } from "@/components/lib/style/Link";

export interface PlacePageContentProps {
  place: PlaceResult;
}

export function PlacePageContent({
  place,
}: PlacePageContentProps): JSX.Element {
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
      <form>
        <fieldset className="flex flex-col gap-4">
          <H2>Register visit</H2>
          <label>
            <input type="checkbox" name="star" /> Recommend to the others
          </label>
          <label className="flex flex-col gap-0">
            Comment:
            <textarea className="border border-gray-400" name="comment" />
          </label>
          <Button>Register</Button>
        </fieldset>
      </form>
    </>
  );
}
