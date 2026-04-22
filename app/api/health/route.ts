import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const db = prisma
    ? await prisma.$queryRaw`SELECT 1`.then(() => 'ok').catch(() => 'error')
    : 'not configured'

  return NextResponse.json({
    status: 'ok',
    db,
    timestamp: new Date().toISOString(),
  })
}
