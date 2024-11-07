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
          <h1 className="flex items-stretch gap-4">
            <NavBarLink href={titleLink}>{title}</NavBarLink>
            {profile && (
              <NavBarLink href="/place/search">
                <MapPinIcon className="inline-block size-5" />
              </NavBarLink>
            )}
          </h1>
          <div className="flex items-stretch gap-4">
            {profile ? (
              /* eslint-disable-next-line @next/next/no-html-link-for-pages */
              <a href="/my">{profile.displayName}</a>
            ) : (
              /* eslint-disable-next-line @next/next/no-html-link-for-pages */
              <a href="/api/auth/login">Login</a>
            )}
          </div>
        </div>
      </Content>
    </section>
  );
}

function NavBarLink(props: ComponentProps<typeof Link>): React.JSX.Element {
  const { className, ...otherProps } = props;
  return (
    <Link
      className={`${className} text-inherit hover:underline`}
      {...otherProps}
    />
  );
}
