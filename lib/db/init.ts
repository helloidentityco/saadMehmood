import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import { SEED_COLLECTIONS, SEED_PRODUCTS } from './seed-data';

let initPromise: Promise<void> | null = null;

export async function ensureDatabaseInitialized(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || !databaseUrl.startsWith('postgres')) {
    return;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      const sql = neon(databaseUrl);

      // Create collections table
      await sql`
        CREATE TABLE IF NOT EXISTS collections (
          id SERIAL PRIMARY KEY,
          slug VARCHAR(120) NOT NULL UNIQUE,
          name VARCHAR(150) NOT NULL,
          fabric_type VARCHAR(100) NOT NULL,
          tagline TEXT NOT NULL,
          description TEXT NOT NULL,
          royal_story TEXT NOT NULL,
          image TEXT NOT NULL,
          featured BOOLEAN DEFAULT true NOT NULL
        );
      `;

      // Create products table
      await sql`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          slug VARCHAR(150) NOT NULL UNIQUE,
          name VARCHAR(200) NOT NULL,
          collection_slug VARCHAR(120) NOT NULL,
          fabric_type VARCHAR(100) NOT NULL,
          price INTEGER NOT NULL,
          original_price INTEGER,
          availability VARCHAR(50) DEFAULT 'IN STOCK' NOT NULL,
          image TEXT NOT NULL,
          secondary_image TEXT NOT NULL,
          description TEXT NOT NULL,
          royal_tale TEXT NOT NULL,
          texture VARCHAR(150) NOT NULL,
          recommended_use VARCHAR(200) NOT NULL,
          care_instructions TEXT NOT NULL,
          meters VARCHAR(100) DEFAULT '4.5 Meters (56 Inch Width)' NOT NULL,
          is_featured BOOLEAN DEFAULT false NOT NULL,
          color_name VARCHAR(100),
          weave_type VARCHAR(100)
        );
      `;

      // Ensure updated products columns exist on Neon PostgreSQL
      try {
        await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS collection TEXT;`;
        await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS images TEXT;`;
        await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT true;`;
        await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS description_urdu TEXT;`;
        await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS description_arabic TEXT;`;
        await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();`;
      } catch {
        // columns may already exist
      }

      // Create users table
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          role VARCHAR(20) DEFAULT 'user' NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `;

      // Create orders table
      await sql`
        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(50) PRIMARY KEY,
          user_id INTEGER,
          full_name VARCHAR(150) NOT NULL,
          phone_number VARCHAR(50) NOT NULL,
          email VARCHAR(150),
          city VARCHAR(100) NOT NULL,
          complete_address TEXT NOT NULL,
          notes TEXT,
          total_amount INTEGER NOT NULL,
          payment_method VARCHAR(50) DEFAULT 'CASH ON DELIVERY' NOT NULL,
          status VARCHAR(50) DEFAULT 'RECEIVED' NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `;

      // Ensure user_id column exists on orders table if previously created
      try {
        await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id INTEGER;`;
      } catch {
        // column may already exist
      }

      // Create order_items table
      await sql`
        CREATE TABLE IF NOT EXISTS order_items (
          id SERIAL PRIMARY KEY,
          order_id VARCHAR(50) NOT NULL,
          product_id INTEGER NOT NULL,
          product_name VARCHAR(200) NOT NULL,
          fabric_type VARCHAR(100) NOT NULL,
          price INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          image TEXT
        );
      `;

      // Check if collections are populated
      const colRows = await sql`SELECT count(*)::int as count FROM collections`;
      if (colRows[0]?.count === 0) {
        for (const col of SEED_COLLECTIONS) {
          await sql`
            INSERT INTO collections (slug, name, fabric_type, tagline, description, royal_story, image, featured)
            VALUES (${col.slug}, ${col.name}, ${col.fabricType}, ${col.tagline}, ${col.description}, ${col.royalStory}, ${col.image}, ${col.featured})
            ON CONFLICT (slug) DO NOTHING;
          `;
        }
      }

      // Check if products are populated
      const prodRows = await sql`SELECT count(*)::int as count FROM products`;
      if (prodRows[0]?.count === 0) {
        for (const prod of SEED_PRODUCTS) {
          await sql`
            INSERT INTO products (
              slug, name, collection_slug, fabric_type, price, original_price,
              availability, image, secondary_image, description, description_urdu, description_arabic, royal_tale,
              texture, recommended_use, care_instructions, meters, is_featured,
              color_name, weave_type
            )
            VALUES (
              ${prod.slug}, ${prod.name}, ${prod.collectionSlug}, ${prod.fabricType}, ${prod.price}, ${prod.originalPrice},
              ${prod.availability}, ${prod.image}, ${prod.secondaryImage}, ${prod.description}, ${prod.descriptionUrdu || null}, ${prod.descriptionArabic || null}, ${prod.royalTale},
              ${prod.texture}, ${prod.recommendedUse}, ${prod.careInstructions}, ${prod.meters}, ${prod.isFeatured},
              ${prod.colorName}, ${prod.weaveType}
            )
            ON CONFLICT (slug) DO NOTHING;
          `;
        }
      } else {
        // Ensure seeded products have description_urdu and description_arabic populated if null
        for (const prod of SEED_PRODUCTS) {
          if (prod.descriptionUrdu || prod.descriptionArabic) {
            await sql`
              UPDATE products
              SET
                description_urdu = COALESCE(NULLIF(TRIM(description_urdu), ''), ${prod.descriptionUrdu || null}),
                description_arabic = COALESCE(NULLIF(TRIM(description_arabic), ''), ${prod.descriptionArabic || null})
              WHERE slug = ${prod.slug};
            `;
          }
        }
      }

      // Seed or ensure admin user with credentials: admin@saadmehmood.com.pk / AdminPass123!
      const adminHash = await bcrypt.hash('AdminPass123!', 10);
      await sql`
        INSERT INTO users (full_name, email, password_hash, role)
        VALUES ('Saad Mehmood Admin', 'admin@saadmehmood.com.pk', ${adminHash}, 'admin')
        ON CONFLICT (email)
        DO UPDATE SET
          password_hash = EXCLUDED.password_hash,
          role = 'admin',
          full_name = EXCLUDED.full_name;
      `;

      // Seed initial demo customer user if not present
      const customerRows = await sql`SELECT id FROM users WHERE email = ${'customer@saadmehmood.com.pk'} LIMIT 1`;
      if (customerRows.length === 0) {
        const customerHash = await bcrypt.hash('Customer@123', 10);
        await sql`
          INSERT INTO users (full_name, email, password_hash, role)
          VALUES ('Tariq Mehmood', 'customer@saadmehmood.com.pk', ${customerHash}, 'user')
          ON CONFLICT (email) DO NOTHING;
        `;
      }
    } catch (err) {
      console.warn('Database initialization warning:', err);
    }
  })();

  return initPromise;
}
