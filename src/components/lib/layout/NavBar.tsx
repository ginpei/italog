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
        <div className="flex flex-row justify-between">
          <h1>
            <NavBarLink href={titleLink}>{title}</NavBarLink>
          </h1>
          <div>
            {profile ? (
              /* eslint-disable-next-line @next/next/no-html-link-for-pages */
              <a href="/api/auth/logout">Logout</a>
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
