/*
  Warnings:

  - You are about to alter the column `totalHours` on the `electricity` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `electricity` MODIFY `totalHours` DECIMAL(10, 2) NULL;
