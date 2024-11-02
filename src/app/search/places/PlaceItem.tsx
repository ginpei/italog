import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { Place } from "@/components/place/Place";

export interface PlaceItemProps {
  place: Place;
  onPointerEnter: (place: Place) => void;
  onPointerLeaveOrCancel: (place: Place) => void;
}

export function PlaceItem({
  place,
  onPointerEnter,
  onPointerLeaveOrCancel,
}: PlaceItemProps): JSX.Element {
  return (
    <Link
      className="PlaceItem flex w-full items-center justify-between gap-4 border border-gray-300 p-2 text-start hover:bg-gray-50 active:bg-gray-200"
      href={`/place/${place.id}`}
      onPointerCancel={() => onPointerLeaveOrCancel(place)}
      onPointerEnter={() => onPointerEnter(place)}
      onPointerLeave={() => onPointerLeaveOrCancel(place)}
    >
      <div className="flex flex-col">
        <span>{place.displayName}</span>
        <span className="text-sm text-gray-400">
          {place.typeDisplayName ?? "(Other)"}
        </span>
        <span className="text-sm text-gray-400">{place.address}</span>
      </div>
      <span>
        <ChevronDoubleRightIcon className="size-6 text-gray-500" />
      </span>
    </Link>
  );
}
