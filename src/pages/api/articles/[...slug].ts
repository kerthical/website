import { getDB } from '@lib/auth.ts';
import { articles } from '@lib/schema';
import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';

export const PUT: APIRoute = async context => {
  const { slug } = context.params;
  const { title, content }: { title: string; content: string } = await context.request.json();
  const { db, auth } = await getDB(context.locals.runtime.env.D1);

  const authRequest = auth.handleRequest(context);
  const session = await authRequest.validate();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!slug || !title || !content) {
    return new Response('Missing parameters', { status: 400 });
  }

  try {
    const article = (await db.select().from(articles).where(eq(articles.slug, slug)).limit(1))[0];

    if (!article) {
      return new Response('Article not found', { status: 404 });
    }

    await db.update(articles).set({ content, title }).where(eq(articles.slug, slug));
    return new Response('OK', { status: 200 });
  } catch (e) {
    return new Response('Internal server error', { status: 500 });
  }
};
