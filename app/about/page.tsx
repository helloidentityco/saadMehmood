import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Feather, Compass, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Us | The Fabric of Distinction | Saad Mehmood',
  description:
    'Discover the philosophy, royal inspirations, and unyielding standards behind Saad Mehmood — where old-world nobility meets contemporary Pakistani menswear.',
  openGraph: {
    title: 'About Us | Saad Mehmood',
    description:
      'Fabric is more than material. It is identity, tradition, confidence, craftsmanship, and culture.',
  },
};

export default function AboutPage() {
  return (
    <div className="w-full bg-[#080808]">
      {/* Editorial Hero */}
      <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0F0F0F]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_darbar.jpg"
            alt="Saad Mehmood Heritage and Craftsmanship"
            fill
            priority
            className="object-cover object-center filter brightness-[0.55] contrast-[1.1]"
            sizes="100vw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A059] font-medium mb-3 block">
            THE CHRONICLE OF SAAD MEHMOOD
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.16em] uppercase text-[#F5F5F5] mb-4 text-balance">
            THE FABRIC OF DISTINCTION
          </h1>

          <div className="h-[1px] w-16 bg-[#C5A059] mx-auto mb-6" />

          <p className="text-sm sm:text-base text-[#D0D0D0] font-light max-w-2xl mx-auto leading-relaxed text-balance">
            Where ancestral subcontinental stature inspires the wardrobe of the contemporary Pakistani gentleman.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'ABOUT US' }]} />

        {/* SECTION 1: OUR PHILOSOPHY */}
        <section className="py-12 border-b border-[#1C1C1C]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-1">
                SECTION 01
              </span>
              <h2 className="text-xl sm:text-2xl font-light tracking-[0.15em] uppercase text-[#F5F5F5]">
                OUR PHILOSOPHY
              </h2>
            </div>

            <div className="md:col-span-8 space-y-4 text-xs sm:text-sm text-[#A5A5A5] font-light leading-relaxed">
              <p className="text-sm sm:text-base text-[#F5F5F5] font-normal leading-relaxed">
                Saad Mehmood  is built upon a single enduring conviction: fabric is never merely cloth. It is a man&apos;s identity, his tradition, his confidence, his craftsmanship, and his culture.
              </p>
              <p>
                In the grand darbars of our ancestors, a man did not need to shout to establish authority. His presence was conveyed through the solemn fall of his robe, the crispness of his collar, and the quiet dignity of his carriage.
              </p>
              <p>
                When a gentleman chooses unstitched cloth from our house, he is not merely procuring yardage; he is selecting the exact tone of his presence in the gatherings of family, state, and commerce.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE THREE ROYAL CHAPTERS */}
        <section className="py-16 border-b border-[#1C1C1C]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-2">
              CURATED EXPRESSIONS
            </span>
            <h2 className="text-xl sm:text-3xl font-light tracking-[0.15em] uppercase text-[#F5F5F5]">
              THE THREE ROYAL CHAPTERS
            </h2>
            <div className="h-[1px] w-12 bg-[#C5A059]/60 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chapter 1 */}
            <div className="bg-[#111111] border border-[#222222] p-6 space-y-3">
              <span className="text-[10px] font-mono text-[#C5A059] tracking-wider block">
                CHAPTER I
              </span>
              <h3 className="text-sm font-medium tracking-[0.12em] uppercase text-[#F5F5F5]">
                HAIBAT MAJMUA
              </h3>
              <span className="text-[11px] text-[#888888] uppercase block">
                Premium Combed Cotton
              </span>
              <p className="text-xs text-[#A5A5A5] font-light leading-relaxed">
                Understated royal dignity. Designed for effortless comfort, natural breathability, and timeless Pakistani presence in every gathering.
              </p>
            </div>

            {/* Chapter 2 */}
            <div className="bg-[#111111] border border-[#222222] p-6 space-y-3">
              <span className="text-[10px] font-mono text-[#C5A059] tracking-wider block">
                CHAPTER II
              </span>
              <h3 className="text-sm font-medium tracking-[0.12em] uppercase text-[#F5F5F5]">
                MEHRAB INTIKHAB
              </h3>
              <span className="text-[11px] text-[#888888] uppercase block">
                High-Twist Wash &amp; Wear
              </span>
              <p className="text-xs text-[#A5A5A5] font-light leading-relaxed">
                Where royal tradition meets modern practicality. A fluid, crease-resistant drape engineered for men navigating high-stakes days with absolute ease.
              </p>
            </div>

            {/* Chapter 3 */}
            <div className="bg-[#111111] border border-[#222222] p-6 space-y-3">
              <span className="text-[10px] font-mono text-[#C5A059] tracking-wider block">
                CHAPTER III
              </span>
              <h3 className="text-sm font-medium tracking-[0.12em] uppercase text-[#F5F5F5]">
                RAEES RIWAYAT
              </h3>
              <span className="text-[11px] text-[#888888] uppercase block">
                Original Heritage Latha
              </span>
              <p className="text-xs text-[#A5A5A5] font-light leading-relaxed">
                Deeply rooted in generational heritage. Traditional crisp starch finish and unmistakable rustle that has defined patriarchal grandeur across decades.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: OUR FABRICS */}
        <section className="py-16 border-b border-[#1C1C1C]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 relative aspect-[4/3] bg-[#141414] border border-[#242424] overflow-hidden">
              <Image
                src="/images/fabric_texture.jpg"
                alt="Saad Mehmood Close-Up Weaving Texture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:col-span-7 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
                SECTION 02
              </span>
              <h2 className="text-xl sm:text-2xl font-light tracking-[0.15em] uppercase text-[#F5F5F5]">
                OUR FABRICS &amp; STANDARDS
              </h2>
              <p className="text-xs sm:text-sm text-[#A5A5A5] font-light leading-relaxed">
                We work exclusively with unadulterated cotton staples and precision micro-yarns. Each cut is carefully inspected for uniform yarn density, warp tension, and true color immersion.
              </p>
              <div className="space-y-2 pt-2 text-xs text-[#CCCCCC]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>Standard 4.5 Meter Shalwar Kameez cuts with generous 56-inch widths.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>Colorfast dyeing techniques that resist fading across long subcontinental summers.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>Natural thermal adaptation for warm days and cool evenings.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: OUR COMMITMENT */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-1">
                SECTION 03
              </span>
              <h2 className="text-xl sm:text-2xl font-light tracking-[0.15em] uppercase text-[#F5F5F5]">
                OUR COMMITMENT
              </h2>
            </div>

            <div className="md:col-span-8 space-y-4 text-xs sm:text-sm text-[#A5A5A5] font-light leading-relaxed">
              <p>
                Our promise to every client across Pakistan is absolute transparency. What you see in our editorial presentations matches the physical cloth delivered to your doorstep.
              </p>
              <p>
                Each fabric cut is packed by hand into our rigid, gold-embossed presentation box, complete with fabric care seals. With free nationwide delivery and physical Cash on Delivery verification, your confidence in Saad Mehmood is our foremost honor.
              </p>

              <div className="pt-6">
                <Link
                  href="/#collections"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-colors"
                >
                  <span>BROWSE THE ROYAL CATALOG</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
