SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `telegram`;
CREATE TABLE `telegram` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request` varchar(200) NOT NULL,
  `response` longtext NOT NULL,
  `action` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `telegram` (`id`, `request`, `response`, `action`) VALUES
(1,	'hello',	'Hai ?name\r\nCan i help you ?',	''),
(2,	'hi',	'Hello ?name\r\nCan i help you ?',	NULL);

-- 2018-09-26 05:16:46
