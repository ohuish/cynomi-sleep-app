import type { Prisma, Gender } from '@/prisma'

export type RecordSleepResult = {
  errors?: {
    name?: string[]
    gender?: string[]
    date?: string[]
    hours?: string[]
  }
  success: boolean
}

export type SleepOverviewResult = Prisma.PersonGetPayload<{
  include: {
    _count: {
      select: {
        sleeps: true
      }
    }
  }
}>

// TODO: fix the typing to use Prisma type generators (need to unwrap payloads etc.)
export type SleepHistoryResult = {
  id: string
  name: string
  gender: Gender
  sleeps: {
    id: string
    date: string // not `Date`
    hours: string // not `Decimal`
    personId: string
  }[]
}

export type SleepHistoryResultMap = Record<string, SleepHistoryResult>

export { Gender }
