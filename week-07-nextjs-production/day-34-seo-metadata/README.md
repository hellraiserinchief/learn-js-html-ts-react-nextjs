# Day 34 — SEO, Metadata, Sitemaps, Open Graph

**Reading:** [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [sitemap.ts](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [Open Graph images](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image).

## Reference

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [{ url: post.coverImage }],
    },
  };
}

// app/sitemap.ts
export default async function sitemap() {
  const posts = await db.post.findMany();
  return [
    { url: 'https://example.com', lastModified: new Date() },
    ...posts.map((p) => ({
      url: `https://example.com/blog/${p.slug}`,
      lastModified: p.updatedAt,
    })),
  ];
}
```

## Exercise

Add per-post metadata, an OG image, and a sitemap to your Week 6 blog.
