import React from 'react';
import Link from 'next/link';
import { ArrowRight, PackageCheck, Shield, Clock } from 'lucide-react';

export default function HomeCta() {
  return (
    <section className="py-20 lg:py-24 bg-[#0A0A0A] border-t border-[#1C1C1C] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-3 block">
          COMMENCE YOUR BESPOKE WARDROBE
        </span>

        <h2 className="text-2xl sm:text-4xl font-light tracking-[0.16em] uppercase text-[#F5F5F5] mb-4 text-balance">
          EXPERIENCE THE FABRIC OF DISTINCTION
        </h2>

        <p className="text-xs sm:text-sm text-[#A5A5A5] font-light max-w-xl mx-auto mb-8 leading-relaxed text-balance">
          Every piece is carefully measured to a generous 4.5 meters, packaged in our signature gold-embossed presentation box, and delivered anywhere in Pakistan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#collections"
            className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-all duration-200"
          >
            EXPLORE THE THREE CHAPTERS
          </Link>
          <Link
            href="/checkout"
            className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F5F5] bg-[#141414] border border-[#2E2E2E] hover:border-[#C5A059] transition-all duration-200"
          >
            DIRECT ORDER FORM
          </Link>
        </div>

        {/* Guarantees */}
        <div className="mt-14 pt-8 border-t border-[#1C1C1C] grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="flex items-center gap-3">
            <PackageCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-[#F5F5F5] block">
                Full 4.5 Meter Cut
              </span>
              <span className="text-[11px] text-[#777777] block">
                Generous 56&quot; width for any tailoring style
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-[#F5F5F5] block">
                Original Authenticity
              </span>
              <span className="text-[11px] text-[#777777] block">
                100% verified weave and unadulterated cotton
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-[#F5F5F5] block">
                2-4 Days Delivery
              </span>
              <span className="text-[11px] text-[#777777] block">
                Swift dispatch via top courier networks
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
