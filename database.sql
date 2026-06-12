-- --------------------------------------------------------
-- Database setup for TaskMaster Pro To-Do App
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS taskmaster_db;
USE taskmaster_db;

-- --------------------------------------------------------
-- Table structure for table `projects`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `projects` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default projects to match the frontend
INSERT IGNORE INTO `projects` (`id`, `name`) VALUES
('general', 'General'),
('work', 'Work'),
('personal', 'Personal');

-- --------------------------------------------------------
-- Table structure for table `tasks`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` varchar(50) NOT NULL DEFAULT 'general',
  `task_text` varchar(255) NOT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `user_settings`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `display_name` varchar(100) NOT NULL DEFAULT 'Guest',
  `avatar_url` varchar(255) DEFAULT NULL,
  `dark_mode` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default user settings
INSERT IGNORE INTO `user_settings` (`id`, `display_name`, `avatar_url`, `dark_mode`) VALUES
(1, 'Guest', 'https://ui-avatars.com/api/?name=Guest&background=6366f1&color=fff', 0);
