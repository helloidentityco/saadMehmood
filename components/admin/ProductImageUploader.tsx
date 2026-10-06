'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { uploadProductImage } from '@/actions/admin-products';
import { useLoading } from '@/components/providers/LoadingContext';

interface ProductImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ProductImageUploader({ images, onChange }: ProductImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { withSkeleton } = useLoading();

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    await withSkeleton(
      async () => {
        const uploadedUrls: string[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (!file.type.startsWith('image/')) {
            setUploadError(`File "${file.name}" is not an image.`);
            continue;
          }

          const formData = new FormData();
          formData.append('file', file);

          try {
            const res = await uploadProductImage(formData);
            if (res.success && res.url) {
              uploadedUrls.push(res.url);
            } else {
              setUploadError(res.error || `Failed to upload "${file.name}" to Cloudinary.`);
            }
          } catch (err) {
            setUploadError(err instanceof Error ? err.message : 'Error uploading image.');
          }
        }

        if (uploadedUrls.length > 0) {
          onChange([...images, ...uploadedUrls]);
        }
      },
      'Uploading Media to Cloudinary CDN...',
      'upload'
    );

    setIsUploading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-none p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#C5A059] bg-[#C5A059]/10'
            : 'border-[#262626] bg-[#0E0E0E] hover:border-[#C5A059]/60 hover:bg-[#141414]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          disabled={isUploading}
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin mb-2" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                Uploading to Cloudinary CDN...
              </p>
              <span className="text-[10px] text-[#777777]">Streaming image buffer securely</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-[#161616] border border-[#2E2E2E] flex items-center justify-center text-[#C5A059] mb-1">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#F5F5F5] font-medium">
                Drag &amp; Drop or <span className="text-[#C5A059] underline">Click to Upload</span>
              </p>
              <p className="text-[10px] text-[#777777] tracking-wider uppercase">
                High-Resolution JPEG, PNG, WEBP · Max 8MB
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#999999]">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>Target: saad-mehmood-fabrics/products</span>
              </div>
            </>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs">
          {uploadError}
        </div>
      )}

      {/* Image Previews Grid */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#888888]">
            <span>Uploaded Product Imagery ({images.length})</span>
            <span className="text-[10px] text-[#C5A059]">First image is Primary</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((url, idx) => (
              <div
                key={`${url}-${idx}`}
                className="group relative aspect-[3/4] bg-[#141414] border border-[#222222] overflow-hidden"
              >
                <Image
                  src={url}
                  alt={`Product view ${idx + 1}`}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Primary Badge */}
                {idx === 0 && (
                  <div className="absolute top-1.5 left-1.5 bg-[#C5A059] text-[#080808] text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 shadow">
                    Primary
                  </div>
                )}

                {/* Cloudinary Indicator */}
                {url.includes('res.cloudinary.com') && (
                  <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur text-emerald-400 text-[8px] uppercase tracking-wider px-1.5 py-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Cloudinary</span>
                  </div>
                )}

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute top-1.5 right-1.5 bg-black/80 hover:bg-red-900 text-[#E5E5E5] p-1 transition-colors"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
