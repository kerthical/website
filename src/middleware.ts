import { getDB } from '@/auth.ts';
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { db, auth } = getDB(context.locals.runtime.env.D1);
  context.locals.db = db;
  context.locals.auth = auth;
  context.locals.authRequest = auth.handleRequest(context);
  return await next();
};
