import { z } from 'zod'
import dayjs from '@/dayjs'

export const schema = z.object({
  name: z.string().trim().min(3),
  gender: z.union([z.literal('MALE'), z.literal('FEMALE'), z.literal('OTHER')]),
  date: z.preprocess((val: any) => {
    const parsed = dayjs.utc(val, 'L')
    if (parsed.isValid()) {
      return parsed.startOf('day').toISOString()
    }
  }, z.coerce.date()),
  hours: z.coerce.number().gt(0).lte(24),
})
