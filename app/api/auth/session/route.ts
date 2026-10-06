import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: session.userId,
        email: session.email,
        role: session.role,
        fullName: session.fullName,
      },
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json({ user: null });
  }
}
