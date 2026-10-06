import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldAlert,
  Users,
  ShoppingBag,
  TrendingUp,
  Package,
  LogOut,
  Sparkles,
  ArrowUpRight,
  UserCheck,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { getSession } from '@/lib/auth';
import { getAllOrders, getAllUsers } from '@/lib/db';
import LogoutButton from '@/components/auth/LogoutButton';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Imperial Admin Portal | Saad Mehmood',
  description: 'Administrative command center for Saad Mehmood.',
};

export default async function AdminPage() {
  const session = await getSession();

  // Strict role check: solely accessible by users with role === 'admin'
  if (!session || session.role !== 'admin') {
    redirect('/login?error=admin_access_required');
  }

  const [ordersWithItems, usersList] = await Promise.all([
    getAllOrders(),
    getAllUsers(),
  ]);

  const totalRevenue = ordersWithItems.reduce((acc, curr) => acc + curr.order.totalAmount, 0);
  const totalOrders = ordersWithItems.length;
  const totalUsers = usersList.length;
  const adminCount = usersList.filter((u) => u.role === 'admin').length;

  return (
    <div className="w-full bg-[#080808] min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ label: 'IMPERIAL ADMIN PORTAL' }]} />

        {/* Portal Header */}
        <div className="mt-4 pb-8 border-b border-[#222222] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXECUTIVE CONTROL &amp; NEON POSTGRESQL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.14em] uppercase text-[#F5F5F5]">
              ATELIER MANAGEMENT PORTAL
            </h1>
            
            {/* Welcome Header with Admin's Name and Email */}
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="text-[#AAAAAA] font-light">
                Welcome,{' '}
                <strong className="text-[#F5F5F5] font-medium">
                  {session.fullName || 'Saad Mehmood Admin'}
                </strong>{' '}
                (<span className="text-[#C5A059]">{session.email}</span>)
              </span>

              {/* Requirement 2: Role: ADMIN (Verified) Indicator */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-600/50 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Role: ADMIN (Verified)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-colors shadow"
            >
              <Package className="w-3.5 h-3.5 text-[#080808]" />
              <span>FABRIC CATALOG</span>
            </Link>

            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium text-[#E0E0E0] bg-[#141414] border border-[#2A2A2A] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
            >
              <span>PATRON VIEW</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium text-[#E0E0E0] bg-[#141414] border border-[#2A2A2A] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
            >
              <span>STOREFRONT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Requirement: Logout button with full client and server cart reset */}
            <LogoutButton
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium text-[#E5E5E5] bg-[#1a1111] border border-red-900/60 hover:bg-red-950 hover:border-red-600 hover:text-red-300 transition-colors shadow-sm"
              label="LOGOUT"
            />
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-8">
          {/* Revenue */}
          <div className="bg-[#111111] border border-[#222222] p-5 relative overflow-hidden group hover:border-[#C5A059]/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888] font-medium">
                GROSS REVENUE
              </span>
              <TrendingUp className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="text-xl sm:text-2xl font-light tracking-wide text-[#F5F5F5] tabular-nums">
              PKR {totalRevenue.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#777777] font-light mt-1 block">
              Cumulative orders recorded
            </span>
          </div>

          {/* Orders */}
          <div className="bg-[#111111] border border-[#222222] p-5 relative overflow-hidden group hover:border-[#C5A059]/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888] font-medium">
                ORDERS RECORDED
              </span>
              <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="text-xl sm:text-2xl font-light tracking-wide text-[#F5F5F5] tabular-nums">
              {totalOrders}
            </div>
            <span className="text-[10px] text-[#777777] font-light mt-1 block">
              Cash on Delivery reservations
            </span>
          </div>

          {/* Users */}
          <div className="bg-[#111111] border border-[#222222] p-5 relative overflow-hidden group hover:border-[#C5A059]/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888] font-medium">
                REGISTERED PATRONS
              </span>
              <Users className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="text-xl sm:text-2xl font-light tracking-wide text-[#F5F5F5] tabular-nums">
              {totalUsers}
            </div>
            <span className="text-[10px] text-[#777777] font-light mt-1 block">
              Neon DB user records
            </span>
          </div>

          {/* Admins */}
          <div className="bg-[#111111] border border-[#222222] p-5 relative overflow-hidden group hover:border-[#C5A059]/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888] font-medium">
                ATELIER ADMINS
              </span>
              <ShieldAlert className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="text-xl sm:text-2xl font-light tracking-wide text-[#F5F5F5] tabular-nums">
              {adminCount}
            </div>
            <span className="text-[10px] text-[#777777] font-light mt-1 block">
              Privileged role access
            </span>
          </div>
        </div>

        {/* Role & Middleware Security Verification Panel */}
        <div className="mb-8 p-6 bg-[#0E0E0E] border border-[#222222] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>ROLE-BASED ROUTE PROTECTION VERIFICATION</span>
              </div>
              <h2 className="text-sm font-normal tracking-[0.1em] text-[#F5F5F5] uppercase">
                Active Session Token &amp; Middleware Boundary
              </h2>
              <p className="text-xs text-[#888888] font-light max-w-2xl">
                This dashboard route (<code className="text-[#C5A059] font-mono">/admin</code>) is strictly guarded by Next.js Edge Middleware (<code className="text-[#C5A059] font-mono">middleware.ts</code>) and server-level session verification. Any unauthenticated access or user with <code className="text-[#C5A059] font-mono">role: &apos;user&apos;</code> is rejected and bounced to <code className="text-[#C5A059] font-mono">/login</code>.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto text-xs">
              <div className="p-3 bg-[#141414] border border-[#222222]">
                <span className="text-[9px] uppercase tracking-widest text-[#777777] block">Active Role</span>
                <span className="text-emerald-400 font-mono font-medium text-xs block mt-0.5">
                  ADMIN (Verified)
                </span>
              </div>
              <div className="p-3 bg-[#141414] border border-[#222222]">
                <span className="text-[9px] uppercase tracking-widest text-[#777777] block">Session Cookie</span>
                <span className="text-[#CCCCCC] font-mono text-xs block mt-0.5 truncate max-w-[130px]" title="smf_session_token">
                  smf_session_token
                </span>
              </div>
              <div className="p-3 bg-[#141414] border border-[#222222] col-span-2 sm:col-span-1">
                <span className="text-[9px] uppercase tracking-widest text-[#777777] block">Edge Middleware</span>
                <span className="text-[#C5A059] font-mono text-xs block mt-0.5">
                  ENFORCED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Registered Patrons & Users Table */}
        <div className="space-y-6 pt-4">
          <div className="bg-[#111111] border border-[#222222] overflow-hidden">
            <div className="p-6 border-b border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#C5A059]" />
                  <h2 className="text-base font-light tracking-[0.15em] uppercase text-[#F5F5F5]">
                    REGISTERED PATRONS &amp; CLIENTELE
                  </h2>
                </div>
                <p className="text-xs text-[#888888] font-light mt-0.5">
                  Drizzle ORM &middot; `users` table with passwordHash and role-based authorization
                </p>
              </div>
              <span className="text-xs text-[#C5A059] font-medium tracking-wider">
                {usersList.length} Accounts
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#161616] text-[#A5A5A5] uppercase tracking-wider text-[11px] border-b border-[#222222]">
                    <th className="py-3 px-4 font-medium">ID</th>
                    <th className="py-3 px-4 font-medium">Full Name</th>
                    <th className="py-3 px-4 font-medium">Email</th>
                    <th className="py-3 px-4 font-medium">Role</th>
                    <th className="py-3 px-4 font-medium">Registered Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F1F]">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-[#151515] transition-colors">
                      <td className="py-3 px-4 text-[#777777] font-mono">#{u.id}</td>
                      <td className="py-3 px-4 text-[#F5F5F5] font-medium">{u.fullName}</td>
                      <td className="py-3 px-4 text-[#CCCCCC]">{u.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-medium ${
                            u.role === 'admin'
                              ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40'
                              : 'bg-[#222222] text-[#A5A5A5] border border-[#333333]'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#777777] tabular-nums">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Order Ledger Table */}
          <div className="bg-[#111111] border border-[#222222] overflow-hidden">
            <div className="p-6 border-b border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#C5A059]" />
                  <h2 className="text-base font-light tracking-[0.15em] uppercase text-[#F5F5F5]">
                    IMPERIAL ORDERS &amp; DISPATCH LEDGER
                  </h2>
                </div>
                <p className="text-xs text-[#888888] font-light mt-0.5">
                  Direct database records from `orders` and `order_items` tables
                </p>
              </div>
              <span className="text-xs text-[#C5A059] font-medium tracking-wider">
                {ordersWithItems.length} Reservations
              </span>
            </div>

            {ordersWithItems.length === 0 ? (
              <div className="p-12 text-center text-[#777777] text-xs">
                No customer orders placed yet. Orders submitted via checkout will be displayed here in real time.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#161616] text-[#A5A5A5] uppercase tracking-wider text-[11px] border-b border-[#222222]">
                      <th className="py-3 px-4 font-medium">Order ID</th>
                      <th className="py-3 px-4 font-medium">Customer</th>
                      <th className="py-3 px-4 font-medium">Phone &amp; City</th>
                      <th className="py-3 px-4 font-medium">Fabric Cuts</th>
                      <th className="py-3 px-4 font-medium">Total Amount</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium">Placed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F1F]">
                    {ordersWithItems.map(({ order, items }) => (
                      <tr key={order.id} className="hover:bg-[#151515] transition-colors align-top">
                        <td className="py-3 px-4 text-[#C5A059] font-mono font-medium">
                          {order.id}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[#F5F5F5] font-medium block">{order.fullName}</span>
                          {order.email && (
                            <span className="text-[11px] text-[#777777] block">{order.email}</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[#CCCCCC] block">{order.phoneNumber}</span>
                          <span className="text-[11px] text-[#888888] block">{order.city}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            {items.map((i) => (
                              <div key={i.id} className="text-[11px] text-[#AAAAAA]">
                                <span className="text-[#F5F5F5] font-medium">{i.productName}</span>{' '}
                                <span className="text-[#777777]">({i.fabricType})</span>{' '}
                                &times; {i.quantity}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#F5F5F5] font-medium tabular-nums">
                          PKR {order.totalAmount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#1C1C1C] border border-[#333333] text-[#CCCCCC]">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#777777] tabular-nums whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
