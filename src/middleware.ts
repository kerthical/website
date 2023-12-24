import { getDB } from '@lib/auth.ts';
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { auth } = getDB(context.locals.runtime.env.D1);
  context.locals.auth = auth.handleRequest(context);
  return await next();
};
