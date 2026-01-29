import { defineCollection, z } from "astro:content";

const subprocessesCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    complexity: z.enum(["low", "mid", "high"]),
    author: z.string(),
    discussionId: z.number().optional(),
    published: z.coerce.date(),
  }),
});

export const collections = {
  subprocesses: subprocessesCollection,
};
