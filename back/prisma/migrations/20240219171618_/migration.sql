/*
  Warnings:

  - You are about to drop the column `blockedBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `blockedMe` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "blockedBy",
DROP COLUMN "blockedMe",
ADD COLUMN     "blockedByUsers" TEXT[],
ADD COLUMN     "blockedUsers" TEXT[];
