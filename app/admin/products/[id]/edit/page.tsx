import React from 'react';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ExternalLink } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { getProductById } from '@/lib/db';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductForm from '@/components/admin/ProductForm';

export const metadata = {
  title: 'Edit Fabric | Imperial Admin',
  description: 'Modify fabric details, Cloudinary images, and stock availability.',
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    redirect('/login?error=admin_access_required');
  }

  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    notFound();
  }

  const product = await getProductById(numericId);
  if (!product) {
    notFound();
  }

  return (
    <div className="w-full bg-[#080808] min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'IMPERIAL ADMIN PORTAL', href: '/admin' },
            { label: 'FABRICS CATALOG', href: '/admin/products' },
            { label: `EDIT: ${product.name}` },
          ]}
        />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#222222]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FABRIC SPECIFICATION REVISION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-[0.14em] uppercase text-[#F5F5F5]">
              EDIT: {product.name}
            </h1>
            <p className="text-xs text-[#888888] font-light mt-1">
              ID: <code className="text-[#C5A059]">#{product.id}</code> · Slug:{' '}
              <code className="text-[#C5A059]">/{product.slug}</code>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/product/${product.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-[#CCCCCC] bg-[#141414] border border-[#2A2A2A] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
            >
              <span>VIEW IN ATELIER</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-[#CCCCCC] bg-[#141414] border border-[#2A2A2A] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>CATALOG</span>
            </Link>
          </div>
        </div>

        {/* Product Form (Pre-filled) */}
        <ProductForm initialProduct={product} />
      </div>
    </div>
  );
}
