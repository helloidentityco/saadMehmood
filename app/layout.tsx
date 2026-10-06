import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { LoadingProvider } from '@/components/providers/LoadingContext';
import NavigationLoader from '@/components/providers/NavigationLoader';
import BrandLogoLoader from '@/components/ui/BrandLogoLoader';
import GlobalSkeletonOverlay from '@/components/ui/GlobalSkeletonOverlay';
import { getSession } from '@/lib/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import QuickViewModal from '@/components/QuickViewModal';
import WhatsAppWidget from '@/components/WhatsAppWidget';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Saad Mehmood  | Premium Pakistani Men’s Fabrics',
  description:
    'Luxury Pakistani menswear fabric house offering premium Egyptian cotton, wash & wear suiting, and authentic original latha. Crafted for the man of distinction.',
  metadataBase: new URL('https://saadmehmood.com.pk'),
  openGraph: {
    title: 'Saad Mehmood  | Crafted for the Man of Distinction',
    description:
      'Explore three royal chapters of unstitched Pakistani menswear fabrics: Haibat Majmua (Cotton), Mehrab Intikhab (Wash & Wear), and Raees Riwayat (Original Latha).',
    url: 'https://saadmehmood.com.pk',
    siteName: 'Saad Mehmood ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saad Mehmood  | Premium Men’s Fabrics',
    description:
      'Luxury Pakistani menswear fabric house offering premium cotton, wash & wear, and authentic latha.',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const initialUser = session
    ? {
        id: session.userId,
        email: session.email,
        role: session.role,
        fullName: session.fullName,
      }
    : null;

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(window.__smfSafeJsonInstalled)return;window.__smfSafeJsonInstalled=true;var orig=JSON.stringify;JSON.stringify=function(v,r,s){try{return orig.call(JSON,v,r,s);}catch(e){var seen=new WeakSet();return orig.call(JSON,v,function(k,val){if(k&&(k.indexOf('__reactFiber$')===0||k.indexOf('__reactProps$')===0||k.indexOf('__reactContainer$')===0||k.indexOf('__reactEvents$')===0||k==='stateNode'||k==='_owner'))return undefined;if(typeof val==='object'&&val!==null){if(typeof Node!=='undefined'&&val instanceof Node)return '[DOMNode <'+val.nodeName.toLowerCase()+'>]';if(typeof Window!=='undefined'&&val instanceof Window)return '[Window]';if(typeof Event!=='undefined'&&val instanceof Event)return '[Event '+val.type+']';if(seen.has(val))return '[Circular]';seen.add(val);}return typeof r==='function'?r.call(this,k,val):val;},s);}};var clean=function(a){if(!a||typeof a!=='object')return a;if(typeof Element!=='undefined'&&a instanceof Element)return '[DOMElement <'+a.tagName.toLowerCase()+'>]';if(typeof Node!=='undefined'&&a instanceof Node)return '[DOMNode <'+a.nodeName.toLowerCase()+'>]';return a;};['error','warn','log','info','debug'].forEach(function(m){var fn=console[m];if(typeof fn==='function'){console[m]=function(){var args=[];for(var i=0;i<arguments.length;i++)args.push(clean(arguments[i]));return fn.apply(console,args);};}});}catch(_){}})();`,
          }}
        />
      </head>
      <body className="bg-[#080808] text-[#F5F5F5] antialiased selection:bg-[#C5A059] selection:text-[#080808] min-h-screen flex flex-col font-[family-name:var(--font-poppins)]">
        <LoadingProvider>
          <NavigationLoader>
            <CartProvider initialUser={initialUser}>
              <Header />
              <main className="flex-1 w-full">{children}</main>
              <Footer />

              {/* Interactive Global Drawers, Overlays and Modals */}
              <CartDrawer />
              <SearchOverlay />
              <QuickViewModal />
              <WhatsAppWidget />
              <GlobalSkeletonOverlay />
              <BrandLogoLoader />
            </CartProvider>
          </NavigationLoader>
        </LoadingProvider>
      </body>
    </html>
  );
}
