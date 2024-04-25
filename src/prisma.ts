import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export type { Prisma, Gender } from '@prisma/client'
