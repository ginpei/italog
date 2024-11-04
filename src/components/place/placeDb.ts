import { QueryResultRow, sql } from "@vercel/postgres";
import { createBoardRecord } from "../board/boardDb";
import { runTransaction } from "../db/transaction";
import { Place } from "./Place";

export async function createPlaceRecordSet(
  place: Omit<Place, "boardId">,
): Promise<Place> {
  return runTransaction(async (client) => {
    const boardId = await createBoardRecord(client, place);
    await client.query(
      /*sql*/ `
        INSERT INTO place (
          board_id, map_id, address, latitude, longitude, map_url, type_display_name, web_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        boardId,
        place.mapId,
        place.address,
        place.latitude,
        place.longitude,
        place.mapUrl,
        place.typeDisplayName || null,
        place.webUrl || null,
      ],
    );

    const placeWithBoardId = { ...place, boardId };
    return placeWithBoardId;
  });
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

export async function getPlaceRecords(mapIds: string[]): Promise<Place[]> {
  return runTransaction(async (client) => {
    const result = await client.query(
      /*sql*/ `
        SELECT * FROM place WHERE map_id = ANY(ARRAY[${mapIds.map((v, i) => `$${i + 1}`).join(",")}])
      `,
      mapIds,
    );
    const places = result.rows.map((v) => rowToPlace(v));
    return places;
  });
}

function rowToPlace(row: QueryResultRow): Place {
  return {
    address: row.address,
    boardId: row.board_id,
    boardType: "place",
    displayName: row.display_name,
    latitude: row.latitude,
    longitude: row.longitude,
    mapId: row.map_id,
    mapUrl: row.map_url,
    typeDisplayName: row.type_display_name,
    webUrl: row.web_url,
  };
}
