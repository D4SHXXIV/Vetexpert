-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2026 at 04:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistem_pakar_hewan`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_konsultasi`
--

CREATE TABLE `detail_konsultasi` (
  `id` int(11) NOT NULL,
  `konsultasi_id` int(11) NOT NULL,
  `gejala_id` int(11) NOT NULL,
  `cf_user` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detail_konsultasi`
--

INSERT INTO `detail_konsultasi` (`id`, `konsultasi_id`, `gejala_id`, `cf_user`) VALUES
(1, 1, 2, 1),
(2, 1, 3, 1),
(3, 1, 6, 1),
(4, 1, 9, 1),
(5, 2, 1, 1),
(6, 2, 7, 1),
(7, 3, 1, 1),
(8, 3, 14, 0.6),
(9, 3, 19, 1),
(10, 4, 1, 1),
(11, 4, 2, 0.6),
(12, 4, 6, 0.8),
(13, 4, 12, 0.8),
(14, 5, 2, 0.6),
(15, 5, 3, 0.6),
(16, 5, 6, 0.6);

-- --------------------------------------------------------

--
-- Table structure for table `gejala`
--

CREATE TABLE `gejala` (
  `id` int(11) NOT NULL,
  `kode_gejala` varchar(20) NOT NULL,
  `nama_gejala` varchar(255) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gejala`
--

INSERT INTO `gejala` (`id`, `kode_gejala`, `nama_gejala`, `createdAt`, `updatedAt`) VALUES
(1, 'G001', 'Demam', '2026-06-20 09:20:46.531', '2026-06-20 09:20:46.531'),
(2, 'G002', 'Demam Tinggi', '2026-06-20 09:20:46.536', '2026-06-20 09:20:46.536'),
(3, 'G003', 'Muntah', '2026-06-20 09:20:46.540', '2026-06-20 09:20:46.540'),
(4, 'G004', 'Diare', '2026-06-20 09:20:46.543', '2026-06-20 09:20:46.543'),
(5, 'G005', 'Diare Berdarah', '2026-06-20 09:20:46.546', '2026-06-20 09:20:46.546'),
(6, 'G006', 'Tidak Nafsu Makan', '2026-06-20 09:20:46.548', '2026-06-20 09:20:46.548'),
(7, 'G007', 'Nafsu Makan Menurun', '2026-06-20 09:20:46.551', '2026-06-20 09:20:46.551'),
(8, 'G008', 'Lemas', '2026-06-20 09:20:46.554', '2026-06-20 09:20:46.554'),
(9, 'G009', 'Dehidrasi', '2026-06-20 09:20:46.556', '2026-06-20 09:20:46.556'),
(10, 'G010', 'Berat Badan Turun', '2026-06-20 09:20:46.558', '2026-06-20 09:20:46.558'),
(11, 'G011', 'Bersin', '2026-06-20 09:20:46.560', '2026-06-20 09:20:46.560'),
(12, 'G012', 'Flu', '2026-06-20 09:20:46.563', '2026-06-20 09:20:46.563'),
(13, 'G013', 'Hidung Berair', '2026-06-20 09:20:46.565', '2026-06-20 09:20:46.565'),
(14, 'G014', 'Mata Berair', '2026-06-20 09:20:46.568', '2026-06-20 09:20:46.568'),
(15, 'G015', 'Sariawan Mulut', '2026-06-20 09:20:46.571', '2026-06-20 09:20:46.571'),
(16, 'G016', 'Lesi Lidah', '2026-06-20 09:20:46.574', '2026-06-20 09:20:46.574'),
(17, 'G017', 'Lesi Telinga', '2026-06-20 09:20:46.576', '2026-06-20 09:20:46.576'),
(18, 'G018', 'Mulut Berliur', '2026-06-20 09:20:46.579', '2026-06-20 09:20:46.579'),
(19, 'G019', 'Gatal', '2026-06-20 09:20:46.581', '2026-06-20 09:20:46.581'),
(20, 'G020', 'Gatal Ekstrem', '2026-06-20 09:20:46.584', '2026-06-20 09:20:46.584'),
(21, 'G021', 'Kerontokan Bulu', '2026-06-20 09:20:46.589', '2026-06-20 09:20:46.589'),
(22, 'G022', 'Luka Kulit', '2026-06-20 09:20:46.591', '2026-06-20 09:20:46.591'),
(23, 'G023', 'Keropeng Kulit', '2026-06-20 09:20:46.593', '2026-06-20 09:20:46.593'),
(24, 'G024', 'Gusi Meradang', '2026-06-20 09:20:46.595', '2026-06-20 09:20:46.595'),
(25, 'G025', 'Infeksi Berulang', '2026-06-20 09:20:46.598', '2026-06-20 09:20:46.598'),
(26, 'G026', 'Luka Sulit Sembuh', '2026-06-20 09:20:46.600', '2026-06-20 09:20:46.600'),
(27, 'G027', 'Anemia (Gusi Pucat)', '2026-06-20 09:20:46.603', '2026-06-20 09:20:46.603'),
(28, 'G028', 'Pembengkakan Kelenjar Getah Bening', '2026-06-20 09:20:46.605', '2026-06-20 09:20:46.605'),
(29, 'G029', 'Kedutan Kelopak Mata', '2026-06-20 09:20:46.607', '2026-06-20 09:20:46.607'),
(30, 'G030', 'Kejang', '2026-06-20 09:20:46.610', '2026-06-20 09:20:46.610'),
(31, 'G031', 'Kulit Menebal', '2026-06-20 09:20:46.612', '2026-06-20 09:20:46.612'),
(32, 'G032', 'Kulit Kemerahan', '2026-06-20 09:20:46.615', '2026-06-20 09:20:46.615'),
(33, 'G033', 'Agresif', '2026-06-20 09:20:46.617', '2026-06-20 09:20:46.617'),
(34, 'G034', 'Takut Air', '2026-06-20 09:20:46.620', '2026-06-20 09:20:46.620'),
(35, 'G035', 'Mulut Berbusa', '2026-06-20 09:20:46.622', '2026-06-20 09:20:46.622'),
(36, 'G036', 'Kelumpuhan', '2026-06-20 09:20:46.625', '2026-06-20 09:20:46.625'),
(37, 'G037', 'Sesak Napas', '2026-06-20 09:20:46.627', '2026-06-20 09:20:46.627'),
(38, 'G038', 'Napas Cepat', '2026-06-20 09:20:46.630', '2026-06-20 09:20:46.630'),
(39, 'G039', 'Penumpukan Cairan Paru', '2026-06-20 09:20:46.635', '2026-06-20 09:20:46.635');

-- --------------------------------------------------------

--
-- Table structure for table `konsultasi`
--

CREATE TABLE `konsultasi` (
  `id` int(11) NOT NULL,
  `tanggal` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `nama_pemilik` varchar(255) NOT NULL,
  `nama_hewan` varchar(255) NOT NULL,
  `usia_hewan` varchar(50) NOT NULL,
  `jenis_hewan` enum('KUCING','ANJING') NOT NULL,
  `hasil_diagnosa` varchar(255) NOT NULL,
  `cf_hasil` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `konsultasi`
--

INSERT INTO `konsultasi` (`id`, `tanggal`, `nama_pemilik`, `nama_hewan`, `usia_hewan`, `jenis_hewan`, `hasil_diagnosa`, `cf_hasil`) VALUES
(1, '2026-06-20 09:23:16.827', 'abay', 'devina', '3 Tahun', 'ANJING', 'Parvovirus', 0.994),
(2, '2026-06-20 12:40:57.889', 'Dimas', 'Udin', '2 tahun', 'KUCING', 'Calicivirus', 0.6),
(3, '2026-06-20 13:39:57.786', 'Dimas', 'Udin', '2 tahun', 'KUCING', 'Scabies', 0.7),
(4, '2026-06-20 13:48:45.358', 'Dimas', 'Udin', '2 tahun', 'KUCING', 'Panleukopenia', 0.7712),
(5, '2026-06-20 14:28:49.252', 'Dimas', 'Udin', '2 tahun', 'KUCING', 'Panleukopenia', 0.843168);

-- --------------------------------------------------------

--
-- Table structure for table `penyakit`
--

CREATE TABLE `penyakit` (
  `id` int(11) NOT NULL,
  `kode_penyakit` varchar(20) NOT NULL,
  `nama_penyakit` varchar(255) NOT NULL,
  `jenis_hewan` enum('KUCING','ANJING') NOT NULL,
  `deskripsi` text NOT NULL,
  `solusi` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penyakit`
--

INSERT INTO `penyakit` (`id`, `kode_penyakit`, `nama_penyakit`, `jenis_hewan`, `deskripsi`, `solusi`, `createdAt`, `updatedAt`) VALUES
(1, 'PK001', 'Calicivirus', 'KUCING', 'Penyakit infeksi virus pada kucing yang menyerang saluran pernapasan atas dan rongga mulut.', 'Isolasi kucing dari hewan lain, berikan nutrisi dan cairan yang cukup, lakukan terapi suportif, dan konsultasikan ke dokter hewan.', '2026-06-20 09:20:46.494', '2026-06-20 13:33:39.202'),
(2, 'PK002', 'Panleukopenia', 'KUCING', 'Penyakit virus yang sangat menular pada kucing yang menyerang sistem pencernaan dan kekebalan tubuh.', 'Segera bawa ke dokter hewan untuk terapi cairan, pemberian obat suportif, dan isolasi dari hewan lain.', '2026-06-20 09:20:46.499', '2026-06-20 13:34:03.528'),
(3, 'PK003', 'Scabies', 'KUCING', 'Penyakit kulit akibat infestasi tungau yang menyebabkan gatal dan kerontokan bulu.', 'Bersihkan lingkungan, lakukan pengobatan antiparasit sesuai anjuran dokter hewan, dan hindari kontak dengan hewan lain.', '2026-06-20 09:20:46.505', '2026-06-20 13:34:11.977'),
(4, 'PK004', 'FIV (Feline Immunodeficiency Virus)', 'KUCING', 'Penyakit virus yang menyebabkan penurunan sistem kekebalan tubuh pada kucing.', 'Berikan nutrisi yang baik, kontrol rutin ke dokter hewan, hindari stres, dan cegah kontak dengan kucing yang sehat.', '2026-06-20 09:20:46.508', '2026-06-20 13:34:24.727'),
(5, 'PK005', 'FeLV (Feline Leukemia Virus)', 'KUCING', 'Penyakit virus yang menyerang sistem kekebalan dan dapat menyebabkan anemia serta gangguan organ lainnya.', 'Berikan perawatan suportif, nutrisi yang baik, vaksinasi pada kucing sehat, dan pemeriksaan rutin ke dokter hewan.', '2026-06-20 09:20:46.511', '2026-06-20 13:34:37.704'),
(6, 'PA001', 'Parvovirus', 'ANJING', 'Penyakit virus pada anjing yang menyerang saluran pencernaan dan dapat menyebabkan dehidrasi berat.', 'Rawat inap, terapi cairan intravena, pemberian antibiotik dan obat suportif oleh dokter hewan.', '2026-06-20 09:20:46.514', '2026-06-20 13:35:16.553'),
(7, 'PA002', 'Distemper', 'ANJING', 'Penyakit virus menular pada anjing yang menyerang sistem pernapasan, pencernaan, dan saraf.', 'Lakukan terapi suportif, isolasi hewan, pemberian cairan dan obat sesuai anjuran dokter hewan.', '2026-06-20 09:20:46.516', '2026-06-20 13:35:48.349'),
(8, 'PA003', 'Demodex', 'ANJING', 'Penyakit kulit akibat pertumbuhan tungau Demodex secara berlebihan yang menyebabkan kerontokan bulu dan peradangan kulit.', 'Pemberian obat antiparasit, menjaga kebersihan kulit, dan pemeriksaan rutin ke dokter hewan.', '2026-06-20 09:20:46.520', '2026-06-20 13:36:21.346'),
(9, 'PA004', 'Rabies', 'ANJING', 'Penyakit virus yang menyerang sistem saraf dan dapat menular ke manusia melalui gigitan hewan yang terinfeksi.', 'Segera laporkan ke dokter hewan atau instansi terkait, lakukan isolasi ketat, dan pencegahan melalui vaksinasi.', '2026-06-20 09:20:46.524', '2026-06-20 13:36:58.664'),
(10, 'PA005', 'Pneumonia', 'ANJING', 'Peradangan pada paru-paru yang menyebabkan gangguan pernapasan pada anjing.', 'Berikan terapi antibiotik sesuai anjuran dokter hewan, istirahat yang cukup, dan menjaga hidrasi hewan.', '2026-06-20 09:20:46.528', '2026-06-20 13:37:30.006');

-- --------------------------------------------------------

--
-- Table structure for table `rule_cf`
--

CREATE TABLE `rule_cf` (
  `id` int(11) NOT NULL,
  `penyakit_id` int(11) NOT NULL,
  `gejala_id` int(11) NOT NULL,
  `cf_pakar` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rule_cf`
--

INSERT INTO `rule_cf` (`id`, `penyakit_id`, `gejala_id`, `cf_pakar`) VALUES
(1, 1, 1, 0.6),
(2, 1, 11, 0.7),
(3, 1, 13, 0.7),
(4, 1, 15, 1),
(5, 1, 16, 1),
(6, 1, 17, 0.8),
(7, 1, 18, 0.9),
(8, 2, 2, 0.8),
(9, 2, 3, 0.8),
(10, 2, 4, 0.7),
(11, 2, 6, 0.7),
(12, 2, 8, 0.7),
(13, 2, 9, 0.9),
(14, 3, 19, 0.7),
(15, 3, 20, 1),
(16, 3, 21, 0.8),
(17, 3, 22, 0.7),
(18, 3, 23, 0.9),
(19, 4, 24, 0.9),
(20, 4, 10, 0.7),
(21, 4, 25, 1),
(22, 4, 26, 0.8),
(23, 5, 27, 1),
(24, 5, 10, 0.7),
(25, 5, 7, 0.6),
(26, 5, 28, 0.9),
(27, 5, 25, 0.8),
(28, 6, 3, 0.8),
(29, 6, 5, 1),
(30, 6, 9, 0.9),
(31, 6, 8, 0.8),
(32, 6, 6, 0.7),
(33, 7, 1, 0.6),
(34, 7, 13, 0.7),
(35, 7, 14, 0.7),
(36, 7, 29, 0.9),
(37, 7, 30, 1),
(38, 8, 19, 0.7),
(39, 8, 21, 0.9),
(40, 8, 31, 1),
(41, 8, 32, 0.8),
(42, 9, 33, 0.8),
(43, 9, 34, 1),
(44, 9, 35, 0.9),
(45, 9, 36, 0.8),
(46, 10, 37, 1),
(47, 10, 38, 0.9),
(48, 10, 8, 0.7),
(49, 10, 39, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_konsultasi`
--
ALTER TABLE `detail_konsultasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detail_konsultasi_konsultasi_id_fkey` (`konsultasi_id`),
  ADD KEY `detail_konsultasi_gejala_id_fkey` (`gejala_id`);

--
-- Indexes for table `gejala`
--
ALTER TABLE `gejala`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gejala_kode_gejala_key` (`kode_gejala`);

--
-- Indexes for table `konsultasi`
--
ALTER TABLE `konsultasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penyakit`
--
ALTER TABLE `penyakit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `penyakit_kode_penyakit_key` (`kode_penyakit`);

--
-- Indexes for table `rule_cf`
--
ALTER TABLE `rule_cf`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rule_cf_penyakit_id_gejala_id_key` (`penyakit_id`,`gejala_id`),
  ADD KEY `rule_cf_gejala_id_fkey` (`gejala_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_konsultasi`
--
ALTER TABLE `detail_konsultasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `gejala`
--
ALTER TABLE `gejala`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `konsultasi`
--
ALTER TABLE `konsultasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `penyakit`
--
ALTER TABLE `penyakit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `rule_cf`
--
ALTER TABLE `rule_cf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_konsultasi`
--
ALTER TABLE `detail_konsultasi`
  ADD CONSTRAINT `detail_konsultasi_gejala_id_fkey` FOREIGN KEY (`gejala_id`) REFERENCES `gejala` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_konsultasi_konsultasi_id_fkey` FOREIGN KEY (`konsultasi_id`) REFERENCES `konsultasi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rule_cf`
--
ALTER TABLE `rule_cf`
  ADD CONSTRAINT `rule_cf_gejala_id_fkey` FOREIGN KEY (`gejala_id`) REFERENCES `gejala` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rule_cf_penyakit_id_fkey` FOREIGN KEY (`penyakit_id`) REFERENCES `penyakit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
