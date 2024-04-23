-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 23, 2024 lúc 12:16 PM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `my_project`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(19, 1, 0, '2023-10-18 16:07:57', '2023-10-18 16:07:57', '2023-10-18 16:07:57'),
(20, 6, 0, '2023-10-20 03:16:23', '2023-10-20 03:16:23', '2023-10-20 03:16:23'),
(21, 2, 0, '2023-10-24 08:38:15', '2023-10-24 08:38:15', NULL),
(22, 3, 0, '2023-10-24 12:16:54', '2023-10-24 12:16:54', NULL),
(23, 8, 0, '2023-12-20 13:51:07', '2023-12-20 13:51:07', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts_details`
--

CREATE TABLE `carts_details` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `size` char(3) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `carts_details`
--

INSERT INTO `carts_details` (`id`, `cart_id`, `product_id`, `quantity`, `size`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(160, 21, 6, 1, 'S', 0, '2023-11-07 11:15:23', '2023-11-07 11:15:23', NULL),
(161, 21, 14, 1, 'S', 0, '2023-11-07 11:15:27', '2023-11-07 11:15:27', NULL),
(162, 21, 13, 1, 'S', 0, '2023-11-07 11:15:30', '2023-11-07 11:15:30', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Áo', 'ao', '2023-10-16 17:44:30', '2023-10-19 11:16:48', '2023-10-19 11:16:48'),
(2, 'Quần', 'quan', '2023-10-16 17:44:30', '2023-10-19 11:16:48', '2023-10-19 11:16:48'),
(3, 'Váy', 'vay', '2023-10-16 17:44:46', '2023-10-19 11:16:48', '2023-10-19 11:16:48'),
(4, 'Đồ mặc ngoài', 'do-mac-ngoai', '2023-10-16 17:44:46', '2023-10-19 11:16:48', '2023-10-19 11:16:48'),
(5, 'Đồ mặc nhà', 'do-mac-nha', '2023-10-16 17:45:12', '2023-10-19 11:16:48', '2023-10-19 11:16:48'),
(6, 'Đồ mặc trong', 'do-mac-trong', '2023-10-16 17:45:12', '2023-10-19 11:16:48', '2023-10-19 11:16:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories_details`
--

CREATE TABLE `categories_details` (
  `id` int(11) NOT NULL,
  `categories_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories_details`
--

INSERT INTO `categories_details` (`id`, `categories_id`, `name`, `image`, `slug`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Áo phông ', 'simicategory_filename_tablet1687329613.webp', 'ao-phong', '2023-10-16 10:46:14', '2023-10-19 13:46:08', '2023-10-19 13:46:08'),
(2, 1, 'Áo polo', 'simicategory_filename_tablet1687329589.webp', 'ao-polo', '2023-10-16 10:46:14', '2023-10-19 13:46:08', '2023-10-19 13:46:08'),
(3, 1, 'Áo ba lỗ', '1697871300047-t-shirts (1).png', 'ao-ba-lo', '2023-10-16 10:46:36', '2023-10-21 06:55:00', '2023-10-21 06:55:00'),
(4, 1, 'Áo kiểu', '1697871478687-camouflage.png', 'ao-kieu', '2023-10-16 10:46:36', '2023-10-21 06:57:58', '2023-10-21 06:57:58'),
(5, 1, 'Áo sơ mi', '1697871669658-cloth.png', 'ao-so-mi', '2023-10-16 10:47:11', '2023-10-21 07:01:09', '2023-10-21 07:01:09'),
(6, 1, 'Áo phông dài tay', '1697871577439-shirt.png', 'ao-phong-dai-tay', '2023-10-16 10:47:11', '2023-10-21 14:00:18', '2023-10-21 14:00:18'),
(7, 1, 'Áo len', '1697871745524-sweater.png', 'ao-len', '2023-10-16 10:47:31', '2023-10-21 07:02:25', '2023-10-21 07:02:25'),
(8, 1, 'Áo nỉ', '1697871928667-sweatshirt.png', 'ao-ni', '2023-10-16 10:47:31', '2023-10-21 07:05:28', '2023-10-21 07:05:28'),
(9, 1, 'Áo nỉ có mũ', '1697871806046-hoodie.png', 'ao-ni-co-mu', '2023-10-16 10:47:53', '2023-10-21 14:05:20', '2023-10-21 14:05:20'),
(10, 2, 'Quần shorts', 'simicategory_filename_tablet1687329641.webp', 'quan-shorts', '2023-10-16 10:47:53', '2023-10-19 13:46:09', '2023-10-19 13:46:09'),
(11, 2, 'Quần jeans', 'simicategory_filename_tablet1687329778.webp', 'quan-jeans', '2023-10-16 10:48:10', '2023-10-19 13:46:09', '2023-10-19 13:46:09'),
(12, 2, 'Quần vải', '1697872013579-jeans.png', 'quan-vai', '2023-10-16 10:48:10', '2023-10-21 07:06:53', '2023-10-21 07:06:53'),
(13, 2, 'Quần nỉ', '1697872091785-pants.png', 'quan-ni', '2023-10-16 10:48:30', '2023-10-21 07:08:11', '2023-10-21 07:08:11'),
(14, 2, 'Quần khaki', '1697872151670-simicategory_filename_tablet1687329749.webp', 'quan-khaki', '2023-10-16 10:48:30', '2023-10-21 07:09:11', '2023-10-21 07:09:11'),
(15, 3, 'Váy liền thân', 'simicategory_filename_tablet1687328849.webp', 'vay-lien-than', '2023-10-16 10:48:48', '2023-10-19 13:46:09', '2023-10-19 13:46:09'),
(16, 3, 'Chân váy', 'simicategory_filename_tablet1687329055.webp', 'chan-vay', '2023-10-16 10:48:48', '2023-10-19 13:46:09', '2023-10-19 13:46:09'),
(18, 4, 'Chống nắng', '1697872182272-simicategory_filename_tablet1687329721.webp', 'chong-nang', '2023-10-16 14:00:49', '2023-10-21 07:09:42', '2023-10-21 07:09:42');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone` char(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `contacts`
--

INSERT INTO `contacts` (`id`, `user_id`, `name`, `date_of_birth`, `phone`, `address`, `created_at`, `updated_at`, `deleted_at`) VALUES
(15, 14, 'Admin', NULL, '', '', '2024-01-14 15:06:55', '2024-01-14 15:06:55', NULL),
(16, 15, 'test', NULL, '', '', '2024-02-26 08:21:53', '2024-02-26 08:21:53', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers_objects`
--

CREATE TABLE `customers_objects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `customers_objects`
--

INSERT INTO `customers_objects` (`id`, `name`, `slug`) VALUES
(1, 'Nam', 'nam'),
(2, 'Nữ', 'nu'),
(3, 'Bé trai', 'be-trai'),
(4, 'Bé gái', 'be-gai');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `code_order` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` char(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `note` text NOT NULL,
  `delivery_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `code_order`, `name`, `email`, `phone`, `address`, `status`, `note`, `delivery_date`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 'FF-b3a2fbc7485', 'add person', '', '0398561475', 'Minh Tiến, Phù Cừ Hưng Yên, Tỉnh Hoà Bình, Huyện Mai Châu', 2, '', '2023-11-02', '2023-10-30 14:21:33', '2023-11-07 13:05:19', NULL),
(2, 2, 'FF-3548d944476', 'add sss', '', '0398561475', 'Minh Tiến, Phù Cừ Hưng Yên, Tỉnh Hoà Bình, Huyện Tân Lạc', 2, '', '2023-10-31', '2023-10-30 18:34:52', '2023-10-30 18:47:13', NULL),
(3, 2, 'FF-251c8ece781', 'Nguyễn Văn A', '', '0398561475', 'Minh Tiến, Phù Cừ, Tỉnh Yên Bái, Huyện Mù Căng Chải', 3, '', NULL, '2023-11-01 13:21:24', '2023-11-01 13:23:20', NULL),
(4, 2, 'FF-ee98dd58768', 'Nguyễn Văn A', '', '0398561475', 'Minh Tiến, Phù Cừ, Tỉnh Yên Bái, Huyện Mù Căng Chải', 3, '', NULL, '2023-11-01 13:24:33', '2023-11-01 13:24:43', NULL),
(5, 2, 'FF-3feec1f77a5', 'Nguyễn Văn B', '', '0398561475', 'Minh Tiến, Phù Cừ, Tỉnh Yên Bái, Huyện Văn Yên', 3, '', NULL, '2023-11-01 13:53:22', '2023-11-01 13:58:50', NULL),
(6, 2, 'FF-0a1033d3183', 'Test', '', '039-8561-475', 'minh Tiến , Tỉnh Hưng Yên, Huyện Phù Cừ', 3, '', NULL, '2023-11-02 11:23:26', '2023-11-02 11:26:48', NULL),
(7, 2, 'FF-691ccdf5593', 'Test', '', '039-8561-475', 'a, Tỉnh Hoà Bình, Huyện Tân Lạc', 0, '', NULL, '2023-11-07 09:56:26', '2023-11-07 09:56:26', NULL),
(8, 3, 'FF-6cc85c56b35', 'add person', '', '0398561475', 'dfs, Tỉnh Điện Biên, Huyện Tuần Giáo', 3, '', NULL, '2023-11-07 12:59:55', '2023-11-07 13:00:13', NULL),
(9, 3, 'FF-64f58f79121', 'add person', '', '0398561475', 'dfs, Tỉnh Hoà Bình, Huyện Mai Châu', 3, '', NULL, '2023-11-07 13:00:49', '2023-11-07 13:01:03', NULL),
(10, 8, 'FF-e1e847e1a9d', 'add person', '', '0398561475', 'Minh Tiến, Phù Cừ Hưng Yên, Tỉnh Hoà Bình, Huyện Tân Lạc', 0, '', NULL, '2023-12-20 13:51:30', '2023-12-20 13:51:30', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` varchar(3) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `size`, `quantity`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 'S', 1, 0, '2023-10-30 14:21:33', '2023-10-30 14:21:33', NULL),
(2, 1, 19, 'M', 1, 0, '2023-10-30 14:21:33', '2023-10-30 14:21:33', NULL),
(3, 1, 20, 'L', 1, 0, '2023-10-30 14:21:33', '2023-10-30 14:21:33', NULL),
(4, 2, 19, 'S', 1, 0, '2023-10-30 18:34:52', '2023-10-30 18:34:52', NULL),
(5, 2, 7, 'S', 1, 0, '2023-10-30 18:34:53', '2023-10-30 18:34:53', NULL),
(6, 2, 12, 'L', 2, 0, '2023-10-30 18:34:53', '2023-10-30 18:34:53', NULL),
(7, 2, 6, 'S', 2, 0, '2023-10-30 18:34:53', '2023-10-30 18:34:53', NULL),
(8, 3, 20, 'L', 2, 0, '2023-11-01 13:21:24', '2023-11-01 13:21:24', NULL),
(9, 3, 14, 'M', 1, 0, '2023-11-01 13:21:24', '2023-11-01 13:21:24', NULL),
(10, 3, 13, 'XL', 1, 0, '2023-11-01 13:21:24', '2023-11-01 13:21:24', NULL),
(11, 4, 13, 'S', 1, 0, '2023-11-01 13:24:33', '2023-11-01 13:24:33', NULL),
(12, 4, 26, 'M', 2, 0, '2023-11-01 13:24:33', '2023-11-01 13:24:33', NULL),
(13, 5, 6, 'S', 1, 0, '2023-11-01 13:53:22', '2023-11-01 13:53:22', NULL),
(14, 5, 19, 'S', 1, 0, '2023-11-01 13:53:22', '2023-11-01 13:53:22', NULL),
(15, 5, 20, 'S', 1, 0, '2023-11-01 13:53:22', '2023-11-01 13:53:22', NULL),
(16, 6, 13, 'L', 1, 0, '2023-11-02 11:23:26', '2023-11-02 11:23:26', NULL),
(17, 6, 15, 'S', 2, 0, '2023-11-02 11:23:26', '2023-11-02 11:23:26', NULL),
(18, 7, 7, 'M', 2, 0, '2023-11-07 09:56:26', '2023-11-07 09:56:26', NULL),
(19, 7, 5, 'M', 1, 0, '2023-11-07 09:56:26', '2023-11-07 09:56:26', NULL),
(20, 8, 19, 'S', 2, 0, '2023-11-07 12:59:55', '2023-11-07 12:59:55', NULL),
(21, 8, 11, 'S', 2, 0, '2023-11-07 12:59:55', '2023-11-07 12:59:55', NULL),
(22, 9, 20, 'S', 1, 0, '2023-11-07 13:00:49', '2023-11-07 13:00:49', NULL),
(23, 10, 14, 'L', 1, 0, '2023-12-20 13:51:30', '2023-12-20 13:51:30', NULL),
(24, 10, 7, 'L', 1, 0, '2023-12-20 13:51:30', '2023-12-20 13:51:30', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `categories_detail_id` int(11) NOT NULL,
  `customers_object_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` char(255) NOT NULL,
  `price` float NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `categories_detail_id`, `customers_object_id`, `name`, `slug`, `description`, `content`, `image`, `price`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 2, 'Áo phông nữ', 'Ao-phong-nu', 'Áo phông cộc tay, thiết kế đơn giản tập trung vào cấu trúc vải dệt làm điểm nhấn.', 'Áo phông cộc tay, thiết kế đơn giản tập trung vào cấu trúc vải dệt làm điểm nhấn.', '1697479245020-6ts23w001-sk010-m-1-u.webp', 199000, 0, '2023-10-16 18:00:45', '2023-10-16 18:00:45', '2023-10-16 18:00:45'),
(2, 1, 2, 'Áo phông nữ interlock dài tay dáng crop top chun gấu', 'Ao-phong-nu-interlock-dai-tay-dang-crop-top-chun-gau', 'Áo phông nữ dài tay dáng ngắn crop top có chun gấu, dáng mặc bo chun bồng nhẹ phần gấu mang lại sự trẻ trung năng động, hợp thời trang', 'Áo phông nữ dài tay dáng ngắn crop top có chun gấu, dáng mặc bo chun bồng nhẹ phần gấu mang lại sự trẻ trung năng động, hợp thời trang', '1697479321892-6tl23w007-se249-m-1-a.webp', 399000, 0, '2023-10-16 18:02:01', '2023-10-16 18:02:01', '2023-10-16 18:02:01'),
(3, 1, 2, 'Áo phông nữ interlock cổ tròn có túi ngực', 'Ao-phong-nu-interlock-co-tron-co-tui-nguc', 'Áo cộc tay cổ tròn, chất liệu interlock dầy dặn, thoải mái, dễ chịu cho người mặc, phù hợp với đi chơi, đi làm, thời tiết mùa thu, mùa xuân.', 'Áo cộc tay cổ tròn, chất liệu interlock dầy dặn, thoải mái, dễ chịu cho người mặc, phù hợp với đi chơi, đi làm, thời tiết mùa thu, mùa xuân.', '1697479378099-6ts23w013-sn334-m-1-u.webp', 299000, 0, '2023-10-16 18:02:58', '2023-10-16 18:02:58', '2023-10-16 18:02:58'),
(4, 1, 1, 'Áo phông unisex người lớn cotton dáng rộng', 'Ao-phong-unisex-nguoi-lon-cotton-dang-rong', 'Áo phông dáng rộng, cổ tròn, cộc tay. Phía trước in họa tiết chữ khác màu. Thiết kế áo thun cổ tròn unisex đơn giản.', 'Áo phông dáng rộng, cổ tròn, cộc tay. Phía trước in họa tiết chữ khác màu. Thiết kế áo thun cổ tròn unisex đơn giản.', '1697479434693-5ts23w002-sg586-xl-1-u-x.webp', 399000, 0, '2023-10-16 18:03:54', '2023-10-16 18:03:54', '2023-10-16 18:03:54'),
(5, 1, 1, 'Áo phông nam cotton dáng rộng có hình in', 'Ao-phong-nam-cotton-dang-rong-co-hinh-in', 'Áo được may từ chất liệu cotton với form relax, có đường cắt rộng rãi, tạo cảm giác thoải mái và tự nhiên khi mặc. Hình in ở ngực áo mang phong cách hiện đại, bền, đẹp, không nứt trong quá trình sử dụng.', 'Áo được may từ chất liệu cotton với form relax, có đường cắt rộng rãi, tạo cảm giác thoải mái và tự nhiên khi mặc. Hình in ở ngực áo mang phong cách hiện đại, bền, đẹp, không nứt trong quá trình sử dụng.', '1697479487470-8ts23w005-sn187-xl-1-u.webp', 299000, 0, '2023-10-16 18:04:47', '2023-10-16 18:04:47', '2023-10-16 18:04:47'),
(6, 1, 1, 'Áo phông nam cotton basic dáng suông', 'Ao-phong-nam-cotton-basic-dang-suong', 'Áo được may từ chất liệu cotton với form regular fit, phần eo không ôm, suông thẳng xuống vạt áo. ', 'Áo được may từ chất liệu cotton với form regular fit, phần eo không ôm, suông thẳng xuống vạt áo. ', '1697479540317-8ts23w013-sg025-1.webp', 149000, 0, '2023-10-16 18:05:40', '2023-10-16 18:05:40', '2023-10-16 18:05:40'),
(7, 1, 1, 'Áo phông nam cotton USA dáng rộng in họa tiết', 'Ao-phong-nam-cotton-USA-dang-rong-in-hoa-tiet', 'Áo được may từ chất liệu cotton với form relax, có đường cắt rộng rãi, tạo cảm giác thoải mái và tự nhiên khi mặc. Hình in ở ngực áo là sự kết hợp giữa in ảnh và chữ mang phong cách hiện đại.', 'Áo được may từ chất liệu cotton với form relax, có đường cắt rộng rãi, tạo cảm giác thoải mái và tự nhiên khi mặc. Hình in ở ngực áo là sự kết hợp giữa in ảnh và chữ mang phong cách hiện đại.', '1697479593503-8ts23w014-sb346-1.webp', 299000, 0, '2023-10-16 18:06:33', '2023-10-16 18:06:33', '2023-10-16 18:06:33'),
(8, 1, 1, 'Áo phông nam cotton basic dáng suông', 'Ao-phong-nam-cotton-basic-dang-suong', 'Áo được may từ chất liệu cotton với form regular fit, phần eo không ôm, suông thẳng xuống vạt áo. Đây là một item hiện đại, basic dễ mặc, dễ mix cùng nhiều trang phục khác nhau. Chất liệu 100% cotton:', 'Áo được may từ chất liệu cotton với form regular fit, phần eo không ôm, suông thẳng xuống vạt áo. Đây là một item hiện đại, basic dễ mặc, dễ mix cùng nhiều trang phục khác nhau. Chất liệu 100% cotton:', '1697479666366-8ts23w012-sw001-xl-1.webp', 149000, 0, '2023-10-16 18:07:46', '2023-10-16 18:07:46', '2023-10-16 18:07:46'),
(9, 2, 2, 'Áo polo nữ interlock dáng ngắn', 'Ao-polo-nu-interlock-dang-ngan', 'Áo cộc tay cổ bẻ, dáng ngắn, eo ôm vừa, chất liệu interlock dầy dặn, thoải mái, dễ chịu cho người mặc, phù hợp với đi chơi, đi làm, thời tiết mùa thu, mùa xuân.', 'Áo cộc tay cổ bẻ, dáng ngắn, eo ôm vừa, chất liệu interlock dầy dặn, thoải mái, dễ chịu cho người mặc, phù hợp với đi chơi, đi làm, thời tiết mùa thu, mùa xuân.', '1697479728646-6tp23w005-sk010-1.webp', 299000, 0, '2023-10-16 18:08:48', '2023-10-16 18:08:48', '2023-10-16 18:08:48'),
(10, 2, 2, 'Áo polo nữ basic cổ bẻ cộc tay', 'Ao-polo-nu-basic-co-be-coc-tay', 'Áo polo nữ basic cổ bẻ cộc tay', 'Áo polo nữ basic cổ bẻ cộc tay', '1697479792080-6tp23s003-sy075-1.webp', 299000, 0, '2023-10-16 18:09:52', '2023-10-16 18:09:52', '2023-10-16 18:09:52'),
(11, 2, 2, 'Áo polo nữ in hoạ tiết dáng ôm', 'Ao-polo-nu-in-hoa-tiet-dang-om', 'Áo polo nữ in hoạ tiết dáng ôm', 'Áo polo nữ in hoạ tiết dáng ôm', '1697479834771-6tp23w007-sw011-m-1-u.webp', 299000, 0, '2023-10-16 18:10:34', '2023-10-16 18:10:34', '2023-10-16 18:10:34'),
(12, 2, 1, 'Áo polo nam dệt dáng suông', 'Ao-polo-nam-det-dang-suong', 'Áo polo nam dệt dáng suông', 'Áo polo nam dệt dáng suông', '1697479876267-8te23w001-sg527-1.webp', 499000, 0, '2023-10-16 18:11:16', '2023-10-16 18:11:16', '2023-10-16 18:11:16'),
(13, 2, 1, 'Áo polo nam kẻ ngang dáng suông', 'Ao-polo-nam-ke-ngang-dang-suong', 'Áo polo nam kẻ ngang dáng suông', 'Áo polo nam kẻ ngang dáng suông', '1697479915956-8te23w005-sw319-1.webp', 499000, 0, '2023-10-16 18:11:55', '2023-10-16 18:11:55', '2023-10-16 18:11:55'),
(14, 2, 1, 'Áo polo nam cổ đức cộc tay có hình thêu nhỏ', 'Ao-polo-nam-co-djuc-coc-tay-co-hinh-theu-nho', 'Áo polo nam cổ đức cộc tay có hình thêu nhỏ', 'Áo polo nam cổ đức cộc tay có hình thêu nhỏ', '1697479968866-8tp23a006-sk010-1.webp', 390000, 0, '2023-10-16 18:12:48', '2023-10-16 18:12:48', '2023-10-16 18:12:48'),
(15, 2, 1, 'Áo polo nam cafe cổ đức cộc tay', 'Ao-polo-nam-cafe-co-djuc-coc-tay', 'Áo polo nam cafe cổ đức cộc tay', 'Áo polo nam cafe cổ đức cộc tay', '1697480006916-8tp23a004-sg526-1.webp', 299000, 0, '2023-10-16 18:13:26', '2023-10-16 18:13:26', '2023-10-16 18:13:26'),
(16, 2, 1, 'Áo polo nam phối bo cổ và bo tay kẻ', 'Ao-polo-nam-phoi-bo-co-va-bo-tay-ke', 'Áo polo nam phối bo cổ và bo tay kẻ', 'Áo polo nam phối bo cổ và bo tay kẻ', '1697480051505-8tp23a004-sg526-1.webp', 199000, 0, '2023-10-16 18:14:11', '2023-10-16 18:14:11', '2023-10-16 18:14:11'),
(17, 2, 1, 'Áo polo nam in họa tiết', 'Ao-polo-nam-in-hoa-tiet', 'Áo polo nam in họa tiết', 'Áo polo nam in họa tiết', '1697480149552-8tp23c001-sw001-xl-1_1.webp', 299000, 0, '2023-10-16 18:15:49', '2023-10-16 18:15:49', '2023-10-16 18:15:49'),
(18, 5, 1, 'Áo sơ mi nam cotton flannel họa tiết kẻ', 'Ao-so-mi-nam-cotton-flannel-hoa-tiet-ke', 'Áo sơ mi nam cotton flannel họa tiết kẻ', 'Áo sơ mi nam cotton flannel họa tiết kẻ', '1697480190835-8th23w003-cb337-xl-1-u.webp', 399000, 0, '2023-10-16 18:16:30', '2023-10-16 18:16:30', '2023-10-16 18:16:30'),
(19, 5, 1, 'Áo sơ mi nam dài tay kẻ sọc dáng suông', 'Ao-so-mi-nam-dai-tay-ke-soc-dang-suong', 'Áo sơ mi nam dài tay kẻ sọc dáng suông', 'Áo sơ mi nam dài tay kẻ sọc dáng suông', '1697480242404-8th23w009-pb424-xl-1-u.webp', 399000, 0, '2023-10-16 18:17:22', '2023-10-16 18:17:22', '2023-10-16 18:17:22'),
(20, 5, 1, 'Áo sơ mi nam cotton cổ đức cộc tay', 'Ao-so-mi-nam-cotton-co-djuc-coc-tay', 'Áo sơ mi nam cotton cổ đức cộc tay', 'Áo sơ mi nam cotton cổ đức cộc tay', '1697480291770-8th23a002-se297-1-thumb.webp', 399000, 0, '2023-10-16 18:18:11', '2023-10-16 18:18:11', '2023-10-16 18:18:11'),
(21, 5, 1, 'Áo sơ mi nam cổ đức cộc tay hai túi ốp ngực có hình in', 'Ao-so-mi-nam-co-djuc-coc-tay-hai-tui-op-nguc-co-hinh-in', 'Áo sơ mi nam cổ đức cộc tay hai túi ốp ngực có hình in', 'Áo sơ mi nam cổ đức cộc tay hai túi ốp ngực có hình in', '1697480349480-8th23s003-sk010-1.webp', 199000, 0, '2023-10-16 18:19:09', '2023-10-16 18:19:09', '2023-10-16 18:19:09'),
(22, 3, 2, 'Áo ba lỗ nữ active cổ tròn đuôi tôm dáng suông', 'Ao-ba-lo-nu-active-co-tron-djuoi-tom-dang-suong', 'Áo ba lỗ nữ active cổ tròn đuôi tôm dáng suông', 'Áo ba lỗ nữ active cổ tròn đuôi tôm dáng suông', '1697480386715-6ts23s018-sw001-1.webp', 154000, 0, '2023-10-16 18:19:46', '2023-10-16 18:19:46', '2023-10-16 18:19:46'),
(23, 3, 2, 'Áo ba lỗ nữ cổ tròn dáng ôm', 'Ao-ba-lo-nu-co-tron-dang-om', 'Áo ba lỗ nữ cổ tròn dáng ôm', 'Áo ba lỗ nữ cổ tròn dáng ôm', '1697480425505-6ta23s007-sm490-1.webp', 200000, 0, '2023-10-16 18:20:25', '2023-10-16 18:20:25', '2023-10-16 18:20:25'),
(24, 5, 4, 'Áo sơ mi bé gái cotton cổ đức dài tay họa tiết ', 'ao-so-mi-be-gai-cotton-co-djuc-dai-tay-hoa-tiet', 'Áo sơ mi bé gái cotton cổ đức dài tay họa tiết ', 'Áo sơ mi bé gái cotton cổ đức dài tay họa tiết ', '1697480467071-1th21w001-cw026-120-1.webp', 199000, 0, '2023-10-21 06:27:50', '2023-10-21 06:27:50', '2023-10-21 06:27:50'),
(25, 5, 3, 'Áo sơ mi bé trai hoạ tiết kẻ', 'Ao-so-mi-be-trai-hoa-tiet-ke', 'Áo sơ mi bé trai hoạ tiết kẻ', 'Áo sơ mi bé trai hoạ tiết kẻ', '1697480507100-2th23w007-cg094-120-1-u.webp', 200000, 0, '2023-10-16 18:22:05', '2023-10-16 18:22:05', '2023-10-16 18:22:05'),
(26, 5, 3, 'Áo sơ mi bé trai cotton cổ đức cộc tay túi ốp ngực', 'Ao-so-mi-be-trai-cotton-co-djuc-coc-tay-tui-op-nguc', 'Áo sơ mi bé trai cotton cổ đức cộc tay túi ốp ngực', 'Áo sơ mi bé trai cotton cổ đức cộc tay túi ốp ngực', '1697480578846-2th23a001-sb195-1.webp', 300000, 0, '2023-10-16 18:22:58', '2023-10-16 18:22:58', '2023-10-16 18:22:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_news`
--

CREATE TABLE `product_news` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `remember_token` varchar(255) NOT NULL,
  `email_verified_at` date NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `remember_token`, `email_verified_at`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(14, 'admin@gmail.com', '$2a$10$lN1wuTrWlc1UItxkVBaoeu8mNCxRgqRflg1A1VTvpLTAXDAhN4j8W', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGxOMXd1VHJXbGMxVUl0eGtWQmFvZXU4bU5DeFJncVJmbGcxQTFWVHZwTFRBWERBaE40ajhXIiwiaWF0IjoxNzA1MjQ0ODE1LCJleHAiOjE3MDU4NDk2MTV9.lk14tUqfv8XcIUxQHjzPV0f86b1OVvZ-D2kre', '2024-01-14', 0, '2024-01-14 15:06:55', '2024-01-14 22:07:11', NULL),
(15, 'test@gmail.com', '$2a$10$FM6G6G33Od8ULCnncy/Qc..36i7t5IFsewWFyQm7AogEbOZeNEFQm', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkRk02RzZHMzNPZDhVTENubmN5L1FjLi4zNmk3dDVJRnNld1dGeVFtN0FvZ0ViT1plTkVGUW0iLCJpYXQiOjE3MDg5MzU3MTMsImV4cCI6MTcwOTU0MDUxM30.96cBDU7snlbNklYn6G-zKpDmS7EsmnhgeWkr60', '2024-02-26', 0, '2024-02-26 08:21:53', '2024-02-26 08:21:53', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `carts_details`
--
ALTER TABLE `carts_details`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `categories_details`
--
ALTER TABLE `categories_details`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `customers_objects`
--
ALTER TABLE `customers_objects`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product_news`
--
ALTER TABLE `product_news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `carts_details`
--
ALTER TABLE `carts_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `categories_details`
--
ALTER TABLE `categories_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `customers_objects`
--
ALTER TABLE `customers_objects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `product_news`
--
ALTER TABLE `product_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
