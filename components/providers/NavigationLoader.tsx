'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '@/components/providers/LoadingContext';

function NavigationEventsObserver() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startNavigation, stopNavigation } = useLoading();

  const currentRouteKey = `${pathname}?${searchParams?.toString() || ''}`;
  const prevRouteKeyRef = useRef<string>(currentRouteKey);

  // Dismiss navigation loader smoothly whenever route/query change completes
  useEffect(() => {
    if (prevRouteKeyRef.current !== currentRouteKey) {
      prevRouteKeyRef.current = currentRouteKey;
      const settleTimer = setTimeout(() => {
        stopNavigation();
      }, 100);
      return () => clearTimeout(settleTimer);
    }
  }, [currentRouteKey, stopNavigation]);

  // Global document click & popstate listener for instantaneous link transition feedback
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!target || !(target instanceof Element)) return;

      const anchor = target.closest('a');
      if (!anchor) return;

      const hrefAttr = anchor.getAttribute('href');
      if (!hrefAttr) return;

      // Ignore external targets, downloads, mailto/tel/whatsapp, or pure hash anchors
      if (
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        hrefAttr.startsWith('#') ||
        hrefAttr.startsWith('mailto:') ||
        hrefAttr.startsWith('tel:') ||
        hrefAttr.startsWith('javascript:')
      ) {
        return;
      }

      try {
        const targetUrl = new URL(anchor.href, window.location.origin);

        // Ignore external domains
        if (targetUrl.origin !== window.location.origin) {
          return;
        }

        // Ignore hash-only jumps on the same route
        const isSamePathAndQuery =
          targetUrl.pathname === window.location.pathname &&
          targetUrl.search === window.location.search;

        if (isSamePathAndQuery) {
          return;
        }

        // Determine context-aware luxury transition message
        let message = 'Entering Royal Collection...';
        if (targetUrl.pathname.startsWith('/admin')) {
          message = 'Loading Imperial Admin Portal...';
        } else if (targetUrl.pathname.startsWith('/product/')) {
          message = 'Unfolding Fabric Specifications...';
        } else if (targetUrl.pathname.startsWith('/collections')) {
          message = 'Curating Royal Chapters...';
        } else if (targetUrl.pathname.startsWith('/checkout')) {
          message = 'Preparing Atelier Reservation...';
        } else if (targetUrl.pathname.startsWith('/account')) {
          message = 'Loading Patron Dossier...';
        } else if (
          targetUrl.pathname.startsWith('/login') ||
          targetUrl.pathname.startsWith('/signup')
        ) {
          message = 'Opening Atelier Access...';
        }

        setTimeout(() => {
          startNavigation(message);
        }, 0);
      } catch {
        // Ignore malformed URLs
      }
    };

    const handlePopState = () => {
      startNavigation('Transitioning Atelier View...');
    };

    document.addEventListener('click', handleDocumentClick, false);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleDocumentClick, false);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [startNavigation]);

  return null;
}

export default function NavigationLoader({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <NavigationEventsObserver />
      </Suspense>
      {children}
    </>
  );
}
