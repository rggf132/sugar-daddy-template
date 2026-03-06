CREATE INDEX `city_name_idx` ON `city` (`name`);--> statement-breakpoint
CREATE INDEX `city_country_id_idx` ON `city` (`country_id`);--> statement-breakpoint
CREATE INDEX `city_name_country_idx` ON `city` (`name`,`country_id`);--> statement-breakpoint
CREATE INDEX `country_name_idx` ON `country` (`name`);--> statement-breakpoint
CREATE INDEX `country_iso2_idx` ON `country` (`iso2`);--> statement-breakpoint
CREATE INDEX `event_title_idx` ON `event` (`title`);--> statement-breakpoint
CREATE INDEX `event_start_idx` ON `event` (`start`);--> statement-breakpoint
CREATE INDEX `event_end_idx` ON `event` (`end`);--> statement-breakpoint
CREATE INDEX `event_entry_type_idx` ON `event` (`entry_type`);--> statement-breakpoint
CREATE INDEX `event_created_at_idx` ON `event` (`created_at`);--> statement-breakpoint
CREATE INDEX `event_country_city_idx` ON `event` (`country_id`,`city_id`);--> statement-breakpoint
CREATE INDEX `event_category_entry_type_idx` ON `event` (`category_id`,`entry_type`);