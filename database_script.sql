-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: attendance_db
-- ------------------------------------------------------
-- Server version	9.7.1

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'cdc37a78-6f0e-11f1-9bfa-00090ffe0001:1-61';

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `attendance_date` date NOT NULL,
  `check_in` time DEFAULT NULL,
  `check_out` time DEFAULT NULL,
  `attendance_status` enum('Present','Absent','Leave','WFH') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`,`attendance_date`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,1,'2026-02-14','09:00:00','18:00:00','Present','2026-06-24 14:09:26','2026-06-24 14:09:26'),(3,1,'2026-02-16','09:05:00','18:02:00','Present','2026-06-24 14:43:06','2026-06-24 14:43:06'),(4,1,'2026-02-17',NULL,NULL,'Absent','2026-06-24 14:43:15','2026-06-24 14:43:15'),(5,1,'2026-02-18',NULL,NULL,'Leave','2026-06-24 14:43:25','2026-06-24 14:43:25'),(11,1,'2026-02-19','09:00:00','18:00:00','Present','2026-06-24 15:49:03','2026-06-24 15:49:03'),(12,1,'2026-06-25','09:35:00','20:41:00','WFH','2026-06-24 19:05:57','2026-06-24 19:05:57'),(13,1,'2026-06-11','16:28:00','17:28:00','WFH','2026-06-25 10:59:02','2026-06-25 10:59:02'),(14,6,'2026-06-24','12:52:00','21:52:00','WFH','2026-06-25 11:23:00','2026-06-25 11:23:00'),(15,7,'2026-06-23','09:02:00','18:01:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(16,7,'2026-06-24','09:00:00','18:00:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(17,8,'2026-06-23','09:10:00','18:15:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(18,8,'2026-06-24','09:05:00','18:05:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(19,9,'2026-06-23',NULL,NULL,'Leave','2026-06-25 17:23:59','2026-06-25 17:23:59'),(20,9,'2026-06-24','09:00:00','18:00:00','WFH','2026-06-25 17:23:59','2026-06-25 17:23:59'),(21,10,'2026-06-23','09:20:00','18:10:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(22,10,'2026-06-24',NULL,NULL,'Absent','2026-06-25 17:23:59','2026-06-25 17:23:59'),(23,11,'2026-06-23','08:55:00','18:00:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(24,11,'2026-06-24','09:00:00','18:00:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(25,12,'2026-06-23',NULL,NULL,'Absent','2026-06-25 17:23:59','2026-06-25 17:23:59'),(26,12,'2026-06-24','09:00:00','18:00:00','WFH','2026-06-25 17:23:59','2026-06-25 17:23:59'),(27,13,'2026-06-23','09:03:00','18:05:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(28,13,'2026-06-24','09:02:00','18:00:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(29,14,'2026-06-23','09:08:00','18:04:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(30,14,'2026-06-24',NULL,NULL,'Leave','2026-06-25 17:23:59','2026-06-25 17:23:59'),(31,15,'2026-06-23','09:15:00','18:20:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(32,15,'2026-06-24','09:00:00','18:00:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(33,16,'2026-06-23','09:00:00','18:00:00','WFH','2026-06-25 17:23:59','2026-06-25 17:23:59'),(34,16,'2026-06-24','09:10:00','18:00:00','Present','2026-06-25 17:23:59','2026-06-25 17:23:59'),(35,7,'2026-06-25','09:01:00','18:00:00','Present','2026-06-25 17:24:08','2026-06-25 17:24:08'),(36,8,'2026-06-25','09:05:00','18:00:00','Present','2026-06-25 17:24:08','2026-06-25 17:24:08'),(37,9,'2026-06-25','09:00:00','18:00:00','Present','2026-06-25 17:24:08','2026-06-25 17:24:08'),(38,10,'2026-06-25','09:12:00','18:03:00','Present','2026-06-25 17:24:08','2026-06-25 17:24:08'),(39,11,'2026-06-25','08:58:00','18:00:00','Present','2026-06-25 17:24:08','2026-06-25 17:24:08'),(40,12,'2026-06-25',NULL,NULL,'Absent','2026-06-25 17:24:08','2026-06-25 17:24:08'),(41,13,'2026-06-25','09:00:00','18:00:00','Present','2026-06-25 17:24:08','2026-06-25 17:24:08'),(42,14,'2026-06-25','09:07:00','18:10:00','WFH','2026-06-25 17:24:08','2026-06-25 17:24:08'),(43,15,'2026-06-25','09:00:00','18:00:00','Present','2026-06-25 17:24:08','2026-06-25 17:24:08'),(44,16,'2026-06-25','09:05:00','18:05:00','Present','2026-06-25 17:24:08','2026-06-25 17:24:08'),(45,1,'2026-06-26','08:37:00','15:37:00','Present','2026-06-25 18:07:41','2026-06-25 18:07:41');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `department_name` (`department_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (3,'Finance'),(2,'HR'),(1,'IT'),(4,'Marketing');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_code` varchar(20) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `department_id` int DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_code` (`employee_code`),
  UNIQUE KEY `email` (`email`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'EMP001','Sonali Shruthi','sonalishruthi@gmail.com','937020998',1,'Senior Software Engineer','Active','2026-06-23 15:49:20','2026-06-25 10:57:07'),(4,'EMP003',' Richard Grayson','dcgray@gmail.com','9747088821',4,'Marketing intern','Active','2026-06-24 18:41:02','2026-06-25 18:00:36'),(6,'EMP002','Jason','jay9@gmail.com','9770795363',1,'SDE','Active','2026-06-25 11:01:13','2026-06-25 11:01:13'),(7,'EMP004','Priya Sharma','priyasharma94@gmail.com','9876501001',1,'HR Executive','Active','2026-06-25 17:18:46','2026-06-25 17:26:26'),(8,'EMP005','Arjun Nair','arjun.nair.dev@gmail.com','9876501002',2,'Software Engineer','Active','2026-06-25 17:18:46','2026-06-25 17:26:26'),(9,'EMP006','Sophia Brown','sophiabrown22@yahoo.com','9876501003',3,'Financial Analyst','Active','2026-06-25 17:18:46','2026-06-25 17:26:26'),(10,'EMP007','Rahul Verma','rahul.verma89@gmail.com','9876501004',4,'Marketing Executive','Active','2026-06-25 17:18:46','2026-06-25 17:26:26'),(11,'EMP008','Ananya Iyer','ananya.iyer.tech@gmail.com','9876501005',2,'Frontend Developer','Active','2026-06-25 17:18:46','2026-06-25 17:26:26'),(12,'EMP009','Noah Davis','noahdavis.dev@outlook.com','9876501006',2,'Backend Developer','Inactive','2026-06-25 17:18:46','2026-06-25 17:26:26'),(13,'EMP010','Karthik Raj','karthikraj.hr@yahoo.com','9876501007',1,'HR Manager','Active','2026-06-25 17:18:46','2026-06-25 17:26:26'),(14,'EMP011','Meera Krishnan','meera.krishnan.acc@gmail.com','9876501008',3,'Accountant','Active','2026-06-25 17:18:46','2026-06-25 17:26:26'),(15,'EMP012','Charlotte Lee','charlottelee.marketing@outlook.com','9876501009',4,'Marketing Intern','Active','2026-06-25 17:18:46','2026-06-25 17:26:26'),(16,'EMP013','Vikram Singh','vikramsingh.sde@gmail.com','9876501010',2,'Senior Developer','Active','2026-06-25 17:18:46','2026-06-25 17:26:26'),(17,'EMP014','Bruce Wayne','bwcorp@gmail.com','7403288931',3,'Trainee','Active','2026-06-25 17:59:38','2026-06-25 17:59:38');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `employee_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','scrypt:32768:8:1$vd8k1PKsdKmqpCOI$7c0d1591447df9978599e7e491cb5287d34e1a26978917bf4d8e899b86870408cd886986dcd15850fffeb9a4d004132025baf384754fcd65f8ff5d5b86f985a2','admin','2026-06-23 15:04:47',NULL),(2,'sonali','scrypt:32768:8:1$mFKIJBpxQxtczNRc$8a6d307fb6af3e412b6466fb35c2ff2b96b8c617a3773cecf4e49ed433dee87bbbff019050fc1c498aab05ee169dd7bac2e0fea89e8b3e709010368f08f52d08','employee','2026-06-25 06:18:47','EMP001'),(3,'priya','scrypt:32768:8:1$j5nZnIB92ZYvtTA7$b791760d9e424fe1fad200d2372ed2c6489745227f54eab486f323db5f4aef9d7c2ed9aa0e08cdb32f897f44632d4206fa1d5cc1179060ed1590af0c56a62ac0','employee','2026-06-25 17:21:38','EMP004'),(4,'arjun','scrypt:32768:8:1$mYNjTZ3OLya3k3qI$406d6b0ba6317d2e6d4221994aec4373702df7f70de6e068cd443620515016d8cc7e77dd5b1a355d7d41e9cdd859cbcc2ffdbca8c9c41fb5c9d29597af6a4d75','employee','2026-06-25 17:21:38','EMP005'),(5,'sophia','scrypt:32768:8:1$wiedIyeHbOzQFuwZ$fa36bb9f2122afec85866eac8cc7278400fa0ef61ae3b31bf630513b6e1f902d9365a64e6fe10e9334cf8c28f5aa205772105e4fffbd6da949429c1b5e1d9d12','employee','2026-06-25 17:21:38','EMP006'),(6,'rahul','scrypt:32768:8:1$wHHPArTSf9hjHlGy$9838728c0065470545b7395065fe24326bbc36001b87340c6426e97d302d5421b46bb61a80fbb4cd7724a18d4c51ca1d14a50d4da1bd50f664293eed7fe550e1','employee','2026-06-25 17:21:38','EMP007'),(7,'ananya','scrypt:32768:8:1$xzACbpJ3kAComTwb$77978d017cdd7dc4d317e41d3b3d94e6011af542f3da97c37b59f1281458b9b62f10ee5441f6494d6ecee8df406e07c4649422101cba408a53dc2bc2578577a1','employee','2026-06-25 17:21:38','EMP008'),(8,'noah','scrypt:32768:8:1$fJ2dznhNIK4LHm63$1fcd5c5621b85428da30844b618e356f6678fcd62e0b7cf9804f7a6978a86d0cc3baa6be877c0638ee4a293ce43c6a6d463ce47bcfbcdb71c6ce3f74dfe95694','employee','2026-06-25 17:21:38','EMP009'),(9,'karthik','scrypt:32768:8:1$AJ2GDAtneRjhNSv0$2692fbbd7d6619c1138d0721eff6bb1eabf16f23410f93c93c8e60a3c759ba7c4702c3c2cdada325e04714971e86babf752157d5b341fc3e61588ec8281a000e','employee','2026-06-25 17:21:38','EMP010'),(10,'meera','scrypt:32768:8:1$2ioCogGZ2ffrQ51d$c3976a665f444d8dcdaf41354dc941692424fbad630bdd3363febf732836a4c13fd5e74ab274486f6bdb49b41db2365b0d0b3501032af3249ab79963965f8fc5','employee','2026-06-25 17:21:38','EMP011'),(11,'charlotte','scrypt:32768:8:1$HJlK8iOHLlhBc6Ob$fe9d73f7192153a51904e96301f8b0a51c858766e376d80973342683e9aea519f88901d109ad26c224137026e8387eced4dbe3bd54bc62bc533b9cdab253e4bd','employee','2026-06-25 17:21:38','EMP012'),(12,'vikram','scrypt:32768:8:1$eRyaiim1b5G7hUq8$2dbb1f053fc5eabe8fb6ac99e19b6badfde3b09db65237900fa9328ba4ed0603b855d71e43e31339c785172c3737a163fc893e5f0bbf3e8bd5a1b542bb4dd9a5','employee','2026-06-25 17:21:38','EMP013');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-25 23:55:22
