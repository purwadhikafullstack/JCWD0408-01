/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `store` ADD COLUMN `user_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Store_user_id_key` ON `Store`(`user_id`);

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
