-- AlterTable
ALTER TABLE `battery` MODIFY `batteryPercentage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `uid` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Electricity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `electricityConsumption` VARCHAR(191) NULL,
    `generatedElectricity` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
