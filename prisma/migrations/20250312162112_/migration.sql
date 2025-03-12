/*
  Warnings:

  - You are about to alter the column `dailyElectricityGenerated` on the `electricity_meter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(65,30)`.
  - You are about to alter the column `dailyElectricityConsumption` on the `electricity_meter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `admin` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `battery` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `electricity` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `electricity_meter` MODIFY `dailyElectricityGenerated` DECIMAL(65, 30) NULL,
    MODIFY `dailyElectricityConsumption` DECIMAL(65, 30) NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `history` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `rfid` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `updatedAt` DATETIME(3) NULL;
