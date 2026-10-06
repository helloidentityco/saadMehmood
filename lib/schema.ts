import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

/**
 * Drizzle Schema Definition for SAAD MEHMOOD FABRICS
 * Neon DB PostgreSQL Schema: collections, products (with bilingual English & Urdu descriptions), users, orders, orderItems
 */

export const collections = pgTable('collections', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  name: varchar('name', { length: 150 }).notNull(),
  fabricType: varchar('fabric_type', { length: 100 }).notNull(),
  tagline: text('tagline').notNull(),
  description: text('description').notNull(),
  royalStory: text('royal_story').notNull(),
  image: text('image').notNull(),
  featured: boolean('featured').default(true).notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 150 }).notNull().unique(),
  name: varchar('name', { length: 200 }).notNull(),
  collection: text('collection'), // e.g. 'Haibat Majmua', 'Mehrab Intikhab', 'Raees Riwayat'
  collectionSlug: varchar('collection_slug', { length: 120 }).default('haibat-majmua').notNull(),
  fabricType: varchar('fabric_type', { length: 100 }).notNull(), // 'Lawn', 'Silk', 'Cotton', 'Karandi', etc.
  price: integer('price').notNull(),
  originalPrice: integer('original_price'),
  availability: varchar('availability', { length: 50 }).default('IN STOCK').notNull(),
  image: text('image').notNull(),
  secondaryImage: text('secondary_image').default('').notNull(),
  images: text('images'), // JSON-serialized array of Cloudinary CDN URLs: string[]
  inStock: boolean('in_stock').default(true).notNull(),
  description: text('description').notNull(), // Required - Primary English description
  descriptionUrdu: text('description_urdu'), // Optional / Nullable - RTL Urdu translation
  descriptionArabic: text('description_arabic'), // Optional / Nullable - RTL Arabic translation
  royalTale: text('royal_tale').default('').notNull(),
  texture: varchar('texture', { length: 150 }).default('Fine Weave').notNull(),
  recommendedUse: varchar('recommended_use', { length: 200 }).default('Royal Formal & Daily Wear').notNull(),
  careInstructions: text('care_instructions').default('Dry clean recommended.').notNull(),
  meters: varchar('meters', { length: 100 }).default('4.5 Meters (56" Width)').notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  colorName: varchar('color_name', { length: 100 }),
  weaveType: varchar('weave_type', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('user').notNull(), // 'user' | 'admin'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: varchar('id', { length: 50 }).primaryKey(),
  userId: integer('user_id'),
  fullName: varchar('full_name', { length: 150 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 50 }).notNull(),
  email: varchar('email', { length: 150 }),
  city: varchar('city', { length: 100 }).notNull(),
  completeAddress: text('complete_address').notNull(),
  notes: text('notes'),
  totalAmount: integer('total_amount').notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).default('CASH ON DELIVERY').notNull(),
  status: varchar('status', { length: 50 }).default('RECEIVED').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: varchar('order_id', { length: 50 }).notNull(),
  productId: integer('product_id').notNull(),
  productName: varchar('product_name', { length: 200 }).notNull(),
  fabricType: varchar('fabric_type', { length: 100 }).notNull(),
  price: integer('price').notNull(),
  quantity: integer('quantity').notNull(),
  image: text('image'),
});

export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
