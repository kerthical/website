import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const articles = sqliteTable('articles', {
  slug: text('slug').primaryKey(),
  title: text('title'),
  created_at: text('created_at'),
  content: text('content'),
});
