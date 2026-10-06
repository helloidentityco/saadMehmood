import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function BrandStoryPreview() {
  return (
    <section className="py-24 lg:py-32 bg-[#080808] border-t border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
              THE HERITAGE OF PRESENCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-light tracking-[0.14em] uppercase text-[#F5F5F5] leading-tight text-balance">
              OLD-WORLD ROYALTY MEETS MODERN PAKISTANI MENSWEAR.
            </h2>
            <div className="h-[1px] w-14 bg-[#C5A059]" />

            <div className="space-y-4 text-xs sm:text-sm text-[#A5A5A5] font-light leading-relaxed">
              <p>
                Our objective is not simply to present fabric. Our objective is to awaken the recognition that when a man selects his cloth, he is choosing the character of the gentleman he presents to the world.
              </p>
              <p>
                From the historical textile hubs of Pakistan to contemporary tailoring ateliers, Saad Mehmood honors the heritage of Shalwar Kameez — elevating it into an art form where cut, density, and finish coalesce into pure distinction.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-colors"
              >
                <span>READ THE FULL CHAPTER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto overflow-hidden border border-[#262626] bg-[#141414] shadow-2xl">
              <Image
                src="/images/raees_latha.jpg"
                alt="Saad Mehmood - Heritage Shalwar Kameez craftsmanship"
                fill
                className="object-cover object-center filter brightness-[0.88]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#0E0E0E]/90 border border-[#2A2A2A] backdrop-blur-sm">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block">
                  TRADITION PRESERVED
                </span>
                <p className="text-xs text-[#E0E0E0] font-light mt-1">
                  &ldquo;A man’s stature is reflected in the integrity of his cloth.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
