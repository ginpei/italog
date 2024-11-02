import { APIProvider, Map } from "@vis.gl/react-google-maps";

export interface EmbeddedMapProps {
  apiKey: string;
  lat: number;
  long: number;
}

/**
 * @see https://developers.google.com/maps/documentation/embed/embedding-map
 */
export function EmbeddedMap({
  apiKey,
  lat,
  long,
}: EmbeddedMapProps): JSX.Element {
  return (
    <APIProvider apiKey={apiKey}>
      <Map defaultCenter={{ lat, lng: long }} defaultZoom={15}></Map>
    </APIProvider>
  );
}
