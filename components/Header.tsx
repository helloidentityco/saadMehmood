'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, ChevronDown, User } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import MobileMenu from './MobileMenu';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const pathname = usePathname();
  const { cartCount, mounted, isAdmin, openCart, openSearch } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCurrentAdmin = isAdmin || (pathname ? pathname.startsWith('/admin') : false);
  const displayCount = mounted && !isCurrentAdmin ? cartCount : 0;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#222222] py-3.5 shadow-2xl'
            : 'bg-[#080808] border-b border-[#181818] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Mobile Hamburger & Brand Wordmark */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-[#F5F5F5] hover:text-[#C5A059] transition-colors p-1"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link
                href="/"
                className="flex flex-col group text-left"
                aria-label="Saad Mehmood Home"
              >
                <Image src="/images/SAAD-LOGO.png" alt="Saad Mehmood" width={70} height={30}  />
              </Link>
            </div>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              <Link
                href="/"
                className={`text-xs uppercase tracking-[0.18em] transition-colors hover:text-[#C5A059] ${
                  pathname === '/' ? 'text-[#C5A059] font-medium' : 'text-[#CCCCCC]'
                }`}
              >
                HOME
              </Link>

              {/* Collections with Dropdown */}
              <div
                className="relative py-2"
                onMouseEnter={() => setIsCollectionsHovered(true)}
                onMouseLeave={() => setIsCollectionsHovered(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] transition-colors hover:text-[#C5A059] ${
                    pathname.startsWith('/collections') ? 'text-[#C5A059] font-medium' : 'text-[#CCCCCC]'
                  }`}
                  aria-expanded={isCollectionsHovered}
                >
                  <span>COLLECTIONS</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCollectionsHovered ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isCollectionsHovered && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-[#121212] border border-[#262626] shadow-2xl py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-[#222222]">
                      <span className="text-[10px] tracking-[0.25em] text-[#888888] uppercase block">
                        THE ROYAL CHAPTERS
                      </span>
                    </div>

                    <Link
                      href="/collections/haibat-majmua"
                      className="group flex flex-col px-4 py-2.5 hover:bg-[#181818] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-[0.12em] text-[#F5F5F5] group-hover:text-[#C5A059] font-medium">
                          HAIBAT MAJMUA
                        </span>
                        <span className="text-[10px] text-[#A5A5A5] font-light">
                          Cotton
                        </span>
                      </div>
                      <span className="text-[11px] text-[#777777] font-light mt-0.5 line-clamp-1">
                        Understated royal dignity & comfort
                      </span>
                    </Link>

                    <Link
                      href="/collections/mehrab-intikhab"
                      className="group flex flex-col px-4 py-2.5 hover:bg-[#181818] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-[0.12em] text-[#F5F5F5] group-hover:text-[#C5A059] font-medium">
                          MEHRAB INTIKHAB
                        </span>
                        <span className="text-[10px] text-[#A5A5A5] font-light">
                          Wash & Wear
                        </span>
                      </div>
                      <span className="text-[11px] text-[#777777] font-light mt-0.5 line-clamp-1">
                        Crease-resistant fluid suiting
                      </span>
                    </Link>

                    <Link
                      href="/collections/raees-riwayat"
                      className="group flex flex-col px-4 py-2.5 hover:bg-[#181818] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-[0.12em] text-[#F5F5F5] group-hover:text-[#C5A059] font-medium">
                          RAEES RIWAYAT
                        </span>
                        <span className="text-[10px] text-[#A5A5A5] font-light">
                          Original Latha
                        </span>
                      </div>
                      <span className="text-[11px] text-[#777777] font-light mt-0.5 line-clamp-1">
                        Heirloom starch finish & prestige
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`text-xs uppercase tracking-[0.18em] transition-colors hover:text-[#C5A059] ${
                  pathname === '/about' ? 'text-[#C5A059] font-medium' : 'text-[#CCCCCC]'
                }`}
              >
                ABOUT US
              </Link>
            </nav>

            {/* Zone 3: Interactive Affordances (Search, Account, Shopping Bag) */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={openSearch}
                className="text-[#F5F5F5] hover:text-[#C5A059] transition-colors p-1.5"
                aria-label="Search fabric collections"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <Link
                href="/account"
                className="text-[#F5F5F5] hover:text-[#C5A059] transition-colors p-1.5"
                aria-label="Client Atelier & Account"
                title="Client Atelier & Sign In"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              {/* Admin Portal Indicator when authenticated as Admin */}
              {isCurrentAdmin && (
                <Link
                  href="/admin"
                  className="hidden sm:inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] px-2.5 py-1 transition-colors"
                >
                  ADMIN
                </Link>
              )}

              {/* Shopping Bag Button (completely isolated & hidden for Admin) */}
              {!isCurrentAdmin && (
                <button
                  type="button"
                  onClick={openCart}
                  className="relative text-[#F5F5F5] hover:text-[#C5A059] transition-colors p-1.5"
                  aria-label={
                    mounted
                      ? `Shopping bag containing ${displayCount} items`
                      : 'Shopping bag containing 0 items'
                  }
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  {mounted && displayCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-semibold text-[#080808] bg-[#C5A059] rounded-full">
                      {displayCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
