import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Checkin } from "@/components/checkin/Checkin";

export interface BoardCheckinItemProps {
  checkin: Checkin;
}

export function BoardCheckinItem({
  checkin,
}: BoardCheckinItemProps): JSX.Element {
  return (
    <div className="BoardCheckinItem flex border border-gray-300">
      <Link
        className={`
          grid size-12 shrink-0 items-center justify-center
          hover:bg-gray-50 active:bg-gray-200
        `}
        href={`/user/${checkin.userId}`}
      >
        <UserIcon className="size-6 text-gray-500" />
      </Link>
      <div className="flex flex-col">
        <span className="text-sm">
          <Link className="hover:underline" href={`/user/${checkin.userId}`}>
            {checkin.profile.displayName}
          </Link>{" "}
          <span className="text-gray-400">{checkin.userDate}</span>
        </span>
        <span>
          {checkin.starred && "⭐"}
          {checkin.board.displayName}
        </span>
        <span className="text-sm text-gray-400">
          {checkin.comment && <> {checkin.comment}</>}
        </span>
      </div>
    </div>
  );
}
