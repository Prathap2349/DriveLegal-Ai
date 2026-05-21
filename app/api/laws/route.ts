import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const laws = await prisma.law.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(laws);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch laws' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Basic auth check placeholder before NextAuth is fully integrated
    // We will rely on NextAuth session in the next step
    const body = await req.json();
    const { title, desc, tier, district, authority, penalty, vehicleType, category } = body;

    if (!title || !desc || !tier || !district || !authority || !penalty) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newLaw = await prisma.law.create({
      data: {
        title,
        desc,
        tier,
        district,
        authority,
        penalty,
        vehicleType,
        category,
      }
    });

    return NextResponse.json(newLaw, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create law' }, { status: 500 });
  }
}
