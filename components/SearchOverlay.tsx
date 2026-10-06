'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { searchProductsAction } from '@/app/actions/search';
import type { Product } from '@/lib/db/schema';

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch, addToCart } = useCart();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    closeSearch();
  };

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const found = await searchProductsAction(trimmed);
        setResults(found);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const displayedResults = query.trim() ? results : [];

  if (!isSearchOpen) return null;

  const quickSearches = [
    'Egyptian Giza Cotton',
    'Liquid Suiting Navy',
    'Original Latha 68000',
    'Deep Onyx Black',
    'Wash & Wear',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0E0E0E] border border-[#262626] shadow-2xl p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header / Input */}
        <div className="flex items-center gap-3 border-b border-[#262626] pb-4">
          <Search className="w-5 h-5 text-[#C5A059] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by fabric name, collection, or weave (e.g., Latha, Giza Cotton, Navy)..."
            className="w-full bg-transparent text-[#F5F5F5] placeholder-[#666666] text-sm sm:text-base focus:outline-none"
          />
          {isLoading && <Loader2 className="w-4 h-4 text-[#C5A059] animate-spin shrink-0" />}
          <button
            onClick={handleClose}
            className="text-[#888888] hover:text-[#F5F5F5] transition-colors p-1"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested keywords when query is empty */}
        {!query.trim() && (
          <div className="py-6 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#888888]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>POPULAR ROYAL WEAVES</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 text-xs text-[#CCCCCC] bg-[#161616] border border-[#282828] hover:border-[#C5A059] hover:text-[#F5F5F5] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#1C1C1C] space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#666666] block">
                EXPLORE BY CHAPTER
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href="/collections/haibat-majmua"
                  onClick={closeSearch}
                  className="p-3 bg-[#131313] border border-[#222222] hover:border-[#C5A059]/50 transition-colors block text-left"
                >
                  <span className="text-xs font-medium text-[#F5F5F5] block">HAIBAT MAJMUA</span>
                  <span className="text-[10px] text-[#A5A5A5]">Premium Cotton</span>
                </Link>
                <Link
                  href="/collections/mehrab-intikhab"
                  onClick={closeSearch}
                  className="p-3 bg-[#131313] border border-[#222222] hover:border-[#C5A059]/50 transition-colors block text-left"
                >
                  <span className="text-xs font-medium text-[#F5F5F5] block">MEHRAB INTIKHAB</span>
                  <span className="text-[10px] text-[#A5A5A5]">Wash & Wear</span>
                </Link>
                <Link
                  href="/collections/raees-riwayat"
                  onClick={closeSearch}
                  className="p-3 bg-[#131313] border border-[#222222] hover:border-[#C5A059]/50 transition-colors block text-left"
                >
                  <span className="text-xs font-medium text-[#F5F5F5] block">RAEES RIWAYAT</span>
                  <span className="text-[10px] text-[#A5A5A5]">Original Latha</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() && (
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {displayedResults.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#888888] pb-1">
                  <span>Found {displayedResults.length} royal fabric {displayedResults.length === 1 ? 'cut' : 'cuts'}</span>
                  <span className="text-[10px] tracking-wider uppercase">Results from database</span>
                </div>

                {displayedResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-[#141414] border border-[#202020] hover:border-[#333333] transition-colors gap-4"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={handleClose}
                      className="flex items-center gap-3.5 flex-1 group"
                    >
                      <div className="relative w-14 h-16 bg-[#1A1A1A] shrink-0 overflow-hidden border border-[#282828]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="60px"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-[#F5F5F5] group-hover:text-[#C5A059] transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#888888] mt-0.5">
                          <span>{product.fabricType}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#C5A059] font-medium tabular-nums">
                            PKR {product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(product, 1);
                          handleClose();
                        }}
                        className="px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] font-medium transition-colors"
                      >
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="py-12 text-center space-y-3">
                  <p className="text-sm text-[#F5F5F5]">
                    No royal fabrics matching &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-[#777777] max-w-sm mx-auto">
                    Try searching for fabric types such as &ldquo;Cotton&rdquo;, &ldquo;Wash & Wear&rdquo;, or &ldquo;Latha&rdquo;.
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
