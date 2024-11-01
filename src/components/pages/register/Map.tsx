import { useMemo } from "react";

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
  const endpoint = "https://www.google.com/maps/embed/v1/view";
  const params = useMemo(() => {
    return new URLSearchParams([
      ["center", `${lat},${long}`],
      ["key", apiKey],
      ["zoom", "15"],
    ]);
  }, [apiKey, lat, long]);
  const src = `${endpoint}?${params.toString()}`;

  return (
    <iframe
      allowFullScreen
      className="EmbeddedMap size-full"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={src}
    ></iframe>
  );
}
