import Link from "next/link";
import { Profile } from "../user/Profile";
import { ProfilePicture } from "../user/ProfilePicture";

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
      hover:shadow
      active:shadow-lg
    `}
      href={`/user/${profile.id}`}
    >
      <ProfilePicture imageUrl={profile.imageUrl} />
    </Link>
  );
}
