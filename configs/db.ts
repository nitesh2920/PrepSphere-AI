import { drizzle } from 'drizzle-orm/neon-http';

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
if (!databaseUrl) {
  throw new Error('Environment variable DATABASE_URL must be set');
}

export const db = drizzle(databaseUrl);
