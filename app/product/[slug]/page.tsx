import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGallery from '@/components/ProductGallery';
import ProductPurchaseModule from '@/components/ProductPurchaseModule';
import RelatedProducts from '@/components/RelatedProducts';
import {
  getProductBySlug,
  getRelatedProducts,
  getCollectionBySlug,
  getProducts,
} from '@/lib/db';
import type { Product } from '@/lib/schema';

type ProductWithRawFields = Product & {
  description_urdu?: string | null;
  description_arabic?: string | null;
};

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Fabric Not Found | Saad Mehmood',
    };
  }

  return {
    title: `${product.name} | Saad Mehmood`,
    description: `${product.description} Standard 4.5m Shalwar Kameez cut in ${product.fabricType}. Free nationwide delivery.`,
    openGraph: {
      title: `${product.name} | Saad Mehmood`,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Server Component data fetching
  const product = (await getProductBySlug(slug)) as ProductWithRawFields | null;

  if (!product) {
    notFound();
  }

  const [collection, relatedProducts] = await Promise.all([
    getCollectionBySlug(product.collectionSlug),
    getRelatedProducts(product.id, product.collectionSlug, 4),
  ]);

  const collectionName = collection ? collection.name : 'COLLECTION';

  const englishDescription = product.description?.trim() || '';
  const urduDescription =
    (product.descriptionUrdu ?? product.description_urdu)?.trim() || '';
  const arabicDescription =
    (product.descriptionArabic ?? product.description_arabic)?.trim() || '';

  return (
    <div className="w-full bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Trail */}
        <Breadcrumbs
          items={[
            { label: 'COLLECTIONS', href: '/#collections' },
            { label: collectionName, href: `/collections/${product.collectionSlug}` },
            { label: product.name },
          ]}
        />

        {/* Product Purchase Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-6 pb-16">
          {/* Left: Gallery Module + Stacked Sequential Descriptions (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <ProductGallery
              primaryImage={product.image}
              secondaryImage={product.secondaryImage}
              productName={product.name}
            />

            {/* Stacked Sequential Descriptions (English -> Urdu -> Arabic) */}
            
          </div>

          {/* Right: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5">
            <ProductPurchaseModule
              product={product}
              collectionName={collectionName}
            />
          </div>
        </div>
      </div>

      {/* Related Products Showcase */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
