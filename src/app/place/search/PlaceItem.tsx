import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { MapIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Place } from "@/components/place/Place";
import { hoverBlockThemeClassNames } from "@/components/style/controlClassNames";

export interface PlaceItemProps {
  onShowClick: (place: Place) => void;
  place: Place;
  selected: boolean;
}

export function PlaceItem({
  onShowClick,
  place,
  selected,
}: PlaceItemProps): JSX.Element {
  return (
    <div className="PlaceItem flex border border-gray-300 ">
      <button
        className={`
          grid w-12 items-center justify-center
          ${selected ? "bg-gray-200 dark:bg-gray-800" : hoverBlockThemeClassNames}
        `}
        onClick={() => onShowClick(place)}
      >
        <MapIcon className="size-6 text-gray-500 " />
      </button>
      <Link
        className={`
          flex w-full items-center justify-between gap-4 p-2 text-start
          ${hoverBlockThemeClassNames}
        `}
        href={`/place/${place.boardId}`}
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
    </div>
  );
}
