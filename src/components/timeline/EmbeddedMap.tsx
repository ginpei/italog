import { AdvancedMarker, Map, Pin, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useMemo } from "react";
import { Place } from "../place/Place";
import { LatLong } from "@/components/place/LatLong";

export interface EmbeddedMapProps {
  onPlaceClick?: (id: string) => void;
  places: Place[];
  /**
   * Give `boardId`.
   */
  primaryPlaceId?: string;
  userLocation?: LatLong | null;
}

/**
 * @see https://developers.google.com/maps/documentation/embed/embedding-map
 * @example
 * <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
 *   <EmbeddedMap … />
 * </APIProvider>
 */
export function EmbeddedMap({
  onPlaceClick,
  places,
  primaryPlaceId,
  userLocation,
}: EmbeddedMapProps): JSX.Element {
  const mapId = "xxx"; // TODO https://developers.google.com/maps/documentation/get-map-id
  const map = useMap();

  const emphasisPlaceId = primaryPlaceId || places[0].boardId;

  const uniquePlaces = useMemo(
    () =>
      places.filter(
        (place, index, arr) =>
          arr.findIndex((p) => p.boardId === place.boardId) === index,
      ),
    [places],
  );

  const userLatLong = useMemo(
    () => userLocation && { lat: userLocation.lat, lng: userLocation.long },
    [userLocation],
  );

  const defaultCenter = useMemo(() => {
    if (userLatLong) {
      return userLatLong;
    }
    if (uniquePlaces.length > 0) {
      const place = uniquePlaces[0];
      return { lat: place.latitude, lng: place.longitude };
    }
    return undefined;
  }, [uniquePlaces, userLatLong]);

  const emphasisPlace = useMemo(
    () => uniquePlaces.find((place) => place.boardId === emphasisPlaceId),
    [emphasisPlaceId, uniquePlaces],
  );

  useEffect(() => {
    if (!map || !emphasisPlace) {
      return;
    }

    map.panTo({ lat: emphasisPlace.latitude, lng: emphasisPlace.longitude });
  }, [map, emphasisPlace]);

  return (
    <div className="EmbeddedMap contents">
      <Map defaultCenter={defaultCenter} defaultZoom={15} mapId={mapId}>
        {userLatLong && (
          <AdvancedMarker position={userLatLong}>
            <div className="EmbeddedMap-userMarker mb-[-12px] grid size-4 items-center justify-center rounded-full border-2 border-white bg-blue-400">
              <div
                className="size-3 rounded-full bg-blue-400 motion-safe:animate-ping"
                style={{ animationDuration: "2000ms" }}
              />
            </div>
          </AdvancedMarker>
        )}
        {uniquePlaces.map((place) => (
          <AdvancedMarker
            key={place.boardId}
            onClick={() => onPlaceClick?.(place.boardId)}
            position={{ lat: place.latitude, lng: place.longitude }}
            zIndex={place.boardId === emphasisPlaceId ? 1 : 0}
          >
            <Pin
              scale={place.boardId === emphasisPlaceId ? 1.2 : 1}
              glyphColor={
                place.boardId === emphasisPlaceId ? "white" : undefined
              }
            />
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
}
