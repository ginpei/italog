import { VStack } from "@/components/layout/VStack";
import { PlaceCheckin } from "@/components/placeCheckin/PlaceCheckin";
import { H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";

export interface TimelineSectionProps {
  checkins: PlaceCheckin[];
}

export function TimelineSection({
  checkins,
}: TimelineSectionProps): JSX.Element {
  // Group visits by date
  const visitsByDate = checkins.reduce(
    (acc, checkin) => {
      if (!acc[checkin.userDate]) {
        acc[checkin.userDate] = [];
      }
      acc[checkin.userDate].push(checkin);
      return acc;
    },
    {} as Record<string, PlaceCheckin[]>,
  );

  return (
    <VStack className="TimelineSection">
      <H2>Timeline</H2>
      <ul>
        {Object.entries(visitsByDate).map(([date, visitsOnDate]) => (
          <li key={date}>
            <strong>{date}</strong>
            <ul className="ms-8 list-disc">
              {visitsOnDate.map((checkin) => (
                <li
                  key={`${checkin.userId}-${checkin.boardId}-${checkin.userDate}`}
                >
                  <Link href={`/user/${checkin.userId}`}>
                    {checkin.userName}
                  </Link>{" "}
                  - {checkin.placeName}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {checkins.length === 0 && <p>No activities yet.</p>}
    </VStack>
  );
}
