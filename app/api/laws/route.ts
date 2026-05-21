import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import defaultLawsData from '@/data/laws.json';

export async function GET() {
  try {
    let laws = await prisma.law.findMany({
      orderBy: { createdAt: 'desc' }
    });

    if (laws.length === 0) {
      await prisma.law.createMany({
        data: defaultLawsData.map(law => ({
          tier: law.tier,
          district: law.district,
          title: law.title,
          desc: law.desc,
          authority: law.authority,
          penalty: law.penalty,
          vehicleType: law.vehicleType || null,
          category: law.category || null,
        }))
      });
      laws = await prisma.law.findMany({
        orderBy: { createdAt: 'desc' }
      });
    }

    return NextResponse.json(laws);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch laws' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    const clientPasskey = req.headers.get('x-admin-passkey');
    const adminPasskey = process.env.ADMIN_PASSKEY || 'admin123';

    if (!session && clientPasskey !== adminPasskey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
