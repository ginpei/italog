import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { Place } from "../place/Place";
import { LatLong } from "@/components/place/LatLong";

export interface EmbeddedMapProps {
  apiKey: string;
  center: LatLong;
  onPlaceClick: (id: string) => void;
  places: [Pick<Place, "boardId" | "latitude" | "longitude">, key: string][];
  primaryPlaceKey: string;
}

/**
 * @see https://developers.google.com/maps/documentation/embed/embedding-map
 */
export function EmbeddedMap({
  apiKey,
  center,
  onPlaceClick,
  places,
  primaryPlaceKey,
}: EmbeddedMapProps): JSX.Element {
  const mapId = "xxx"; // TODO https://developers.google.com/maps/documentation/get-map-id

  const userLatLong = { lat: center.lat, lng: center.long };
  const emphasisPlaceId = primaryPlaceKey || places[0]?.[0].boardId;

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
          {places.map(([place, key]) => (
            <AdvancedMarker
              key={key}
              onClick={() => onPlaceClick(place.boardId)}
              position={{ lat: place.latitude, lng: place.longitude }}
              zIndex={key === emphasisPlaceId ? 1 : 0}
            >
              <Pin
                scale={key === emphasisPlaceId ? 1.2 : 1}
                glyphColor={key === emphasisPlaceId ? "white" : undefined}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
