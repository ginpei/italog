import Link from "next/link";
import { CheckinProfileLink } from "./CheckinProfileLink";
import { RateIcon } from "./RateIcon";
import { Checkin } from "@/components/checkin/Checkin";

export interface CheckinItemProps {
  checkin: Checkin;
}

export function CheckinItem({ checkin }: CheckinItemProps): JSX.Element {
  return (
    <div className="CheckinItem flex flex-col border border-gray-300 p-2">
      <div className="flex gap-2">
        <CheckinProfileLink profile={checkin.profile} />
        <span className="flex flex-col">
          <span className="text-sm">
            <Link className="hover:underline" href={`/user/${checkin.userId}`}>
              {checkin.profile.displayName}
            </Link>{" "}
            <span className="text-gray-400">{checkin.userDate}</span>
          </span>
          <span className="text-sm text-gray-400">
            {checkin.board.displayName}
          </span>
        </span>
      </div>
      {checkin.comment && (
        <div className="">
          <RateIcon rate={checkin.rate} /> {checkin.comment}
        </div>
      )}
    </div>
  );
}
