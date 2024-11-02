import { VStack } from "@/components/layout/VStack";
import { H2 } from "@/components/style/Hn";
import { Link } from "@/components/style/Link";
import { VisitPlace } from "@/components/visit/VisitPlace";

export interface TimelineSectionProps {
  visits: VisitPlace[];
}

export function TimelineSection({ visits }: TimelineSectionProps): JSX.Element {
  // Group visits by date
  const visitsByDate = visits.reduce(
    (acc, visit) => {
      if (!acc[visit.date]) {
        acc[visit.date] = [];
      }
      acc[visit.date].push(visit);
      return acc;
    },
    {} as Record<string, VisitPlace[]>,
  );

  return (
    <VStack className="TimelineSection">
      <H2>Timeline</H2>
      <ul>
        {Object.entries(visitsByDate).map(([date, visitsOnDate]) => (
          <li key={date}>
            <strong>{date}</strong>
            <ul className="ms-8 list-disc">
              {visitsOnDate.map((visit) => (
                <li key={`${visit.userId}-${visit.placeId}-${visit.date}`}>
                  <Link href={`/user/${visit.userId}`}>{visit.userName}</Link> -{" "}
                  {visit.placeName}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {visits.length === 0 && <p>No activities yet.</p>}
    </VStack>
  );
}
