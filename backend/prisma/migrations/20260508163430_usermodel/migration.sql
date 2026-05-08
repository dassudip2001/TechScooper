-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('customer', 'admin') NOT NULL DEFAULT 'customer';
