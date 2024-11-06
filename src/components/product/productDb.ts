import { QueryResultRow, sql } from "@vercel/postgres";
import { Product } from "./Product";

export async function getProductRecord(
  boardId: string,
): Promise<Product | undefined> {
  const result = await sql`
    SELECT p.*, b.display_name FROM product p
    JOIN board b ON p.board_id = b.board_id
    WHERE p.board_id = ${boardId}
  `;
  const row = result.rows[0];
  if (!row) {
    return undefined;
  }

  const product = rowToProduct(row);
  return product;
}

export async function getProductRecordByBarcode(
  barcode: string,
): Promise<Product | undefined> {
  const result = await sql`
    SELECT p.*, b.display_name FROM product p
    JOIN board b ON p.board_id = b.board_id
    WHERE p.barcode = ${barcode}
  `;
  const row = result.rows[0];
  if (!row) {
    return undefined;
  }

  const product = rowToProduct(row);
  return product;
}

export async function getProductRecordsByText(
  query: string,
): Promise<Product[]> {
  const result = await sql`
    SELECT p.*, b.display_name FROM product p
    JOIN board b ON p.board_id = b.board_id
    WHERE b.display_name ILIKE ${"%" + query + "%"}
    LIMIT 10
  `;
  return result.rows.map(rowToProduct);
}

function rowToProduct(row: QueryResultRow): Product {
  return {
    barcode: row.barcode,
    boardId: row.board_id,
    boardType: "product",
    displayName: row.display_name,
  };
}
