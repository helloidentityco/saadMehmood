import React from 'react';
import { Sparkles } from 'lucide-react';

interface BilingualDescriptionTabsProps {
  description?: string | null;
  descriptionUrdu?: string | null;
  description_urdu?: string | null;
  descriptionArabic?: string | null;
  description_arabic?: string | null;
  royalTale?: string | null;
}

export default function BilingualDescriptionTabs({
  description,
  descriptionUrdu,
  description_urdu,
  descriptionArabic,
  description_arabic,
  royalTale,
}: BilingualDescriptionTabsProps) {
  const englishText = description?.trim() || '';
  const urduText = (descriptionUrdu ?? description_urdu)?.trim() || '';
  const arabicText = (descriptionArabic ?? description_arabic)?.trim() || '';
  const taleText = royalTale?.trim() || '';

  if (!englishText && !urduText && !arabicText && !taleText) {
    return null;
  }

  return (
    <div className="bg-[#111111] border border-[#222222] p-5 sm:p-6 space-y-4">
      <div className="space-y-4">
        {/* 1. English Description */}
        {Boolean(englishText) && (
          <div dir="ltr" className="text-left">
            <p className="text-xs uppercase tracking-wider text-amber-500/70 mb-1">
              Description (English)
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {englishText}
            </p>
          </div>
        )}

        {/* 2. Urdu Description */}
        {Boolean(urduText) && (
          <div
            dir="rtl"
            className={`text-right ${
              englishText ? 'pt-3 border-t border-neutral-800/60' : ''
            }`}
          >
            <p className="text-xs text-amber-500/70 mb-1">تفصیل (اردو)</p>
            <p className="text-sm text-neutral-300 leading-relaxed font-serif">
              {urduText}
            </p>
          </div>
        )}

        {/* 3. Arabic Description */}
        {Boolean(arabicText) && (
          <div
            dir="rtl"
            className={`text-right ${
              englishText || urduText ? 'pt-3 border-t border-neutral-800/60' : ''
            }`}
          >
            <p className="text-xs text-amber-500/70 mb-1">الوصف (العربية)</p>
            <p className="text-sm text-neutral-300 leading-relaxed font-serif">
              {arabicText}
            </p>
          </div>
        )}
      </div>

      {/* Royal Tale Excerpt if provided */}
      {Boolean(taleText) && (
        <div className="pt-4 border-t border-neutral-800/60 flex items-start gap-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium block mb-0.5">
              THE DARBAR CHRONICLE
            </span>
            <p className="text-xs text-[#A5A5A5] font-light italic leading-relaxed">
              &ldquo;{taleText}&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
