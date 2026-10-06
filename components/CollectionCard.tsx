import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CollectionCardProps {
  slug: string;
  name: string;
  fabricType: string;
  description: string;
  tagline: string;
  image: string;
  index: number;
}

export default function CollectionCard({
  slug,
  name,
  fabricType,
  description,
  tagline,
  image,
  index,
}: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${slug}`}
      className="group relative flex flex-col bg-[#111111] border border-[#222222] hover:border-[#444444] transition-all duration-500 overflow-hidden"
    >
      {/* Visual Image container with 3:4 aspect ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#181818]">
        <Image
          src={image}
          alt={`${name} - ${fabricType} by Saad Mehmood`}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
          sizes="(max-width: 768px) 100vw, 33vw"
          referrerPolicy="no-referrer"
        />

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/40 to-transparent" />

        {/* Chapter Index Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8B26E] font-medium bg-black/70 px-2.5 py-1 border border-[#3A3018]">
            CHAPTER 0{index + 1}
          </span>
        </div>

        {/* Fabric Type Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[10px] tracking-[0.18em] uppercase text-[#CCCCCC] font-light bg-black/60 px-2 py-0.5 border border-white/10">
            {fabricType}
          </span>
        </div>

        {/* Bottom Editorial Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A059] font-medium mb-1 block">
            {tagline}
          </span>
          <h3 className="text-xl sm:text-2xl font-light tracking-[0.15em] uppercase text-[#F5F5F5] group-hover:text-[#C5A059] transition-colors mb-2">
            {name}
          </h3>
          <p className="text-xs text-[#A5A5A5] font-light line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>

          {/* CTA affordance */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F5F5] group-hover:text-[#C5A059] transition-colors pt-2 border-t border-white/15">
            <span>EXPLORE COLLECTION</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300 text-[#C5A059]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
