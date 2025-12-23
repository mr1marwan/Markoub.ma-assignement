import 'dotenv/config';
import * as schema from './schema';

// Check if we're using Neon (serverless) or local PostgreSQL
const isNeon = process.env.DATABASE_URL?.includes('neon.tech');

let db: any;

if (isNeon) {
  // Use Neon HTTP driver for serverless deployment
  const { drizzle } = await import('drizzle-orm/neon-http');
  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(process.env.DATABASE_URL!);
  db = drizzle(sql, { schema });
} else {
  // Use postgres.js for local development (Docker)
  const { drizzle } = await import('drizzle-orm/postgres-js');
  const postgres = (await import('postgres')).default;
  const client = postgres(process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/job_platform');
  db = drizzle(client, { schema });
}

export { db };
