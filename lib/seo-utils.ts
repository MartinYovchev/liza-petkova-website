import type { Metadata } from 'next';
import type { BlogPost } from './blog-storage';

export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    keywords: [
      post.category,
      'blog',
      'insights',
      ...(post.category === 'professional'
        ? ['surveying', 'geodetic', 'GIS', 'construction', 'engineering']
        : [
            'creative',
            'art',
            'coaching',
            'personal development',
            'creativity',
          ]),
    ],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      url: `${baseUrl}/blog/${post.slug}`,
      images: post.featuredImage
        ? [
            {
              url: `${baseUrl}/api/images/${post.featuredImage}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: `@${post.author.toLowerCase().replace(/\s+/g, '')}`,
      images: post.featuredImage
        ? [`${baseUrl}/api/images/${post.featuredImage}`]
        : [],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
  };
}

export function generateStructuredData(post: BlogPost) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dual Theme Website',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    image: post.featuredImage
      ? `${baseUrl}/api/images/${post.featuredImage}`
      : undefined,
    articleSection: post.category,
    keywords:
      post.category === 'professional'
        ? 'surveying, geodetic, GIS, construction, engineering'
        : 'creative, art, coaching, personal development, creativity',
  };
}
