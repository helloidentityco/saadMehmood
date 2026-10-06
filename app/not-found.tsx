import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center py-20 bg-[#080808]">
      <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-3 block">
        ERROR 404
      </span>
      <h1 className="text-2xl sm:text-4xl font-light tracking-[0.15em] uppercase text-[#F5F5F5] mb-4">
        FABRIC CHAPTER NOT FOUND
      </h1>
      <p className="text-xs sm:text-sm text-[#888888] font-light max-w-md mx-auto mb-8 leading-relaxed">
        The fabric cut or collection you are seeking may have been archived or relocated within our catalog.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>RETURN TO HOME</span>
      </Link>
    </div>
  );
}
