import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | null }

function createClient() {
  if (!process.env.DATABASE_URL) return null
  return new PrismaClient()
}

export const prisma: PrismaClient | null =
  globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
