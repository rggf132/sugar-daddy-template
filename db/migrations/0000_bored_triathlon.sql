CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`type` varchar(191),
	`created_at` timestamp DEFAULT (now()),
	`modified_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `city` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`country_id` bigint unsigned NOT NULL,
	`lat` double,
	`lng` double,
	`created_at` timestamp DEFAULT (now()),
	`modified_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `city_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `country` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`iso2` varchar(2),
	`iso3` varchar(3),
	`lat` double,
	`lng` double,
	`created_at` timestamp DEFAULT (now()),
	`modified_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `country_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `event` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(191),
	`description` varchar(191),
	`entry_type` enum('Free','Paid'),
	`cost` double,
	`start` timestamp,
	`end` timestamp,
	`file_key` varchar(255),
	`file_type` varchar(255),
	`creator_id` varchar(255) NOT NULL,
	`category_id` bigint unsigned,
	`country_id` bigint unsigned,
	`city_id` bigint unsigned,
	`created_at` timestamp DEFAULT (now()),
	`modified_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `event_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `event_to_sub_category` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`event_id` bigint unsigned,
	`sub_category_id` bigint unsigned,
	CONSTRAINT `event_to_sub_category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `sub_category` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`type` varchar(191),
	`category_id` bigint unsigned,
	`created_at` timestamp DEFAULT (now()),
	`modified_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sub_category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `category_id_idx` ON `event` (`category_id`);--> statement-breakpoint
CREATE INDEX `creator_id_idx` ON `event` (`creator_id`);--> statement-breakpoint
CREATE INDEX `country_id_idx` ON `event` (`country_id`);--> statement-breakpoint
CREATE INDEX `city_id_idx` ON `event` (`city_id`);--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `city` ADD CONSTRAINT `city_country_id_country_id_fk` FOREIGN KEY (`country_id`) REFERENCES `country`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `event` ADD CONSTRAINT `event_country_id_country_id_fk` FOREIGN KEY (`country_id`) REFERENCES `country`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `event` ADD CONSTRAINT `event_city_id_city_id_fk` FOREIGN KEY (`city_id`) REFERENCES `city`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sub_category` ADD CONSTRAINT `sub_category_category_id_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE no action ON UPDATE no action;