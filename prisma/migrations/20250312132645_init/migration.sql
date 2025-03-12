/*
  Warnings:

  - You are about to drop the column `date_added` on the `history` table. All the data in the column will be lost.
  - You are about to drop the column `uid2` on the `history` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rfid_uid` to the `history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history` DROP COLUMN `date_added`,
    DROP COLUMN `uid2`,
    ADD COLUMN `createdAt` TEXT NOT NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `rfid_uid` TEXT NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `electricity_meter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dailyElectricityGenerated` VARCHAR(191) NULL,
    `dailyElectricityConsumption` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
