-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_adminId_fkey`;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
