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
  `rank_name` varchar(45) NOT NULL,
  `cp_for_spring` decimal(6,3) NOT NULL,
  `cp_for_autumn` decimal(6,3) NOT NULL,
  `abbreviation` varchar(10) NOT NULL,
  `salary` decimal(6,2) NOT NULL,
  PRIMARY KEY (`academic_rank_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_rank`
--

LOCK TABLES `academic_rank` WRITE;
/*!40000 ALTER TABLE `academic_rank` DISABLE KEYS */;
INSERT INTO `academic_rank` VALUES (1,'profesori ',9.580,14.370,'prof',2712.00),(2,'asociētie profesori',12.310,18.465,'asoc.prof',2171.00),(3,'docenti ',15.050,22.575,'doc.',1738.00),(4,'lektori',16.420,24.630,'lekt.',1392.00),(5,'asistenti',16.420,24.630,'asist',1109.00);
/*!40000 ALTER TABLE `academic_rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authority`
--

DROP TABLE IF EXISTS `authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authority` (
  `authority_id` int NOT NULL AUTO_INCREMENT,
  `authority_title` varchar(255) NOT NULL,
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
  `name` varchar(45) NOT NULL,
  `study_year` varchar(45) NOT NULL,
  `student_amount` int DEFAULT NULL,
  `class_faculty_id` int NOT NULL,
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
INSERT INTO `class_junction` VALUES (1,1),(1,3),(2,1);
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
  `section` varchar(45) DEFAULT NULL,
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
  `status_type_name` varchar(45) DEFAULT NULL,
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
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `position_title` varchar(45) DEFAULT NULL,
  `staff_faculty_id` int NOT NULL,
  `staff_academic_rank_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`teaching_staff_id`),
  UNIQUE KEY `teaching_staf_id_UNIQUE` (`teaching_staff_id`),
  KEY `staff_faculty_id_idx` (`staff_faculty_id`),
  KEY `staff_academic_rank_id_idx` (`staff_academic_rank_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `staff_academic_rank_id` FOREIGN KEY (`staff_academic_rank_id`) REFERENCES `academic_rank` (`academic_rank_id`),
  CONSTRAINT `staff_faculty_id` FOREIGN KEY (`staff_faculty_id`) REFERENCES `faculty` (`faculty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teaching_staff`
--

LOCK TABLES `teaching_staff` WRITE;
/*!40000 ALTER TABLE `teaching_staff` DISABLE KEYS */;
INSERT INTO `teaching_staff` VALUES (1,'Vairis','Caune','doc.',1,1,0);
/*!40000 ALTER TABLE `teaching_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
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
-- Table structure for table `user_authority_table`
--

DROP TABLE IF EXISTS `user_authority_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_authority_table` (
  `ida` int NOT NULL,
  `idu` int NOT NULL,
  KEY `idu_idx` (`idu`),
  KEY `ida_idx` (`ida`),
  CONSTRAINT `ida` FOREIGN KEY (`ida`) REFERENCES `authority` (`authority_id`),
  CONSTRAINT `idu` FOREIGN KEY (`idu`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authority_table`
--

LOCK TABLES `user_authority_table` WRITE;
/*!40000 ALTER TABLE `user_authority_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_authority_table` ENABLE KEYS */;
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
  `credit_points_per_hour` decimal(5,3) DEFAULT NULL,
  `credit_points_per_group` decimal(5,3) DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `include_in_budget` varchar(45) DEFAULT NULL,
  `budget_position` tinyint DEFAULT NULL,
  `industry_coefficiant` int DEFAULT NULL,
  `salary_per_month` decimal(7,3) DEFAULT NULL,
  `does_vacation_count` int DEFAULT NULL,
  `month_amount` int DEFAULT NULL,
  `expected_salary` decimal(7,3) DEFAULT NULL,
  `course_id` varchar(45) NOT NULL,
  `group_amount` int DEFAULT NULL,
  `academic_rank_id` int DEFAULT NULL,
  `cp_proportion_on_fulltime` varchar(45) DEFAULT NULL,
  `contact_hours` decimal(5,3) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workload`
--

LOCK TABLES `workload` WRITE;
/*!40000 ALTER TABLE `workload` DISABLE KEYS */;
INSERT INTO `workload` VALUES (1,1,1,'rudens',1.000,1.500,'lekcijas','1',NULL,1,115.482,0,5,577.409,'MateB008',1,3,'0.06644518272',1.500,'ITB','1ITB'),(3,1,1,'rudens',1.000,1.500,'praktiskie darbI','1',NULL,1,115.482,0,5,577.409,'MateB008',1,3,'0.06644518272',1.500,'ITB','1ITB');
/*!40000 ALTER TABLE `workload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `workload_summary`
--

DROP TABLE IF EXISTS `workload_summary`;
/*!50001 DROP VIEW IF EXISTS `workload_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `workload_summary` AS SELECT 
 1 AS `Vārds`,
 1 AS `Uzvārds`,
 1 AS `Vārds, Uzvārds`,
 1 AS `Amats,Vārds, Uzvārds`,
 1 AS `KP pilnai slodzei`,
 1 AS `Slodzes daļa`,
 1 AS `Amata nosaukums`,
 1 AS `amata grupa`,
 1 AS `statuss`,
 1 AS `Iekļaut budžetā`,
 1 AS `pasniedzēja fakultāte`,
 1 AS `semestris`,
 1 AS `Priekšmeta nosaukums`,
 1 AS `Progr. koef. KP/stundas`,
 1 AS `Priekšmeta kp`,
 1 AS `KP skaits grupai`,
 1 AS `grupu skaits`,
 1 AS `Kontaktstundas`,
 1 AS `LAIS kods`,
 1 AS `Programmas daļa`,
 1 AS `Reģistrācija`,
 1 AS `Priekšmeta fakultāte`,
 1 AS `kursa fakultāte`,
 1 AS `Programma`,
 1 AS `Studiju līmenis`,
 1 AS `Grupa semestra grafikam`,
 1 AS `classes`,
 1 AS `Komentāri`,
 1 AS `budžeta pozīcija`,
 1 AS `Studentu skaits`,
 1 AS `Alga`,
 1 AS `Nozares koef.`,
 1 AS `Alga mēnesī`,
 1 AS `Vai atvaļinājums ieskaitās`,
 1 AS `Mēnešu skaits`,
 1 AS `Algai paredzētais`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `workload_summary`
--

/*!50001 DROP VIEW IF EXISTS `workload_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `workload_summary` AS select `t`.`name` AS `Vārds`,`t`.`surname` AS `Uzvārds`,concat(`t`.`name`,' ',`t`.`surname`) AS `Vārds, Uzvārds`,concat(`t`.`position_title`,' ',`t`.`name`,' ',`t`.`surname`) AS `Amats,Vārds, Uzvārds`,`astaff`.`cp_for_autumn` AS `KP pilnai slodzei`,`w`.`cp_proportion_on_fulltime` AS `Slodzes daļa`,`t`.`position_title` AS `Amata nosaukums`,`astaff`.`rank_name` AS `amata grupa`,`s`.`status_type_name` AS `statuss`,`w`.`include_in_budget` AS `Iekļaut budžetā`,`fstaff`.`faculty_name` AS `pasniedzēja fakultāte`,`w`.`semester` AS `semestris`,`co`.`name` AS `Priekšmeta nosaukums`,`w`.`credit_points_per_hour` AS `Progr. koef. KP/stundas`,`co`.`credit_points` AS `Priekšmeta kp`,`w`.`credit_points_per_group` AS `KP skaits grupai`,`w`.`group_amount` AS `grupu skaits`,`w`.`contact_hours` AS `Kontaktstundas`,`co`.`course_id` AS `LAIS kods`,`co`.`section` AS `Programmas daļa`,`co`.`registration_type` AS `Reģistrācija`,`fcourse`.`faculty_name` AS `Priekšmeta fakultāte`,`fclass`.`faculty_name` AS `kursa fakultāte`,`w`.`program` AS `Programma`,`co`.`study_level` AS `Studiju līmenis`,`w`.`group_for_semester` AS `Grupa semestra grafikam`,group_concat(`class`.`name` separator ', ') AS `classes`,`w`.`comments` AS `Komentāri`,`w`.`budget_position` AS `budžeta pozīcija`,group_concat(`class`.`student_amount` separator ', ') AS `Studentu skaits`,`astaff`.`salary` AS `Alga`,`w`.`industry_coefficiant` AS `Nozares koef.`,`w`.`salary_per_month` AS `Alga mēnesī`,`w`.`include_in_budget` AS `Vai atvaļinājums ieskaitās`,`w`.`month_amount` AS `Mēnešu skaits`,`w`.`expected_salary` AS `Algai paredzētais` from ((((((((((`workload` `w` join `teaching_staff` `t` on((`w`.`teaching_staff_id` = `t`.`teaching_staff_id`))) join `status_type` `s` on((`s`.`status_type_id` = `w`.`status_type_id`))) join `course` `co` on((`co`.`course_id` = `w`.`course_id`))) join `academic_rank` `acourse` on((`acourse`.`academic_rank_id` = `co`.`necessary_academic_rank_id`))) join `academic_rank` `astaff` on((`astaff`.`academic_rank_id` = `w`.`academic_rank_id`))) join `faculty` `fstaff` on((`fstaff`.`faculty_id` = `t`.`staff_faculty_id`))) join `faculty` `fcourse` on((`fcourse`.`faculty_id` = `co`.`necessary_academic_rank_id`))) join `class_junction` `classid` on((`classid`.`workload_junction_id` = `w`.`workload_id`))) join `class` on((`class`.`class_id` = `classid`.`class_junction_id`))) join `faculty` `fclass` on((`fclass`.`faculty_id` = `class`.`class_faculty_id`))) group by `w`.`workload_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-25 15:37:30
