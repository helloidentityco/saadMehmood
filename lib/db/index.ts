import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as schema from './schema';
import { SEED_COLLECTIONS, SEED_PRODUCTS } from './seed-data';
import { ensureDatabaseInitialized } from './init';
import type { Collection, Product, Order, OrderItem, User } from './schema';

// Persistent in-memory fallback for local sandboxes & when DATABASE_URL is not set
let memoryCollections: Collection[] = [...SEED_COLLECTIONS] as Collection[];
let memoryProducts: Product[] = [...SEED_PRODUCTS] as Product[];
let memoryOrders: Order[] = [];
let memoryOrderItems: OrderItem[] = [];
let memoryUsers: User[] = [
  {
    id: 1,
    fullName: 'Saad Mehmood Admin',
    email: 'admin@saadmehmood.com.pk',
    passwordHash: '$2b$10$EPawnMwhdtHDSWbr8q91YOLcJxCNVUDC2M6Rb5AXoRktsnX3Rg6lK', // AdminPass123!
    role: 'admin',
    createdAt: new Date(),
  },
  {
    id: 2,
    fullName: 'Tariq Mehmood',
    email: 'customer@saadmehmood.com.pk',
    passwordHash: '$2a$10$8v8mFqQ0F1b0mU31pZ97t.wG7dK8qAb7w.1983m765k8q3b21901a',
    role: 'user',
    createdAt: new Date(),
  },
];

// Neon DB client initialization
const databaseUrl = process.env.DATABASE_URL;
export const isNeonConfigured = Boolean(databaseUrl && databaseUrl.startsWith('postgres'));

let dbClient: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (isNeonConfigured && databaseUrl) {
  try {
    const sql = neon(databaseUrl);
    dbClient = drizzle(sql, { schema });
  } catch (error) {
    console.warn('Could not initialize Neon client directly, falling back to local database store:', error);
  }
}

export const db = dbClient;

/**
 * Fetch all collections
 */
export async function getCollections(): Promise<Collection[]> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const result = await dbClient.select().from(schema.collections);
      if (result && result.length > 0) return result;
    } catch (e) {
      console.warn('Neon query fallback to local catalog:', e);
    }
  }
  return memoryCollections;
}

/**
 * Fetch a single collection by slug
 */
export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const rows = await dbClient.query.collections.findMany({
        where: (c, { eq }) => eq(c.slug, slug),
        limit: 1,
      });
      if (rows && rows[0]) return rows[0];
    } catch (e) {
      console.warn('Neon query fallback to local catalog for slug:', slug, e);
    }
  }
  return memoryCollections.find((c) => c.slug === slug) || null;
}

/**
 * Query products with flexible filtering and sorting
 */
export async function getProducts(options?: {
  collectionSlug?: string;
  isFeatured?: boolean;
  search?: string;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
  fabricType?: string;
  limit?: number;
}): Promise<Product[]> {
  const { collectionSlug, isFeatured, search, sortBy = 'featured', fabricType, limit } = options || {};

  // If Neon DB is live, try query
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const results = await dbClient.select().from(schema.products);
      if (results && results.length > 0) {
        let filtered = results;
        if (collectionSlug) {
          filtered = filtered.filter((p) => p.collectionSlug === collectionSlug);
        }
        if (isFeatured !== undefined) {
          filtered = filtered.filter((p) => p.isFeatured === isFeatured);
        }
        if (fabricType) {
          filtered = filtered.filter((p) => p.fabricType.toLowerCase().includes(fabricType.toLowerCase()));
        }
        if (search) {
          const q = search.toLowerCase().trim();
          filtered = filtered.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.collectionSlug.toLowerCase().includes(q) ||
              p.fabricType.toLowerCase().includes(q) ||
              p.texture.toLowerCase().includes(q)
          );
        }

        // Sorting
        filtered = sortProducts(filtered, sortBy);
        if (limit) filtered = filtered.slice(0, limit);
        return filtered;
      }
    } catch (e) {
      console.warn('Neon query failed, using memory store:', e);
    }
  }

  // Memory fallback query
  let filtered = [...memoryProducts];

  if (collectionSlug) {
    filtered = filtered.filter((p) => p.collectionSlug === collectionSlug);
  }
  if (isFeatured !== undefined) {
    filtered = filtered.filter((p) => p.isFeatured === isFeatured);
  }
  if (fabricType) {
    filtered = filtered.filter((p) => p.fabricType.toLowerCase().includes(fabricType.toLowerCase()));
  }
  if (search) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.collectionSlug.toLowerCase().includes(q) ||
        p.fabricType.toLowerCase().includes(q) ||
        p.texture.toLowerCase().includes(q)
    );
  }

  filtered = sortProducts(filtered, sortBy);
  if (limit) filtered = filtered.slice(0, limit);
  return filtered;
}

function sortProducts(items: Product[], sortBy: string): Product[] {
  const list = [...items];
  switch (sortBy) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case 'featured':
    default:
      return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const rows = await dbClient.query.products.findMany({
        where: (p, { eq }) => eq(p.slug, slug),
        limit: 1,
      });
      if (rows && rows[0]) return rows[0];
    } catch (e) {
      console.warn('Neon query fallback for product slug:', slug, e);
    }
  }
  return memoryProducts.find((p) => p.slug === slug) || null;
}

/**
 * Fetch a single product by numeric ID
 */
export async function getProductById(id: number): Promise<Product | null> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const rows = await dbClient.query.products.findMany({
        where: (p, { eq }) => eq(p.id, id),
        limit: 1,
      });
      if (rows && rows[0]) return rows[0];
    } catch (e) {
      console.warn('Neon query fallback for product id:', id, e);
    }
  }
  return memoryProducts.find((p) => p.id === id) || null;
}

/**
 * Admin Product CRUD: Create new product
 */
export async function createCatalogProduct(data: schema.NewProduct): Promise<Product> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const inserted = await dbClient.insert(schema.products).values(data).returning();
      if (inserted && inserted[0]) {
        memoryProducts.unshift(inserted[0]);
        return inserted[0];
      }
    } catch (e) {
      console.warn('Neon insert product failed, storing in memory fallback:', e);
    }
  }

  const newId = memoryProducts.length > 0 ? Math.max(...memoryProducts.map((p) => p.id)) + 1 : 1;
  const newProduct: Product = {
    id: newId,
    slug: data.slug,
    name: data.name,
    collection: data.collection || null,
    collectionSlug: data.collectionSlug || 'haibat-majmua',
    fabricType: data.fabricType,
    price: data.price,
    originalPrice: data.originalPrice || null,
    availability: data.availability || (data.inStock === false ? 'OUT OF STOCK' : 'IN STOCK'),
    image: data.image,
    secondaryImage: data.secondaryImage || data.image,
    images: data.images || JSON.stringify([data.image]),
    inStock: data.inStock ?? true,
    description: data.description,
    descriptionUrdu: data.descriptionUrdu || null,
    descriptionArabic: data.descriptionArabic || null,
    royalTale: data.royalTale || '',
    texture: data.texture || 'Fine Luxury Weave',
    recommendedUse: data.recommendedUse || 'Royal Ceremonial & Daily Elegance',
    careInstructions: data.careInstructions || 'Dry clean recommended. Hand wash in cold water.',
    meters: data.meters || '4.5 Meters (56" Width)',
    isFeatured: data.isFeatured ?? false,
    colorName: data.colorName || null,
    weaveType: data.weaveType || null,
    createdAt: new Date(),
  };

  memoryProducts.unshift(newProduct);
  return newProduct;
}

/**
 * Admin Product CRUD: Update existing product
 */
export async function updateCatalogProduct(
  id: number,
  data: Partial<schema.NewProduct>
): Promise<Product | null> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const updated = await dbClient
        .update(schema.products)
        .set(data)
        .where(eq(schema.products.id, id))
        .returning();
      if (updated && updated[0]) {
        const idx = memoryProducts.findIndex((p) => p.id === id);
        if (idx !== -1) memoryProducts[idx] = updated[0];
        return updated[0];
      }
    } catch (e) {
      console.warn('Neon update product failed, updating memory fallback:', e);
    }
  }

  const idx = memoryProducts.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryProducts[idx] = {
      ...memoryProducts[idx],
      ...data,
      availability:
        data.inStock !== undefined
          ? data.inStock
            ? 'IN STOCK'
            : 'OUT OF STOCK'
          : memoryProducts[idx].availability,
    } as Product;
    return memoryProducts[idx];
  }
  return null;
}

/**
 * Admin Product CRUD: Delete product
 */
export async function deleteCatalogProduct(id: number): Promise<boolean> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      await dbClient.delete(schema.products).where(eq(schema.products.id, id));
    } catch (e) {
      console.warn('Neon delete product failed, deleting from memory fallback:', e);
    }
  }

  const initialLength = memoryProducts.length;
  memoryProducts = memoryProducts.filter((p) => p.id !== id);
  return memoryProducts.length < initialLength;
}

/**
 * Fetch related products
 */
export async function getRelatedProducts(
  currentProductId: number,
  collectionSlug: string,
  limit = 4
): Promise<Product[]> {
  const products = await getProducts();
  const relatedInCollection = products.filter(
    (p) => p.id !== currentProductId && p.collectionSlug === collectionSlug
  );
  if (relatedInCollection.length >= limit) {
    return relatedInCollection.slice(0, limit);
  }
  // If not enough in same collection, pull other featured fabrics
  const others = products.filter((p) => p.id !== currentProductId && p.collectionSlug !== collectionSlug);
  return [...relatedInCollection, ...others].slice(0, limit);
}

/**
 * Create a new customer order and item records
 */
export async function createOrder(
  orderInput: {
    userId?: number | null;
    fullName: string;
    phoneNumber: string;
    email?: string;
    city: string;
    completeAddress: string;
    notes?: string;
    totalAmount: number;
    paymentMethod?: string;
  },
  items: {
    productId: number;
    productName: string;
    fabricType: string;
    price: number;
    quantity: number;
    image?: string;
  }[]
): Promise<{ order: Order; items: OrderItem[] }> {
  // Generate royal order identifier, e.g., SMF-2026-7841
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `SMF-${randomSuffix}`;

  const newOrder: Order = {
    id: orderId,
    userId: orderInput.userId ?? null,
    fullName: orderInput.fullName.trim(),
    phoneNumber: orderInput.phoneNumber.trim(),
    email: orderInput.email ? orderInput.email.trim() : null,
    city: orderInput.city.trim(),
    completeAddress: orderInput.completeAddress.trim(),
    notes: orderInput.notes ? orderInput.notes.trim() : null,
    totalAmount: orderInput.totalAmount,
    paymentMethod: orderInput.paymentMethod || 'CASH ON DELIVERY',
    status: 'RECEIVED',
    createdAt: new Date(),
  };

  const newItems: OrderItem[] = items.map((item, idx) => ({
    id: idx + 1,
    orderId: orderId,
    productId: item.productId,
    productName: item.productName,
    fabricType: item.fabricType,
    price: item.price,
    quantity: item.quantity,
    image: item.image || null,
  }));

  // If live Neon DB, persist to PostgreSQL
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      await dbClient.insert(schema.orders).values(newOrder);
      if (items.length > 0) {
        const insertItems = items.map((item) => ({
          orderId: orderId,
          productId: item.productId,
          productName: item.productName,
          fabricType: item.fabricType,
          price: item.price,
          quantity: item.quantity,
          image: item.image || null,
        }));
        await dbClient.insert(schema.orderItems).values(insertItems);
      }
    } catch (e) {
      console.warn('Neon DB write error, storing in fallback local memory:', e);
    }
  }

  // Always store in memory as well for fast local retrieval
  memoryOrders.unshift(newOrder);
  memoryOrderItems.push(...newItems);

  return { order: newOrder, items: newItems };
}

/**
 * Fetch order by ID
 */
export async function getOrderById(id: string): Promise<{ order: Order | null; items: OrderItem[] }> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const order = await dbClient.query.orders.findFirst({
        where: (o, { eq }) => eq(o.id, id),
      });
      if (order) {
        const items = await dbClient.query.orderItems.findMany({
          where: (i, { eq }) => eq(i.orderId, id),
        });
        return { order, items };
      }
    } catch (e) {
      console.warn('Neon query fallback for order ID:', id, e);
    }
  }

  const order = memoryOrders.find((o) => o.id === id) || null;
  const items = memoryOrderItems.filter((i) => i.orderId === id);
  return { order, items };
}

/**
 * Fetch user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const normalized = email.trim().toLowerCase();
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const rows = await dbClient.query.users.findMany({
        where: (u, { eq }) => eq(u.email, normalized),
        limit: 1,
      });
      if (rows && rows[0]) return rows[0];
    } catch (e) {
      console.warn('Neon query fallback for user email:', email, e);
    }
  }
  return memoryUsers.find((u) => u.email.toLowerCase() === normalized) || null;
}

/**
 * Fetch user by ID
 */
export async function getUserById(id: number): Promise<User | null> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const rows = await dbClient.query.users.findMany({
        where: (u, { eq }) => eq(u.id, id),
        limit: 1,
      });
      if (rows && rows[0]) return rows[0];
    } catch (e) {
      console.warn('Neon query fallback for user id:', id, e);
    }
  }
  return memoryUsers.find((u) => u.id === id) || null;
}

/**
 * Create a new user in database
 */
export async function createUser(data: {
  fullName: string;
  email: string;
  passwordHash: string;
  role?: 'user' | 'admin' | string;
}): Promise<User> {
  const normalizedEmail = data.email.trim().toLowerCase();
  const role = data.role === 'admin' ? 'admin' : 'user';

  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const inserted = await dbClient
        .insert(schema.users)
        .values({
          fullName: data.fullName.trim(),
          email: normalizedEmail,
          passwordHash: data.passwordHash,
          role,
        })
        .returning();

      if (inserted && inserted[0]) {
        memoryUsers.unshift(inserted[0]);
        return inserted[0];
      }
    } catch (e) {
      console.warn('Neon insert user error, saving to memory fallback:', e);
    }
  }

  const newUser: User = {
    id: memoryUsers.length + 1,
    fullName: data.fullName.trim(),
    email: normalizedEmail,
    passwordHash: data.passwordHash,
    role,
    createdAt: new Date(),
  };
  memoryUsers.unshift(newUser);
  return newUser;
}

/**
 * Fetch all registered users (for admin panel)
 */
export async function getAllUsers(): Promise<User[]> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const result = await dbClient.select().from(schema.users);
      if (result && result.length > 0) return result;
    } catch (e) {
      console.warn('Neon query fallback for all users:', e);
    }
  }
  return memoryUsers;
}

/**
 * Fetch orders for a specific user
 */
export async function getOrdersByUserId(userId: number): Promise<{ order: Order; items: OrderItem[] }[]> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const userOrders = await dbClient.query.orders.findMany({
        where: (o, { eq }) => eq(o.userId, userId),
      });

      const orderList: { order: Order; items: OrderItem[] }[] = [];
      for (const order of userOrders) {
        const items = await dbClient.query.orderItems.findMany({
          where: (i, { eq }) => eq(i.orderId, order.id),
        });
        orderList.push({ order, items });
      }
      return orderList;
    } catch (e) {
      console.warn('Neon query fallback for user orders:', userId, e);
    }
  }

  const matchingOrders = memoryOrders.filter((o) => o.userId === userId);
  return matchingOrders.map((order) => ({
    order,
    items: memoryOrderItems.filter((i) => i.orderId === order.id),
  }));
}

/**
 * Fetch all orders with items (for admin panel)
 */
export async function getAllOrders(): Promise<{ order: Order; items: OrderItem[] }[]> {
  if (dbClient) {
    try {
      await ensureDatabaseInitialized();
      const allOrders = await dbClient.select().from(schema.orders);
      const allItems = await dbClient.select().from(schema.orderItems);

      return allOrders.map((order) => ({
        order,
        items: allItems.filter((i) => i.orderId === order.id),
      }));
    } catch (e) {
      console.warn('Neon query fallback for all orders:', e);
    }
  }

  return memoryOrders.map((order) => ({
    order,
    items: memoryOrderItems.filter((i) => i.orderId === order.id),
  }));
}

