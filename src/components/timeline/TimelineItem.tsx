import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { MapIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Checkin } from "../checkin/Checkin";
import { getBoardViewPageUrl } from "../checkin/checkinUrl";
import {
  controlBorderThemeClassNames,
  hoverBlockThemeClassNames,
} from "../style/controlClassNames";
import { CheckinProfileLink } from "./CheckinProfileLink";
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
      className={`TimelineItem flex border border-gray-300 ${controlBorderThemeClassNames}`}
    >
      <button
        className={`
          grid size-12 items-center justify-center
          ${selected ? "bg-gray-200 dark:bg-gray-800" : hoverBlockThemeClassNames}
        `}
        onClick={() => onShowClick(checkin)}
      >
        <MapIcon className="size-6 text-gray-500 " />
      </button>
      <CheckinProfileLink profile={checkin.profile} />
      <Link
        className={`
          flex w-full items-center justify-between gap-4 p-2 text-start
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
          {checkin.comment && (
            <div className="whitespace-pre-wrap text-sm text-gray-400">
              <RateIcon rate={checkin.rate} />
              {checkin.comment.trim()}
            </div>
          )}
        </div>
        <span>
          <ChevronDoubleRightIcon className="size-6 text-gray-500" />
        </span>
      </Link>
    </div>
  );
}
