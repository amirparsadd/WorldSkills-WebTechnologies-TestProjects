/*
  Warnings:

  - You are about to alter the column `grossWeight` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `netContentWeight` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `grossWeight` DOUBLE NOT NULL,
    MODIFY `netContentWeight` DOUBLE NOT NULL;
