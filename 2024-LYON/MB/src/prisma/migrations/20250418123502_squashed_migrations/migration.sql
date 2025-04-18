-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `passphrase` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_id_key`(`id`),
    UNIQUE INDEX `Admin_passphrase_key`(`passphrase`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `deactivated` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Company_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Owner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `companyID` INTEGER NOT NULL,

    UNIQUE INDEX `Owner_id_key`(`id`),
    UNIQUE INDEX `Owner_companyID_key`(`companyID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `companyID` INTEGER NOT NULL,

    UNIQUE INDEX `Contact_id_key`(`id`),
    UNIQUE INDEX `Contact_companyID_key`(`companyID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_EN` VARCHAR(191) NOT NULL,
    `name_FR` VARCHAR(191) NOT NULL,
    `gtin` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `grossWeight` DOUBLE NOT NULL,
    `netContentWeight` DOUBLE NOT NULL,
    `weightUnit` VARCHAR(191) NOT NULL,
    `desc_EN` LONGTEXT NOT NULL,
    `desc_FR` LONGTEXT NOT NULL,
    `hidden` BOOLEAN NOT NULL DEFAULT false,
    `companyID` INTEGER NOT NULL,

    UNIQUE INDEX `Product_id_key`(`id`),
    UNIQUE INDEX `Product_gtin_key`(`gtin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Owner` ADD CONSTRAINT `Owner_companyID_fkey` FOREIGN KEY (`companyID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_companyID_fkey` FOREIGN KEY (`companyID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_companyID_fkey` FOREIGN KEY (`companyID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
