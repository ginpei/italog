import { db, QueryResultRow } from "@vercel/postgres";
import { createBoardRecord } from "../board/boardDb";
import { runTransaction } from "../db/transaction";
import { Profile } from "../user/Profile";
import { createUserActionRecord } from "../userAction/userActionDb";
import { Product } from "./Product";

export async function createProductRecordSet(
  profile: Profile,
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

    await createUserActionRecord(profile, {
      detail: placeWithBoardId,
      title: "product/create",
    });

    return placeWithBoardId;
  });
}

export async function updateProductRecordSet(
  profile: Profile,
  product: Product,
): Promise<void> {
  return runTransaction(async (db) => {
    await Promise.all([
      db.query(
        /*sql*/ `
          UPDATE board
          SET display_name = COALESCE($2, display_name)
          WHERE board_id = $1
        `,
        [product.boardId, product.displayName],
      ),
      db.query(
        /*sql*/ `
          UPDATE product
          SET barcode = COALESCE($2, barcode),
            brands = COALESCE($3, brands),
            categories = COALESCE($4, categories),
            image_url = COALESCE($5, image_url)
          WHERE board_id = $1
        `,
        [
          product.boardId,
          product.barcode,
          product.brands,
          product.categories,
          product.imageUrl,
        ],
      ),
    ]);

    await createUserActionRecord(profile, {
      detail: { ...product },
      title: "product/update",
    });
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

export async function getProductRecords(
  productIds: string[],
): Promise<Product[]> {
  return runTransaction(async (db) => {
    const result = await db.query(
      /*sql*/ `
        SELECT p.*, b.display_name FROM product p
        JOIN board b ON p.board_id = b.board_id
        WHERE p.board_id = ANY(ARRAY[${productIds.map((v, i) => `$${i + 1}::uuid`).join(",")}])
      `,
      productIds,
    );
    const products = result.rows.map((v) => rowToProduct(v));
    return products;
  });
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
