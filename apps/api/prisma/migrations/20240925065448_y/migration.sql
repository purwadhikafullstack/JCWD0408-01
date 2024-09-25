/*
  Warnings:

  - You are about to drop the column `city` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `postcode` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `subdistrict` on the `store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `store` DROP COLUMN `city`,
    DROP COLUMN `postcode`,
    DROP COLUMN `province`,
    DROP COLUMN `subdistrict`;
