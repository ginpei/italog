import { sql } from "@vercel/postgres";
import { Place } from "./Place";

export async function savePlaces(places: Place[]): Promise<void> {
  await Promise.all(
    places.map(async (place) => {
      const getResult =
        await sql`SELECT COUNT(*) FROM place WHERE id = ${place.id}`;
      const exists = getResult.rows[0].count > 0;

      if (!exists) {
        console.log(`savePlaces: creating place`, place.id, place.displayName);
        return sql`
          INSERT INTO place (
            id, address, display_name, latitude, longitude, map_url, type_display_name, web_url
          ) VALUES (
            ${place.id},
            ${place.address},
            ${place.displayName},
            ${place.latitude},
            ${place.longitude},
            ${place.mapUrl},
            ${place.typeDisplayName || null},
            ${place.webUrl || null}
          )
        `;
      }

      console.log(`savePlaces: updating place`, place.id, place.displayName);
      return sql`
        UPDATE place
        SET
          address = ${place.address},
          display_name = ${place.displayName},
          latitude = ${place.latitude},
          longitude = ${place.longitude},
          map_url = ${place.mapUrl},
          type_display_name = ${place.typeDisplayName || null},
          web_url = ${place.webUrl || null}
        WHERE id = ${place.id}
      `;
    }),
  );
}

export async function getPlace(id: string): Promise<Place | undefined> {
  const result = await sql`
    SELECT * FROM place WHERE id = ${id}
  `;
  const row = result.rows[0];
  if (!row) {
    return undefined;
  }

  const place: Place = {
    address: row.address,
    displayName: row.display_name,
    id: row.id,
    latitude: row.latitude,
    longitude: row.longitude,
    mapUrl: row.map_url,
    typeDisplayName: row.type_display_name,
    webUrl: row.web_url,
  };
  return place;
}
