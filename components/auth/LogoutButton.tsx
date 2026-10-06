'use client';

import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { logoutUser } from '@/actions/auth';
import { useCart } from '@/context/cart-context';
import { useLoading } from '@/components/providers/LoadingContext';

interface LogoutButtonProps {
  className?: string;
  label?: string;
}

export default function LogoutButton({
  className = 'inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium text-[#E5E5E5] bg-[#1a1111] border border-red-900/60 hover:bg-red-950 hover:border-red-600 hover:text-red-300 transition-colors shadow-sm',
  label = 'LOGOUT',
}: LogoutButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { clearCart } = useCart();
  const { withSkeleton } = useLoading();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    // 1. Explicitly purge all client-side cart localStorage records and global context state
    try {
      clearCart();
      if (typeof window !== 'undefined') {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (
            key &&
            (key.startsWith('saad_mehmood_cart') ||
              key.startsWith('sm_fabrics_cart') ||
              key.includes('cart'))
          ) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
        window.dispatchEvent(new Event('smf_cart_updated'));
      }
    } catch (err) {
      console.error('Error clearing cart during logout:', err);
    }

    // 2. Invoke server-side logout action
    startTransition(async () => {
      await withSkeleton(
        async () => {
          try {
            const res = await logoutUser();
            router.push(res?.redirectTo || '/login');
            router.refresh();
          } catch {
            router.push('/login');
            router.refresh();
          }
        },
        'Closing Atelier Session...',
        'auth'
      );
    });
  };

  return (
    <form onSubmit={handleLogout}>
      <button
        type="submit"
        disabled={isPending}
        className={className}
        aria-label="Sign out of account"
      >
        {isPending ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <LogOut className="w-3.5 h-3.5" />
        )}
        <span>{isPending ? 'SIGNING OUT...' : label}</span>
      </button>
    </form>
  );
}
