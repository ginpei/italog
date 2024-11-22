import Link from "next/link";
import { controlBorderThemeClassNames } from "../style/controlClassNames";
import { ProfilePicture } from "../user/ProfilePicture";
import { RateIcon } from "./RateIcon";
import { Checkin } from "@/components/checkin/Checkin";

export interface CheckinItemProps {
  checkin: Checkin;
  own: boolean;
}

export function CheckinItem({ checkin, own }: CheckinItemProps): JSX.Element {
  return (
    <div
      className={`
        CheckinItem flex flex-col border ${controlBorderThemeClassNames}
      `}
    >
      <div className="flex">
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
        <div className="flex flex-col p-2">
          <span className="text-sm">
            <Link
              className="hover:underline active:underline"
              href={`/user/${checkin.userId}`}
            >
              {checkin.profile.displayName}
            </Link>{" "}
            {own ? (
              <Link
                className="text-gray-400 hover:underline active:underline"
                href={`/checkin/${checkin.id}/edit`}
              >
                {checkin.userDate}
              </Link>
            ) : (
              <span className="text-gray-400">{checkin.userDate}</span>
            )}
          </span>
          <span className="text-sm text-gray-400">
            {checkin.board.displayName}
          </span>
        </div>
      </div>
      {checkin.comment && (
        <div className="whitespace-pre-wrap p-2">
          <RateIcon rate={checkin.rate} />
          {checkin.comment.trim()}
        </div>
      )}
    </div>
  );
}
