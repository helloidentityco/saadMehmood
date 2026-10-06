'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/db/schema';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'haibat-majmua' | 'mehrab-intikhab' | 'raees-riwayat'>('all');

  const tabs = [
    { id: 'all', label: 'ALL FABRICS' },
    { id: 'haibat-majmua', label: 'HAIBAT MAJMUA' },
    { id: 'mehrab-intikhab', label: 'MEHRAB INTIKHAB' },
    { id: 'raees-riwayat', label: 'RAEES RIWAYAT' },
  ] as const;

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') {
      return products;
    }
    return products.filter((p) => p.collectionSlug === activeTab);
  }, [products, activeTab]);

  return (
    <section className="py-20 lg:py-28 bg-[#0E0E0E] border-t border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-2 block">
            THE ROYAL SELECTION
          </span>
          <h2 className="text-2xl sm:text-4xl font-light tracking-[0.16em] uppercase text-[#F5F5F5] mb-4">
            FEATURED FABRICS
          </h2>
          <div className="h-[1px] w-16 bg-[#C5A059]/60 mb-4" />
          <p className="text-xs sm:text-sm text-[#A5A5A5] font-light max-w-lg text-balance">
            Hand-curated fabric cuts from our signature collections, ready for custom tailoring.
          </p>
        </div>

        {/* Clean Segmented Tab Buttons (Frontend-Design compliant, no candy pill styling) */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-2 p-1 bg-[#141414] border border-[#242424]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 sm:px-5 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#C5A059] text-[#080808] font-medium shadow-md'
                      : 'text-[#888888] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid: 4 cols desktop, 2 cols mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 4}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            href={activeTab === 'all' ? '/collections/haibat-majmua' : `/collections/${activeTab}`}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F5F5] bg-[#141414] border border-[#333333] hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-200"
          >
            <span>VIEW COMPLETE COLLECTION</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
