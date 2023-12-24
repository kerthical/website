import { articles } from '../../../schema.ts';
import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Auth } from '@auth/core';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

export const PUT: APIRoute = async context => {
  const { slug } = context.params;
  const { title, content }: { title: string, content: string } = await context.request.json();

  if (!slug) {
    return new Response('Missing slug', { status: 400 });
  }

  if (!content) {
    return new Response('Missing content', { status: 400 });
  }

  try {
    const db = await drizzle(context.locals.runtime.env['D1']);
    const response = await Auth(context.request, {
      providers: [],
      adapter: DrizzleAdapter(db),
    });
    console.log(response);
    const article = (
      await db.select().from(articles).where(eq(articles.slug, slug)).limit(1)
    )[0];

    if (!article) {
      return new Response('Article not found', { status: 404 });
    }

    await db.update(articles).set({ content, title }).where(eq(articles.slug, slug));
    return new Response('OK', { status: 200 });
  } catch (e) {
    return new Response('Internal server error', { status: 500 });
  }
};