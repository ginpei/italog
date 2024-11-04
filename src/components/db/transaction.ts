import { db, VercelPoolClient } from "@vercel/postgres";

export async function runTransaction<T>(
  callback: (client: VercelPoolClient) => Promise<T>,
): Promise<T> {
  let client: VercelPoolClient | null = null;
  try {
    client = await db.connect();
    await client.query("BEGIN");

    const result = await callback(client);

    await client.query("COMMIT");

    return result;
  } catch (error) {
    await client?.query("ROLLBACK");
    throw error;
  } finally {
    client?.release();
  }
}
