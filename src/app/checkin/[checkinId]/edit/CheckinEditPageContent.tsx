import { Checkin } from "@/components/checkin/Checkin";
import { H1 } from "@/components/style/Hn";

export interface CheckinEditPageContentProps {
  checkin: Checkin;
}

export function CheckinEditPageContent({
  checkin,
}: CheckinEditPageContentProps): JSX.Element {
  const title =
    checkin.board.boardType === "place"
      ? `Checkin at ${checkin.board.displayName}`
      : `Checkin of ${checkin.board.boardType}`;

  return (
    <div className="CheckinEditPageContent">
      <H1>{title}</H1>
    </div>
  );
}
