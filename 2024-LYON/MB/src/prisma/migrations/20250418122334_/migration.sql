-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_companyID_fkey`;

-- DropIndex
DROP INDEX `Product_companyID_key` ON `Product`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_companyID_fkey` FOREIGN KEY (`companyID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
