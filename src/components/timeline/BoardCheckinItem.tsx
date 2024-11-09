import Link from "next/link";
import { CheckinProfileLink } from "./CheckinProfileLink";
import { Checkin } from "@/components/checkin/Checkin";

export interface BoardCheckinItemProps {
  checkin: Checkin;
}

export function BoardCheckinItem({
  checkin,
}: BoardCheckinItemProps): JSX.Element {
  return (
    <div className="BoardCheckinItem flex border border-gray-300">
      <CheckinProfileLink profile={checkin.profile} />
      <div className="flex flex-col">
        <span className="text-sm">
          <Link className="hover:underline" href={`/user/${checkin.userId}`}>
            {checkin.profile.displayName}
          </Link>{" "}
          <span className="text-gray-400">{checkin.userDate}</span>
        </span>
        <span className="text-sm text-gray-400">
          {checkin.starred && "⭐"}
          {checkin.board.displayName}
        </span>
        <span>{checkin.comment && <> {checkin.comment}</>}</span>
      </div>
    </div>
  );
}
