-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_EN` VARCHAR(191) NOT NULL,
    `name_FR` VARCHAR(191) NOT NULL,
    `gtin` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `grossWeight` INTEGER NOT NULL,
    `netContentWeight` INTEGER NOT NULL,
    `weightUnit` VARCHAR(191) NOT NULL,
    `desc_EN` LONGTEXT NOT NULL,
    `desc_FA` LONGTEXT NOT NULL,
    `companyID` INTEGER NOT NULL,

    UNIQUE INDEX `Product_id_key`(`id`),
    UNIQUE INDEX `Product_gtin_key`(`gtin`),
    UNIQUE INDEX `Product_companyID_key`(`companyID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_companyID_fkey` FOREIGN KEY (`companyID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
