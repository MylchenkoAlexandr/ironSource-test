-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               10.4.17-MariaDB - mariadb.org binary distribution
-- Операционная система:         Win64
-- HeidiSQL Версия:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Дамп структуры базы данных aura_test_db
DROP DATABASE IF EXISTS `aura_test_db`;
CREATE DATABASE IF NOT EXISTS `aura_test_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `aura_test_db`;

-- Дамп структуры для таблица aura_test_db.applications
DROP TABLE IF EXISTS `applications`;
CREATE TABLE IF NOT EXISTS `applications` (
  `_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `rank` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`_id`),
  KEY `_id` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы aura_test_db.applications: ~12 rows (приблизительно)
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
REPLACE INTO `applications` (`_id`, `name`, `rank`) VALUES
	(1, 'WhatsUp', 0),
	(2, 'Instagram', 1),
	(3, 'Spotify', 0),
	(4, 'Facebook', 1),
	(5, 'MixCloud', 0),
	(6, 'SoundCloud', 1),
	(7, 'ImgBB', 0),
	(8, 'DeviantantART', 2),
	(9, 'GitHub', 3),
	(10, 'BitBucket', 0),
	(11, 'Habrahabr', 3),
	(12, 'Yaplakal', 1);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;

-- Дамп структуры для таблица aura_test_db.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`_id`) USING BTREE,
  KEY `_id` (`_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы aura_test_db.categories: ~4 rows (приблизительно)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
REPLACE INTO `categories` (`_id`, `name`) VALUES
	(1, 'Social'),
	(2, 'Music'),
	(3, 'Images'),
	(4, 'Development');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Дамп структуры для таблица aura_test_db.ranks_cross
DROP TABLE IF EXISTS `ranks_cross`;
CREATE TABLE IF NOT EXISTS `ranks_cross` (
  `_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) unsigned NOT NULL,
  `application_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `unique` (`category_id`,`application_id`) USING BTREE,
  KEY `application_id` (`application_id`),
  KEY `_id` (`_id`),
  KEY `category_id` (`category_id`) USING BTREE,
  CONSTRAINT `FK_ranks_cross_applications` FOREIGN KEY (`application_id`) REFERENCES `applications` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ranks_cross_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы aura_test_db.ranks_cross: ~19 rows (приблизительно)
/*!40000 ALTER TABLE `ranks_cross` DISABLE KEYS */;
REPLACE INTO `ranks_cross` (`_id`, `category_id`, `application_id`) VALUES
	(10, 1, 1),
	(9, 1, 2),
	(8, 1, 4),
	(18, 1, 5),
	(17, 1, 6),
	(7, 1, 8),
	(13, 1, 11),
	(19, 1, 12),
	(11, 2, 3),
	(5, 2, 5),
	(6, 2, 6),
	(21, 2, 12),
	(4, 3, 2),
	(3, 3, 7),
	(16, 3, 11),
	(20, 3, 12),
	(2, 4, 9),
	(1, 4, 10),
	(12, 4, 11);
/*!40000 ALTER TABLE `ranks_cross` ENABLE KEYS */;

-- Дамп структуры для представление aura_test_db.ranks_cross_view
DROP VIEW IF EXISTS `ranks_cross_view`;
-- Создание временной таблицы для обработки ошибок зависимостей представлений
CREATE TABLE `ranks_cross_view` (
	`_id` BIGINT(20) UNSIGNED NOT NULL,
	`category_id` BIGINT(20) UNSIGNED NULL,
	`category_name` VARCHAR(256) NULL COLLATE 'utf8_general_ci',
	`application_id` BIGINT(20) UNSIGNED NULL,
	`application_name` VARCHAR(256) NULL COLLATE 'utf8_general_ci',
	`application_rank` INT(10) UNSIGNED NULL
) ENGINE=MyISAM;

-- Дамп структуры для процедура aura_test_db.applicationRankUp
DROP PROCEDURE IF EXISTS `applicationRankUp`;
DELIMITER //
CREATE PROCEDURE `applicationRankUp`(
	IN `applicationId` INT
)
BEGIN
	UPDATE applications app 
	SET app.rank = app.rank + 1
	WHERE app._id = applicationId ;
END//
DELIMITER ;

-- Дамп структуры для процедура aura_test_db.getBronzeRank
DROP PROCEDURE IF EXISTS `getBronzeRank`;
DELIMITER //
CREATE PROCEDURE `getBronzeRank`(
	IN `category_id` BIGINT,
	IN `maxLimit` TINYINT
)
    READS SQL DATA
    DETERMINISTIC
BEGIN
	SELECT * FROM ranks_cross_view rc
	WHERE rc.category_id = category_id
	ORDER BY RAND()
	LIMIT maxLimit ;
END//
DELIMITER ;

-- Дамп структуры для процедура aura_test_db.getGoldRank
DROP PROCEDURE IF EXISTS `getGoldRank`;
DELIMITER //
CREATE PROCEDURE `getGoldRank`(
	IN `category_id` BIGINT,
	IN `maxLimit` TINYINT
)
    DETERMINISTIC
BEGIN
	SELECT * FROM ranks_cross_view rc
	WHERE rc.category_id = category_id
	ORDER BY rc.application_rank DESC
	LIMIT maxLimit ;
END//
DELIMITER ;

-- Дамп структуры для представление aura_test_db.ranks_cross_view
DROP VIEW IF EXISTS `ranks_cross_view`;
-- Удаление временной таблицы и создание окончательной структуры представления
DROP TABLE IF EXISTS `ranks_cross_view`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `ranks_cross_view` AS SELECT
	rc._id,
	ct._id AS "category_id",
	ct.name AS "category_name",
	app._id AS "application_id",
	app.name AS "application_name",
	app.rank AS "application_rank"
FROM ranks_cross rc
LEFT JOIN applications app ON app._id = rc.application_id
LEFT JOIN categories ct ON ct._id = rc.category_id
ORDER BY app._id ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
