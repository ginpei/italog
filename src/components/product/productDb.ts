import { QueryResultRow, sql } from "@vercel/postgres";
import { Product } from "./Product";

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

function rowToProduct(row: QueryResultRow): Product {
  return {
    barcode: row.barcode,
    boardId: row.board_id,
    boardType: "product",
    displayName: row.display_name,
  };
}
