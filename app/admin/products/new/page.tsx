import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getSession } from '@/lib/auth';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductForm from '@/components/admin/ProductForm';

export const metadata = {
  title: 'Add New Fabric | Imperial Admin',
  description: 'Add a new unstitched fabric to the royal catalog with Cloudinary uploads.',
};

export default async function NewProductPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    redirect('/login?error=admin_access_required');
  }

  return (
    <div className="w-full bg-[#080808] min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'IMPERIAL ADMIN PORTAL', href: '/admin' },
            { label: 'FABRICS CATALOG', href: '/admin/products' },
            { label: 'ADD NEW FABRIC' },
          ]}
        />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#222222]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ROYAL FABRIC INVENTORY CREATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-[0.14em] uppercase text-[#F5F5F5]">
              REGISTER NEW FABRIC LISTING
            </h1>
            <p className="text-xs text-[#888888] font-light mt-1">
              Upload Cloudinary photography and define weave specifications for client reservations.
            </p>
          </div>

          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-[#CCCCCC] bg-[#141414] border border-[#2A2A2A] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>CATALOG OVERVIEW</span>
          </Link>
        </div>

        {/* Product Creation Form */}
        <ProductForm />
      </div>
    </div>
  );
}
