-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: workload_management
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `academic_rank`
--

DROP TABLE IF EXISTS `academic_rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_rank` (
  `academic_rank_id` int NOT NULL,
  `rank_name` varchar(90) DEFAULT NULL,
  `credit_points_for_full_time` double DEFAULT NULL,
  `contact_hours_for_full_time` double DEFAULT NULL,
  `abbreviation` varchar(45) DEFAULT NULL,
  `salary` int DEFAULT NULL,
  PRIMARY KEY (`academic_rank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_rank`
--

LOCK TABLES `academic_rank` WRITE;
/*!40000 ALTER TABLE `academic_rank` DISABLE KEYS */;
/*!40000 ALTER TABLE `academic_rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `class_id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `study_year` varchar(45) DEFAULT NULL,
  `faculty` varchar(45) DEFAULT NULL,
  `program` varchar(45) DEFAULT NULL,
  `student_amount` int DEFAULT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `credit_points` varchar(45) NOT NULL,
  `necessary_academic_rank_id` int NOT NULL,
  `group_amount` varchar(45) DEFAULT NULL,
  `contact_hours` varchar(45) DEFAULT NULL,
  `registration_type` varchar(45) DEFAULT NULL,
  `study_level` int DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `lais_code_UNIQUE` (`course_id`),
  KEY `necessary_position_group_idx` (`necessary_academic_rank_id`),
  CONSTRAINT `necessary_academic_rank_id` FOREIGN KEY (`necessary_academic_rank_id`) REFERENCES `academic_rank` (`academic_rank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_type`
--

DROP TABLE IF EXISTS `status_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_type` (
  `status_type_id` int NOT NULL,
  `status_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`status_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_type`
--

LOCK TABLES `status_type` WRITE;
/*!40000 ALTER TABLE `status_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teaching_staff`
--

DROP TABLE IF EXISTS `teaching_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teaching_staff` (
  `teaching_staff_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `position_title` varchar(90) DEFAULT NULL,
  `faculty` enum('ITF','TSF','EPF','VeA') DEFAULT NULL,
  `academic_rank_id` int NOT NULL,
  PRIMARY KEY (`teaching_staff_id`),
  UNIQUE KEY `teaching_staf_id_UNIQUE` (`teaching_staff_id`),
  KEY `position_group_id_idx` (`academic_rank_id`),
  CONSTRAINT `academic_rank_id` FOREIGN KEY (`academic_rank_id`) REFERENCES `academic_rank` (`academic_rank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teaching_staff`
--

LOCK TABLES `teaching_staff` WRITE;
/*!40000 ALTER TABLE `teaching_staff` DISABLE KEYS */;
/*!40000 ALTER TABLE `teaching_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workload`
--

DROP TABLE IF EXISTS `workload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workload` (
  `workload_id` int unsigned NOT NULL AUTO_INCREMENT,
  `teaching_staff_id` int NOT NULL,
  `status_type_id` int DEFAULT NULL,
  `semester` varchar(45) DEFAULT NULL,
  `credit_points_per_hour` int DEFAULT NULL,
  `credit_points_per_group` int DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `include_in_budget` double DEFAULT NULL,
  `budget_position` tinyint DEFAULT NULL,
  `industry_coefficiant` double DEFAULT NULL,
  `salary_per_month` decimal(10,0) DEFAULT NULL,
  `does_vacation_count` int DEFAULT NULL,
  `month_amount` int DEFAULT NULL,
  `reserved_salary` double DEFAULT NULL,
  `course_id` varchar(45) NOT NULL,
  `class_id` int NOT NULL,
  PRIMARY KEY (`workload_id`),
  KEY `teaching_staff_id_idx` (`teaching_staff_id`),
  KEY `course_id_idx` (`course_id`),
  KEY `class_id_idx` (`class_id`),
  KEY `status_id_idx` (`status_type_id`),
  CONSTRAINT `class_id` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`),
  CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `status_type_id` FOREIGN KEY (`status_type_id`) REFERENCES `status_type` (`status_type_id`),
  CONSTRAINT `teaching_staff_id` FOREIGN KEY (`teaching_staff_id`) REFERENCES `teaching_staff` (`teaching_staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workload`
--

LOCK TABLES `workload` WRITE;
/*!40000 ALTER TABLE `workload` DISABLE KEYS */;
/*!40000 ALTER TABLE `workload` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-05 15:26:20
