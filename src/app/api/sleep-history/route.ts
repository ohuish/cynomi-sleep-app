import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import dayjs from '@/dayjs'
import type { SleepHistoryResult } from '@/types'

// how many days back to fetch data for
const historyDays = 7

// return all `Person` for each requested id with their `Sleep` history for `historyDays`
export async function POST(request: Request) {
  const ids = (await request.json()) as string[]

  const endDate = dayjs.utc().startOf('day')
  const startDate = endDate.subtract(historyDays, 'days')

  const history = await prisma.person.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include: {
      sleeps: {
        where: {
          date: {
            lt: endDate.toDate(),
            gte: startDate.toDate(),
          },
        },
        orderBy: {
          date: 'desc',
        },
      },
    },
  })

  // `.json()` implicitly converts some complex types to string
  // see `@/types.ts`
  return NextResponse.json<SleepHistoryResult[]>(
    history as unknown as SleepHistoryResult[],
  )
}
