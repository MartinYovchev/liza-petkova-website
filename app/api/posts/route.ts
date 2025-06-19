// /api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// Helper function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Helper function to calculate reading time
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Enum values
const CATEGORIES = [
  "PROFESSIONAL",
  "ARTISTIC",
  "PERSONAL",
  "TUTORIAL",
  "NEWS",
] as const;
const STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED", "SCHEDULED"] as const;

type Category = (typeof CATEGORIES)[number];
type Status = (typeof STATUSES)[number];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    // Build where clause based on query parameters
    const whereClause: any = {};

    if (published === "true") {
      whereClause.status = "PUBLISHED";
    }

    if (category && CATEGORIES.includes(category.toUpperCase() as Category)) {
      whereClause.category = category.toUpperCase();
    }

    if (featured === "true") {
      whereClause.featured = true;
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        images: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      category,
      status = "DRAFT",
      featured = false,
      excerpt,
      seoTitle,
      seoDescription,
      images = [],
      tags = [],
    } = body;

    // Validate required fields
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "Title, content, and category are required" },
        { status: 400 }
      );
    }

    // Validate category
    if (!CATEGORIES.includes(category.toUpperCase() as Category)) {
      return NextResponse.json(
        { error: "Invalid category. Must be one of: " + CATEGORIES.join(", ") },
        { status: 400 }
      );
    }

    // Validate status
    if (!STATUSES.includes(status.toUpperCase() as Status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: " + STATUSES.join(", ") },
        { status: 400 }
      );
    }

    const slug = createSlug(title);
    const readTime = calculateReadTime(content);

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || content.substring(0, 200) + "...",
        category: category.toUpperCase(),
        status: status.toUpperCase(),
        featured,
        readTime,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || content.substring(0, 160),
        publishedAt: status.toUpperCase() === "PUBLISHED" ? new Date() : null,
        images: {
          create: images.map((image: any) => ({
            url: image.url,
            alt: image.alt || "",
            caption: image.caption || "",
            width: image.width || null,
            height: image.height || null,
            fileSize: image.fileSize || null,
            mimeType: image.mimeType || null,
            isFeatured: image.isFeatured || false,
            isOptimized: image.isOptimized || false,
          })),
        },
        tags: {
          create: tags.map((tagSlug: string) => ({
            tag: { connect: { slug: tagSlug } },
          })),
        },
      },
      include: {
        images: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
