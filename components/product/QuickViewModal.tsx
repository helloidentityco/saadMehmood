'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/schema';

type ProductWithRawFields = Product & {
  description_urdu?: string | null;
  description_arabic?: string | null;
};

function QuickViewModalContent({
  product,
  closeQuickView,
  addToCart,
  isAdmin,
}: {
  product: ProductWithRawFields;
  closeQuickView: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  isAdmin: boolean;
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const currentImage = activeImage || product.image;

  const englishDescription = product.description?.trim() || '';
  const urduDescription =
    (product.descriptionUrdu ?? product.description_urdu)?.trim() || '';
  const arabicDescription =
    (product.descriptionArabic ?? product.description_arabic)?.trim() || '';

  const handleAdd = () => {
    if (isAdmin) return;
    const validQty = Number.isFinite(quantity) && quantity >= 1 ? quantity : 1;
    addToCart(product, validQty);
    setQuantity(1);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0F0F0F] border border-[#262626] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 text-[#A5A5A5] hover:text-[#F5F5F5] p-2 bg-[#080808]/70 border border-[#222222] transition-colors cursor-pointer"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Imagery */}
        <div className="md:w-1/2 bg-[#141414] relative flex flex-col min-h-[320px] md:min-h-[500px]">
          <div className="relative w-full h-[320px] md:h-full min-h-[320px] md:min-h-[500px] overflow-hidden">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Secondary Thumbnail Toggle */}
          {product.secondaryImage && (
            <div className="absolute bottom-3 left-3 flex gap-2 z-10 bg-black/60 p-1 border border-[#333333]">
              <button
                type="button"
                onClick={() => setActiveImage(product.image)}
                className={`relative w-12 h-12 border cursor-pointer ${
                  currentImage === product.image
                    ? 'border-[#C5A059]'
                    : 'border-transparent opacity-70'
                }`}
              >
                <Image
                  src={product.image}
                  alt="Primary view"
                  fill
                  className="object-cover"
                  sizes="48px"
                  referrerPolicy="no-referrer"
                />
              </button>
              <button
                type="button"
                onClick={() => setActiveImage(product.secondaryImage)}
                className={`relative w-12 h-12 border cursor-pointer ${
                  currentImage === product.secondaryImage
                    ? 'border-[#C5A059]'
                    : 'border-transparent opacity-70'
                }`}
              >
                <Image
                  src={product.secondaryImage}
                  alt="Detail view"
                  fill
                  className="object-cover"
                  sizes="48px"
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>
          )}
        </div>

        {/* Right: Fabric Details & Purchase Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059]">
                <span>{product.fabricType}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#888888]">{product.availability}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-light text-[#F5F5F5] tracking-wide mt-1">
                {product.name}
              </h3>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-xl sm:text-2xl font-light tabular-nums text-[#F5F5F5]">
                PKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-[#666666] tabular-nums">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stacked Sequential Descriptions (English -> Urdu -> Arabic) */}
            {(Boolean(englishDescription) ||
              Boolean(urduDescription) ||
              Boolean(arabicDescription)) && (
              <div className="p-4 bg-[#131313] border border-[#222222] space-y-4">
                {/* 1. English Description */}
                {Boolean(englishDescription) && (
                  <div dir="ltr" className="text-left">
                    <p className="text-xs uppercase tracking-wider text-amber-500/70 mb-1">
                      Description (English)
                    </p>
                    <p className="text-sm text-neutral-300 leading-relaxed">
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
                        ? 'pt-3 border-t border-neutral-800/60'
                        : ''
                    }`}
                  >
                    <p className="text-xs text-amber-500/70 mb-1">تفصیل (اردو)</p>
                    <p className="text-sm text-neutral-300 leading-relaxed font-serif">
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
                        ? 'pt-3 border-t border-neutral-800/60'
                        : ''
                    }`}
                  >
                    <p className="text-xs text-amber-500/70 mb-1">الوصف (العربية)</p>
                    <p className="text-sm text-neutral-300 leading-relaxed font-serif">
                      {arabicDescription}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Fabric Cut Specifications */}
            <div className="p-3 bg-[#161616] border border-[#222222] space-y-1 text-xs text-[#A5A5A5]">
              <div className="flex justify-between">
                <span className="text-[#888888]">Standard Fabric Cut:</span>
                <span className="text-[#F5F5F5] font-medium">{product.meters}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Texture / Handfeel:</span>
                <span className="text-[#CCCCCC]">{product.texture}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Recommended:</span>
                <span className="text-[#CCCCCC] truncate max-w-[200px]">
                  {product.recommendedUse}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-5 border-t border-[#222222] space-y-4 mt-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#333333] bg-[#141414]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-[#A5A5A5] hover:text-[#F5F5F5] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-medium tabular-nums text-[#F5F5F5]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-[#A5A5A5] hover:text-[#F5F5F5] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={isAdmin}
                className={`flex-1 py-3 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer ${
                  isAdmin
                    ? 'bg-[#1C1C1C] text-[#777777] border border-[#2A2A2A] cursor-not-allowed'
                    : 'text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E]'
                }`}
              >
                {isAdmin ? 'ADMIN MODE (CART DISABLED)' : 'ADD TO BAG'}
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Link
                href={`/product/${product.slug}`}
                onClick={closeQuickView}
                className="inline-flex items-center gap-1.5 text-xs text-[#A5A5A5] hover:text-[#C5A059] transition-colors tracking-wider uppercase"
              >
                <span>VIEW FULL PRODUCT DETAILS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[10px] text-[#666666] uppercase">
                Free Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, isAdmin } = useCart();

  if (!quickViewProduct) return null;

  return (
    <QuickViewModalContent
      key={quickViewProduct.id}
      product={quickViewProduct as ProductWithRawFields}
      closeQuickView={closeQuickView}
      addToCart={addToCart}
      isAdmin={isAdmin}
    />
  );
}
