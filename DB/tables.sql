-- Create Tables
CREATE TABLE Users(
    `userId` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(64) NOT NULL UNIQUE ,
    `nickname` VARCHAR(10) NOT NULL ,
    `password` VARCHAR(100) NULL ,
    `provider` VARCHAR(6) NOT NULL DEFAULT 'local',
    `snsId` VARCHAR(30) NULL DEFAULT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
    `status` CHAR(1) DEFAULT 'a',
    PRIMARY KEY (`userId`)
);
CREATE TABLE Rooms(
    `roomId` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(24) NOT NULL ,
    `password` VARCHAR(100) NULL DEFAULT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
    `status` CHAR(1) DEFAULT 'a',
    PRIMARY KEY (`roomId`)
);
CREATE TABLE Users_Rooms(
    `user_roomId` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INT(10) UNSIGNED NOT NULL ,
    `roomId` INT(10) UNSIGNED NOT NULL ,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
    `status` CHAR(1) DEFAULT 'a',
    PRIMARY KEY (`user_roomId`)
);
CREATE TABLE Chats(
    `chatId` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(400) NOT NULL ,
    `user_roomId` INT(10) UNSIGNED NOT NULL ,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
    `status` CHAR(1) DEFAULT 'a',
    PRIMARY KEY (`chatId`)
);
ALTER TABLE `Users_Rooms` ADD CONSTRAINT `fk_Users_Rooms_userId` FOREIGN KEY(`userId`) REFERENCES `Users` (`userId`);
ALTER TABLE `Users_Rooms` ADD CONSTRAINT `fk_Users_Rooms_roomId` FOREIGN KEY(`roomId`) REFERENCES `Rooms` (`roomId`);
ALTER TABLE `Chats` ADD CONSTRAINT `fk_Chats_user_roomId` FOREIGN KEY(`user_roomId`) REFERENCES `Users_Rooms` (`user_roomId`);