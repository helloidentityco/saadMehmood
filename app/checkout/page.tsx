import React from 'react';
import type { Metadata } from 'next';
import CheckoutForm from '@/components/CheckoutForm';

export const metadata: Metadata = {
  title: 'Complete Your Order | Saad Mehmood',
  description:
    'Secure your unstitched fabric cuts with free nationwide delivery and Cash on Delivery.',
};

export default function CheckoutPage() {
  return (
    <div className="w-full bg-[#080808]">
      <CheckoutForm />
    </div>
  );
}
