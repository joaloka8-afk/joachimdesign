import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json(
      { error: 'Database not configured. Set DATABASE_URL to enable contact storage.' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const { name, email, message, budget } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'name, email and message are required' }, { status: 400 })
    }

    const contact = await prisma.contact.create({
      data: { name, email, message, budget: budget ?? null },
    })

    return NextResponse.json({ success: true, id: contact.id })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
