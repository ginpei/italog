import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Profile } from "../user/Profile";

export interface CheckinProfileLinkProps {
  profile: Profile;
}

export function CheckinProfileLink({
  profile,
}: CheckinProfileLinkProps): JSX.Element {
  return (
    <Link
      className={`
      grid size-12 shrink-0 items-center justify-center
      hover:bg-gray-50 active:bg-gray-200
    `}
      href={`/user/${profile.id}`}
    >
      <UserIcon className="size-6 text-gray-500" />
    </Link>
  );
}
