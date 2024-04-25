'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/prisma'
import { schema } from '@/validation'
import type { RecordSleepResult } from '@/types'

export async function recordSleep(
  prevState: any,
  formData: FormData,
): Promise<RecordSleepResult> {
  const formInput = {
    name: formData.get('name'),
    gender: formData.get('gender'),
    date: formData.get('date'),
    hours: formData.get('hours'),
  }

  // validation
  const validatedInput = schema.safeParse(formInput)

  if (!validatedInput.success) {
    return {
      errors: validatedInput.error.flatten().fieldErrors,
      success: false,
    }
  }

  const { name, gender, date, hours } = validatedInput.data

  // create person if not exists
  const person = await prisma.person.upsert({
    where: {
      name_gender: {
        name,
        gender,
      },
    },
    create: {
      name,
      gender,
    },
    update: {},
  })

  // create or update sleep
  await prisma.sleep.upsert({
    where: {
      personId_date: {
        personId: person.id,
        date,
      },
    },
    create: {
      person: {
        connect: person,
      },
      date,
      hours,
    },
    update: {
      hours,
    },
  })

  return {
    success: true,
  }
}
