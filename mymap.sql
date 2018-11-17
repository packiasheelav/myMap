CREATE TABLE `mymap`.`places` ( `id` INT NOT NULL AUTO_INCREMENT , `place_id` INT(100) NOT NULL , `title` VARCHAR(150) NOT NULL ,
`desciption` VARCHAR(250) NOT NULL , `latitude` FLOAT NULL DEFAULT NULL , 
`longitude` FLOAT NULL DEFAULT NULL , `opening_hrs` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;

INSERT INTO `places`(`id`, `place_id`, `title`, `desciption`, `latitude`, `longitude`, `opening_hrs`) VALUES (1,1,'Pizza Hut','pizza hut is nice',60.175834, 24.805026,'2018-11-14 13:17:17')
INSERT INTO `places`(`id`, `place_id`, `title`, `desciption`, `latitude`, `longitude`, `opening_hrs`) VALUES (2,111,'koti pizza','pizza hut is nice',60.188738, 24.794313,'2018-11-14 13:17:17')