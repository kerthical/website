CREATE TABLE `user_key` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`hashed_password` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`active_expires` blob NOT NULL,
	`idle_expires` blob NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
DROP TABLE `verificationToken`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `emailVerified`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `image`;