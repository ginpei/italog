import { Content } from "./Content";
import { NavBarLink } from "./NavBarLink";

export interface NavBarFrameProps {
  className?: string;
  children?: React.ReactNode;
  extraContent?: React.ReactNode;
  title: string;
  titleLink?: string;
}

export function NavBarFrame({
  className,
  children,
  extraContent,
  title,
  titleLink = "/",
}: NavBarFrameProps): JSX.Element {
  return (
    <section className={`${className} NavBarFrame bg-ginpei text-white`}>
      <Content>
        <div className="flex h-[1lh] flex-row items-stretch justify-between gap-8 leading-10">
          <div className="ms-[-1em] flex">
            <h1 className="contents">
              <NavBarLink href={titleLink}>{title}</NavBarLink>
            </h1>
            {extraContent}
          </div>
          {children && (
            <div className="me-[-1em] flex items-stretch">{children}</div>
          )}
        </div>
      </Content>
    </section>
  );
}
