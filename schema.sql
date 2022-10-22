--
-- Table structure for table `category`
--
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int NOT NULL,
  `catName` varchar(45) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `asset`
--
CREATE TABLE IF NOT EXISTS `asset` (
  `asset_tag` varchar(20) NOT NULL,
  `name` tinytext NOT NULL,
  `description` mediumtext NOT NULL,
  `date_added` date NOT NULL,
  `damage_notes` mediumtext,
  `category` int NOT NULL,
  `operational` tinyint NOT NULL,
  `checked_out` tinyint NOT NULL,
  `advanced` tinyint NOT NULL,
  PRIMARY KEY (`asset_tag`),
  UNIQUE KEY `asset_tag_UNIQUE` (`asset_tag`),
  CONSTRAINT `category` FOREIGN KEY (`category`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `user`
-- 
-- THIS SHOULD COME BEFORE checkoutrecord OR ITS CONSTRAINT WILL FAIL
-- 
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `strikes` tinyint DEFAULT NULL,
  `username` varchar(90) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `permissions` tinyint NOT NULL,
  `advanced` tinyint NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `checkoutrecord`
--
CREATE TABLE IF NOT EXISTS `checkoutrecord` (
  `record_id` int NOT NULL,
  `student_id` int NOT NULL,
  `operator_id` int NOT NULL,
  `asset_tag` varchar(20) NOT NULL,
  `notes` mediumtext,
  `out_date` datetime NOT NULL,
  `in_date` datetime NOT NULL,
  `due_date` datetime NOT NULL,
  PRIMARY KEY (`record_id`),
  UNIQUE KEY `record-id_UNIQUE` (`record_id`),
  KEY `student_id_idx` (`student_id`),
  KEY `operator-id_idx` (`operator_id`),
  KEY `asset_tag_idx` (`asset_tag`),
  CONSTRAINT `asset_tag` FOREIGN KEY (`asset_tag`) REFERENCES `asset` (`asset_tag`),
  CONSTRAINT `operator-id` FOREIGN KEY (`operator_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `student_id` FOREIGN KEY (`student_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `user`
--
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `strikes` tinyint DEFAULT NULL,
  `username` varchar(90) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `permissions` tinyint NOT NULL,
  `advanced` tinyint NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
