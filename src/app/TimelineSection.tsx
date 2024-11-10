import { APIProvider } from "@vis.gl/react-google-maps";
import { useMemo, useRef, useState } from "react";
import { Checkin, CheckinRow } from "@/components/checkin/Checkin";
import { ErrorBlock } from "@/components/error/ErrorBlock";
import { toError } from "@/components/error/errorUtil";
import { VStack } from "@/components/layout/VStack";
import { LatLong } from "@/components/place/LatLong";
import { Place } from "@/components/place/Place";
import { Button } from "@/components/style/Button";
import { H2 } from "@/components/style/Hn";
import { CheckinList } from "@/components/timeline/CheckinList";
import { EmbeddedMap } from "@/components/timeline/EmbeddedMap";
import { TimelineItem } from "@/components/timeline/TimelineItem";

export interface TimelineSectionProps {
  checkins: Checkin[];
}

export function TimelineSection({
  checkins,
}: TimelineSectionProps): JSX.Element {
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [userLocation, setUserLocation] = useState<LatLong | null>(null);
  const [primaryPlaceId, setPrimaryPlaceId] = useState("");
  const placeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  const places: Place[] = useMemo(
    () =>
      checkins
        .filter((v): v is Checkin<Place> => v.board.boardType === "place")
        .map((v) => v.board),
    [checkins],
  );

  const onGetLocationClick = async () => {
    setWorking(true);
    setError(null);
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );
      setUserLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    } catch (error) {
      console.error("Failed to get location", error);
      setError(toError(error));
    } finally {
      setWorking(false);
    }
  };

  const onMapMarkerClick = (id: string) => {
    setPrimaryPlaceId(id);
  };

  const onShowCheckinClick = (checkin: CheckinRow) => {
    setPrimaryPlaceId(checkin.boardId);
  };

  return (
    <VStack className="TimelineSection">
      <H2>Timeline</H2>
      <ErrorBlock error={error} />
      <div className="hidden">
        {/* TODO */}
        <Button disabled={working} onClick={onGetLocationClick}>
          Click to get your location
        </Button>
      </div>
      <div ref={mapWrapperRef} className="sticky top-0 h-[30vh] bg-white py-1">
        {working ? (
          <div className="size-full animate-pulse bg-gray-300" />
        ) : (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <EmbeddedMap
              onPlaceClick={onMapMarkerClick}
              places={places}
              primaryPlaceKey={primaryPlaceId}
              userLocation={userLocation}
            />
          </APIProvider>
        )}
      </div>
      <CheckinList>
        {checkins.map((checkin) => (
          <div
            key={checkin.id}
            ref={(el) => {
              if (el) placeRefs.current.set(checkin.id, el);
              else placeRefs.current.delete(checkin.id);
            }}
          >
            <TimelineItem
              checkin={checkin}
              onShowClick={onShowCheckinClick}
              selected={checkin.boardId === primaryPlaceId}
            />
          </div>
        ))}
        {checkins.length === 0 && <p>No activities yet.</p>}
      </CheckinList>
    </VStack>
  );
}
