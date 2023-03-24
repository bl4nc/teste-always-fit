CREATE TABLE `tasks` (
  `id` varchar(255) NOT NULL,
  `task` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0 - start \n1 - finish',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `finish_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci