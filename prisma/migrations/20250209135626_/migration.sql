/*
  Warnings:

  - You are about to alter the column `uid` on the `student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `uid` INTEGER NOT NULL;
