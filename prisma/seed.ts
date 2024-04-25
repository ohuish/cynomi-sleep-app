import { PrismaClient, Prisma, Gender } from '@prisma/client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const prisma = new PrismaClient()

const people: Prisma.PersonCreateInput[] = [
  {
    name: 'Oliver',
    gender: Gender.MALE,
  },
  {
    name: 'Paul',
    gender: Gender.MALE,
  },
  {
    name: 'Andrew',
    gender: Gender.MALE,
  },
  {
    name: 'David',
    gender: Gender.MALE,
  },
  {
    name: 'Peter',
    gender: Gender.MALE,
  },
  {
    name: 'Jamie',
    gender: Gender.OTHER,
  },
  {
    name: 'Sarah',
    gender: Gender.FEMALE,
  },
  {
    name: 'Eleanor',
    gender: Gender.FEMALE,
  },
  {
    name: 'Stephanie',
    gender: Gender.FEMALE,
  },
  {
    name: 'Claire',
    gender: Gender.FEMALE,
  },
]

const maxSeedHistory = 30
const maxSleepHours = 10
const minSleepHours = 5

async function seed() {
  for (const { name, gender } of people) {
    // generate a random sleep pattern
    const sleeps = []
    for (let i = 0; i < maxSeedHistory; i++) {
      if (Math.random() < 0.25) {
        // add chance to not record any information
        continue
      }
      // random hours resolution to nearest half hour
      const hours =
        Math.round(
          (Math.random() * (maxSleepHours - minSleepHours) + minSleepHours) * 2,
        ) / 2
      const date = dayjs
        .utc()
        .startOf('day')
        .subtract(i + 1, 'days')
        .toISOString()
      sleeps.push({ hours, date })
    }
    await prisma.person.create({
      data: {
        name,
        gender,
        sleeps: {
          createMany: {
            data: sleeps,
          },
        },
      },
    })
  }
}

;(async () => {
  try {
    console.log('Seeding data...')
    await seed()
    console.log('All done!')
  } catch (err) {
    console.error(err)
  } finally {
    await prisma.$disconnect()
  }
})()
