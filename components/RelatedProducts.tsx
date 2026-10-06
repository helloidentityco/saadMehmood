import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/db/schema';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 lg:py-24 bg-[#0A0A0A] border-t border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-2 block">
            CURATED SELECTION
          </span>
          <h2 className="text-xl sm:text-3xl font-light tracking-[0.16em] uppercase text-[#F5F5F5] mb-4">
            YOU MAY ALSO LIKE
          </h2>
          <div className="h-[1px] w-14 bg-[#C5A059]/60" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
