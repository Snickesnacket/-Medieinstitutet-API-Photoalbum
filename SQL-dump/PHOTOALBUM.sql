-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 22, 2023 at 03:47 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `PHOTOALBUM`
--

-- --------------------------------------------------------

--
-- Table structure for table `Album`
--

CREATE TABLE `Album` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Album`
--

INSERT INTO `Album` (`id`, `title`, `user_id`) VALUES
(1, 'Hurra ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Photo`
--

CREATE TABLE `Photo` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Photo`
--

INSERT INTO `Photo` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
(1, 'tjosan', 'https://avatars.githubusercontent.com/u/3941411?v=4', 'Watt?', 1),
(2, 'tjo', 'https://avatars.githubusercontent.com/u/3941411?v=4', 'Who dis?', 1),
(3, 'Nämen hej', 'https://avatars.githubusercontent.com/u/3941411?v=4', 'work harder', 1),
(4, 'Har vi samma bild?', 'https://avatars.githubusercontent.com/u/3941411?v=4', 'work less', 1);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(1, 'tjosan.lind@gmail.com', '$2b$10$Z0iTJEq1aI2cpBpUs4xOxOvS7.qu/yP.fy/lAl97fgQHvBT9aJf26', 'astrid', 'lind'),
(2, 'Asssan.lind@gmail.com', '$2b$10$Q0JJ5Rc1WQDcw2Fu0SzHk.0GgT0x/sqnLe0d6gVFfZfsNgsB/tHmW', 'astrid', 'lind');

-- --------------------------------------------------------

--
-- Table structure for table `_AlbumToPhoto`
--

CREATE TABLE `_AlbumToPhoto` (
  `A` int(10) UNSIGNED NOT NULL,
  `B` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Album`
--
ALTER TABLE `Album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Album_user_id_fkey` (`user_id`);

--
-- Indexes for table `Photo`
--
ALTER TABLE `Photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Photo_user_id_fkey` (`user_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_AlbumToPhoto`
--
ALTER TABLE `_AlbumToPhoto`
  ADD UNIQUE KEY `_AlbumToPhoto_AB_unique` (`A`,`B`),
  ADD KEY `_AlbumToPhoto_B_index` (`B`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Album`
--
ALTER TABLE `Album`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Photo`
--
ALTER TABLE `Photo`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Album`
--
ALTER TABLE `Album`
  ADD CONSTRAINT `Album_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Photo`
--
ALTER TABLE `Photo`
  ADD CONSTRAINT `Photo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `_AlbumToPhoto`
--
ALTER TABLE `_AlbumToPhoto`
  ADD CONSTRAINT `_AlbumToPhoto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_AlbumToPhoto_B_fkey` FOREIGN KEY (`B`) REFERENCES `Photo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
