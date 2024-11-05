import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { LatLong } from "@/components/place/LatLong";

export interface EmbeddedMapProps {
  apiKey: string;
  placePosition: LatLong | null;
  userPosition: LatLong;
}

/**
 * @see https://developers.google.com/maps/documentation/embed/embedding-map
 */
export function EmbeddedMap({
  apiKey,
  userPosition,
  placePosition,
}: EmbeddedMapProps): JSX.Element {
  const mapId = "xxx"; // TODO https://developers.google.com/maps/documentation/get-map-id

  const userLatLong = { lat: userPosition.lat, lng: userPosition.long };
  const placeLatLong = placePosition
    ? { lat: placePosition.lat, lng: placePosition.long }
    : null;

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
          {placePosition && <AdvancedMarker position={placeLatLong} />}
        </Map>
      </div>
    </APIProvider>
  );
}
