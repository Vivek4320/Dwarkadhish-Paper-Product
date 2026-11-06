import { Pool, type QueryResultRow } from "pg";
import { SCHEMA_SQL } from "./schema";

/** Thrown when DATABASE_URL is missing, so routes can answer with a clear 503. */
export class DbNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not set.");
    this.name = "DbNotConfiguredError";
  }
}

const g = globalThis as unknown as {
  __dwpPool?: Pool;
  __dwpSchema?: Promise<void>;
};

function getPool(): Pool {
  const url = process.env.DATABASE_URL;
  if (!url) throw new DbNotConfiguredError();
  if (!g.__dwpPool) {
    g.__dwpPool = new Pool({
      connectionString: url,
      max: Number(process.env.DB_POOL_MAX) || 3,
      idleTimeoutMillis: 10_000,
      // Neon wakes from "scale to zero" in about a second.
      connectionTimeoutMillis: 15_000,
    });
  }
  return g.__dwpPool;
}

/** Creates the tables once per server instance (idempotent, race-safe). */
function ensureSchema(pool: Pool): Promise<void> {
  g.__dwpSchema ??= (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("SELECT pg_advisory_xact_lock(727401)");
      await client.query(SCHEMA_SQL);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK").catch(() => undefined);
      throw error;
    } finally {
      client.release();
    }
  })().catch((error) => {
    g.__dwpSchema = undefined; // retry on the next request
    throw error;
  });
  return g.__dwpSchema;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
) {
  const pool = getPool();
  await ensureSchema(pool);

  // Keep this idempotent migration outside the cached schema bootstrap.
  // In Next.js dev, hot reload can retain the old global schema promise after
  // SCHEMA_SQL changes, leaving an existing customer_orders table unaltered.
  await pool.query(
    "ALTER TABLE customer_orders ADD COLUMN IF NOT EXISTS tracking_number text",
  );

  return pool.query<T>(text, params);
}
