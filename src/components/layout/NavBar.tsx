import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ComponentProps } from "react";
import { Profile } from "../user/Profile";
import { Content } from "./Content";

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
    <section className="NavBar bg-ginpei text-white">
      <Content>
        <div className="flex h-[1lh] flex-row items-stretch justify-between leading-10">
          <h1 className="ms-[-1em] flex items-stretch">
            <NavBarLink href={titleLink}>{title}</NavBarLink>
            {profile && (
              <NavBarLink href="/place/search">
                <MapPinIcon className="inline-block size-5" />
              </NavBarLink>
            )}
          </h1>
          <div className="me-[-1em] flex items-stretch">
            {profile ? (
              <NavBarLink href="/my">{profile.displayName}</NavBarLink>
            ) : (
              <NavBarLink auth href="/api/auth/login">
                Login
              </NavBarLink>
            )}
          </div>
        </div>
      </Content>
    </section>
  );
}

function NavBarLink({
  auth,
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  auth?: boolean;
  href: string;
}): React.JSX.Element {
  const Tag = auth ? "a" : Link;

  return (
    <Tag
      className={`${className} NavBarLink
        px-4 text-inherit
        hover:bg-white/20
        active:bg-white/10
      `}
      {...props}
    />
  );
}
