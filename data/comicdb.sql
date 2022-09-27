-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: comicdb
-- ------------------------------------------------------
-- Server version	8.0.29

use heroku_492d55f2976fab6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add category',7,'add_category'),(26,'Can change category',7,'change_category'),(27,'Can delete category',7,'delete_category'),(28,'Can view category',7,'view_category'),(29,'Can add chapter',8,'add_chapter'),(30,'Can change chapter',8,'change_chapter'),(31,'Can delete chapter',8,'delete_chapter'),(32,'Can view chapter',8,'view_chapter'),(33,'Can add comic',9,'add_comic'),(34,'Can change comic',9,'change_comic'),(35,'Can delete comic',9,'delete_comic'),(36,'Can view comic',9,'view_comic'),(37,'Can add rating',10,'add_rating'),(38,'Can change rating',10,'change_rating'),(39,'Can delete rating',10,'delete_rating'),(40,'Can view rating',10,'view_rating'),(41,'Can add comment',11,'add_comment'),(42,'Can change comment',11,'change_comment'),(43,'Can delete comment',11,'delete_comment'),(44,'Can view comment',11,'view_comment'),(45,'Can add comic view',12,'add_comicview'),(46,'Can change comic view',12,'change_comicview'),(47,'Can delete comic view',12,'delete_comicview'),(48,'Can view comic view',12,'view_comicview'),(49,'Can add chapter image',13,'add_chapterimage'),(50,'Can change chapter image',13,'change_chapterimage'),(51,'Can delete chapter image',13,'delete_chapterimage'),(52,'Can view chapter image',13,'view_chapterimage'),(53,'Can add application',14,'add_application'),(54,'Can change application',14,'change_application'),(55,'Can delete application',14,'delete_application'),(56,'Can view application',14,'view_application'),(57,'Can add access token',15,'add_accesstoken'),(58,'Can change access token',15,'change_accesstoken'),(59,'Can delete access token',15,'delete_accesstoken'),(60,'Can view access token',15,'view_accesstoken'),(61,'Can add grant',16,'add_grant'),(62,'Can change grant',16,'change_grant'),(63,'Can delete grant',16,'delete_grant'),(64,'Can view grant',16,'view_grant'),(65,'Can add refresh token',17,'add_refreshtoken'),(66,'Can change refresh token',17,'change_refreshtoken'),(67,'Can delete refresh token',17,'delete_refreshtoken'),(68,'Can view refresh token',17,'view_refreshtoken'),(69,'Can add id token',18,'add_idtoken'),(70,'Can change id token',18,'change_idtoken'),(71,'Can delete id token',18,'delete_idtoken'),(72,'Can view id token',18,'view_idtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comics_category`
--

DROP TABLE IF EXISTS `comics_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comics_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics_category`
--

LOCK TABLES `comics_category` WRITE;
/*!40000 ALTER TABLE `comics_category` DISABLE KEYS */;
INSERT INTO `comics_category` VALUES (2,'Action'),(3,'Adventure'),(1,'Manga'),(5,'Manhua'),(4,'Manhwa');
/*!40000 ALTER TABLE `comics_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comics_chapter`
--

DROP TABLE IF EXISTS `comics_chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comics_chapter` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `title` longtext,
  `chapter_num` int unsigned NOT NULL,
  `slug` varchar(50) NOT NULL,
  `comic_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comics_chapter_chapter_num_comic_id_552155c9_uniq` (`chapter_num`,`comic_id`),
  KEY `comics_chapter_comic_id_188bcc12_fk_comics_comic_id` (`comic_id`),
  KEY `comics_chapter_slug_56c4d5c5` (`slug`),
  CONSTRAINT `comics_chapter_comic_id_188bcc12_fk_comics_comic_id` FOREIGN KEY (`comic_id`) REFERENCES `comics_comic` (`id`),
  CONSTRAINT `comics_chapter_chk_1` CHECK ((`chapter_num` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics_chapter`
--

LOCK TABLES `comics_chapter` WRITE;
/*!40000 ALTER TABLE `comics_chapter` DISABLE KEYS */;
INSERT INTO `comics_chapter` VALUES (1,'2022-08-15 10:18:36.200919','2022-08-15 10:18:36.200919',1,'None',1,'chapter-1',1),(2,'2022-08-15 10:19:55.004125','2022-08-15 10:19:55.004125',1,'None',62,'chapter-62',2),(3,'2022-08-15 10:20:59.022836','2022-08-15 10:20:59.023830',1,'None',1,'chapter-1',3),(4,'2022-08-15 10:21:29.245030','2022-08-15 10:21:29.245030',1,'None',1,'chapter-1',4);
/*!40000 ALTER TABLE `comics_chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comics_chapterimage`
--

DROP TABLE IF EXISTS `comics_chapterimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comics_chapterimage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(100) NOT NULL,
  `chapter_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comics_chapterimage_chapter_id_8d2192c7_fk_comics_chapter_id` (`chapter_id`),
  CONSTRAINT `comics_chapterimage_chapter_id_8d2192c7_fk_comics_chapter_id` FOREIGN KEY (`chapter_id`) REFERENCES `comics_chapter` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics_chapterimage`
--

LOCK TABLES `comics_chapterimage` WRITE;
/*!40000 ALTER TABLE `comics_chapterimage` DISABLE KEYS */;
INSERT INTO `comics_chapterimage` VALUES (1,'comics/a-returners-magic-should-be-special/chapter-1/0_awf4bf',1),(2,'comics/a-returners-magic-should-be-special/chapter-1/1_u8xybc',1),(3,'comics/a-returners-magic-should-be-special/chapter-1/2_psoytv',1),(4,'comics/a-returners-magic-should-be-special/chapter-1/3_nngls6',1),(5,'comics/a-returners-magic-should-be-special/chapter-1/4_cg09fy',1),(6,'comics/a-returners-magic-should-be-special/chapter-1/5_mpoz0l',1),(7,'comics/a-returners-magic-should-be-special/chapter-1/6_dilhxx',1),(8,'comics/a-returners-magic-should-be-special/chapter-1/7_mkuxid',1),(9,'comics/a-returners-magic-should-be-special/chapter-1/8_rzmxws',1),(10,'comics/a-returners-magic-should-be-special/chapter-1/9_zwyfai',1),(11,'comics/a-returners-magic-should-be-special/chapter-1/10_zvetvw',1),(12,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__01-1_josix9',2),(13,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__02_pwbpah',2),(14,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__03_vk9ztz',2),(15,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__04_vkp2c3',2),(16,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__05_zjfyct',2),(17,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__06_ebkanq',2),(18,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__07_grbit1',2),(19,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__08_nctkw6',2),(20,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__09_bofujy',2),(21,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__10_plfniv',2),(22,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__11_pvgxh2',2),(23,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__12_rrrylp',2),(24,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__13_qeol1r',2),(25,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__14_cjtl1r',2),(26,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__15_lvjbtv',2),(27,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__16_o26ygx',2),(28,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__17_gaf3wc',2),(29,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__18_o29bg6',2),(30,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__19_y6idkn',2),(31,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__20_vvvxuz',2),(32,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__21_kmbutw',2),(33,'comics/goblin-slayer-side-story-year-one/chapter-62/GSYO-62__22_p5xsra',2),(34,'comics/kill-the-hero/chapter-1/images-11-223x300_t4q6ac',3),(35,'comics/magic-emperor/chapter-1/1_erem2c',4),(36,'comics/magic-emperor/chapter-1/10_pdzlc9',4),(37,'comics/magic-emperor/chapter-1/11_ljacto',4),(38,'comics/magic-emperor/chapter-1/100_yn8kik',4),(39,'comics/magic-emperor/chapter-1/101_baqluy',4),(40,'comics/magic-emperor/chapter-1/102_qjr8ji',4),(41,'comics/magic-emperor/chapter-1/103_i3dv3t',4),(42,'comics/magic-emperor/chapter-1/105_f63st0',4),(43,'comics/magic-emperor/chapter-1/106_yetf5v',4),(44,'comics/magic-emperor/chapter-1/107_n2mzee',4),(45,'comics/magic-emperor/chapter-1/108_b2danb',4),(46,'comics/magic-emperor/chapter-1/109_yhb9uh',4),(47,'comics/magic-emperor/chapter-1/111_fzekgn',4),(48,'comics/magic-emperor/chapter-1/112_yij7gj',4),(49,'comics/magic-emperor/chapter-1/113_nf88dj',4),(50,'comics/magic-emperor/chapter-1/114_yrh1j4',4),(51,'comics/magic-emperor/chapter-1/115_khliyo',4),(52,'comics/magic-emperor/chapter-1/116_whbuwp',4),(53,'comics/magic-emperor/chapter-1/118_nb6jyi',4),(54,'comics/magic-emperor/chapter-1/119_jzgtah',4);
/*!40000 ALTER TABLE `comics_chapterimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comics_comic`
--

DROP TABLE IF EXISTS `comics_comic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comics_comic` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` longtext,
  `slug` varchar(50) NOT NULL,
  `thumbnail` varchar(100) NOT NULL,
  `author` longtext,
  `posted_by_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `comics_comic_posted_by_id_3b6028eb_fk_comics_user_id` (`posted_by_id`),
  CONSTRAINT `comics_comic_posted_by_id_3b6028eb_fk_comics_user_id` FOREIGN KEY (`posted_by_id`) REFERENCES `comics_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics_comic`
--

LOCK TABLES `comics_comic` WRITE;
/*!40000 ALTER TABLE `comics_comic` DISABLE KEYS */;
INSERT INTO `comics_comic` VALUES (1,'2022-08-15 10:18:33.370717','2022-08-15 10:18:33.370717',1,'A Returner’s Magic Should Be Special','','a-returners-magic-should-be-special','comics/a-returners-magic-should-be-special/thumbnail/A-Returners-Magic-Should-Be-Special_hd9ykb','None',1),(2,'2022-08-15 10:19:54.241158','2022-08-15 10:19:54.241158',1,'Goblin Slayer Side Story Year One','','goblin-slayer-side-story-year-one','comics/goblin-slayer-side-story-year-one/thumbnail/Goblin-Slayer-Side-Story-Year-One_z6bg42','None',1),(3,'2022-08-15 10:20:58.377439','2022-08-15 10:20:58.377439',1,'kill the hero','','kill-the-hero','comics/kill-the-hero/thumbnail/images-11-223x300_deq4jb','None',1),(4,'2022-08-15 10:21:28.598736','2022-08-15 10:21:28.598736',1,'magic emperor','','magic-emperor','comics/magic-emperor/thumbnail/43692_zo9y8e','None',1);
/*!40000 ALTER TABLE `comics_comic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comics_comic_categories`
--

DROP TABLE IF EXISTS `comics_comic_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comics_comic_categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comic_id` bigint NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comics_comic_categories_comic_id_category_id_3421b8cb_uniq` (`comic_id`,`category_id`),
  KEY `comics_comic_categor_category_id_67ea1e8d_fk_comics_ca` (`category_id`),
  CONSTRAINT `comics_comic_categor_category_id_67ea1e8d_fk_comics_ca` FOREIGN KEY (`category_id`) REFERENCES `comics_category` (`id`),
  CONSTRAINT `comics_comic_categories_comic_id_e2e3d1d4_fk_comics_comic_id` FOREIGN KEY (`comic_id`) REFERENCES `comics_comic` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics_comic_categories`
--

LOCK TABLES `comics_comic_categories` WRITE;
/*!40000 ALTER TABLE `comics_comic_categories` DISABLE KEYS */;
INSERT INTO `comics_comic_categories` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,2),(5,2,3),(6,3,2),(7,3,3),(8,4,2),(9,4,5);
/*!40000 ALTER TABLE `comics_comic_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comics_comicview`
--

DROP TABLE IF EXISTS `comics_comicview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comics_comicview` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `views` int NOT NULL,
  `comic_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comic_id` (`comic_id`),
  CONSTRAINT `comics_comicview_comic_id_0b2cfa3e_fk_comics_comic_id` FOREIGN KEY (`comic_id`) REFERENCES `comics_comic` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics_comicview`
--

LOCK TABLES `comics_comicview` WRITE;
/*!40000 ALTER TABLE `comics_comicview` DISABLE KEYS */;
/*!40000 ALTER TABLE `comics_comicview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comics_comment`
--

DROP TABLE IF EXISTS `comics_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comics_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `comic_id` bigint NOT NULL,
  `creator_id` bigint NOT NULL,
  `reply_to_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comics_comment_comic_id_67d4f254_fk_comics_comic_id` (`comic_id`),
  KEY `comics_comment_creator_id_5e5414e7_fk_comics_user_id` (`creator_id`),
  KEY `comics_comment_reply_to_id_35170bf0_fk_comics_comment_id` (`reply_to_id`),
  CONSTRAINT `comics_comment_comic_id_67d4f254_fk_comics_comic_id` FOREIGN KEY (`comic_id`) REFERENCES `comics_comic` (`id`),
  CONSTRAINT `comics_comment_creator_id_5e5414e7_fk_comics_user_id` FOREIGN KEY (`creator_id`) REFERENCES `comics_user` (`id`),
  CONSTRAINT `comics_comment_reply_to_id_35170bf0_fk_comics_comment_id` FOREIGN KEY (`reply_to_id`) REFERENCES `comics_comment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics_comment`
--

LOCK TABLES `comics_comment` WRITE;
/*!40000 ALTER TABLE `comics_comment` DISABLE KEYS */;
INSERT INTO `comics_comment` VALUES (1,'This is a root comment','2022-09-09 14:41:45.000000','2022-09-09 14:41:45.000000',1,1,NULL),(2,'test reply to comment 1 again','2022-09-13 09:09:56.174234','2022-09-13 09:09:56.174234',4,2,1);
/*!40000 ALTER TABLE `comics_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comics_rating`
--

DROP TABLE IF EXISTS `comics_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comics_rating` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `rate` smallint unsigned NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `comic_id` bigint NOT NULL,
  `creator_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comics_rating_comic_id_220ac71a_fk_comics_comic_id` (`comic_id`),
  KEY `comics_rating_creator_id_19bfd315_fk_comics_user_id` (`creator_id`),
  CONSTRAINT `comics_rating_comic_id_220ac71a_fk_comics_comic_id` FOREIGN KEY (`comic_id`) REFERENCES `comics_comic` (`id`),
  CONSTRAINT `comics_rating_creator_id_19bfd315_fk_comics_user_id` FOREIGN KEY (`creator_id`) REFERENCES `comics_user` (`id`),
  CONSTRAINT `comics_rating_chk_1` CHECK ((`rate` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics_rating`
--

LOCK TABLES `comics_rating` WRITE;
/*!40000 ALTER TABLE `comics_rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `comics_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comics_user`
--

DROP TABLE IF EXISTS `comics_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comics_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics_user`
--

LOCK TABLES `comics_user` WRITE;
/*!40000 ALTER TABLE `comics_user` DISABLE KEYS */;
INSERT INTO `comics_user` VALUES (1,'pbkdf2_sha256$260000$L3quCJIyUXCovKcZnK2Jeo$B5icrgmahhLnkd75eKLm93igeaE89xzGvLZ/mQwMH5c=','2022-09-13 03:01:26.000000',1,'admin','','','admin@gmail.com',1,1,'2022-08-15 10:13:48.000000',''),(2,'pbkdf2_sha256$260000$F9LnCcum7OAp8lgnWK6ABM$zt6h+cvSaXLH4IoObtSACHPvhm3I4JXyjwOy3GeEsbI=',NULL,0,'test','','','',0,1,'2022-09-13 08:45:28.000000',''),(3,'pbkdf2_sha256$260000$4MHajFJnhcJTYnZ0klOmsK$tRZAEq3okOT3ibPNZV4EV6Boj9EJ+uW4VS9DsDB8qgY=',NULL,0,'test2','','','',0,1,'2022-09-20 03:11:27.145000',''),(4,'pbkdf2_sha256$260000$BHxbsYpVy15iyzlD3jNCqs$xbq1leyxGPkPxrVoozgVGAAQyqOja37dDWCA33dCu9E=',NULL,0,'test123','','','',0,1,'2022-09-20 07:29:00.660204',''),(6,'pbkdf2_sha256$260000$6kB8sSL2EJNzg9TuEUoFNZ$NcyYqH4FR+jy4sxG/UYos5kn4Cv2Hdtwx3yGyDpVmB4=',NULL,0,'test1234','','','',0,1,'2022-09-20 07:51:13.394236',''),(7,'pbkdf2_sha256$260000$9ivG0l2zsUskZST4KLxNLR$hkQtkO1Hw2u1HXC8MO/wdDYAdUc49qo3tJZy4nYblow=',NULL,0,'test12345','','','',0,1,'2022-09-20 07:52:32.502981',''),(8,'pbkdf2_sha256$260000$QOCnYIpDtYvCJIsbsxdzS7$SqSXD1gAnfhET8gVcwSR0zv0WKfJTVqO/n0OPdg9RIM=',NULL,0,'test123456','','','',0,1,'2022-09-20 08:03:57.401094',''),(9,'pbkdf2_sha256$260000$94JWfC8NIRq2oI5jbLqGwo$g1g1b/R6FxwgwmGw9iyR/oyaQT3RYcGhvexx5bQpMGs=',NULL,0,'test1234567','','','',0,1,'2022-09-20 08:12:09.886637',''),(11,'pbkdf2_sha256$260000$BUoBI9DGMy1CAlLFkCmuFD$LtcD4gagmO1dkS93icVZU51HDIIgX23VLrUVpNVq1TM=',NULL,0,'test5001','','','',0,1,'2022-09-20 08:16:02.870728',''),(12,'pbkdf2_sha256$260000$mzjQLWfdQxYZ7Ts4LDET4J$fDv9q2cQiNJBVIBMK7V1GUbfaHfhGn6iqbNVc6VNo60=',NULL,0,'test201','','','',0,1,'2022-09-20 08:16:53.405875',''),(13,'pbkdf2_sha256$260000$CNrXgYw5R5piFBr8SAsc8y$ti8HDBRCgEWjsSw6pcwGygxIhF1OEGZH6vKevixmqVc=',NULL,0,'test202','','','',0,1,'2022-09-20 08:17:16.428908','');
/*!40000 ALTER TABLE `comics_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comics_user_groups`
--

DROP TABLE IF EXISTS `comics_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comics_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comics_user_groups_user_id_group_id_1c3ae49e_uniq` (`user_id`,`group_id`),
  KEY `comics_user_groups_group_id_45253336_fk_auth_group_id` (`group_id`),
  CONSTRAINT `comics_user_groups_group_id_45253336_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `comics_user_groups_user_id_39b0decc_fk_comics_user_id` FOREIGN KEY (`user_id`) REFERENCES `comics_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics_user_groups`
--

LOCK TABLES `comics_user_groups` WRITE;
/*!40000 ALTER TABLE `comics_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `comics_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comics_user_user_permissions`
--

DROP TABLE IF EXISTS `comics_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comics_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comics_user_user_permissions_user_id_permission_id_158d774d_uniq` (`user_id`,`permission_id`),
  KEY `comics_user_user_per_permission_id_6efa0841_fk_auth_perm` (`permission_id`),
  CONSTRAINT `comics_user_user_per_permission_id_6efa0841_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `comics_user_user_permissions_user_id_54875c99_fk_comics_user_id` FOREIGN KEY (`user_id`) REFERENCES `comics_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comics_user_user_permissions`
--

LOCK TABLES `comics_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `comics_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `comics_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_comics_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_comics_user_id` FOREIGN KEY (`user_id`) REFERENCES `comics_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2022-08-15 10:18:14.792355','1','Manga',1,'[{\"added\": {}}]',7,1),(2,'2022-08-15 10:18:19.923058','2','Action',1,'[{\"added\": {}}]',7,1),(3,'2022-08-15 10:18:22.980586','3','Adventure',1,'[{\"added\": {}}]',7,1),(4,'2022-08-15 10:18:47.234013','1','A Returner’s Magic Should Be Special',1,'[{\"added\": {}}, {\"added\": {\"name\": \"chapter\", \"object\": \"Ch.1 of A Returner\\u2019s Magic Should Be Special\"}}]',9,1),(5,'2022-08-15 10:20:14.157465','2','Goblin Slayer Side Story Year One',1,'[{\"added\": {}}, {\"added\": {\"name\": \"chapter\", \"object\": \"Ch.62 of Goblin Slayer Side Story Year One\"}}]',9,1),(6,'2022-08-15 10:20:41.988040','4','Manhwa',1,'[{\"added\": {}}]',7,1),(7,'2022-08-15 10:20:45.117348','5','Manhua',1,'[{\"added\": {}}]',7,1),(8,'2022-08-15 10:20:59.630910','3','kill the hero',1,'[{\"added\": {}}, {\"added\": {\"name\": \"chapter\", \"object\": \"Ch.1 of kill the hero\"}}]',9,1),(9,'2022-08-15 10:21:43.434968','4','magic emperor',1,'[{\"added\": {}}, {\"added\": {\"name\": \"chapter\", \"object\": \"Ch.1 of magic emperor\"}}]',9,1),(10,'2022-09-13 03:04:48.805283','1','ComicApp',1,'[{\"added\": {}}]',14,1),(11,'2022-09-13 03:10:49.701663','1','ComicApp',2,'[{\"changed\": {\"fields\": [\"User\"]}}]',14,1),(12,'2022-09-13 03:32:01.089131','2','ComicApp2',3,'',14,1),(13,'2022-09-14 13:05:59.273483','1','admin',2,'[{\"changed\": {\"fields\": [\"Avatar\"]}}]',6,1),(14,'2022-09-14 13:16:41.392208','2','test',2,'[{\"changed\": {\"fields\": [\"Avatar\"]}}]',6,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(7,'comics','category'),(8,'comics','chapter'),(13,'comics','chapterimage'),(9,'comics','comic'),(12,'comics','comicview'),(11,'comics','comment'),(10,'comics','rating'),(6,'comics','user'),(4,'contenttypes','contenttype'),(15,'oauth2_provider','accesstoken'),(14,'oauth2_provider','application'),(16,'oauth2_provider','grant'),(18,'oauth2_provider','idtoken'),(17,'oauth2_provider','refreshtoken'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-08-15 10:13:00.355620'),(2,'contenttypes','0002_remove_content_type_name','2022-08-15 10:13:00.533660'),(3,'auth','0001_initial','2022-08-15 10:13:00.930052'),(4,'auth','0002_alter_permission_name_max_length','2022-08-15 10:13:01.020047'),(5,'auth','0003_alter_user_email_max_length','2022-08-15 10:13:01.032049'),(6,'auth','0004_alter_user_username_opts','2022-08-15 10:13:01.075054'),(7,'auth','0005_alter_user_last_login_null','2022-08-15 10:13:01.086912'),(8,'auth','0006_require_contenttypes_0002','2022-08-15 10:13:01.091911'),(9,'auth','0007_alter_validators_add_error_messages','2022-08-15 10:13:01.105912'),(10,'auth','0008_alter_user_username_max_length','2022-08-15 10:13:01.118918'),(11,'auth','0009_alter_user_last_name_max_length','2022-08-15 10:13:01.130914'),(12,'auth','0010_alter_group_name_max_length','2022-08-15 10:13:01.161917'),(13,'auth','0011_update_proxy_permissions','2022-08-15 10:13:01.175921'),(14,'auth','0012_alter_user_first_name_max_length','2022-08-15 10:13:01.194912'),(15,'comics','0001_initial','2022-08-15 10:13:03.002486'),(16,'admin','0001_initial','2022-08-15 10:13:03.241479'),(17,'admin','0002_logentry_remove_auto_add','2022-08-15 10:13:03.262481'),(18,'admin','0003_logentry_add_action_flag_choices','2022-08-15 10:13:03.289485'),(19,'comics','0002_auto_20220815_1712','2022-08-15 10:13:03.485482'),(20,'oauth2_provider','0001_initial','2022-08-15 10:13:04.554131'),(21,'oauth2_provider','0002_auto_20190406_1805','2022-08-15 10:13:04.691126'),(22,'oauth2_provider','0003_auto_20201211_1314','2022-08-15 10:13:04.812125'),(23,'oauth2_provider','0004_auto_20200902_2022','2022-08-15 10:13:05.673174'),(24,'sessions','0001_initial','2022-08-15 10:13:05.737170');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('zhimbyvddzlppgihtj3g5e8189ws4aux','.eJxVjEEOwiAQRe_C2hAGLKBL956BzDCDVA1NSrsy3l2bdKHb_977L5VwXWpau8xpZHVWoA6_G2F-SNsA37HdJp2ntswj6U3RO-36OrE8L7v7d1Cx129Nzppg0MZsvZTBFxsDRqTABUrwZIUBnTOZPJwwSBEPIiR4pMgwOPX-APEBOLU:1oXwAw:l8hlWhwbTMZ7W5xCLeCfr8yxC0AK5Z9aaOtw2pqdL00','2022-09-27 03:01:26.885283'),('zyrzfxzqh6glgyf1e3bl29tlh94zy0rp','.eJxVjEEOwiAQRe_C2hAGLKBL956BzDCDVA1NSrsy3l2bdKHb_977L5VwXWpau8xpZHVWoA6_G2F-SNsA37HdJp2ntswj6U3RO-36OrE8L7v7d1Cx129Nzppg0MZsvZTBFxsDRqTABUrwZIUBnTOZPJwwSBEPIiR4pMgwOPX-APEBOLU:1oNX6d:rBOc8ASbr3_Oe3-9yygTqjZHp_al878XG7Foldl8kOI','2022-08-29 10:13:59.659170');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_accesstoken`
--

DROP TABLE IF EXISTS `oauth2_provider_accesstoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_accesstoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `source_refresh_token_id` bigint DEFAULT NULL,
  `id_token_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  UNIQUE KEY `source_refresh_token_id` (`source_refresh_token_id`),
  UNIQUE KEY `id_token_id` (`id_token_id`),
  KEY `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_accesstoken_user_id_6e4c9a65_fk_comics_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_acce_id_token_id_85db651b_fk_oauth2_pr` FOREIGN KEY (`id_token_id`) REFERENCES `oauth2_provider_idtoken` (`id`),
  CONSTRAINT `oauth2_provider_acce_source_refresh_token_e66fbc72_fk_oauth2_pr` FOREIGN KEY (`source_refresh_token_id`) REFERENCES `oauth2_provider_refreshtoken` (`id`),
  CONSTRAINT `oauth2_provider_accesstoken_user_id_6e4c9a65_fk_comics_user_id` FOREIGN KEY (`user_id`) REFERENCES `comics_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_accesstoken`
--

LOCK TABLES `oauth2_provider_accesstoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_accesstoken` VALUES (1,'dUqb6Y5nYsE6mpFYNqZTAm6O0Itye4','2022-09-13 13:11:46.804661','read write',1,1,'2022-09-13 03:11:46.805665','2022-09-13 03:11:46.805665',NULL,NULL),(2,'8piJsHdHH5uzSA2RYW4fUmy6EKLOU6','2022-09-13 13:11:54.923060','read write',1,1,'2022-09-13 03:11:54.923060','2022-09-13 03:11:54.923060',NULL,NULL),(3,'sEYW51OEsay4ISF5nhkNYxJqONVi8W','2022-09-13 13:29:20.202731','read write',1,1,'2022-09-13 03:29:20.203743','2022-09-13 03:29:20.203743',NULL,NULL),(4,'uUZwSotFQ6GsGmQ9GimDhGoudT5Em8','2022-09-13 13:32:05.442440','read write',1,1,'2022-09-13 03:32:05.443444','2022-09-13 03:32:05.443444',NULL,NULL);
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_application`
--

DROP TABLE IF EXISTS `oauth2_provider_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_application` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `client_id` varchar(100) NOT NULL,
  `redirect_uris` longtext NOT NULL,
  `client_type` varchar(32) NOT NULL,
  `authorization_grant_type` varchar(32) NOT NULL,
  `client_secret` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `skip_authorization` tinyint(1) NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `algorithm` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `client_id` (`client_id`),
  KEY `oauth2_provider_application_user_id_79829054_fk_comics_user_id` (`user_id`),
  KEY `oauth2_provider_application_client_secret_53133678` (`client_secret`),
  CONSTRAINT `oauth2_provider_application_user_id_79829054_fk_comics_user_id` FOREIGN KEY (`user_id`) REFERENCES `comics_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_application`
--

LOCK TABLES `oauth2_provider_application` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_application` DISABLE KEYS */;
INSERT INTO `oauth2_provider_application` VALUES (1,'tZuIN9Dg7stjXkMlsv6qWI96DzTo5FscEIyozdAT','','confidential','password','tHk3L4WLGpXQ7bNOmg3MNmFPqSl41ZAhcJBTSk6ZQekzlP28m6yAPncKV0UEesIwpXroHQdMPEQj2xplQwzivk8uIiDf1xZ72dSTIRiPKf3WmWrFoAJvQoOwOEPu6Vum','ComicApp',1,0,'2022-09-13 03:04:48.798713','2022-09-13 03:10:49.700661','');
/*!40000 ALTER TABLE `oauth2_provider_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_grant`
--

DROP TABLE IF EXISTS `oauth2_provider_grant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_grant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `expires` datetime(6) NOT NULL,
  `redirect_uri` longtext NOT NULL,
  `scope` longtext NOT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `code_challenge` varchar(128) NOT NULL,
  `code_challenge_method` varchar(10) NOT NULL,
  `nonce` varchar(255) NOT NULL,
  `claims` longtext NOT NULL DEFAULT (_utf8mb3''),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_grant_user_id_e8f62af8_fk_comics_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_grant_user_id_e8f62af8_fk_comics_user_id` FOREIGN KEY (`user_id`) REFERENCES `comics_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_grant`
--

LOCK TABLES `oauth2_provider_grant` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_grant` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_grant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_idtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_idtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_idtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `jti` char(32) NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jti` (`jti`),
  KEY `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_idtoken_user_id_dd512b59_fk_comics_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_idtoken_user_id_dd512b59_fk_comics_user_id` FOREIGN KEY (`user_id`) REFERENCES `comics_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_idtoken`
--

LOCK TABLES `oauth2_provider_idtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_refreshtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_refreshtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `access_token_id` bigint DEFAULT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `revoked` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `access_token_id` (`access_token_id`),
  UNIQUE KEY `oauth2_provider_refreshtoken_token_revoked_af8a5134_uniq` (`token`,`revoked`),
  KEY `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_refreshtoken_user_id_da837fce_fk_comics_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_refr_access_token_id_775e84e8_fk_oauth2_pr` FOREIGN KEY (`access_token_id`) REFERENCES `oauth2_provider_accesstoken` (`id`),
  CONSTRAINT `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_refreshtoken_user_id_da837fce_fk_comics_user_id` FOREIGN KEY (`user_id`) REFERENCES `comics_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_refreshtoken`
--

LOCK TABLES `oauth2_provider_refreshtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_refreshtoken` VALUES (1,'xzPpAD3u1CtjlKUttsTAKnLRZuheT0',1,1,1,'2022-09-13 03:11:46.807663','2022-09-13 03:11:46.807663',NULL),(2,'3FEuSmNPhdykcWnhlGzJnTsUYAypJt',2,1,1,'2022-09-13 03:11:54.925059','2022-09-13 03:11:54.925059',NULL),(3,'5poswfeR6iROXmvdSGEwmHJFZRtBpD',3,1,1,'2022-09-13 03:29:20.204737','2022-09-13 03:29:20.204737',NULL),(4,'bOFmln8gXTIerR4SG6ebO1a7ISUvkS',4,1,1,'2022-09-13 03:32:05.444439','2022-09-13 03:32:05.444439',NULL);
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-27 13:58:19
