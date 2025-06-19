import { PrismaClient, Prisma } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Enhanced Prisma client configuration
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],
    errorFormat: "pretty",
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Helper function for safe database operations
export async function connectDB() {
  try {
    await prisma.$connect();
    console.log("📊 Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
}

// Helper function for graceful shutdown
export async function disconnectDB() {
  try {
    await prisma.$disconnect();
    console.log("📊 Database disconnected successfully");
  } catch (error) {
    console.error("❌ Database disconnection failed:", error);
  }
}

// Type exports for better TypeScript experience
export type PostWithImages = Prisma.PostGetPayload<{
  include: { images: true };
}>;

export type PostWithImagesAndTags = Prisma.PostGetPayload<{
  include: {
    images: true;
    tags: {
      include: {
        tag: true;
      };
    };
  };
}>;

export type ImageWithPost = Prisma.ImageGetPayload<{
  include: { post: true };
}>;

export type TagWithPostCount = Prisma.TagGetPayload<{
  include: {
    _count: {
      select: { posts: true };
    };
  };
}>;

// Common query patterns
export const commonIncludes = {
  postWithAll: {
    include: {
      images: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  },
  imageWithPost: {
    include: {
      post: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  },
} as const;
