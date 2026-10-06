import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#1C1C1C] text-[#A5A5A5]">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-lg sm:text-xl font-light tracking-[0.22em] text-[#F5F5F5] uppercase block">
                SAAD MEHMOOD
              </span>
              
            </Link>

            <p className="text-xs text-[#888888] font-light leading-relaxed max-w-sm">
              Saad Mehmood represents the union of ancestral subcontinental grandeur and refined contemporary Pakistani menswear. Unstitched fabrics crafted for the man of distinction.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/saadmehmood.com.pk/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none border border-[#262626] bg-[#0E0E0E] flex items-center justify-center text-[#888888] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
                aria-label="Saad Mehmood  on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61588413467863"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none border border-[#262626] bg-[#0E0E0E] flex items-center justify-center text-[#888888] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
                aria-label="Saad Mehmood  on Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/923252109755"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none border border-[#262626] bg-[#0E0E0E] flex items-center justify-center text-[#888888] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
                aria-label="Saad Mehmood WhatsApp Concierge"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#F5F5F5] font-medium block">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/" className="hover:text-[#C5A059] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#collections" className="hover:text-[#C5A059] transition-colors">
                  Shop By Collection
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C5A059] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[#C5A059] transition-colors">
                  Order Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* The Royal Chapters */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#F5F5F5] font-medium block">
              COLLECTIONS
            </span>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/collections/haibat-majmua" className="hover:text-[#C5A059] transition-colors">
                  Haibat Majmua (Cotton)
                </Link>
              </li>
              <li>
                <Link href="/collections/mehrab-intikhab" className="hover:text-[#C5A059] transition-colors">
                  Mehrab Intikhab (Wash &amp; Wear)
                </Link>
              </li>
              <li>
                <Link href="/collections/raees-riwayat" className="hover:text-[#C5A059] transition-colors">
                  Raees Riwayat (Original Latha)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#F5F5F5] font-medium block">
              CLIENT SERVICES
            </span>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <span className="text-[#CCCCCC]">Direct Order Assistance:</span>
                <span className="block text-[#A5A5A5] text-[11px] mt-0.5">+92 (300) 847-1947</span>
              </li>
              <li>
                <span className="text-[#CCCCCC]">Nationwide Delivery:</span>
                <span className="block text-[#A5A5A5] text-[11px] mt-0.5">Free across Pakistan</span>
              </li>
              <li>
                <span className="text-[#CCCCCC]">Payment Method:</span>
                <span className="block text-[#A5A5A5] text-[11px] mt-0.5">Cash on Delivery (COD)</span>
              </li>
              <li>
                <span className="text-[#CCCCCC]">Standard Cut:</span>
                <span className="block text-[#A5A5A5] text-[11px] mt-0.5">4.5 Meters · 56&quot; Width</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#141414] bg-[#020202] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666] font-light">
          <p>
            &copy; {new Date().getFullYear()} SAAD MEHMOOD (saadmehmood.com.pk). All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
