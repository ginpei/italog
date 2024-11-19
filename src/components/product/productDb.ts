import { db, QueryResultRow } from "@vercel/postgres";
import { Product } from "./Product";

export async function getProductRecordsByBarcode(
  barcode: string,
): Promise<Product[]> {
  const result = await db.query(
    /*sql*/ `
      SELECT p.*, b.display_name FROM product p
      JOIN board b ON p.board_id = b.board_id
      WHERE barcode = $1
    `,
    [barcode],
  );
  const products = result.rows.map((v) => rowToProduct(v));

  return products;
}

function rowToProduct(row: QueryResultRow): Product {
  return {
    barcode: row.barcode,
    boardId: row.board_id,
    boardType: "product",
    displayName: row.display_name,
  };
}
