'use client';

import React from 'react';
import Link from 'next/link';
import { X, ChevronRight, ShieldCheck, PhoneCall } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <div className="relative w-4/5 max-w-sm bg-[#0E0E0E] border-r border-[#222222] p-6 flex flex-col justify-between z-10 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#222222]">
            <div className="flex flex-col">
              <span className="text-sm tracking-[0.2em] font-light text-[#F5F5F5] uppercase">
                SAAD MEHMOOD
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#A5A5A5] uppercase">
                FABRICS
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[#A5A5A5] hover:text-[#F5F5F5] p-1"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-6 space-y-5">
            <Link
              href="/"
              onClick={onClose}
              className="block text-xs uppercase tracking-[0.2em] text-[#F5F5F5] hover:text-[#C5A059] py-1 transition-colors"
            >
              HOME
            </Link>

            <div className="pt-2">
              <span className="text-[10px] tracking-[0.25em] text-[#777777] uppercase block mb-3">
                COLLECTIONS
              </span>

              <div className="space-y-3 pl-2 border-l border-[#222222]">
                <Link
                  href="/collections/haibat-majmua"
                  onClick={onClose}
                  className="flex items-center justify-between group py-1"
                >
                  <div>
                    <span className="text-xs uppercase tracking-[0.15em] text-[#E0E0E0] group-hover:text-[#C5A059] block">
                      HAIBAT MAJMUA
                    </span>
                    <span className="text-[10px] text-[#888888] font-light">
                      Premium Cotton · Dignity & Comfort
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-[#C5A059]" />
                </Link>

                <Link
                  href="/collections/mehrab-intikhab"
                  onClick={onClose}
                  className="flex items-center justify-between group py-1"
                >
                  <div>
                    <span className="text-xs uppercase tracking-[0.15em] text-[#E0E0E0] group-hover:text-[#C5A059] block">
                      MEHRAB INTIKHAB
                    </span>
                    <span className="text-[10px] text-[#888888] font-light">
                      Wash & Wear · Modern Sophistication
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-[#C5A059]" />
                </Link>

                <Link
                  href="/collections/raees-riwayat"
                  onClick={onClose}
                  className="flex items-center justify-between group py-1"
                >
                  <div>
                    <span className="text-xs uppercase tracking-[0.15em] text-[#E0E0E0] group-hover:text-[#C5A059] block">
                      RAEES RIWAYAT
                    </span>
                    <span className="text-[10px] text-[#888888] font-light">
                      Original Latha · Starch & Virasat
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-[#C5A059]" />
                </Link>
              </div>
            </div>

            <Link
              href="/about"
              onClick={onClose}
              className="block text-xs uppercase tracking-[0.2em] text-[#F5F5F5] hover:text-[#C5A059] pt-2 transition-colors"
            >
              ABOUT US
            </Link>

            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#C5A059] hover:text-[#D8B26E] pt-2 border-t border-[#1C1C1C] transition-colors"
            >
              <span>CLIENT ATELIER / SIGN IN</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-[#222222] space-y-3">
          <div className="flex items-center gap-2 text-[11px] text-[#A5A5A5]">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>100% Guaranteed Fabric Cut & Origin</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#A5A5A5]">
            <PhoneCall className="w-4 h-4 text-[#C5A059]" />
            <span>Concierge: +92 (300) 847-1947</span>
          </div>
        </div>
      </div>
    </div>
  );
}
