import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { hoverBlockThemeClassNames } from "../style/controlClassNames";
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
      ${hoverBlockThemeClassNames}
    `}
      href={`/user/${profile.id}`}
    >
      <UserIcon className="size-6 text-gray-500" />
    </Link>
  );
}
