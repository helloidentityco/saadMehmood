'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/cart-context';

export default function CartDrawer() {
  const pathname = usePathname();
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, cartSubtotal, cartCount, isAdmin } = useCart();

  if (!isCartOpen || isAdmin || (pathname ? pathname.startsWith('/admin') : false)) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-[#0D0D0D] border-l border-[#222222] flex flex-col justify-between z-10 h-full shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm tracking-[0.2em] font-light text-[#F5F5F5] uppercase">
              SHOPPING BAG
            </span>
            <span className="text-xs text-[#C5A059] font-medium">
              ({cartCount} {cartCount === 1 ? 'Cut' : 'Cuts'})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="text-[#A5A5A5] hover:text-[#F5F5F5] p-1 transition-colors"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Alert */}
        <div className="bg-[#141414] px-6 py-2.5 border-b border-[#222222] flex items-center gap-2.5 text-xs text-[#A5A5A5]">
          <Truck className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>Free nationwide insured delivery on all orders</span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <p className="text-sm text-[#A5A5A5] font-light">
                Your shopping bag is currently empty.
              </p>
              <p className="text-xs text-[#666666] max-w-xs mx-auto">
                Explore our three royal chapters to select distinctive Shalwar Kameez fabrics.
              </p>
              <button
                onClick={closeCart}
                className="mt-4 inline-block px-6 py-2.5 text-xs tracking-[0.18em] uppercase text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-colors font-medium"
              >
                BROWSE COLLECTIONS
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 pb-6 border-b border-[#1C1C1C] last:border-b-0"
              >
                {/* Product Thumbnail */}
                <div className="relative w-20 h-24 bg-[#181818] border border-[#262626] shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-medium text-[#F5F5F5] tracking-wide line-clamp-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-[#666666] hover:text-red-400 transition-colors p-1"
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-[#888888]">
                      <span>{item.fabricType}</span>
                      <span aria-hidden="true">·</span>
                      <span>4.5m Cut</span>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#2B2B2B] bg-[#141414]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="px-2 py-1 text-[#A5A5A5] hover:text-[#F5F5F5] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-medium tabular-nums text-[#F5F5F5]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-2 py-1 text-[#A5A5A5] hover:text-[#F5F5F5] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-medium tabular-nums text-[#C5A059]">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#222222] bg-[#101010] space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#A5A5A5]">
                <span>Fabric Cuts Subtotal</span>
                <span className="tabular-nums text-[#F5F5F5]">
                  PKR {cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#A5A5A5]">
                <span>Express Nationwide Shipping</span>
                <span className="text-[#C5A059] uppercase tracking-wider text-[11px]">
                  FREE
                </span>
              </div>
              <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-sm font-medium text-[#F5F5F5]">
                <span className="tracking-[0.1em] uppercase">Total Amount</span>
                <span className="tabular-nums text-[#C5A059] text-base">
                  PKR {cartSubtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-all duration-200"
            >
              <span>PROCEED TO ORDER</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#777777] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Cash on Delivery Available Across Pakistan</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
