/*
  Warnings:

  - You are about to alter the column `totalHours` on the `electricity` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `electricity` MODIFY `totalHours` DECIMAL(65, 30) NULL;
