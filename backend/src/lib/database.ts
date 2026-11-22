import { Pool } from "pg";

let pool: Pool | undefined;

export function getDatabasePool() {
  if (pool) {
    return pool;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to connect to PostgreSQL");
  }

  pool = new Pool({ connectionString, connectionTimeoutMillis: 3000 });
  pool.on("error", (error) => {
    console.error("An idle PostgreSQL connection failed", error.message);
  });

  return pool;
}
