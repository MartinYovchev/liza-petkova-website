# 🚀 Enhanced Prisma Database Setup

This project uses **Prisma 6.10.1** with an advanced database schema designed for a dual-theme blog platform supporting both professional and artistic content.

## 🏗️ Database Schema Overview

### Models

#### 📝 Post Model

- **Enhanced fields**: `slug`, `excerpt`, `status`, `featured`, `viewCount`, `readTime`, `seoTitle`, `seoDescription`
- **Categories**: `PROFESSIONAL`, `ARTISTIC`, `PERSONAL`, `TUTORIAL`, `NEWS`
- **Statuses**: `DRAFT`, `PUBLISHED`, `ARCHIVED`, `SCHEDULED`
- **SEO optimized**: Dedicated fields for search engine optimization
- **Performance**: Indexed fields for fast queries

#### 🖼️ Image Model

- **Metadata support**: `alt`, `caption`, `width`, `height`, `fileSize`, `mimeType`
- **Optimization flags**: `isFeatured`, `isOptimized`
- **Proper relationships**: Cascading deletes with posts

#### 🏷️ Tag Model

- **Rich metadata**: `name`, `slug`, `description`, `color`
- **Many-to-many**: Connected to posts via `PostTag` junction table

#### 🔗 PostTag Model

- **Junction table**: Manages many-to-many relationships
- **Timestamped**: Tracks when tags were added to posts

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Create .env file (already done)
DATABASE_URL="file:./dev.db"
```

### 2. Generate Prisma Client

```bash
pnpm db:generate
```

### 3. Run Migrations

```bash
pnpm db:migrate
```

### 4. Seed Database

```bash
pnpm db:seed
```

## 📋 Available Scripts

| Script       | Command                  | Description                        |
| ------------ | ------------------------ | ---------------------------------- |
| **Generate** | `pnpm db:generate`       | Generate Prisma client             |
| **Migrate**  | `pnpm db:migrate`        | Run database migrations            |
| **Deploy**   | `pnpm db:migrate:deploy` | Deploy migrations (production)     |
| **Push**     | `pnpm db:push`           | Push schema changes (development)  |
| **Pull**     | `pnpm db:pull`           | Pull schema from database          |
| **Reset**    | `pnpm db:reset`          | Reset database and run migrations  |
| **Seed**     | `pnpm db:seed`           | Populate database with sample data |
| **Studio**   | `pnpm db:studio`         | Open Prisma Studio GUI             |
| **Format**   | `pnpm db:format`         | Format Prisma schema               |
| **Validate** | `pnpm db:validate`       | Validate Prisma schema             |

## 💻 Usage Examples

### Basic Queries

```typescript
import { prisma } from "@/lib/prisma";

// Get published posts with images and tags
const posts = await prisma.post.findMany({
  where: { status: "PUBLISHED" },
  include: {
    images: true,
    tags: {
      include: { tag: true },
    },
  },
  orderBy: { publishedAt: "desc" },
});

// Get featured posts by category
const featuredPosts = await prisma.post.findMany({
  where: {
    featured: true,
    category: "PROFESSIONAL",
    status: "PUBLISHED",
  },
  include: { images: { where: { isFeatured: true } } },
});

// Get post with full details
const postWithDetails = await prisma.post.findUnique({
  where: { slug: "post-slug" },
  include: {
    images: true,
    tags: {
      include: { tag: true },
    },
  },
});
```

### Advanced Queries

```typescript
// Search posts by content
const searchResults = await prisma.post.findMany({
  where: {
    OR: [
      { title: { contains: searchTerm } },
      { content: { contains: searchTerm } },
      { excerpt: { contains: searchTerm } },
    ],
    status: "PUBLISHED",
  },
});

// Get posts by tag
const taggedPosts = await prisma.post.findMany({
  where: {
    tags: {
      some: {
        tag: { slug: "nextjs" },
      },
    },
  },
});

// Get popular posts (by view count)
const popularPosts = await prisma.post.findMany({
  where: { status: "PUBLISHED" },
  orderBy: { viewCount: "desc" },
  take: 10,
});
```

### Creating Content

```typescript
// Create post with images and tags
const newPost = await prisma.post.create({
  data: {
    title: "New Blog Post",
    slug: "new-blog-post",
    content: "Post content here...",
    excerpt: "Brief description",
    category: "PROFESSIONAL",
    status: "PUBLISHED",
    featured: true,
    readTime: 5,
    seoTitle: "SEO Title",
    seoDescription: "SEO description",
    publishedAt: new Date(),
    images: {
      create: [
        {
          url: "/images/featured.jpg",
          alt: "Featured image",
          caption: "Image caption",
          isFeatured: true,
        },
      ],
    },
    tags: {
      create: [
        { tag: { connect: { slug: "nextjs" } } },
        { tag: { connect: { slug: "typescript" } } },
      ],
    },
  },
  include: {
    images: true,
    tags: { include: { tag: true } },
  },
});
```

## 🎯 Type-Safe Development

The setup includes comprehensive TypeScript types:

```typescript
import {
  PostWithImages,
  PostWithImagesAndTags,
  ImageWithPost,
  TagWithPostCount,
} from "@/lib/prisma";

// Use predefined types for consistent data structures
const posts: PostWithImagesAndTags[] = await prisma.post.findMany({
  ...commonIncludes.postWithAll,
});
```

## 🔍 Database Analysis

### Sample Data Overview

After seeding, your database contains:

- **7 tags**: Next.js, TypeScript, Prisma, React, Web Development, Design, Tutorial
- **5 posts**: 2 Professional, 1 Artistic, 1 Tutorial, 1 Draft
- **8 images**: Various featured and gallery images
- **Multiple tag relationships**: Demonstrating many-to-many associations

### Performance Optimizations

- **Indexes**: Added on frequently queried fields (`category`, `status`, `featured`, `publishedAt`, `createdAt`)
- **Efficient relations**: Proper foreign key constraints with cascading deletes
- **Type safety**: Full TypeScript integration for compile-time error checking

## 🚀 Production Deployment

### Vercel Deployment

The project is optimized for Vercel with:

- Automatic Prisma client generation
- Optimized function timeouts (30s)
- Proper environment variable handling

### Database Migration to PostgreSQL

For production, consider migrating to PostgreSQL:

1. **Update schema**:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. **Add production environment variables**:

```bash
DATABASE_URL="postgresql://user:password@host:port/database"
```

3. **Deploy migrations**:

```bash
pnpm db:migrate:deploy
```

## 🛠️ Development Workflow

### Making Schema Changes

1. Update `prisma/schema.prisma`
2. Run `pnpm db:migrate` to create migration
3. Commit both schema and migration files

### Adding New Data

1. Update `prisma/seed.ts`
2. Run `pnpm db:reset` to refresh database
3. Test with fresh data

### Debugging

- Use `pnpm db:studio` for visual database inspection
- Check query logs in development (enabled in `lib/prisma.ts`)
- Validate schema with `pnpm db:validate`

## 🔧 Troubleshooting

### Common Issues & Solutions

| Issue               | Solution                         |
| ------------------- | -------------------------------- |
| Type errors         | Run `pnpm db:generate`           |
| Migration conflicts | Run `pnpm db:reset`              |
| Seeding failures    | Check data constraints in schema |
| Performance issues  | Add appropriate indexes          |
| Connection issues   | Verify `DATABASE_URL` in `.env`  |

### Development Tips

- Use `prisma.post.findMany({ take: 10 })` to limit results during development
- Enable query logging for debugging
- Use database transactions for complex operations
- Always use proper TypeScript types

## 📈 Future Enhancements

Consider these improvements for scaling:

- **Connection pooling**: Use Prisma Data Proxy or PgBouncer
- **Read replicas**: For heavy read workloads
- **Caching**: Implement Redis for frequently accessed data
- **Search**: Add full-text search with Elasticsearch
- **Analytics**: Track post performance metrics
- **Internationalization**: Multi-language support

---

🎉 **Your enhanced Prisma setup is ready for production!**

For questions or issues, refer to the [Prisma documentation](https://www.prisma.io/docs) or check the project's issue tracker.
