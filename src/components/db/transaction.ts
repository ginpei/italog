import { createPool, VercelPoolClient } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function runTransaction<T>(
  callback: (client: VercelPoolClient) => Promise<T>,
): Promise<T> {
  let client: VercelPoolClient | null = null;
  try {
    client = await pool.connect();
    await client.query("BEGIN");

    const result = await callback(client);

    await client.query("COMMIT");

    return result;
  } catch (error) {
    await client?.query("ROLLBACK");
    throw error;
  }
}
