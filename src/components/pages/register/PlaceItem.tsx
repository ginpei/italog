import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { PlaceResult } from "./queryPlaceApi";

export interface PlaceItemProps {
  onClick: (place: PlaceResult) => void;
  place: PlaceResult;
}

export function PlaceItem({ onClick, place }: PlaceItemProps): JSX.Element {
  return (
    <button
      className="PlaceItem flex w-full items-center justify-between gap-4 border border-stone-300 p-2 text-start hover:bg-stone-50 active:bg-stone-200"
      onClick={() => onClick(place)}
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
    </button>
  );
}
