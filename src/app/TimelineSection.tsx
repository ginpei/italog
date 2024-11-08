import { useRef, useState } from "react";
import { Checkin } from "@/components/checkin/Checkin";
import { VStack } from "@/components/layout/VStack";
import { LatLong } from "@/components/place/LatLong";
import { PlaceCheckin } from "@/components/placeCheckin/PlaceCheckin";
import { Button } from "@/components/style/Button";
import { H2 } from "@/components/style/Hn";
import { EmbeddedMap } from "@/components/timeline/EmbeddedMap";
import { TimelineItem } from "@/components/timeline/TimelineItem";

export interface TimelineSectionProps {
  checkins: PlaceCheckin[];
}

export function TimelineSection({
  checkins,
}: TimelineSectionProps): JSX.Element {
  const [working, setWorking] = useState(false);
  const [userLocation, setUserLocation] = useState<LatLong | null>(null);
  const [primaryPlaceId, setPrimaryPlaceId] = useState("");
  const placeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  const onGetLocationClick = async () => {
    setWorking(true);
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
    } finally {
      setWorking(false);
    }
  };

  const onShowCheckinClick = (checkin: Checkin) => {
    setPrimaryPlaceId(checkin.id);
  };

  return (
    <VStack className="TimelineSection">
      <H2>Timeline</H2>
      <p>
        <Button disabled={working} onClick={onGetLocationClick}>
          Get location
        </Button>
      </p>
      <div ref={mapWrapperRef} className="sticky top-0 h-[30vh] bg-white py-1">
        {working || !userLocation ? (
          <div className="size-full animate-pulse bg-gray-300" />
        ) : (
          <EmbeddedMap
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            center={userLocation}
            onPlaceClick={console.log}
            places={checkins.map((v) => [v, v.id])}
            primaryPlaceKey={primaryPlaceId}
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
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
              selected={false}
            />
          </div>
        ))}
        {checkins.length === 0 && <p>No activities yet.</p>}
      </div>
    </VStack>
  );
}
