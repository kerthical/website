import { d1 } from '@lucia-auth/adapter-sqlite';
import { drizzle } from 'drizzle-orm/d1';
import { lucia } from 'lucia';
import { astro } from 'lucia/middleware';

export const getDB = (d1env: import('@cloudflare/workers-types').D1Database) => {
  const db = drizzle(d1env);
  const auth = lucia({
    adapter: d1(d1env, {
      user: 'user',
      key: 'user_key',
      session: 'user_session',
    }),
    env: import.meta.env.DEV ? 'DEV' : 'PROD',
    middleware: astro(),
    getUserAttributes: data => {
      return {
        username: data.username,
      };
    },
  });

  return { db, auth };
};

export type Auth = ReturnType<typeof getDB>['auth'];
