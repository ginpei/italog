import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { MapPinIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Checkin } from "../checkin/Checkin";
import { getBoardViewPageUrl } from "../checkin/checkinUrl";
import {
  controlBorderThemeClassNames,
  hoverBlockThemeClassNames,
} from "../style/controlClassNames";
import { ProfilePicture } from "../user/ProfilePicture";
import { RateIcon } from "./RateIcon";

export interface TimelineItemProps {
  checkin: Checkin;
  onShowClick: (checkin: Checkin) => void;
  selected: boolean;
}

export function TimelineItem({
  checkin,
  onShowClick,
  selected,
}: TimelineItemProps): JSX.Element {
  return (
    <div
      className={`
        TimelineItem flex flex-col border ${controlBorderThemeClassNames}
      `}
    >
      <div className="flex">
        <button
          className={`
          box-border grid size-16 shrink-0 items-center justify-center p-1
          ${selected ? "bg-gray-200 dark:bg-gray-800" : hoverBlockThemeClassNames}
        `}
          onClick={() => onShowClick(checkin)}
        >
          {checkin.board.boardType === "place" ? (
            <MapPinIcon className="size-6 text-gray-500 " />
          ) : (
            <ShoppingBagIcon className="size-6 text-gray-500 " />
          )}
        </button>
        <Link
          className={`
          box-border size-16 shrink-0 p-1
          hover:bg-gray-200 hover:dark:bg-gray-600
        `}
          href={`/user/${checkin.profile.id}`}
        >
          <ProfilePicture
            imageUrl={checkin.profile.imageUrl}
            size="size-full"
          />
        </Link>
        <Link
          className={`
            flex w-full items-center justify-between gap-4 p-1 text-start
            ${hoverBlockThemeClassNames}
          `}
          href={getBoardViewPageUrl(checkin.board)}
        >
          <div className="flex flex-col">
            <span className="text-sm">
              {checkin.profile.displayName}{" "}
              <span className="text-gray-400">{checkin.userDate}</span>
            </span>
            <span>{checkin.board.displayName}</span>
          </div>
          <span>
            <ChevronDoubleRightIcon className="size-6 text-gray-500" />
          </span>
        </Link>
      </div>
      {checkin.comment && (
        <div className="whitespace-pre-wrap p-2 text-sm text-gray-400">
          <RateIcon rate={checkin.rate} />
          {checkin.comment.trim()}
        </div>
      )}
    </div>
  );
}
