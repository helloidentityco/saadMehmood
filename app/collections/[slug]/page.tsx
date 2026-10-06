import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import CollectionProductSection from '@/components/CollectionProductSection';
import { getCollectionBySlug, getProducts, getCollections } from '@/lib/db';

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((col) => ({
    slug: col.slug,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    return {
      title: 'Collection Not Found | Saad Mehmood',
    };
  }

  return {
    title: `${collection.name} | ${collection.fabricType} | Saad Mehmood`,
    description: `${collection.description} Explore unstitched Pakistani menswear fabrics in our ${collection.name} royal chapter.`,
    openGraph: {
      title: `${collection.name} | ${collection.fabricType} | Saad Mehmood`,
      description: collection.description,
      images: [
        {
          url: collection.image,
          alt: collection.name,
        },
      ],
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  // Server Component data fetching directly from DB
  const [collection, products] = await Promise.all([
    getCollectionBySlug(slug),
    getProducts({ collectionSlug: slug }),
  ]);

  if (!collection) {
    notFound();
  }

  return (
    <div className="w-full bg-[#080808]">
      {/* Editorial Collection Hero Banner */}
      <div className="relative w-full min-h-[45vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#101010]">
        <div className="absolute inset-0 z-0">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            priority
            className="object-cover object-top filter brightness-[0.6] contrast-[1.1]"
            sizes="100vw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-3 block">
            THE ROYAL CHAPTER · {collection.fabricType}
          </span>

          <h1 className="text-3xl sm:text-5xl font-light tracking-[0.16em] uppercase text-[#F5F5F5] mb-4">
            {collection.name}
          </h1>

          <div className="h-[1px] w-14 bg-[#C5A059] mx-auto mb-4" />

          <p className="text-sm sm:text-base text-[#D0D0D0] font-light max-w-2xl mx-auto mb-4 leading-relaxed">
            {collection.description}
          </p>

          <p className="text-xs text-[#999999] font-light italic max-w-xl mx-auto leading-relaxed border-t border-white/10 pt-3">
            &ldquo;{collection.royalStory}&rdquo;
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[
            { label: 'COLLECTIONS', href: '/#collections' },
            { label: collection.name },
          ]}
        />

        {/* Client Component for filtering, sorting and displaying database-driven products */}
        <div className="mt-6">
          <CollectionProductSection initialProducts={products} />
        </div>
      </div>
    </div>
  );
}
