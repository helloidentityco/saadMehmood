'use server';

import { getProducts } from '@/lib/db';
import type { Product } from '@/lib/db/schema';

export async function searchProductsAction(query: string): Promise<Product[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }
  const cleanQuery = query.trim();
  const results = await getProducts({ search: cleanQuery });
  return results.slice(0, 8);
}
