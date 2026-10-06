'use server';

import { createOrder } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export interface OrderFormState {
  success?: boolean;
  orderId?: string;
  error?: string;
  orderSummary?: {
    fullName: string;
    city: string;
    totalAmount: number;
    paymentMethod: string;
  };
}

export async function submitOrderAction(payload: {
  fullName: string;
  phoneNumber: string;
  email?: string;
  city: string;
  completeAddress: string;
  notes?: string;
  items: {
    productId: number;
    productName: string;
    fabricType: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
}): Promise<OrderFormState> {
  try {
    const { fullName, phoneNumber, email, city, completeAddress, notes, items } = payload;

    if (!fullName || fullName.trim().length < 2) {
      return { error: 'Please enter your full name.' };
    }

    if (!phoneNumber || phoneNumber.trim().length < 8) {
      return { error: 'Please enter a valid Pakistani contact phone number (e.g., 0300-1234567).' };
    }

    if (!city || city.trim().length < 2) {
      return { error: 'Please specify your delivery city.' };
    }

    if (!completeAddress || completeAddress.trim().length < 8) {
      return { error: 'Please provide your full delivery address (House/Street/Area).' };
    }

    if (!items || items.length === 0) {
      return { error: 'Your shopping bag is empty. Please select at least one fabric cut to place an order.' };
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const session = await getSession();
    const userId = session?.userId
      ? typeof session.userId === 'string'
        ? parseInt(session.userId, 10)
        : session.userId
      : null;

    const result = await createOrder(
      {
        userId: userId && !isNaN(userId) ? userId : undefined,
        fullName,
        phoneNumber,
        email: email || undefined,
        city,
        completeAddress,
        notes: notes || undefined,
        totalAmount,
        paymentMethod: 'CASH ON DELIVERY (NATIONWIDE)',
      },
      items
    );

    revalidatePath('/collections');
    revalidatePath('/product');
    revalidatePath('/account');
    revalidatePath('/admin');

    return {
      success: true,
      orderId: result.order.id,
      orderSummary: {
        fullName: result.order.fullName,
        city: result.order.city,
        totalAmount: result.order.totalAmount,
        paymentMethod: result.order.paymentMethod,
      },
    };
  } catch (err: unknown) {
    console.error('Error placing order in server action:', err);
    return {
      error: 'An unexpected error occurred while recording your order. Please try again or reach our concierge.',
    };
  }
}
