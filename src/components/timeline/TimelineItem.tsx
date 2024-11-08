import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { MapIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { AnyCheckin } from "../checkin/AnyCheckin";

export interface TimelineItemProps {
  checkin: AnyCheckin;
  onShowClick: (place: AnyCheckin) => void;
  selected: boolean;
}

export function TimelineItem({
  checkin,
  onShowClick,
  selected,
}: TimelineItemProps): JSX.Element {
  return (
    <div className="TimelineItem flex border border-gray-300 ">
      <button
        className={`
          grid w-12 items-center justify-center
          ${selected ? "bg-gray-200" : "hover:bg-gray-50 active:bg-gray-200"}
        `}
        onClick={() => onShowClick(checkin)}
      >
        <MapIcon className="size-6 text-gray-500 " />
      </button>
      <Link
        className={`
          grid w-12 items-center justify-center
          ${selected ? "bg-gray-200" : "hover:bg-gray-50 active:bg-gray-200"}
        `}
        onClick={() => onShowClick(checkin)}
        href={`/user/${checkin.userId}`}
      >
        <UserIcon className="size-6 text-gray-500" />
      </Link>
      <Link
        className="flex w-full items-center justify-between gap-4 p-2 text-start hover:bg-gray-50 active:bg-gray-200"
        href={`/place/${checkin.boardId}`}
      >
        <div className="flex flex-col">
          <span className="text-sm">
            {checkin.userName}{" "}
            <span className="text-gray-400">{checkin.userDate}</span>
          </span>
          <span>
            {checkin.starred && "⭐"}
            {checkin.placeName}
          </span>
          <span className="text-sm text-gray-400">
            {checkin.comment && <> {checkin.comment}</>}
          </span>
        </div>
        <span>
          <ChevronDoubleRightIcon className="size-6 text-gray-500" />
        </span>
      </Link>
    </div>
  );
}
