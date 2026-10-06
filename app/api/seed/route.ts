import { NextResponse } from 'next/server';
import { runSeed } from '@/lib/db/seed';

export async function GET() {
  try {
    await runSeed();
    return NextResponse.json({
      success: true,
      message: 'Seeding routine executed. Neon DB populated or verified.',
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown seed error',
      },
      { status: 500 }
    );
  }
}
