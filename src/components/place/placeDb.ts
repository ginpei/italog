import { db, QueryResultRow } from "@vercel/postgres";
import { createBoardRecord } from "../board/boardDb";
import { runTransaction } from "../db/transaction";
import { Place } from "./Place";

export async function createPlaceRecordSet(
  place: Omit<Place, "boardId">,
): Promise<Place> {
  return runTransaction(async (db) => {
    const boardId = await createBoardRecord(db, place);
    await db.query(
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
  const result = await db.query(
    /*sql*/ `
      SELECT p.*, b.display_name FROM place p
      JOIN board b ON p.board_id = b.board_id
      WHERE p.board_id = $1
    `,
    [boardId],
  );
  const row = result.rows[0];
  if (!row) {
    return undefined;
  }

  const place = rowToPlace(row);
  return place;
}

/**
 * @param mapIds IDs of Google Map Place IDs
 */
export async function getPlaceRecordsByMapIds(
  mapIds: string[],
): Promise<Place[]> {
  return runTransaction(async (db) => {
    const result = await db.query(
      /*sql*/ `
        SELECT p.*, b.display_name FROM place p
        JOIN board b ON p.board_id = b.board_id
        WHERE p.map_id = ANY(ARRAY[${mapIds.map((v, i) => `$${i + 1}`).join(",")}])
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
