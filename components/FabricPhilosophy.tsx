import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, Feather, ShieldCheck } from 'lucide-react';

export default function FabricPhilosophy() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#090909] overflow-hidden border-t border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Editorial Image with Close-up Weave */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-[#262626] bg-[#141414] shadow-2xl">
              <Image
                src="/images/fabric_texture.jpg"
                alt="Saad Mehmood - Extreme close-up of luxury woven cotton and selvedge threads"
                fill
                className="object-cover object-center filter brightness-[0.9] contrast-[1.05]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Inset Label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-[#E5E5E5] border-t border-white/20 pt-3">
                <span className="tracking-[0.2em] uppercase font-light text-[#D8B26E]">
                  HIGH DENSITY WEAVE
                </span>
                <span className="tracking-wider uppercase text-[10px] text-[#A5A5A5]">
                  4.5M STANDARD SHALWAR KAMEEZ CUT
                </span>
              </div>
            </div>

            {/* Overlapping Decorative Badge */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#121212] border border-[#2E2E2E] p-5 shadow-2xl max-w-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block mb-1">
                PURITY IN THREAD
              </span>
              <p className="text-xs text-[#A5A5A5] font-light leading-relaxed">
                Every meter undergoes rigorous grain inspection and crease memory testing before release.
              </p>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
                TEXTILE ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-4xl font-light tracking-[0.14em] uppercase text-[#F5F5F5] leading-tight text-balance">
                THE DIFFERENCE IS IN THE FABRIC.
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#A5A5A5] font-light leading-relaxed">
              &ldquo;From the softness of premium cotton to the practicality of wash &amp; wear and the heritage of original Latha, every collection is selected to give the modern man a fabric worthy of his presence.&rdquo;
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <Feather className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.15em] text-[#F5F5F5] font-medium">
                    Breathability &amp; Micro-Air Pores
                  </h4>
                  <p className="text-xs text-[#888888] font-light mt-0.5 leading-relaxed">
                    Engineered for the intense subcontinental summer, allowing effortless air exchange without compromising opacity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Compass className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.15em] text-[#F5F5F5] font-medium">
                    Noble Stature &amp; Clean Fall
                  </h4>
                  <p className="text-xs text-[#888888] font-light mt-0.5 leading-relaxed">
                    Calculated weight balance ensures Kameez fronts hang straight and collars maintain their structure through daylong wear.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.15em] text-[#F5F5F5] font-medium">
                    Heirloom Craftsmanship
                  </h4>
                  <p className="text-xs text-[#888888] font-light mt-0.5 leading-relaxed">
                    Colour-fast reactive dyes ensure deep black stays black and crisp white resists yellowing through generational laundering.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#C5A059] hover:text-[#D8B26E] transition-colors"
              >
                <span>READ ABOUT OUR WEAVING STANDARDS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
