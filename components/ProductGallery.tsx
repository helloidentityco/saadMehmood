'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  primaryImage: string;
  secondaryImage?: string;
  productName: string;
}

export default function ProductGallery({
  primaryImage,
  secondaryImage,
  productName,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(primaryImage);

  const images = [primaryImage, secondaryImage].filter(Boolean) as string[];

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-3 shrink-0">
          {images.map((img, idx) => {
            const isSelected = selectedImage === img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-[#141414] border transition-all overflow-hidden ${
                  isSelected ? 'border-[#C5A059] ring-1 ring-[#C5A059]' : 'border-[#262626] opacity-70 hover:opacity-100'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  referrerPolicy="no-referrer"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Image Frame */}
      <div className="relative w-full min-h-[360px] aspect-[3/4] flex-1 bg-[#141414] border border-[#262626] overflow-hidden shadow-2xl">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
          referrerPolicy="no-referrer"
        />

        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8B26E] font-medium bg-black/75 px-2.5 py-1 border border-[#3A3018]">
            ORIGINAL UNSTITCHED FABRIC CUT
          </span>
        </div>
      </div>
    </div>
  );
}
