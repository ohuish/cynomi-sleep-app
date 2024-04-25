import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import type { SleepOverviewResult } from '@/types'

// prevent NextJS from baking this route into the cache
export const dynamic = 'force-dynamic'

// return all `Person` data and their sleep entry count
export async function GET(request: Request) {
  const overview = await prisma.person.findMany({
    include: {
      _count: {
        select: {
          sleeps: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  return NextResponse.json<SleepOverviewResult[]>(overview)
}
