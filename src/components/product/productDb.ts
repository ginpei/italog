import { db, QueryResultRow } from "@vercel/postgres";
import { createBoardRecord } from "../board/boardDb";
import { runTransaction } from "../db/transaction";
import { Product } from "./Product";

export async function createProductRecordSet(
  product: Omit<Product, "boardId">,
): Promise<Product> {
  return runTransaction(async (db) => {
    const boardId = await createBoardRecord(db, product);
    await db.query(
      /*sql*/ `
        INSERT INTO product (
          board_id, barcode, brands, categories, image_url
        ) VALUES ($1, $2, $3, $4, $5)
      `,
      [
        boardId,
        product.barcode,
        product.brands,
        product.categories,
        product.imageUrl,
      ],
    );

    const placeWithBoardId = { ...product, boardId };
    return placeWithBoardId;
  });
}

export async function getProductRecord(
  boardId: string,
): Promise<Product | null> {
  const result = await db.query(
    /*sql*/ `
      SELECT p.*, b.display_name FROM product p
      JOIN board b ON p.board_id = b.board_id
      WHERE p.board_id = $1
    `,
    [boardId],
  );

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  const product = rowToProduct(row);
  return product;
}

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
    brands: row.brands,
    categories: row.categories,
    displayName: row.display_name,
    imageUrl: row.image_url,
  };
}
