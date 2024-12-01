import { db, QueryResultRow } from "@vercel/postgres";
import { Place } from "../place/Place";
import { Product } from "../product/Product";
import { Checkin, CheckinRow } from "./Checkin";

export async function createCheckinRecord(
  checkin: Omit<CheckinRow, "id">,
): Promise<string> {
  const result = await db.query(
    /*sql*/ `
      INSERT INTO checkin (comment, created_at, user_date, board_id, rate, user_id, image_urls)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `,
    [
      checkin.comment,
      checkin.createdAt,
      checkin.userDate,
      checkin.boardId,
      checkin.rate,
      checkin.userId,
      checkin.imageUrls,
    ],
  );
  const id: string = result.rows[0].id;
  return id;
}

export async function getCheckinRecord(id: string): Promise<Checkin | null> {
  const result = await db.query(
    /*sql*/ `
      SELECT c.*, b.board_type, b.display_name AS board_display_name, p.display_name AS profile_display_name
      FROM checkin c
      JOIN board b ON c.board_id = b.board_id
      JOIN profile p ON c.user_id = p.id
      WHERE c.id = $1
    `,
    [id],
  );

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  const checkin = rowToCheckin(row);
  return checkin;
}

export async function updateCheckinRecord(
  checkin: Omit<CheckinRow, "createdAt" | "userDate" | "boardId" | "userId">,
): Promise<void> {
  await db.query(
    /*sql*/ `
      UPDATE checkin
      SET comment = $1,
          rate = $2,
          image_urls = $3
      WHERE id = $4
    `,
    [checkin.comment, checkin.rate, checkin.imageUrls, checkin.id],
  );
}

export async function getTimelineCheckinRecords(
  userId: string,
): Promise<Checkin[]> {
  const limit = 30;
  const offset = 0;

  const result = await db.query(
    /*sql*/ `
      SELECT c.*, b.board_type, b.display_name AS board_display_name, p.display_name AS profile_display_name, p.image_url
      FROM checkin c
      JOIN board b ON c.board_id = b.board_id
      JOIN profile p ON c.user_id = p.id
      LEFT JOIN user_user uu ON c.user_id = uu.friend_id AND uu.user_id = $1
      WHERE (uu.user_id = $2 OR c.user_id = $3)
      ORDER BY c.created_at DESC
      LIMIT $4 OFFSET $5
    `,
    [userId, userId, userId, limit, offset],
  );

  const placeCheckin = result.rows.map((v) => rowToPlaceCheckin(v));
  return placeCheckin;
}

export async function getPlaceCheckinRecords(
  userId: string,
  boardId: string,
  options: { limit?: number; offset?: number } = {},
): Promise<Checkin[]> {
  const result = await db.query(
    /*sql*/ `
      SELECT c.*, b.board_type, b.display_name AS board_display_name, p.display_name AS profile_display_name, p.image_url
      FROM checkin c
      JOIN board b ON c.board_id = b.board_id
      JOIN profile p ON c.user_id = p.id
      LEFT JOIN user_user uu ON c.user_id = uu.friend_id AND uu.user_id = $1
      WHERE c.board_id = $2 AND (uu.user_id = $3 OR c.user_id = $4)
      ORDER BY c.created_at DESC
      LIMIT $5 OFFSET $6
    `,
    [userId, boardId, userId, userId, options.limit || 10, options.offset || 0],
  );

  const checkins = result.rows.map((v) => rowToCheckin(v));
  return checkins;
}

export async function getProductCheckinRecords(
  userId: string,
  productId: string,
  options: { limit?: number; offset?: number } = {},
): Promise<Checkin<Product>[]> {
  const result = await db.query(
    /*sql*/ `
      SELECT c.*, b.board_type, b.display_name AS board_display_name, p.display_name AS profile_display_name, p.image_url
      FROM checkin c
      JOIN board b ON c.board_id = b.board_id
      JOIN profile p ON c.user_id = p.id
      LEFT JOIN user_user uu ON c.user_id = uu.friend_id AND uu.user_id = $1
      WHERE c.board_id = $2 AND (uu.user_id = $3 OR c.user_id = $4)
      ORDER BY c.created_at DESC
      LIMIT $5 OFFSET $6
    `,
    [
      userId,
      productId,
      userId,
      userId,
      options.limit || 10,
      options.offset || 0,
    ],
  );

  const checkins = result.rows.map((v) => rowToProductCheckin(v));
  return checkins;
}

export async function getUserCheckinRecords(
  userId: string,
): Promise<Checkin[]> {
  const limit = 10;
  const offset = 0;

  const result = await db.query(
    /*sql*/ `
      SELECT c.*, b.board_type, b.display_name AS board_display_name, p.display_name AS profile_display_name, p.image_url
      FROM checkin c
      JOIN board b ON c.board_id = b.board_id
      JOIN profile p ON c.user_id = p.id
      WHERE c.user_id = $1
      ORDER BY c.created_at DESC
      LIMIT $2 OFFSET $3
    `,
    [userId, limit, offset],
  );

  const checkins = result.rows.map((v) => rowToCheckin(v));
  return checkins;
}

export async function deleteCheckinRecord(id: string): Promise<void> {
  await db.query(
    /*sql*/ `
      DELETE FROM checkin
      WHERE id = $1
    `,
    [id],
  );
}

function rowToCheckin(row: QueryResultRow): Checkin {
  return {
    id: row.id,
    comment: row.comment,
    createdAt: Number(row.created_at),
    userDate: row.user_date,
    boardId: row.board_id,
    rate: row.rate,
    userId: row.user_id,
    imageUrls: row.image_urls ?? [],
    board: {
      boardId: row.board_id,
      boardType: row.board_type,
      displayName: row.board_display_name,
    },
    profile: {
      displayName: row.profile_display_name,
      id: row.user_id,
      imageUrl: row.image_url,
    },
  };
}

function rowToPlaceCheckin(row: QueryResultRow): Checkin<Place> {
  const checkin = rowToCheckin(row);
  return {
    ...checkin,
    board: {
      address: row.address,
      boardId: row.board_id,
      boardType: row.board_type,
      displayName: row.board_display_name,
      latitude: row.latitude,
      longitude: row.longitude,
      mapId: row.map_id,
      mapUrl: row.map_url,
      typeDisplayName: row.type_display_name,
      webUrl: row.web_url,
    },
  };
}

function rowToProductCheckin(row: QueryResultRow): Checkin<Product> {
  const checkin = rowToCheckin(row);
  return {
    ...checkin,
    board: {
      barcode: row.barcode,
      boardId: row.board_id,
      boardType: row.board_type,
      brands: row.brands,
      categories: row.categories,
      displayName: row.board_display_name,
      imageUrl: row.image_url,
    },
  };
}
