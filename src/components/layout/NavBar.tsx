import Link from "next/link";
import { ComponentProps } from "react";
import { Content } from "./Content";

export interface NavBarProps {
  title: string;
  titleLink?: string;
}

export function NavBar({ title, titleLink = "/" }: NavBarProps): JSX.Element {
  return (
    <section className="NavBar bg-ginpei text-white">
      <Content>
        <div className="flex flex-row justify-between">
          <h1>
            <NavBarLink href={titleLink}>{title}</NavBarLink>
          </h1>
          <div>Ginpei</div>
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
