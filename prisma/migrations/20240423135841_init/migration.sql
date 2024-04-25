-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sleep" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hours" DECIMAL(4,2) NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "Sleep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_name_gender_key" ON "Person"("name", "gender");

-- CreateIndex
CREATE UNIQUE INDEX "Sleep_personId_date_key" ON "Sleep"("personId", "date");

-- AddForeignKey
ALTER TABLE "Sleep" ADD CONSTRAINT "Sleep_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
