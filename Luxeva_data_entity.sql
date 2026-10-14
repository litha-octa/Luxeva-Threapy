CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `fullname` varchar(255),
  `username` varchar(255),
  `password` varchar(255),
  `role_id` integer NOT NULL,
  `phone` integer,
  `email` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `service` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `duration` integer,
  `price` integer
);

CREATE TABLE `address` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `name` varchar(255),
  `street` varchar(255),
  `details` varchar(255),
  `maps_link` varchar(255)
);

CREATE TABLE `role` (
  `id` integer PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `Order_service` (
  `id` integer PRIMARY KEY,
  `order_id` integer NOT NULL,
  `service_id` integer NOT NULL,
  `price` integer
);

CREATE TABLE `order` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `therapist_id` integer,
  `schedule_at` timestamp NOT NULL,
  `address_id` integer NOT NULL,
  `status` integer NOT NULL,
  `payment_status` integer NOT NULL,
  `payment_method` integer NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
);

CREATE TABLE `order_status` (
  `id` integer PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `therapist_profile` (
  `id` integer PRIMARY KEY,
  `user_id` integer UNIQUE NOT NULL,
  `name` varchar(255),
  `speciality` integer NOT NULL,
  `rate` integer
);

CREATE TABLE `payment_method` (
  `id` integer PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `payment_status` (
  `id` integer PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `therapist_log` (
  `id` integer PRIMARY KEY,
  `therapist_id` integer NOT NULL,
  `order_id` integer NOT NULL,
  `status` integer NOT NULL
);

CREATE TABLE `log_therapist_status` (
  `id` integer PRIMARY KEY,
  `name` varchar(255)
);

ALTER TABLE `users` ADD CONSTRAINT `user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

ALTER TABLE `address` ADD CONSTRAINT `user_address` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `order` ADD CONSTRAINT `user_order` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `order` ADD CONSTRAINT `order_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

ALTER TABLE `Order_service` ADD CONSTRAINT `order_service` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

ALTER TABLE `Order_service` ADD CONSTRAINT `list_service` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

ALTER TABLE `therapist_profile` ADD CONSTRAINT `is_therapist` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `order` ADD CONSTRAINT `order_therapist` FOREIGN KEY (`therapist_id`) REFERENCES `therapist_profile` (`id`);

ALTER TABLE `therapist_profile` ADD CONSTRAINT `therapist_speciality` FOREIGN KEY (`speciality`) REFERENCES `service` (`id`);

ALTER TABLE `order` ADD CONSTRAINT `order_status` FOREIGN KEY (`status`) REFERENCES `order_status` (`id`);

ALTER TABLE `order` ADD CONSTRAINT `order_payment_status` FOREIGN KEY (`payment_status`) REFERENCES `payment_status` (`id`);

ALTER TABLE `order` ADD CONSTRAINT `order_payment_method` FOREIGN KEY (`payment_method`) REFERENCES `payment_method` (`id`);

ALTER TABLE `therapist_log` ADD CONSTRAINT `order_therapist_log` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

ALTER TABLE `therapist_log` ADD CONSTRAINT `therapist_log_status` FOREIGN KEY (`status`) REFERENCES `log_therapist_status` (`id`);

ALTER TABLE `therapist_log` ADD CONSTRAINT `therapist_log` FOREIGN KEY (`therapist_id`) REFERENCES `therapist_profile` (`id`);
