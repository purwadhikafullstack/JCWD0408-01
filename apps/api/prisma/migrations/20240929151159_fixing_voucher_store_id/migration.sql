-- DropForeignKey
ALTER TABLE `discount` DROP FOREIGN KEY `Discount_store_id_fkey`;

-- AlterTable
ALTER TABLE `discount` MODIFY `store_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `voucher` MODIFY `voucher_code` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`store_id`) ON DELETE SET NULL ON UPDATE CASCADE;
