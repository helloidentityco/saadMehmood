// app/terms/page.tsx
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | SAAD MEHMOOD FABRICS',
  description: 'Terms and Conditions governing the use of Saad Mehmood Fabrics online store and order requests.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-300 font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <header className="border-b border-amber-900/30 pb-8 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-2">
            Legal & Governance
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-amber-100 tracking-tight mb-3">
            Terms & Conditions
          </h1>
          <p className="text-sm text-neutral-400">
            <span className="font-medium text-amber-500/90">SAAD MEHMOOD FABRICS</span> &bull; saadmehmood.com.pk
          </p>
          <p className="text-xs text-neutral-500 mt-2">
            Last updated: October 09, 2026
          </p>
        </header>

        {/* Introduction */}
        <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-lg p-6 sm:p-8 backdrop-blur-sm">
          <p className="text-sm sm:text-base leading-relaxed text-neutral-300">
            Welcome to Saad Mehmood Fabrics (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By using{' '}
            <Link href="/" className="text-amber-400 hover:underline">
              saadmehmood.com.pk
            </Link>{' '}
            (the &quot;Website&quot;) or submitting an order request, you agree to these Terms & Conditions. If you do not agree, please do not use the Website.
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-neutral-300">
          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">1. About Us</h2>
            <p>
              Saad Mehmood Fabrics is an online store for premium men&apos;s unstitched fabrics in Pakistan. Our signature collections include <span className="text-amber-100 font-medium">Haibat Majmua</span> (Premium Cotton), <span className="text-amber-100 font-medium">Mehrab Intikhab</span> (Wash & Wear), and <span className="text-amber-100 font-medium">Raees Riwayat</span> (Original Latha).
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">2. Use of the Website</h2>
            <p>
              You agree to use the Website only for lawful purposes. You must not attempt unauthorized access, interfere with its operation, submit false or misleading information, or copy our content for commercial use. You must be 18 or older, or have a parent or guardian&apos;s permission, to place an order request.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">3. Products and Accuracy</h2>
            <p>
              We try to describe and photograph our fabrics as accurately as possible. Colors and textures may look slightly different on your screen because of lighting, photography, and display settings. Slight variations between production batches are normal for fabric. Fabric details, recommended use, and care information are provided in good faith.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">4. Pricing</h2>
            <p>
              All prices are in Pakistani Rupees (PKR). The price shown when you submit your order request is the price that applies to it. We may update prices at any time, and we may cancel an order request placed at a clearly mistaken price, with notice to you.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">5. Order Requests and Confirmation</h2>
            <p>
              Submitting the order form places an order request. It is not a confirmed order. Your order is confirmed only after we contact you by phone, WhatsApp, or email to verify your details and availability. We may decline or cancel an order request if stock is unavailable, information is incomplete or incorrect, or we suspect misuse. The message &quot;Order Request Received&quot; means your request has been recorded in our system, not that it has been accepted.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">6. Payment</h2>
            <p>
              We accept Cash on Delivery (COD). Orders are processed after confirmation and, where required, receipt of payment or verification details.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">7. Shipping and Delivery</h2>
            <p>
              We deliver across Pakistan through courier partners. Estimated delivery time is approximately 10 working days from order confirmation. Delivery charges are free across Pakistan. Please provide a complete and correct address and an active phone number. We are not responsible for delays or failed deliveries caused by incorrect details.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-3">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">8. Returns, Exchanges and Cancellations</h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li>Please inspect your parcel on delivery and tell us within 24 hours if the fabric is damaged, defective, or different from what you ordered.</li>
              <li>Returns or exchanges are accepted only for fabric that is uncut, unwashed, unused, and in its original packaging.</li>
              <li>Fabric that has been cut, stitched, washed, or altered cannot be returned.</li>
              <li>Order requests can be cancelled before dispatch. Once an order is dispatched, it cannot be cancelled.</li>
              <li>Approved refunds are processed within 10 business days via mutually agreed methods.</li>
            </ul>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">9. Fabric Care</h2>
            <p>
              Care guidance is given on each product page. We recommend a small test wash before stitching. We are not responsible for damage caused by not following care guidance, or by stitching, dyeing, or handling after delivery.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">10. Creative Content</h2>
            <p>
              Our website uses heritage-inspired storytelling and royal imagery as creative and aesthetic inspiration. It is not a claim that Saad Mehmood Fabrics has any historical connection to a royal court or dynasty.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">11. Intellectual Property</h2>
            <p>
              All content on the Website, including the brand name, logo, text, stories, images, and design, belongs to Saad Mehmood Fabrics or its licensors. You may not copy, reproduce, or use it without our written permission.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">12. Privacy</h2>
            <p>
              Your use of the Website is also governed by our{' '}
              <Link href="/privacy" className="text-amber-400 hover:underline">
                Privacy Policy
              </Link>
              , which explains how we handle your personal information.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">13. Limitation of Liability</h2>
            <p>
              To the extent permitted by law, we are not liable for indirect or consequential losses arising from the use of the Website or our products. Our total liability for any order is limited to the amount you paid for that order. The Website is provided &quot;as is&quot;, and we do not guarantee it will always be uninterrupted or error-free.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">14. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The updated version will be posted on this page with a new date. Continued use of the Website means you accept the changes.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">15. Governing Law</h2>
            <p>
              These Terms are governed by the laws of Pakistan. Any dispute will be handled in the competent courts of Karachi, Pakistan.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-3">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">16. Contact Us</h2>
            <p>For any inquiries regarding these Terms and Conditions, please reach out to us:</p>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-md space-y-1 text-sm text-neutral-300">
              <p><strong className="text-amber-400">WhatsApp / Phone:</strong> +92 3252109755</p>
              <p><strong className="text-amber-400">Email:</strong> saadmehmood.co@gmail.com</p>
              <p><strong className="text-amber-400">Address:</strong> Karachi, Pakistan</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}