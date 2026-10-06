import React from 'react';
import Hero from '@/components/Hero';
import BrandStatement from '@/components/BrandStatement';
import CollectionGrid from '@/components/CollectionGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import FabricPhilosophy from '@/components/FabricPhilosophy';
import WhySaadMehmood from '@/components/WhySaadMehmood';
import BrandStoryPreview from '@/components/BrandStoryPreview';
import HomeCta from '@/components/HomeCta';
import { getCollections, getProducts } from '@/lib/db';

export const revalidate = 60;

export default async function HomePage() {
  // Server Component data fetching directly from database
  const [collections, featuredProducts] = await Promise.all([
    getCollections(),
    getProducts({ limit: 12 }),
  ]);

  return (
    <div className="flex flex-col w-full bg-[#080808]">
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Royal Introduction & Brand Statement */}
      <BrandStatement />

      {/* 3. Shop By Collection (The Three Royal Chapters) */}
      <CollectionGrid collections={collections} />

      {/* 4. Featured Products (Tabbed showcase) */}
      <FeaturedProducts products={featuredProducts} />

      {/* 5. Fabric Philosophy / Editorial Section */}
      <FabricPhilosophy />

      {/* 6. Why Saad Mehmood Fabrics */}
      <WhySaadMehmood />

      {/* 7. Brand Story Preview */}
      <BrandStoryPreview />

      {/* 8. Call To Action Section */}
      <HomeCta />
    </div>
  );
}
