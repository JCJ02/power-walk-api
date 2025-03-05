/*
  Warnings:

  - You are about to drop the column `current` on the `battery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `battery` DROP COLUMN `current`,
    ADD COLUMN `batteryVoltage` VARCHAR(191) NULL;
