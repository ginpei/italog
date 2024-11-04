import { QueryResultRow, sql } from "@vercel/postgres";
import { Place } from "./Place";

export async function savePlaceRecord(place: Place): Promise<void> {
  const getResult =
    await sql`SELECT COUNT(*) FROM place WHERE board_id = ${place.boardId}`;
  const exists = getResult.rows[0].count > 0;

  if (exists) {
    console.log(`savePlaces: exists`, place.boardId, place.displayName);
    return;
  }

  console.log(`savePlaces: creating place`, place.boardId, place.displayName);
  await sql`
    INSERT INTO place (
      board_id, map_id, address, display_name, latitude, longitude, map_url, type_display_name, web_url
    ) VALUES (
      ${place.boardId},
      ${place.mapId},
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

export async function getPlaceRecord(
  boardId: string,
): Promise<Place | undefined> {
  const countResult = await sql`
    SELECT COUNT(*) FROM place WHERE board_id = ${boardId}
  `;
  console.log(
    "countResult",
    countResult,
    `SELECT COUNT(*) FROM place WHERE board_id = ${boardId}`,
  );

  const result = await sql`
    SELECT * FROM place WHERE board_id = ${boardId}
  `;
  const row = result.rows[0];
  if (!row) {
    console.log(
      "No place found",
      boardId,
      `SELECT * FROM place WHERE board_id = ${boardId}`,
      result,
    );
    return undefined;
  }

  const place = rowToPlace(row);
  return place;
}

export async function getPlaceRecords(boardIds: string[]): Promise<Place[]> {
  const result = await sql`
    SELECT * FROM place WHERE board_id = ANY(ARRAY[${boardIds.map((v) => `"${v}"`).join(",")}])
  `;
  const places = result.rows.map((v) => rowToPlace(v));
  return places;
}

function rowToPlace(row: QueryResultRow): Place {
  return {
    boardId: row.board_id,
    mapId: row.map_id,
    address: row.address,
    displayName: row.display_name,
    latitude: row.latitude,
    longitude: row.longitude,
    mapUrl: row.map_url,
    typeDisplayName: row.type_display_name,
    webUrl: row.web_url,
  };
}
