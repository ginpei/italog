import { Link } from "../style/Link";
import { controlBorderThemeClassNames } from "../style/controlClassNames";
import { Content } from "./Content";

export function Footer(): JSX.Element {
  return (
    <div
      className={`Footer border-t border-dotted pb-16 pt-4 ${controlBorderThemeClassNames}`}
    >
      <Content>
        <div>
          <Link href="/about">By Ginpei</Link>
        </div>
      </Content>
    </div>
  );
}
