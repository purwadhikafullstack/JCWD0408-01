/*
  Warnings:

  - Added the required column `postcode` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `postcode` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL,
    ADD COLUMN `subdistrict` VARCHAR(191) NULL;
