/*
  Warnings:

  - You are about to drop the column `desc_FA` on the `Product` table. All the data in the column will be lost.
  - Added the required column `desc_FR` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `desc_FA`,
    ADD COLUMN `desc_FR` LONGTEXT NOT NULL;
