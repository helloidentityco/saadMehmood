'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Loader2,
  Save,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import ProductImageUploader from '@/components/admin/ProductImageUploader';
import { createProduct, updateProduct, deleteProduct } from '@/actions/admin-products';
import { useLoading } from '@/components/providers/LoadingContext';
import type { Product } from '@/lib/schema';

interface ProductFormProps {
  initialProduct?: Product;
}

const COLLECTIONS = [
  { name: 'Haibat Majmua', subtitle: 'Royal Egyptian Cotton' },
  { name: 'Mehrab Intikhab', subtitle: 'Elite Wash & Wear' },
  { name: 'Raees Riwayat', subtitle: 'Authentic Original Latha' },
];

const FABRIC_TYPES = [
  'Egyptian Giza Cotton',
  'Royal Wash & Wear Suiting',
  'Original Royal Latha',
  'Supima Long-Staple Cotton',
  'Micro-Fine Poly-Viscose',
  'Handspun Silk Blend',
  'Winter Karandi',
  'Imperial Lawn',
];

export default function ProductForm({ initialProduct }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const { isMutating, withSkeleton } = useLoading();

  const isEdit = Boolean(initialProduct);

  // Form states
  const [name, setName] = useState(initialProduct?.name || '');
  const [collection, setCollection] = useState(
    initialProduct?.collection || 'Haibat Majmua'
  );
  const [fabricType, setFabricType] = useState(
    initialProduct?.fabricType || 'Egyptian Giza Cotton'
  );
  const [price, setPrice] = useState(initialProduct?.price?.toString() || '');
  const [originalPrice, setOriginalPrice] = useState(
    initialProduct?.originalPrice?.toString() || ''
  );
  const [inStock, setInStock] = useState(
    initialProduct?.inStock ?? initialProduct?.availability !== 'OUT OF STOCK'
  );
  const [isFeatured, setIsFeatured] = useState(initialProduct?.isFeatured || false);
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [descriptionUrdu, setDescriptionUrdu] = useState(
    initialProduct?.descriptionUrdu || ''
  );
  const [descriptionArabic, setDescriptionArabic] = useState(
    initialProduct?.descriptionArabic || ''
  );
  const [royalTale, setRoyalTale] = useState(initialProduct?.royalTale || '');
  const [texture, setTexture] = useState(
    initialProduct?.texture || 'Ultra-smooth crisp finish'
  );
  const [recommendedUse, setRecommendedUse] = useState(
    initialProduct?.recommendedUse || 'Juma Prayers, Royal Festivities & Daily Grandeur'
  );
  const [careInstructions, setCareInstructions] = useState(
    initialProduct?.careInstructions ||
      'Dry clean recommended. Hand wash in mild detergent.'
  );
  const [meters, setMeters] = useState(
    initialProduct?.meters || '4.5 Meters (56" Width)'
  );

  // Initial images parsing
  const getInitialImages = (): string[] => {
    if (!initialProduct) return [];
    if (initialProduct.images) {
      try {
        const parsed = JSON.parse(initialProduct.images);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    const imgs: string[] = [];
    if (initialProduct.image) imgs.push(initialProduct.image);
    if (
      initialProduct.secondaryImage &&
      initialProduct.secondaryImage !== initialProduct.image
    ) {
      imgs.push(initialProduct.secondaryImage);
    }
    return imgs;
  };

  const [images, setImages] = useState<string[]>(getInitialImages);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const showSkeletonState = isPending || isDeletePending || isMutating;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});
    setSuccessMessage(null);

    if (!name.trim()) {
      setFieldErrors((prev) => ({ ...prev, name: 'Fabric title is required.' }));
      return;
    }
    if (!price || isNaN(Number(price))) {
      setFieldErrors((prev) => ({ ...prev, price: 'Valid price is required.' }));
      return;
    }
    if (!description.trim()) {
      setFieldErrors((prev) => ({ ...prev, description: 'Description is required.' }));
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('collection', collection);
    formData.append('fabricType', fabricType);
    formData.append('price', price);
    if (originalPrice) formData.append('originalPrice', originalPrice);
    formData.append('inStock', inStock ? 'true' : 'false');
    formData.append('isFeatured', isFeatured ? 'true' : 'false');
    formData.append('description', description.trim());
    formData.append('descriptionUrdu', descriptionUrdu.trim());
    formData.append('descriptionArabic', descriptionArabic.trim());
    formData.append('royalTale', royalTale.trim());
    formData.append('texture', texture.trim());
    formData.append('recommendedUse', recommendedUse.trim());
    formData.append('careInstructions', careInstructions.trim());
    formData.append('meters', meters.trim());
    formData.append('images', JSON.stringify(images));

    startTransition(async () => {
      await withSkeleton(
        async () => {
          try {
            let result;
            if (isEdit && initialProduct) {
              result = await updateProduct(initialProduct.id, formData);
            } else {
              result = await createProduct(undefined, formData);
            }

            if (result?.error) {
              setErrorMessage(result.error);
            } else if (result?.fieldErrors) {
              setFieldErrors(result.fieldErrors);
            } else if (result?.success) {
              setSuccessMessage(
                isEdit
                  ? 'Fabric listing successfully updated.'
                  : 'New fabric listing successfully created.'
              );
              router.push('/admin/products');
              router.refresh();
            }
          } catch (err) {
            setErrorMessage(
              err instanceof Error ? err.message : 'An unexpected error occurred.'
            );
          }
        },
        isEdit ? 'Updating Catalog...' : 'Publishing New Fabric to Catalog...',
        isEdit ? 'update' : 'create'
      );
    });
  };

  const handleDeleteProduct = () => {
    if (!initialProduct) return;
    setErrorMessage(null);

    startDeleteTransition(async () => {
      await withSkeleton(
        async () => {
          try {
            const res = await deleteProduct(initialProduct.id);
            if (res.success) {
              setConfirmDeleteOpen(false);
              router.push('/admin/products');
              router.refresh();
            } else {
              setErrorMessage(res.error || 'Failed to delete fabric listing.');
            }
          } catch (err) {
            setErrorMessage(
              err instanceof Error ? err.message : 'Failed to delete fabric listing.'
            );
          }
        },
        `Deleting "${initialProduct.name}" from Catalog...`,
        'delete'
      );
    });
  };

  return (
    <div className="relative">
      {/* Container-Level Form & Grid Skeleton Overlay during CRUD Mutation */}
      {showSkeletonState && (
        <div
          aria-hidden="true"
          className="mb-8 p-6 bg-neutral-900/95 border border-amber-900/30 space-y-6 animate-pulse"
        >
          <div className="flex items-center justify-between border-b border-amber-900/20 pb-4">
            <div className="h-4 w-56 bg-amber-950/50 border border-amber-900/30 rounded" />
            <div className="h-4 w-32 bg-neutral-800 border border-amber-900/20 rounded" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-11 w-full bg-neutral-800 border border-amber-900/20" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-11 w-full bg-neutral-800 border border-amber-900/20" />
                <div className="h-11 w-full bg-neutral-800 border border-amber-900/20" />
              </div>
              <div className="h-28 w-full bg-neutral-800 border border-amber-900/20" />
            </div>
            <div className="space-y-4">
              <div className="h-36 w-full bg-neutral-800 border border-amber-900/20" />
              <div className="h-12 w-full bg-amber-950/50 border border-amber-900/30" />
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Messages */}
        {errorMessage && (
          <div className="p-4 bg-red-950/40 border border-red-800 text-red-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-200 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Grid: Main Information & Image Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Core Attributes (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#111111] border border-[#222222] p-6 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#222222] text-[#C5A059] text-xs uppercase tracking-widest font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Catalog Specification</span>
              </div>

              {/* Title / Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-2 font-medium">
                  Fabric Title *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Imperial Superfine Egyptian Giza 120s"
                  className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] px-4 py-3 focus:outline-none focus:border-[#C5A059] transition-colors"
                />
                {fieldErrors.name && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {fieldErrors.name}
                  </span>
                )}
              </div>

              {/* Collection & Fabric Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-2 font-medium">
                    Royal Collection *
                  </label>
                  <select
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] px-4 py-3 focus:outline-none focus:border-[#C5A059] transition-colors"
                  >
                    {COLLECTIONS.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.subtitle})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-2 font-medium">
                    Fabric Type *
                  </label>
                  <input
                    type="text"
                    required
                    list="fabric-types-list"
                    value={fabricType}
                    onChange={(e) => setFabricType(e.target.value)}
                    placeholder="e.g. Egyptian Giza Cotton"
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] px-4 py-3 focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                  <datalist id="fabric-types-list">
                    {FABRIC_TYPES.map((ft) => (
                      <option key={ft} value={ft} />
                    ))}
                  </datalist>
                  {fieldErrors.fabricType && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {fieldErrors.fabricType}
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Strikethrough Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-2 font-medium">
                    Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 7850"
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] px-4 py-3 focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                  {fieldErrors.price && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {fieldErrors.price}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-2 font-medium">
                    Original Price (PKR Strikethrough)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="e.g. 9500 (Optional)"
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] px-4 py-3 focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                </div>
              </div>

              {/* Description (English) */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-2 font-medium">
                  Fabric Description &amp; Texture Notes (English) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the drape, weaving density, breathability, and feel of this fabric cut..."
                  className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] p-4 focus:outline-none focus:border-[#C5A059] transition-colors resize-y leading-relaxed"
                />
                {fieldErrors.description && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {fieldErrors.description}
                  </span>
                )}
              </div>

              {/* Description (Urdu / RTL) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-wider text-[#C5A059] font-medium">
                    Description (Urdu / تفصیل اردو میں)
                  </label>
                  <span className="text-[10px] uppercase tracking-widest text-[#777777]">
                    Optional · RTL Support
                  </span>
                </div>
                <textarea
                  rows={4}
                  dir="rtl"
                  name="descriptionUrdu"
                  value={descriptionUrdu}
                  onChange={(e) => setDescriptionUrdu(e.target.value)}
                  placeholder="کپڑے کی بناوٹ، نفاست اور معیار کی تفصیل اردو میں درج کریں..."
                  className="w-full bg-[#161616] border border-[#2A2A2A] text-sm sm:text-base text-[#F5F5F5] p-4 text-right font-serif focus:outline-none focus:border-[#C5A059] transition-colors resize-y leading-loose"
                />
                {fieldErrors.descriptionUrdu && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {fieldErrors.descriptionUrdu}
                  </span>
                )}
              </div>

              {/* Description (Arabic / RTL) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-wider text-[#C5A059] font-medium">
                    Description (Arabic / الوصف باللغة العربية)
                  </label>
                  <span className="text-[10px] uppercase tracking-widest text-[#777777]">
                    Optional · RTL Support
                  </span>
                </div>
                <textarea
                  rows={4}
                  dir="rtl"
                  name="descriptionArabic"
                  value={descriptionArabic}
                  onChange={(e) => setDescriptionArabic(e.target.value)}
                  placeholder="أدخل وصف القماش الفاخر والملمس والتفاصيل باللغة العربية..."
                  className="w-full bg-[#161616] border border-[#2A2A2A] text-sm sm:text-base text-[#F5F5F5] p-4 text-right font-serif focus:outline-none focus:border-[#C5A059] transition-colors resize-y leading-loose"
                />
                {fieldErrors.descriptionArabic && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {fieldErrors.descriptionArabic}
                  </span>
                )}
              </div>

              {/* Royal Tale / Heritage */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-2 font-medium">
                  Royal Tale / Heritage Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={royalTale}
                  onChange={(e) => setRoyalTale(e.target.value)}
                  placeholder="Narrative story of craftsmanship inspired by Mughal Lahore court artisans..."
                  className="w-full bg-[#161616] border border-[#2A2A2A] text-xs text-[#F5F5F5] p-3 focus:outline-none focus:border-[#C5A059] transition-colors resize-y"
                />
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-[#111111] border border-[#222222] p-6 space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#A5A5A5] font-medium pb-2 border-b border-[#222222]">
                Atelier Technical Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#888888] mb-1.5">
                    Cut Length / Meters
                  </label>
                  <input
                    type="text"
                    value={meters}
                    onChange={(e) => setMeters(e.target.value)}
                    placeholder='4.5 Meters (56" Width)'
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs text-[#F5F5F5] px-3.5 py-2.5 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#888888] mb-1.5">
                    Texture Finish
                  </label>
                  <input
                    type="text"
                    value={texture}
                    onChange={(e) => setTexture(e.target.value)}
                    placeholder="Silky crisp handfeel"
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs text-[#F5F5F5] px-3.5 py-2.5 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#888888] mb-1.5">
                    Recommended Occasion
                  </label>
                  <input
                    type="text"
                    value={recommendedUse}
                    onChange={(e) => setRecommendedUse(e.target.value)}
                    placeholder="Royal Festive & Formal Daily"
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs text-[#F5F5F5] px-3.5 py-2.5 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#888888] mb-1.5">
                    Care Instructions
                  </label>
                  <input
                    type="text"
                    value={careInstructions}
                    onChange={(e) => setCareInstructions(e.target.value)}
                    placeholder="Dry clean recommended."
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs text-[#F5F5F5] px-3.5 py-2.5 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Imagery & Controls (1 col) */}
          <div className="space-y-6">
            {/* Cloudinary Image Uploader Component */}
            <div className="bg-[#111111] border border-[#222222] p-6 space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#C5A059] font-medium pb-2 border-b border-[#222222] flex items-center justify-between">
                <span>Cloudinary Imagery</span>
                <span className="text-[10px] text-[#777777]">CDN Optimized</span>
              </h3>

              <ProductImageUploader images={images} onChange={setImages} />
            </div>

            {/* Visibility & Stock Controls */}
            <div className="bg-[#111111] border border-[#222222] p-6 space-y-5">
              <h3 className="text-xs uppercase tracking-widest text-[#A5A5A5] font-medium pb-2 border-b border-[#222222]">
                Inventory &amp; Visibility
              </h3>

              {/* In Stock Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#F5F5F5] font-medium">
                    Inventory Status
                  </span>
                  <span className="text-[10px] text-[#777777]">
                    {inStock
                      ? 'Available for client reservations'
                      : 'Marked as Out of Stock'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setInStock(!inStock)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    inStock ? 'bg-emerald-600' : 'bg-[#2A2A2A]'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      inStock ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Featured Product Toggle */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1C1C1C]">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#F5F5F5] font-medium">
                    Spotlight Feature
                  </span>
                  <span className="text-[10px] text-[#777777]">
                    Display in homepage royal showcase
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    isFeatured ? 'bg-[#C5A059]' : 'bg-[#2A2A2A]'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      isFeatured ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Form Action Controls */}
            <div className="bg-[#111111] border border-[#222222] p-6 space-y-3">
              <button
                type="submit"
                disabled={showSkeletonState}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 text-xs uppercase tracking-[0.2em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] disabled:opacity-50 transition-colors shadow-lg cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#080808]" />
                    <span>Saving to Neon DB...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-[#080808]" />
                    <span>{isEdit ? 'Update Fabric Listing' : 'Publish to Atelier'}</span>
                  </>
                )}
              </button>

              {isEdit && initialProduct && (
                <>
                  {!confirmDeleteOpen ? (
                    <button
                      type="button"
                      disabled={showSkeletonState}
                      onClick={() => setConfirmDeleteOpen(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs uppercase tracking-[0.18em] font-medium text-red-300 bg-red-950/30 border border-red-900/50 hover:bg-red-900/50 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Fabric Listing</span>
                    </button>
                  ) : (
                    <div className="p-3.5 bg-red-950/40 border border-red-800 space-y-3">
                      <p className="text-[11px] text-red-200 leading-relaxed">
                        Permanently delete <strong className="text-white">{initialProduct.name}</strong> from Neon DB &amp; Cloudinary?
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={showSkeletonState}
                          onClick={handleDeleteProduct}
                          className="flex-1 py-2 text-[11px] uppercase tracking-wider font-medium text-white bg-red-800 hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5"
                        >
                          {isDeletePending ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Deleting...</span>
                            </>
                          ) : (
                            <span>Confirm Delete</span>
                          )}
                        </button>
                        <button
                          type="button"
                          disabled={showSkeletonState}
                          onClick={() => setConfirmDeleteOpen(false)}
                          className="px-3 py-2 text-[11px] uppercase tracking-wider text-neutral-300 bg-neutral-900 border border-neutral-700 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              <Link
                href="/admin/products"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs uppercase tracking-[0.18em] font-medium text-[#999999] bg-[#161616] border border-[#2A2A2A] hover:text-[#F5F5F5] hover:border-[#444444] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cancel &amp; Return</span>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
