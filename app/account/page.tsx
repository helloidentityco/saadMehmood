import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  User as UserIcon,
  ShoppingBag,
  ShieldCheck,
  Package,
  LogOut,
  Sparkles,
  ArrowRight,
  Clock,
  Compass,
} from 'lucide-react';
import { getSession, getCurrentUser } from '@/lib/auth';
import { getOrdersByUserId } from '@/lib/db';
import LogoutButton from '@/components/auth/LogoutButton';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Client Atelier | Saad Mehmood',
  description: 'Your private client portal with Saad Mehmood.',
};

export default async function AccountPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login?redirect=/account');
  }

  const user = await getCurrentUser();
  const userIdNumber = typeof session.userId === 'string' ? parseInt(session.userId, 10) : session.userId;
  const userOrders = await getOrdersByUserId(userIdNumber);

  return (
    <div className="w-full bg-[#080808] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ label: 'CLIENT ATELIER' }]} />

        {/* Account Header */}
        <div className="mt-4 pb-8 border-b border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE DISTINGUISHED PATRON</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.14em] uppercase text-[#F5F5F5]">
              {user?.fullName || session.fullName || 'Valued Client'}
            </h1>
            <p className="text-xs text-[#888888] font-light mt-1">
              Member ID: SMF-USR-{session.userId} · Role: {session.role.toUpperCase()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {session.role === 'admin' && (
              <Link
                href="/admin"
                className="px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-colors"
              >
                ADMIN PORTAL
              </Link>
            )}

            <LogoutButton
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-[#E5E5E5] bg-[#141414] border border-[#2E2E2E] hover:border-red-800 hover:text-red-400 transition-colors"
              label="SIGN OUT"
            />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10">
          {/* Left Column: Profile & Privileges (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Patron Profile Card */}
            <div className="bg-[#111111] border border-[#222222] p-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-[#1C1C1C]">
                <div className="w-10 h-10 rounded-full bg-[#181818] border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#F5F5F5] uppercase tracking-wider">
                    {user?.fullName || session.fullName || 'Patron'}
                  </h3>
                  <span className="text-xs text-[#888888] font-light">{session.email}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#A5A5A5]">
                <div className="flex justify-between">
                  <span className="text-[#777777]">Account Status:</span>
                  <span className="text-[#C5A059] font-medium">Verified Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Client Privilege:</span>
                  <span className="text-[#F5F5F5]">Free Delivery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Atelier Concierge:</span>
                  <span className="text-[#E0E0E0]">+92 (300) 847-1947</span>
                </div>
              </div>
            </div>

            {/* Atelier Guarantees Card */}
            <div className="bg-[#111111] border border-[#222222] p-6 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
                PATRON GUARANTEES
              </span>
              <div className="space-y-3 text-xs text-[#888888]">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>100% Guaranteed unstitched original fabric cuts (4.5m)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Package className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Gold-embossed rigid presentation box with every cut</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Priority dispatch &amp; Cash on Delivery inspection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order History (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-[#111111] border border-[#222222] p-6 sm:p-8">
              <div className="flex items-center justify-between pb-6 border-b border-[#222222]">
                <div>
                  <h2 className="text-base sm:text-lg font-light tracking-[0.14em] uppercase text-[#F5F5F5]">
                    ORDER REQUESTS &amp; FABRIC CUTS
                  </h2>
                  <p className="text-xs text-[#888888] font-light mt-0.5">
                    Your bespoke reservations recorded directly in our Neon database.
                  </p>
                </div>
                <span className="text-xs text-[#C5A059] font-medium">
                  {userOrders.length} {userOrders.length === 1 ? 'Order' : 'Orders'}
                </span>
              </div>

              {/* Order List */}
              <div className="mt-6">
                {userOrders.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <ShoppingBag className="w-8 h-8 text-[#555555] mx-auto" />
                    <p className="text-sm text-[#F5F5F5] font-light">
                      No active fabric reservations found for this account.
                    </p>
                    <p className="text-xs text-[#777777] max-w-sm mx-auto">
                      Explore our three royal chapters—Egyptian Cotton, Wash &amp; Wear, and Original Latha—to place your first order.
                    </p>
                    <Link
                      href="/#collections"
                      className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-colors"
                    >
                      <span>EXPLORE COLLECTIONS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userOrders.map(({ order, items }) => (
                      <div
                        key={order.id}
                        className="bg-[#141414] border border-[#222222] p-5 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1E1E1E]">
                          <div>
                            <span className="text-xs font-mono font-medium text-[#C5A059]">
                              {order.id}
                            </span>
                            <span className="text-xs text-[#888888] ml-2">
                              · {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#1C1C1C] border border-[#333333] text-[#CCCCCC]">
                              {order.status}
                            </span>
                            <span className="text-xs font-medium tabular-nums text-[#C5A059]">
                              PKR {order.totalAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-2">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between text-xs text-[#CCCCCC]"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-[#888888]">•</span>
                                <span className="font-medium text-[#F5F5F5]">{item.productName}</span>
                                <span className="text-[#777777]">({item.fabricType})</span>
                              </div>
                              <span className="tabular-nums text-[#A5A5A5]">
                                Qty: {item.quantity} · PKR {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-[#1C1C1C] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#777777] gap-2">
                          <span>Delivery to: {order.city} ({order.completeAddress})</span>
                          <span className="text-[#A5A5A5]">{order.paymentMethod}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
