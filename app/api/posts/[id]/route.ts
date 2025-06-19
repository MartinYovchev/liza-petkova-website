// /api/posts/[id]/route.ts
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        images: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Increment view count
    await prisma.post.update({
      where: { id: postId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      content,
      category,
      status,
      featured,
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

    // Validate status if provided
    if (status && !STATUSES.includes(status.toUpperCase() as Status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: " + STATUSES.join(", ") },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const slug = createSlug(title);
    const readTime = calculateReadTime(content);
    const newStatus = status ? status.toUpperCase() : existingPost.status;

    // Delete existing images and tags, then create new ones
    await prisma.image.deleteMany({
      where: { postId: postId },
    });

    await prisma.postTag.deleteMany({
      where: { postId: postId },
    });

    const updateData = {
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 200) + "...",
      category: category.toUpperCase(),
      status: newStatus,
      featured: featured !== undefined ? featured : existingPost.featured,
      readTime,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt || content.substring(0, 160),
      publishedAt:
        newStatus === "PUBLISHED" && !existingPost.publishedAt
          ? new Date()
          : existingPost.publishedAt,
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
    };

    const post = await prisma.post.update({
      where: { id: postId },
      data: updateData,
      include: {
        images: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Delete post (images and tags will be deleted automatically due to cascade)
    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
