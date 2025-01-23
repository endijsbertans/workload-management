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
  `academic_rank_id` int NOT NULL AUTO_INCREMENT,
  `rank_name` varchar(90) DEFAULT NULL,
  `cp_for_spring` double DEFAULT NULL,
  `cp_for_autumn` double DEFAULT NULL,
  `abbreviation` varchar(45) DEFAULT NULL,
  `salary` int DEFAULT NULL,
  PRIMARY KEY (`academic_rank_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_rank`
--

LOCK TABLES `academic_rank` WRITE;
/*!40000 ALTER TABLE `academic_rank` DISABLE KEYS */;
INSERT INTO `academic_rank` VALUES (1,'profesori ',9.58,14.37,'prof',2712),(2,'asociētie profesori',12.31,18.465,'asoc.prof',2171),(3,'docenti ',15.05,22.575,'doc.',1738),(4,'lektori',16.42,24.63,'lekt.',1392),(5,'asistenti',16.42,24.63,'asist',1109);
/*!40000 ALTER TABLE `academic_rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authority`
--

DROP TABLE IF EXISTS `authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authority` (
  `authority_id` int NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`authority_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authority`
--

LOCK TABLES `authority` WRITE;
/*!40000 ALTER TABLE `authority` DISABLE KEYS */;
/*!40000 ALTER TABLE `authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `study_year` varchar(45) DEFAULT NULL,
  `student_amount` int DEFAULT NULL,
  `class_faculty_id` int DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `faculty_id_idx` (`class_faculty_id`),
  CONSTRAINT `class_faculty_id` FOREIGN KEY (`class_faculty_id`) REFERENCES `faculty` (`faculty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'3EIB','3',NULL,1),(2,'1ITB','1',NULL,1);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_junction`
--

DROP TABLE IF EXISTS `class_junction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_junction` (
  `class_junction_id` int NOT NULL,
  `workload_junction_id` int NOT NULL,
  PRIMARY KEY (`class_junction_id`,`workload_junction_id`),
  KEY `course_junction_id_idx` (`class_junction_id`),
  KEY `workload_junction_id_idx` (`workload_junction_id`),
  CONSTRAINT `class_junction_id` FOREIGN KEY (`class_junction_id`) REFERENCES `class` (`class_id`),
  CONSTRAINT `workload_junction_id` FOREIGN KEY (`workload_junction_id`) REFERENCES `workload` (`workload_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_junction`
--

LOCK TABLES `class_junction` WRITE;
/*!40000 ALTER TABLE `class_junction` DISABLE KEYS */;
INSERT INTO `class_junction` VALUES (1,1),(2,1);
/*!40000 ALTER TABLE `class_junction` ENABLE KEYS */;
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
  `registration_type` varchar(45) DEFAULT NULL,
  `study_level` int DEFAULT NULL,
  `section` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `lais_code_UNIQUE` (`course_id`),
  KEY `necessary_academic_rank_id_idx` (`necessary_academic_rank_id`),
  CONSTRAINT `necessary_academic_rank_id` FOREIGN KEY (`necessary_academic_rank_id`) REFERENCES `academic_rank` (`academic_rank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('MateB008','Algoritmu teorija','3',1,'automātiska',NULL,'Nozares pamatnoz');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `faculty_id` int NOT NULL AUTO_INCREMENT,
  `faculty_name` varchar(10) DEFAULT NULL,
  `faculty_full_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`faculty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (1,'ITF','Informācijas tehnoloģiju fakultāte'),(2,'TSF','Ekonomikas un pārvaldības fakultāte'),(3,'EPF','Tulkošanas studiju fakultāte'),(4,'VeA ','Ventspils Augstskola');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_type`
--

DROP TABLE IF EXISTS `status_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_type` (
  `status_type_id` int NOT NULL AUTO_INCREMENT,
  `status_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`status_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_type`
--

LOCK TABLES `status_type` WRITE;
/*!40000 ALTER TABLE `status_type` DISABLE KEYS */;
INSERT INTO `status_type` VALUES (1,'ievēlētie'),(2,'neievēlētie'),(3,'autoratl. līg. '),(4,'projekts 8.2.2. ');
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
  `staff_faculty_id` int DEFAULT NULL,
  `staff_academic_rank_id` int DEFAULT NULL,
  PRIMARY KEY (`teaching_staff_id`),
  UNIQUE KEY `teaching_staf_id_UNIQUE` (`teaching_staff_id`),
  KEY `staff_faculty_id_idx` (`staff_faculty_id`),
  KEY `staff_academic_rank_id_idx` (`staff_academic_rank_id`),
  CONSTRAINT `staff_academic_rank_id` FOREIGN KEY (`staff_academic_rank_id`) REFERENCES `academic_rank` (`academic_rank_id`),
  CONSTRAINT `staff_faculty_id` FOREIGN KEY (`staff_faculty_id`) REFERENCES `faculty` (`faculty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teaching_staff`
--

LOCK TABLES `teaching_staff` WRITE;
/*!40000 ALTER TABLE `teaching_staff` DISABLE KEYS */;
INSERT INTO `teaching_staff` VALUES (1,'Vairis','Caune','doc.',1,1);
/*!40000 ALTER TABLE `teaching_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_authorities`
--

DROP TABLE IF EXISTS `user_authorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_authorities` (
  `authority_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`authority_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `authority_id` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`authority_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authorities`
--

LOCK TABLES `user_authorities` WRITE;
/*!40000 ALTER TABLE `user_authorities` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_authorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workload`
--

DROP TABLE IF EXISTS `workload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workload` (
  `workload_id` int NOT NULL AUTO_INCREMENT,
  `teaching_staff_id` int NOT NULL,
  `status_type_id` int DEFAULT NULL,
  `semester` varchar(45) DEFAULT NULL,
  `credit_points_per_hour` double DEFAULT NULL,
  `credit_points_per_group` double DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `include_in_budget` double DEFAULT NULL,
  `budget_position` tinyint DEFAULT NULL,
  `industry_coefficiant` double DEFAULT NULL,
  `salary_per_month` double DEFAULT NULL,
  `does_vacation_count` int DEFAULT NULL,
  `month_amount` int DEFAULT NULL,
  `expected_salary` double DEFAULT NULL,
  `course_id` varchar(45) NOT NULL,
  `group_amount` varchar(45) DEFAULT NULL,
  `academic_rank_id` int DEFAULT NULL,
  `cp_proportion_on_fulltime` varchar(45) DEFAULT NULL,
  `contact_hours` double DEFAULT NULL,
  `program` varchar(45) DEFAULT NULL,
  `group_for_semester` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`workload_id`),
  KEY `teaching_staff_id_idx` (`teaching_staff_id`),
  KEY `academic_rank_id_idx` (`academic_rank_id`),
  KEY `course_id_idx` (`course_id`),
  KEY `status_type_id_idx` (`status_type_id`),
  CONSTRAINT `academic_rank_id` FOREIGN KEY (`academic_rank_id`) REFERENCES `academic_rank` (`academic_rank_id`),
  CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `status_type_id` FOREIGN KEY (`status_type_id`) REFERENCES `status_type` (`status_type_id`),
  CONSTRAINT `teaching_staff_id` FOREIGN KEY (`teaching_staff_id`) REFERENCES `teaching_staff` (`teaching_staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workload`
--

LOCK TABLES `workload` WRITE;
/*!40000 ALTER TABLE `workload` DISABLE KEYS */;
INSERT INTO `workload` VALUES (1,1,1,'rudens',1,1.5,'praktiskie darbi',1,NULL,1,115.48,0,5,577.4086,'MateB008','1',3,'0.06644518272',1.5,'ITB','1ITB');
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

-- Dump completed on 2025-01-23 19:26:42
