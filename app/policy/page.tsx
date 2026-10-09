// app/privacy/page.tsx
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | SAAD MEHMOOD FABRICS',
  description: 'Privacy Policy describing how Saad Mehmood Fabrics collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-300 font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <header className="border-b border-amber-900/30 pb-8 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-2">
            Data & Privacy
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-amber-100 tracking-tight mb-3">
            Privacy Policy
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
            Your privacy matters to us. This Privacy Policy explains what information we collect, how we use it, and the choices you have when you use{' '}
            <Link href="/" className="text-amber-400 hover:underline">
              saadmehmood.com.pk
            </Link>{' '}
            (the &quot;Website&quot;).
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-neutral-300">
          <section className="border-l-2 border-amber-500/40 pl-6 space-y-3">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">1. Information We Collect</h2>
            <p className="font-medium text-amber-100/90">Information you give us when you place an order request or contact us:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-300">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>City and complete delivery address</li>
              <li>The products you selected</li>
              <li>Any notes you add to your order</li>
            </ul>

            <p className="font-medium text-amber-100/90 pt-2">Information collected automatically:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-300">
              <li>Your shopping bag contents, saved in your browser (local storage) for shopping bag persistence.</li>
              <li>Basic technical telemetry (browser type, device type, pages visited) to keep the Website secure and operational.</li>
            </ul>

            <p className="text-neutral-400 text-xs italic pt-1">
              Note: We do not collect payment card details directly on the Website.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-3">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-300">
              <li>Record and process your order request, contacting you for verification</li>
              <li>Arrange packaging, courier delivery, and process potential exchanges</li>
              <li>Answer inquiries and provide dedicated concierge support</li>
              <li>Improve the Website, our fabric collections, and customer experience</li>
              <li>Protect the platform against fraudulent activities and technical errors</li>
              <li>Fulfill statutory legal obligations</li>
            </ul>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">3. Storage of Your Information</h2>
            <p>
              Order requests and customer information are stored securely in a modern serverless cloud database provided by Neon (PostgreSQL). Our web infrastructure runs on serverless web hosts under strict data security protocols.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-3">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">4. Sharing Your Information</h2>
            <p>We do not sell your personal information. We share it solely with:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-300">
              <li>Courier and delivery partners to ship your parcel</li>
              <li>Hosting and database technology vendors</li>
              <li>Legal authorities when mandatory under applicable Pakistani law</li>
            </ul>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">5. Communication</h2>
            <p>
              We may contact you via phone, WhatsApp, or email specifically regarding your order requests. Promotional messages are sent only with prior consent, and you may opt out at any time.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">6. Cookies and Local Storage</h2>
            <p>
              We utilize browser local storage to maintain your active shopping bag session across page loads. You may clear this data anytime through your browser preferences.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">7. Data Security</h2>
            <p>
              We apply technical and organizational safeguards to ensure your information is encrypted in transit and securely processed on our servers.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">8. Data Retention</h2>
            <p>
              We retain customer order records for as long as necessary to fulfill orders, address warranty inquiries, and comply with legal requirements.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">9. Your Choices and Rights</h2>
            <p>
              You may contact us anytime to inquire about stored personal information, request corrections, or ask for account data deletion.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">10. Third-Party Links</h2>
            <p>
              Our site contains external links to channels such as WhatsApp, Instagram, and Facebook. We encourage reviewing third-party privacy statements upon visiting external platforms.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">11. Children</h2>
            <p>
              The Website is not designed for individuals under the age of 18. We do not knowingly collect personal data from minors.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-2">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Revisions will be published on this page with an updated modification date.
            </p>
          </section>

          <section className="border-l-2 border-amber-500/40 pl-6 space-y-3">
            <h2 className="text-lg font-semibold text-amber-200 tracking-wide">13. Contact Us</h2>
            <p>For any questions or privacy inquiries, please contact our privacy officer:</p>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-md space-y-1 text-sm text-neutral-300">
              <p><strong className="text-amber-400">WhatsApp / Phone:</strong> +92 3252109755</p>
              <p><strong className="text-amber-400">Email:</strong>saadmehmood.co@gmail.com</p>
              <p><strong className="text-amber-400">Address:</strong> Karachi, Pakistan</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}