'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, ArrowLeft, CheckCircle2, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useLoading } from '@/components/providers/LoadingContext';
import { submitOrderAction, type OrderFormState } from '@/app/actions/order';

const MAJOR_PAKISTANI_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Peshawar',
  'Multan',
  'Gujranwala',
  'Sialkot',
  'Quetta',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Gujrat',
  'Wah Cantt',
  'Mardan',
  'Kasur',
];

export default function CheckoutForm() {
  const { cart, isLoaded, cartSubtotal, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const { withSkeleton } = useLoading();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    city: 'Lahore',
    completeAddress: '',
    notes: '',
  });

  const [orderResult, setOrderResult] = useState<OrderFormState | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (cart.length === 0) {
      setFormError('Your shopping bag is empty. Please add fabrics before placing an order.');
      return;
    }

    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.completeAddress.trim()) {
      setFormError('Please fill in your name, contact phone number, and complete delivery address.');
      return;
    }

    startTransition(async () => {
      await withSkeleton(
        async () => {
          const payload = {
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            city: formData.city,
            completeAddress: formData.completeAddress,
            notes: formData.notes,
            items: cart.map((item) => ({
              productId: item.productId,
              productName: item.name,
              fabricType: item.fabricType,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            })),
          };

          try {
            const res = await submitOrderAction(payload);
            if (res?.error) {
              setFormError(res.error);
            } else if (res?.success) {
              setOrderResult(res);
              clearCart();
            }
          } catch (err) {
            setFormError(
              err instanceof Error
                ? err.message
                : 'Unable to submit order right now. Please try again.'
            );
          }
        },
        'Processing Order Reservation...',
        'checkout'
      );
    });
  };

  // SUCCESS CONFIRMATION STATE
  if (orderResult?.success) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-[#181818] border border-[#C5A059] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
          RESERVATION CONFIRMED
        </span>

        <h1 className="text-2xl sm:text-3xl font-light tracking-[0.15em] uppercase text-[#F5F5F5] mb-3">
          ORDER REQUEST RECEIVED
        </h1>

        <p className="text-xs sm:text-sm text-[#A5A5A5] font-light max-w-md mx-auto mb-8 leading-relaxed">
          Thank you, <span className="text-[#F5F5F5] font-medium">{orderResult.orderSummary?.fullName}</span>. Your order request has been securely recorded in our system.
        </p>

        {/* Order Details Receipt Box */}
        <div className="bg-[#111111] border border-[#222222] p-6 text-left mb-8 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1C]">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#777777] block">Order Tracking ID</span>
              <span className="text-sm sm:text-base font-mono font-medium text-[#C5A059]">{orderResult.orderId}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#777777] block">Payment Terms</span>
              <span className="text-xs text-[#E5E5E5] font-medium">Cash on Delivery</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#CCCCCC]">
            <span>Delivery Destination:</span>
            <span className="text-[#F5F5F5] font-medium">{orderResult.orderSummary?.city}, Pakistan</span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#CCCCCC]">
            <span>Packaging:</span>
            <span className="text-[#C5A059]">Signature Gold-Embossed Presentation Box</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#1C1C1C] text-sm">
            <span className="text-[#F5F5F5] uppercase tracking-wider text-xs">Total Amount Due</span>
            <span className="text-[#C5A059] font-medium tabular-nums text-base">
              PKR {orderResult.orderSummary?.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* WhatsApp & Home Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/923252109755?text=Hello%20Saad%20Mehmood%20Fabrics,%20I%20have%20placed%20Order%20${orderResult.orderId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>CONFIRM VIA WHATSAPP</span>
          </a>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium text-[#F5F5F5] bg-[#141414] border border-[#2E2E2E] hover:border-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO HOME</span>
          </Link>
        </div>
      </div>
    );
  }

  // LOADING INITIAL CART FROM LOCALSTORAGE GUARD
  if (!isLoaded) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#C5A059] mx-auto mb-3" />
        <span className="text-xs uppercase tracking-widest text-[#888888]">
          Reviewing Atelier bag...
        </span>
      </div>
    );
  }

  // EMPTY CART GUARD
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-light tracking-[0.16em] uppercase text-[#F5F5F5] mb-3">
          YOUR BAG IS EMPTY
        </h2>
        <p className="text-xs text-[#888888] mb-6">
          Please select your preferred Shalwar Kameez fabrics from our collections before proceeding to order.
        </p>
        <Link
          href="/#collections"
          className="inline-block px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-colors"
        >
          BROWSE ROYAL CHAPTERS
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#888888] hover:text-[#C5A059] transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>CONTINUE SHOPPING</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.14em] uppercase text-[#F5F5F5]">
          COMPLETE YOUR ORDER
        </h1>
        <p className="text-xs text-[#888888] font-light mt-1">
          Cash on delivery nationwide · Insured parcel shipping
        </p>
      </div>

      {formError && (
        <div className="mb-6 p-4 bg-red-950/40 border border-red-800 text-xs text-red-200 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{formError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left: Customer Information Form */}
        <div className="lg:col-span-7 bg-[#111111] border border-[#222222] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-4">
                01. RECIPIENT &amp; CONTACT
              </span>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g., Chaudhry Tariq Mehmood"
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] px-4 py-2.5 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-1.5">
                      Phone Number (for Courier &amp; SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] px-4 py-2.5 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] px-4 py-2.5 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1C1C1C]">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-4">
                02. DELIVERY DESTINATION
              </span>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-1.5">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] px-4 py-2.5 focus:outline-none focus:border-[#C5A059] cursor-pointer"
                  >
                    {MAJOR_PAKISTANI_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="Other City">Other City (Specify in address)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-1.5">
                    Complete Street Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.completeAddress}
                    onChange={(e) => setFormData({ ...formData, completeAddress: e.target.value })}
                    placeholder="House / Bungalow Number, Street, Sector / Area, Landmark..."
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] px-4 py-2.5 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-1.5">
                    Tailoring / Delivery Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special instructions for courier delivery or gift packaging..."
                    className="w-full bg-[#161616] border border-[#2A2A2A] text-xs text-[#F5F5F5] px-4 py-2 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1C1C1C]">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-2">
                03. PAYMENT METHOD
              </span>
              <div className="p-4 bg-[#161616] border border-[#2E2E2E] flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-[#F5F5F5] uppercase tracking-wider block">
                    Cash on Delivery (Nationwide COD)
                  </span>
                  <span className="text-[11px] text-[#888888] font-light">
                    Pay the courier safely upon physical delivery of your fabric cuts
                  </span>
                </div>
                <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 px-6 text-xs uppercase tracking-[0.22em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#080808]" />
                  <span>RECORDING ORDER IN DATABASE...</span>
                </>
              ) : (
                <span>PLACE ORDER (PKR {cartSubtotal.toLocaleString()})</span>
              )}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111111] border border-[#222222] p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1C]">
              <span className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5] font-medium">
                BAG SUMMARY ({cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'})
              </span>
              <span className="text-[11px] text-[#C5A059]">4.5m CUTS</span>
            </div>

            {/* Items list */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-3 pb-4 border-b border-[#1A1A1A] last:border-b-0">
                  <div className="relative w-16 h-20 bg-[#161616] border border-[#262626] shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-medium text-[#F5F5F5] line-clamp-1">{item.name}</h4>
                      <span className="text-[10px] text-[#777777] block mt-0.5">{item.fabricType} · Qty {item.quantity}</span>
                    </div>
                    <span className="text-xs text-[#C5A059] tabular-nums font-medium">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-[#1C1C1C] space-y-2 text-xs">
              <div className="flex justify-between text-[#888888]">
                <span>Fabric Cuts Total:</span>
                <span className="tabular-nums text-[#CCCCCC]">PKR {cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Courier Shipping (TCS / Leopards):</span>
                <span className="text-[#C5A059] uppercase tracking-wider text-[11px]">Free Nationwide</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Signature Presentation Packaging:</span>
                <span className="text-[#C5A059] uppercase tracking-wider text-[11px]">Included</span>
              </div>
              <div className="pt-3 border-t border-[#222222] flex justify-between text-sm font-medium text-[#F5F5F5]">
                <span className="uppercase tracking-wider">Total Payable:</span>
                <span className="tabular-nums text-[#C5A059] text-base">
                  PKR {cartSubtotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#0E0E0E] border border-[#202020] text-xs text-[#777777] space-y-2">
            <div className="flex items-center gap-2 text-[#A5A5A5]">
              <Truck className="w-4 h-4 text-[#C5A059]" />
              <span>Dispatches within 24 hours from Lahore</span>
            </div>
            <div className="flex items-center gap-2 text-[#A5A5A5]">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Full inspection allowed before cash handover</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
