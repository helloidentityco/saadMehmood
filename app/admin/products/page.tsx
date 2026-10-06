import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  ArrowLeft,
  Sparkles,
  Edit,
  ExternalLink,
  Layers,
  CheckCircle2,
  XCircle,
  CloudLightning,
} from 'lucide-react';
import { getSession } from '@/lib/auth';
import { getProducts } from '@/lib/db';
import Breadcrumbs from '@/components/Breadcrumbs';
import DeleteProductButton from '@/components/admin/DeleteProductButton';
import { isCloudinaryConfigured } from '@/lib/cloudinary';

export const metadata = {
  title: 'Catalog Inventory & Products | Imperial Admin',
  description: 'Manage fabric listings, Cloudinary assets, and collections for Saad Mehmood .',
};

export default async function AdminProductsPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    redirect('/login?error=admin_access_required');
  }

  const productsList = await getProducts();
  const cloudinaryLive = isCloudinaryConfigured();

  return (
    <div className="w-full bg-[#080808] min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'IMPERIAL ADMIN PORTAL', href: '/admin' },
            { label: 'FABRICS CATALOG' },
          ]}
        />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#222222]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COLLECTION INVENTORY MANAGEMENT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-[0.14em] uppercase text-[#F5F5F5]">
              ATELIER FABRIC CATALOG
            </h1>
            <p className="text-xs text-[#888888] font-light mt-1">
              Create, update, and manage royal Pakistani menswear fabrics with Cloudinary media integration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-[#CCCCCC] bg-[#141414] border border-[#2A2A2A] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>DASHBOARD</span>
            </Link>

            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] transition-colors shadow-lg"
            >
              <Plus className="w-4 h-4 text-[#080808]" />
              <span>ADD NEW FABRIC</span>
            </Link>
          </div>
        </div>

        {/* Cloudinary Integration Status Bar */}
        <div className="p-4 bg-[#111111] border border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center text-[#C5A059]">
              <CloudLightning className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[#F5F5F5] font-medium block">
                Cloudinary Asset Integration
              </span>
              <span className="text-[11px] text-[#777777]">
                Folder: <code className="text-[#C5A059]">saad-mehmood-fabrics/products</code>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cloudinaryLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Cloudinary CDN Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-amber-300 bg-amber-950/40 border border-amber-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Dev Mode (Set .env for Live Cloudinary)
              </span>
            )}
          </div>
        </div>

        {/* Catalog Table */}
        <div className="bg-[#111111] border border-[#222222] overflow-hidden">
          <div className="p-5 border-b border-[#222222] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F5F5F5]">
              <Layers className="w-4 h-4 text-[#C5A059]" />
              <span>Fabric Listings ({productsList.length})</span>
            </div>
          </div>

          {productsList.length === 0 ? (
            <div className="p-16 text-center space-y-4">
              <p className="text-xs text-[#888888]">No fabric listings registered yet in Neon DB.</p>
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider text-[#C5A059] border border-[#C5A059]/40 hover:bg-[#C5A059]/10"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create First Fabric</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#161616] text-[#A5A5A5] uppercase tracking-wider text-[11px] border-b border-[#222222]">
                    <th className="py-3.5 px-4 font-medium">Fabric</th>
                    <th className="py-3.5 px-4 font-medium">Collection</th>
                    <th className="py-3.5 px-4 font-medium">Material</th>
                    <th className="py-3.5 px-4 font-medium">Price</th>
                    <th className="py-3.5 px-4 font-medium">Stock Status</th>
                    <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F1F]">
                  {productsList.map((product) => {
                    const isAvailable =
                      product.inStock ?? product.availability !== 'OUT OF STOCK';

                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-[#151515] transition-colors align-middle"
                      >
                        {/* Thumbnail & Title */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-16 bg-[#181818] border border-[#2A2A2A] shrink-0 overflow-hidden">
                              <Image
                                src={product.image || 'https://picsum.photos/seed/smf/300/400'}
                                alt={product.name}
                                fill
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="max-w-xs">
                              <span className="text-[#F5F5F5] font-medium block truncate">
                                {product.name}
                              </span>
                              <span className="text-[10px] text-[#777777] font-mono block">
                                /{product.slug}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Collection */}
                        <td className="py-3 px-4">
                          <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider bg-[#1A1A1A] border border-[#2A2A2A] text-[#C5A059]">
                            {product.collection || product.collectionSlug}
                          </span>
                        </td>

                        {/* Material */}
                        <td className="py-3 px-4 text-[#CCCCCC]">
                          {product.fabricType}
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4 font-medium text-[#F5F5F5] tabular-nums">
                          PKR {product.price.toLocaleString()}
                          {product.originalPrice && (
                            <span className="block text-[10px] text-[#666666] line-through font-normal">
                              PKR {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </td>

                        {/* Stock Badge */}
                        <td className="py-3 px-4">
                          {isAvailable ? (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>IN STOCK</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] text-red-400">
                              <XCircle className="w-3 h-3" />
                              <span>OUT OF STOCK</span>
                            </span>
                          )}
                        </td>

                        {/* Actions: Edit & Delete */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/product/${product.slug}`}
                              target="_blank"
                              className="p-1.5 text-[#888888] hover:text-[#C5A059] transition-colors"
                              title="View Storefront Preview"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="p-1.5 text-[#888888] hover:text-[#C5A059] transition-colors"
                              title="Edit Fabric"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>

                            <DeleteProductButton
                              productId={product.id}
                              productName={product.name}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
