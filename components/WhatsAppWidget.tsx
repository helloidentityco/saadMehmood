'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, Sparkles } from 'lucide-react';

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  prefilledMessage?: string;
}

export default function WhatsAppWidget({
  phoneNumber = '923252109755',
  prefilledMessage = 'Hello Saad Mehmood, I have an inquiry regarding your unstitched fabric collection...',
}: WhatsAppWidgetProps) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  // Hidden on all /admin/* routes per architectural requirements
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  // Clean phone number (digits only)
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(prefilledMessage);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Luxury Hover Tooltip */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 bg-[#0D0D0D]/95 backdrop-blur-md border border-[#C5A059]/40 text-[#F5F5F5] shadow-2xl transition-all duration-300 pointer-events-none transform ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2'
        }`}
        role="tooltip"
      >
        <Sparkles className="w-3 h-3 text-[#C5A059]" />
        <div className="flex flex-col text-left">
          <span className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#F5F5F5]">
            Chat with Concierge
          </span>
          <span className="text-[9px] tracking-wider text-[#A5A5A5]">
            Fabric Specialist · Online
          </span>
        </div>
      </div>

      {/* Main Interactive WhatsApp Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Saad Mehmood Concierge on WhatsApp"
        className="relative group flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0A0A0A] border border-[#25D366]/60 shadow-[0_8px_30px_rgba(0,0,0,0.85)] hover:border-[#25D366] hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
      >
        {/* Subtle Luxury Gold Background Ring */}
        <div className="absolute inset-0 rounded-full border border-[#C5A059]/30 pointer-events-none group-hover:border-[#25D366]/40 transition-colors" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#25D366] group-hover:scale-110 transition-transform duration-300" />

        {/* Online Status Beacon */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border-2 border-[#0A0A0A]" />
        </span>
      </a>
    </div>
  );
}
