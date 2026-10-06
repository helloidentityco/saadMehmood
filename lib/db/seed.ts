import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { SEED_COLLECTIONS, SEED_PRODUCTS } from './seed-data';

export async function runSeed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.log('No DATABASE_URL set. Seed data is already bundled in memory.');
    return;
  }

  try {
    console.log('Connecting to Neon PostgreSQL database...');
    const sql = neon(databaseUrl);
    const db = drizzle(sql, { schema });

    console.log('Seeding collections...');
    for (const col of SEED_COLLECTIONS) {
      await db
        .insert(schema.collections)
        .values(col)
        .onConflictDoNothing();
    }

    console.log('Seeding products...');
    for (const prod of SEED_PRODUCTS) {
      await db
        .insert(schema.products)
        .values(prod)
        .onConflictDoNothing();
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding Neon DB:', error);
  }
}
