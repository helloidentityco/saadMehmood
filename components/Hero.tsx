import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_darbar.jpg"
          alt="Saad Mehmood - Pakistani Men's Traditional Shalwar Kameez in Royal Darbar Courtyard"
          fill
          priority
          className="object-cover object-center filter brightness-[0.72] contrast-[1.08]"
          sizes="100vw"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for WCAG AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/85 via-transparent to-[#080808]/85" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Subtle royal kicker */}
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#C5A059] font-medium mb-4 block">
          THE ROYAL DARBAR OF
        </span>

        {/* Brand Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.16em] uppercase text-[#F5F5F5] leading-tight mb-4 text-balance">
         <strong>SAAD MEHMOOD</strong>  
        </h1>

        <p className="text-sm sm:text-lg lg:text-xl font-light tracking-[0.2em] uppercase text-[#E5E5E5] mb-6 max-w-2xl text-balance">
          &ldquo;CRAFTED FOR THE MAN OF DISTINCTION&rdquo;
        </p>

        <p className="text-xs sm:text-sm text-[#A5A5A5] font-light max-w-xl leading-relaxed mb-10 text-balance">
          In an age where true presence is felt before a word is spoken, we weave the character, stature, and heritage of the modern Pakistani gentleman.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="#collections"
            className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-all duration-200 text-center whitespace-nowrap shadow-lg hover:shadow-[#C5A059]/20"
          >
            EXPLORE COLLECTIONS
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium text-[#F5F5F5] bg-transparent hover:bg-white/5 border border-[#3A3A3A] hover:border-[#C5A059] transition-all duration-200 text-center whitespace-nowrap flex items-center justify-center gap-2"
          >
            <span>DISCOVER OUR STORY</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </Link>
        </div>

        {/* Trust Markers Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full max-w-2xl grid grid-cols-3 gap-4 text-center">
          <div>
            <span className="block text-xs uppercase tracking-[0.15em] text-[#F5F5F5] font-medium">
              100% UNSTITCHED
            </span>
            <span className="text-[10px] text-[#888888] font-light mt-0.5 block">
              4.5m Full Suit Cut
            </span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-[0.15em] text-[#F5F5F5] font-medium">
              3 ROYAL CHAPTERS
            </span>
            <span className="text-[10px] text-[#888888] font-light mt-0.5 block">
              Cotton · Suiting · Latha
            </span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-[0.15em] text-[#F5F5F5] font-medium">
              CASH ON DELIVERY
            </span>
            <span className="text-[10px] text-[#888888] font-light mt-0.5 block">
              Across All Pakistan
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
