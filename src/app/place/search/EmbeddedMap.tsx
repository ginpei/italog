import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { LatLong } from "@/components/place/LatLong";
import { Place } from "@/components/place/Place";

export interface EmbeddedMapProps {
  apiKey: string;
  onPlaceClick: (id: string) => void;
  places: Place[];
  primaryPlaceId: string;
  userPosition: LatLong;
}

/**
 * @see https://developers.google.com/maps/documentation/embed/embedding-map
 */
export function EmbeddedMap({
  apiKey,
  onPlaceClick,
  places,
  primaryPlaceId,
  userPosition,
}: EmbeddedMapProps): JSX.Element {
  const mapId = "xxx"; // TODO https://developers.google.com/maps/documentation/get-map-id

  const userLatLong = { lat: userPosition.lat, lng: userPosition.long };
  const emphasisPlaceId = primaryPlaceId || places[0]?.boardId;

  return (
    <APIProvider apiKey={apiKey}>
      <div className="EmbeddedMap contents">
        <Map defaultCenter={userLatLong} defaultZoom={15} mapId={mapId}>
          <AdvancedMarker position={userLatLong}>
            <div className="EmbeddedMap-userMarker mb-[-12px] grid size-4 items-center justify-center rounded-full border-2 border-white bg-blue-400">
              <div
                className="size-3 rounded-full bg-blue-400 motion-safe:animate-ping"
                style={{ animationDuration: "2000ms" }}
              />
            </div>
          </AdvancedMarker>
          {places.map((place) => (
            <AdvancedMarker
              key={place.boardId}
              onClick={() => onPlaceClick(place.boardId)}
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
    </APIProvider>
  );
}
