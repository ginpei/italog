import { controlBorderThemeClassNames } from "../style/controlClassNames";
import { Content } from "./Content";

export function Footer(): JSX.Element {
  return (
    <div
      className={`Footer border-t border-dotted pb-16 pt-4 ${controlBorderThemeClassNames}`}
    >
      <Content>
        <div>By Ginpei</div>
      </Content>
    </div>
  );
}
