'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/schema';

type ProductWithRawFields = Product & {
  description_urdu?: string | null;
  description_arabic?: string | null;
};

interface ProductCardProps {
  product: ProductWithRawFields;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, openQuickView, isAdmin } = useCart();

  const currentImage =
    isHovered && product.secondaryImage ? product.secondaryImage : product.image;

  const englishDescription = product.description?.trim() || '';
  const urduDescription =
    (product.descriptionUrdu ?? product.description_urdu)?.trim() || '';
  const arabicDescription =
    (product.descriptionArabic ?? product.description_arabic)?.trim() || '';

  return (
    <div
      className="group relative flex flex-col bg-[#141414] border border-[#202020] hover:border-[#383838] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] min-h-[260px] w-full bg-[#181818] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={currentImage}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Status / Availability Text */}
        <div className="absolute top-3 left-3 pointer-events-none">
          {product.availability === 'LIMITED RUN' && (
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8B26E] font-medium bg-black/75 px-2 py-0.5 border border-[#443818]">
              LIMITED RUN
            </span>
          )}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-[11px] uppercase tracking-wider text-[#F5F5F5] bg-[#1E1E1E]/90 hover:bg-[#282828] border border-[#333333] transition-colors cursor-pointer"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="truncate">QUICK VIEW</span>
          </button>

          {!isAdmin && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="flex items-center justify-center p-2 text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-colors cursor-pointer"
              aria-label={`Add ${product.name} to shopping bag`}
              title="Add to bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Metadata (Category & Cut length) */}
          <div className="flex items-center gap-2 text-[11px] text-[#888888] tracking-wider uppercase mb-1 truncate">
            <span className="truncate">{product.fabricType}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0">4.5m Cut</span>
          </div>

          {/* Product Title */}
          <Link
            href={`/product/${product.slug}`}
            className="block group-hover:text-[#C5A059] transition-colors"
          >
            <h3 className="text-xs sm:text-sm font-medium text-[#F5F5F5] leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Stacked Sequential Descriptions (English -> Urdu -> Arabic) */}
          <div className="mt-2.5 space-y-2.5">
            {/* 1. English Description */}
            {Boolean(englishDescription) && (
              <div dir="ltr" className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-amber-500/70 mb-0.5">
                  Description (English)
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                  {englishDescription}
                </p>
              </div>
            )}

            {/* 2. Urdu Description */}
            {Boolean(urduDescription) && (
              <div
                dir="rtl"
                className={`text-right ${
                  englishDescription
                    ? 'pt-2 border-t border-neutral-800/60'
                    : ''
                }`}
              >
                <p className="text-[10px] text-amber-500/70 mb-0.5">تفصیل (اردو)</p>
                <p className="text-xs text-neutral-300 leading-relaxed font-serif line-clamp-2">
                  {urduDescription}
                </p>
              </div>
            )}

            {/* 3. Arabic Description */}
            {Boolean(arabicDescription) && (
              <div
                dir="rtl"
                className={`text-right ${
                  englishDescription || urduDescription
                    ? 'pt-2 border-t border-neutral-800/60'
                    : ''
                }`}
              >
                <p className="text-[10px] text-amber-500/70 mb-0.5">الوصف (العربية)</p>
                <p className="text-xs text-neutral-300 leading-relaxed font-serif line-clamp-2">
                  {arabicDescription}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-2.5 border-t border-[#1C1C1C] flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-normal tabular-nums text-[#E5E5E5]">
              PKR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] line-through text-[#666666] tabular-nums">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[#A5A5A5]">
            {product.availability === 'IN STOCK' ? 'In Stock' : 'Limited'}
          </span>
        </div>
      </div>
    </div>
  );
}
