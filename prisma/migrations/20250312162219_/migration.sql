/*
  Warnings:

  - You are about to alter the column `dailyElectricityGenerated` on the `electricity_meter` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `dailyElectricityConsumption` on the `electricity_meter` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `electricity_meter` MODIFY `dailyElectricityGenerated` DECIMAL(10, 2) NULL,
    MODIFY `dailyElectricityConsumption` DECIMAL(10, 2) NULL;
