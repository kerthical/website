import { defineCollection, z } from 'astro:content';

export const collections = {
  articles: defineCollection({
    type: 'content',
    schema: z
      .object({
        title: z.string(),
        createdAt: z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/),
      })
      .strict(),
  }),
};
