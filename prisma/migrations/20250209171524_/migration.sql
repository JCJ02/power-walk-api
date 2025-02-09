/*
  Warnings:

  - You are about to drop the column `generatedElectricity` on the `electricity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `electricity` DROP COLUMN `generatedElectricity`,
    ADD COLUMN `electricityGenerated` VARCHAR(191) NULL;
