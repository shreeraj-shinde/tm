/*
  Warnings:

  - You are about to drop the column `taskId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "taskId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "groupId",
DROP COLUMN "taskId";
