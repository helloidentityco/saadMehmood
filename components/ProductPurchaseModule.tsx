'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  Box,
} from 'lucide-react';
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/db/schema';
import ReactMarkdown from 'react-markdown';

type ProductWithRawFields = Product & {
  description_urdu?: string | null;
  description_arabic?: string | null;
};

interface ProductPurchaseModuleProps {
  product: ProductWithRawFields;
  collectionName: string;
}

export default function ProductPurchaseModule({
  product,
  collectionName,
}: ProductPurchaseModuleProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, isAdmin } = useCart();
  const router = useRouter();

  const englishDesc = product.description?.trim() || '';
  const urduDesc =
    (product.descriptionUrdu ?? product.description_urdu)?.trim() || '';
  const arabicDesc =
    (product.descriptionArabic ?? product.description_arabic)?.trim() || '';

  const handleAddToCart = () => {
    if (isAdmin) return;
    const validQty = Number.isFinite(quantity) && quantity >= 1 ? quantity : 1;
    addToCart(product, validQty);
    setQuantity(1);
  };

  const handleDirectOrder = () => {
    if (isAdmin) {
      router.push('/admin/products');
      return;
    }
    const validQty = Number.isFinite(quantity) && quantity >= 1 ? quantity : 1;
    addToCart(product, validQty);
    setQuantity(1);
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col justify-between space-y-6">
      {/* Title & Collection Header */}
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] mb-2">
          <Link
            href={`/collections/${product.collectionSlug}`}
            className="hover:underline transition-all"
          >
            {collectionName}
          </Link>
          <span aria-hidden="true" className="text-[#555555]">
            ·
          </span>
          <span className="text-[#888888]">{product.fabricType}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.12em] text-[#F5F5F5] uppercase leading-tight mb-3">
          <strong>{product.name}</strong>
        </h1>

        {/* Price & Stock */}
        <div className="flex items-baseline gap-4 pt-1">
          <span className="text-2xl sm:text-3xl font-light tabular-nums text-[#F5F5F5]">
            <strong>PKR {product.price.toLocaleString()}</strong>
          </span>
          {product.originalPrice && (
            <span className="text-sm line-through text-[#666666] tabular-nums">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-[11px] uppercase tracking-wider text-[#A5A5A5] pl-2 border-l border-[#2E2E2E]">
            {product.availability}
          </span>
        </div>
      </div>

      {/* Stacked Sequential Product Descriptions (English -> Urdu -> Arabic) */}
      {(Boolean(englishDesc) || Boolean(urduDesc) || Boolean(arabicDesc)) && (
        <div className="p-5 bg-[#121212] border border-[#222222] space-y-4">
          {/* 1. English Description */}
          {Boolean(englishDesc) && (
            <div dir="ltr" className="text-left">
              <p className="text-xs uppercase tracking-wider text-amber-500/70 mb-1">
                Description (English) 
              </p>

              <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                <ReactMarkdown>{englishDesc}</ReactMarkdown>
              </p>
            </div>
          )}

          {/* 2. Urdu Description */}
          {Boolean(urduDesc) && (
            <div
              dir="rtl"
              className={`text-right ${
                englishDesc ? 'pt-3 border-t border-neutral-800/60' : ''
              }`}
            >
              <p className="text-xs text-amber-500/70 mb-1">تفصیل (اردو)</p>
        
              <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                <ReactMarkdown>{urduDesc}</ReactMarkdown>
              </p>
            </div>
          )}

          {/* 3. Arabic Description */}
          {Boolean(arabicDesc) && (
            <div
              dir="rtl"
              className={`text-right ${
                englishDesc || urduDesc
                  ? 'pt-3 border-t border-neutral-800/60'
                  : ''
              }`}
            >
              <p className="text-xs text-amber-500/70 mb-1">الوصف (العربية)</p>
              
              <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                <ReactMarkdown>{arabicDesc}</ReactMarkdown>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Royal Tale Literary Excerpt */}
      {/* {product.royalTale?.trim() && (
        <div className="p-4 bg-[#121212] border-l-2 border-[#C5A059] border-y border-r border-[#222222]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium block mb-1">
            THE DARBAR CHRONICLE
          </span>
          <p className="text-xs text-[#B5B5B5] font-light italic leading-relaxed">
            &ldquo;{product.royalTale}&rdquo;
          </p>
        </div>
      )} */}

      {/* Fabric Dimension Specifications */}
      <div className="p-4 bg-[#141414] border border-[#222222] space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[#888888]">Standard Shalwar Kameez Cut:</span>
          <span className="text-[#F5F5F5] font-medium">{product.meters}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#888888]">Weave &amp; Count:</span>
          <span className="text-[#E0E0E0]">
            {product.weaveType || 'Imperial Standard Double Ply'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#888888]">Shade / Color:</span>
          <span className="text-[#E0E0E0]">
            {product.colorName || 'Bespoke Royal Dye'}
          </span>
        </div>
      </div>

      {/* Purchase Controls */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-[#333333] bg-[#141414] h-12">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3.5 h-full text-[#A5A5A5] hover:text-[#F5F5F5] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-sm font-medium tabular-nums text-[#F5F5F5]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3.5 h-full text-[#A5A5A5] hover:text-[#F5F5F5] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdmin}
            className={`flex-1 h-12 flex items-center justify-center gap-2 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 ${
              isAdmin
                ? 'bg-[#1C1C1C] text-[#777777] border border-[#2A2A2A] cursor-not-allowed'
                : 'text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isAdmin ? 'ADMIN MODE (CART DISABLED)' : 'ADD TO BAG'}</span>
          </button>
        </div>

        {/* Direct Order Now CTA / Edit in Admin CTA */}
        {isAdmin ? (
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="w-full h-12 flex items-center justify-center gap-2 px-6 text-xs uppercase tracking-[0.2em] font-medium text-[#C5A059] bg-[#141414] border border-[#C5A059]/40 hover:border-[#C5A059] transition-all duration-200"
          >
            <span>EDIT PRODUCT SPECIFICATIONS IN ATELIER</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleDirectOrder}
            className="w-full h-12 flex items-center justify-center gap-2 px-6 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F5F5] bg-[#181818] border border-[#333333] hover:border-[#C5A059] transition-all duration-200"
          >
            <span>ORDER DIRECTLY (CASH ON DELIVERY)</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </button>
        )}
      </div>

      {/* Trust Badges */}
      <div className="pt-4 border-t border-[#1C1C1C] space-y-2.5 text-xs text-[#888888]">
        <div className="flex items-center gap-2.5">
          <Truck className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>Free nationwide courier delivery (10 business days)</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Box className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>Encased in rigid gold-embossed Saad Mehmood presentation box</span>
        </div>
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>Cash on Delivery (COD) inspection upon receipt</span>
        </div>
      </div>

      {/* Fabric Technical Accordion */}
      <div className="pt-6 border-t border-[#1C1C1C] space-y-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5] font-medium">
          FABRIC SPECIFICATIONS &amp; CARE
        </h3>

        <div className="space-y-3 text-xs">
          <div className="border border-[#222222] p-3 bg-[#111111]">
            <span className="text-[#C5A059] font-medium block uppercase tracking-wider text-[11px] mb-1">
              Texture &amp; Handfeel
            </span>
            <p className="text-[#A5A5A5] font-light leading-relaxed">
              {product.texture}
            </p>
          </div>

          <div className="border border-[#222222] p-3 bg-[#111111]">
            <span className="text-[#C5A059] font-medium block uppercase tracking-wider text-[11px] mb-1">
              Recommended Use
            </span>
            <p className="text-[#A5A5A5] font-light leading-relaxed">
              {product.recommendedUse}
            </p>
          </div>

          <div className="border border-[#222222] p-3 bg-[#111111]">
            <span className="text-[#C5A059] font-medium block uppercase tracking-wider text-[11px] mb-1">
              Care Instructions
            </span>
            <p className="text-[#A5A5A5] font-light leading-relaxed">
              {product.careInstructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
