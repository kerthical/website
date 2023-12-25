import { betterSqlite3 } from '@lucia-auth/adapter-sqlite';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import * as fs from 'fs';
import { lucia } from 'lucia';
import { astro } from 'lucia/middleware';
import * as path from 'path';

const dir = path.join(process.cwd(), '.astro', 'd1', 'miniflare-D1DatabaseObject');
const files = fs.readdirSync(dir);
const file = files.find(f => f.endsWith('.sqlite'));
if (!file) {
  throw new Error('No database found');
}

const database = Database(path.join(dir, file));
const db = drizzle(database);

const articles = sqliteTable('articles', {
  slug: text('slug').primaryKey(),
  title: text('title'),
  created_at: text('created_at'),
  content: text('content'),
});

(async () => {
  for (let i = 0; i < 100; i++) {
    await db
      .insert(articles)
      .values({
        slug: `article-${i}`,
        title: `Article ${i}`,
        content: `This is article ${i}`,
        created_at: '2023/01/01',
      })
      .onConflictDoNothing();
  }

  const auth = lucia({
    adapter: betterSqlite3(database, {
      user: 'user',
      key: 'user_key',
      session: 'user_session',
    }),
    env: 'DEV',
    middleware: astro(),
  });

  await auth.createUser({
    key: {
      providerId: 'username',
      providerUserId: 'admin',
      password: 'password',
    },
    attributes: {},
  });
})().catch(console.error);
