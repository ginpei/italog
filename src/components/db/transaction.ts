import { db, VercelPoolClient } from "@vercel/postgres";

export async function runTransaction<T>(
  callback: (db: VercelPoolClient) => Promise<T>,
): Promise<T> {
  let dbClient: VercelPoolClient | null = null;
  try {
    dbClient = await db.connect();
    await dbClient.query("BEGIN");

    const result = await callback(dbClient);

    await dbClient.query("COMMIT");

    return result;
  } catch (error) {
    await dbClient?.query("ROLLBACK");
    throw error;
  } finally {
    dbClient?.release();
  }
}

export function isUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    str,
  );
}
