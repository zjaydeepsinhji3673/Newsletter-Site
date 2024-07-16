-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2024 at 09:42 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_node_lj_task`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_newsletter`
--

CREATE TABLE `tbl_newsletter` (
  `id` bigint(21) NOT NULL,
  `user_id` bigint(21) NOT NULL,
  `title` varchar(128) NOT NULL,
  `description` varchar(128) NOT NULL,
  `image` varchar(128) NOT NULL,
  `status` enum('approved','rejected','pending') NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0->inactive, 1->Active, 2->Delete',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_newsletter`
--

INSERT INTO `tbl_newsletter` (`id`, `user_id`, `title`, `description`, `image`, `status`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 7, 'Coal Stock', 'Day by day coal stockk is decreasing.', '1720417432790-newslatters-image2.jpg', 'approved', 1, '2024-07-08 05:43:52', '2024-07-08 10:50:47'),
(2, 7, 'Port Data', 'This is the port of adani group.', '1720435736155-newslatters-image4.jpg', 'approved', 1, '2024-07-08 10:48:56', '2024-07-09 12:36:05'),
(3, 7, 'Tours Travels', 'This is the port of adani group.', '1720848532171-newslatters-iamge5.jpg', 'approved', 1, '2024-07-13 05:28:52', '2024-07-13 05:29:35');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` bigint(21) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `mobile_number` varchar(16) NOT NULL,
  `role` enum('Admin','User') NOT NULL,
  `token` varchar(128) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0->inactive, 1->Active, 2->Delete',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `first_name`, `last_name`, `email`, `password`, `mobile_number`, `role`, `token`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Jaydeepsinh', 'Zala', 'jaydeep@gmail.com', '3c4e2cc3ad9ff9473a53ed4825ed5a90', '1234567890', 'Admin', 'FOpTwooukX', 1, '2024-05-28 06:12:16', '2024-07-15 04:29:11'),
(2, 'Vatsal', 'Patel', 'vatsal@gmail.com', 'fd5f6a349ebe4ae7cf7e16a4e02754f3', '+91 123456789', 'User', '', 1, '2024-05-29 07:47:27', '2024-07-08 10:58:32'),
(7, 'Parth', 'Patel', 'parth@gmail.com', 'f12364e5a022cc93b14edc97d496b9bc', '+916353390190', 'User', '', 1, '2024-07-06 11:45:21', '2024-07-15 04:28:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_newsletter`
--
ALTER TABLE `tbl_newsletter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_newsletter`
--
ALTER TABLE `tbl_newsletter`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_newsletter`
--
ALTER TABLE `tbl_newsletter`
  ADD CONSTRAINT `tbl_newsletter_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
