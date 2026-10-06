import React from 'react';
import BrandLogoLoader from '@/components/ui/BrandLogoLoader';

export default function RootLoading() {
  return (
    <BrandLogoLoader
      forceVisible={true}
      customMessage="Streaming Royal Atelier Collection..."
    />
  );
}
