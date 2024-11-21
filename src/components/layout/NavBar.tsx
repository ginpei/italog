import { MapPinIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Profile } from "../user/Profile";
import { NavBarFrame } from "./NavBarFrame";
import { NavBarLink } from "./NavBarLink";

export interface NavBarProps {
  profile: Profile | null;
  title: string;
  titleLink?: string;
}

export function NavBar({
  profile,
  title,
  titleLink = "/",
}: NavBarProps): JSX.Element {
  return (
    <NavBarFrame
      className="NavBar"
      extraContent={
        profile && (
          <>
            <NavBarLink href="/place/search">
              <MapPinIcon className="inline-block size-5" />
            </NavBarLink>
            <NavBarLink href="/product/search">
              <ShoppingBagIcon className="inline-block size-5" />
            </NavBarLink>
          </>
        )
      }
      title={title}
      titleLink={titleLink}
    >
      {profile ? (
        <NavBarLink href={`/user/${profile.id}`}>
          {profile.displayName}
        </NavBarLink>
      ) : (
        <NavBarLink as="a" href="/api/auth/login">
          Login
        </NavBarLink>
      )}
    </NavBarFrame>
  );
}
