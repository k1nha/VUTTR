/*
  Warnings:

  - You are about to drop the column `tags` on the `tools` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tools` DROP COLUMN `tags`;

-- CreateTable
CREATE TABLE `tags_tool` (
    `toolId` INTEGER NOT NULL AUTO_INCREMENT,
    `tagName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`toolId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tags_tool` ADD CONSTRAINT `tags_tool_toolId_fkey` FOREIGN KEY (`toolId`) REFERENCES `tools`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
