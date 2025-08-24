/*
  Warnings:

  - You are about to drop the column `confirmation_code` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `confirmation_code`,
    DROP COLUMN `status`,
    DROP COLUMN `updated_at`;
