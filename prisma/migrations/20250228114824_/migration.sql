-- CreateTable
CREATE TABLE `history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid2` TEXT NOT NULL,
    `date_added` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
