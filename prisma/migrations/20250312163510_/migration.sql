/*
  Warnings:

  - Made the column `updatedAt` on table `account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `battery` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `electricity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `electricity_meter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `history` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `rfid` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `admin` MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `battery` MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `electricity` MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `electricity_meter` MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `history` MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `rfid` MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `updatedAt` DATETIME(3) NOT NULL;
