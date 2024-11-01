import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { Place } from "@/components/lib/place/Place";

export interface PlaceItemProps {
  place: Place;
}

export function PlaceItem({ place }: PlaceItemProps): JSX.Element {
  return (
    <Link
      className="PlaceItem flex w-full items-center justify-between gap-4 border border-stone-300 p-2 text-start hover:bg-stone-50 active:bg-stone-200"
      href={`/place/${place.id}`}
    >
      <div className="flex flex-col">
        <span>{place.displayName}</span>
        <span className="text-sm text-stone-400">
          {place.typeDisplayName ?? "(Other)"}
        </span>
        <span className="text-sm text-stone-400">{place.address}</span>
      </div>
      <span>
        <ChevronDoubleRightIcon className="size-6 text-stone-500" />
      </span>
    </Link>
  );
}
