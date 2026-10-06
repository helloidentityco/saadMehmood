import React from 'react';

export default function BrandStatement() {
  return (
    <section className="py-20 lg:py-28 bg-[#0B0B0B] border-y border-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle royal crest icon or ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">
            DAUR-E-KHAAS · THE PHILOSOPHY
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.14em] uppercase text-[#F5F5F5] leading-relaxed mb-6 text-balance">
          &ldquo;THE CLOTH A MAN WEARS IS NEVER MERELY CLOTH. IT IS HIS STATURE. HIS INTEGRITY. HIS RIWAYAT.&rdquo;
        </h2>

        <div className="space-y-4 max-w-2xl mx-auto text-xs sm:text-sm text-[#A5A5A5] font-light leading-relaxed">
          <p>
            In an age when the grand darbars were adorned with silent authority, a nobleman&apos;s dignity was understood the instant he crossed the threshold. It lived in the disciplined fall of his garment, the tight weave of his warp, and the unwavering poise of unstitched cloth cut to perfection.
          </p>
          <p>
            Saad Mehmood  curates this timeless standard for the modern Pakistani man. Whether under the summer sun or in the solemn halls of an ancestral evening, our three royal chapters—comprising Egyptian cotton, high-twist wash & wear suiting, and authentic stiff latha—stand as testaments to enduring masculinity.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1C1C1C] flex items-center justify-center gap-6 text-[11px] uppercase tracking-[0.2em] text-[#777777]">
          <span>WAQAR</span>
          <span aria-hidden="true" className="text-[#C5A059]">·</span>
          <span>SHAN</span>
          <span aria-hidden="true" className="text-[#C5A059]">·</span>
          <span>VIRASAT</span>
          <span aria-hidden="true" className="text-[#C5A059]">·</span>
          <span>HUNAR</span>
        </div>
      </div>
    </section>
  );
}
