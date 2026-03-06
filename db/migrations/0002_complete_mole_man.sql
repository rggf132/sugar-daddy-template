ALTER TABLE `user` ADD `is_admin` boolean DEFAULT false;--> statement-breakpoint
CREATE INDEX `esc_event_id_idx` ON `event_to_sub_category` (`event_id`);--> statement-breakpoint
CREATE INDEX `esc_sub_category_id_idx` ON `event_to_sub_category` (`sub_category_id`);--> statement-breakpoint
CREATE INDEX `esc_event_sub_category_idx` ON `event_to_sub_category` (`event_id`,`sub_category_id`);