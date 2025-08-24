-- AlterTable
ALTER TABLE `user` ADD COLUMN `confirmation_code` VARCHAR(191) NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updated_at` DATETIME(3) NULL;
