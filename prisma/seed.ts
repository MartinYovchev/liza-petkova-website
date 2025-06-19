import { PrismaClient, Category, Status } from "@prisma/client";

const prisma = new PrismaClient();

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

async function main() {
  console.log("🌱 Starting database seeding...");

  // Create Tags first
  console.log("📝 Creating tags...");
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: "Next.js",
        slug: "nextjs",
        description: "The React Framework for Production",
        color: "#000000",
      },
    }),
    prisma.tag.create({
      data: {
        name: "TypeScript",
        slug: "typescript",
        description: "Typed JavaScript at Any Scale",
        color: "#3178C6",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Prisma",
        slug: "prisma",
        description: "Next-generation ORM for Node.js & TypeScript",
        color: "#2D3748",
      },
    }),
    prisma.tag.create({
      data: {
        name: "React",
        slug: "react",
        description: "A JavaScript library for building user interfaces",
        color: "#61DAFB",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Web Development",
        slug: "web-development",
        description: "Modern web development practices",
        color: "#FF6B6B",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Design",
        slug: "design",
        description: "UI/UX Design and Creative Process",
        color: "#4ECDC4",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Tutorial",
        slug: "tutorial",
        description: "Step-by-step learning guides",
        color: "#45B7D1",
      },
    }),
  ]);

  console.log(`✅ Created ${tags.length} tags`);

  // Create Professional Posts
  console.log("💼 Creating professional posts...");

  const professionalContent1 =
    "Building Modern Web Applications with Next.js and Prisma\n\nIn this comprehensive guide, we'll explore how to build scalable web applications using Next.js 14 and Prisma ORM. We'll cover everything from initial setup to advanced patterns.\n\nGetting Started\nFirst, let's set up our development environment. We'll need Node.js 18 or later and your preferred package manager.\n\nDatabase Design\nA well-designed database schema is crucial for application performance and maintainability. Let's explore best practices for schema design with Prisma.\n\nAdvanced Patterns\nWe'll dive into advanced patterns like connection pooling, query optimization, type-safe API design, and error handling strategies. This foundation will serve you well in building production-ready applications.";

  const professionalPost1 = await prisma.post.create({
    data: {
      title: "Building Modern Web Applications with Next.js and Prisma",
      slug: createSlug(
        "Building Modern Web Applications with Next.js and Prisma"
      ),
      content: professionalContent1,
      excerpt:
        "Learn how to build scalable web applications using Next.js 14 and Prisma ORM with best practices and advanced patterns.",
      category: Category.PROFESSIONAL,
      status: Status.PUBLISHED,
      featured: true,
      readTime: calculateReadTime(professionalContent1),
      seoTitle: "Next.js & Prisma: Complete Guide to Modern Web Apps",
      seoDescription:
        "Comprehensive guide to building scalable web applications with Next.js 14 and Prisma ORM. Learn best practices and advanced patterns.",
      publishedAt: new Date("2024-01-15T10:00:00Z"),
      images: {
        create: [
          {
            url: "/images/nextjs-prisma-hero.jpg",
            alt: "Next.js and Prisma logos",
            caption: "Modern web development stack",
            width: 1200,
            height: 630,
            fileSize: 89600,
            mimeType: "image/jpeg",
            isFeatured: true,
            isOptimized: true,
          },
          {
            url: "/images/database-schema.jpg",
            alt: "Database schema diagram",
            caption: "Well-designed database schema example",
            width: 800,
            height: 600,
            fileSize: 124800,
            mimeType: "image/jpeg",
            isFeatured: false,
            isOptimized: true,
          },
        ],
      },
      tags: {
        create: [
          { tag: { connect: { slug: "nextjs" } } },
          { tag: { connect: { slug: "prisma" } } },
          { tag: { connect: { slug: "typescript" } } },
          { tag: { connect: { slug: "web-development" } } },
        ],
      },
    },
  });

  const professionalContent2 =
    "Advanced TypeScript Patterns for Enterprise Applications\n\nTypeScript has become the standard for large-scale JavaScript applications. In this article, we'll explore advanced patterns that will help you write more maintainable and scalable code.\n\nType System Mastery\nUnderstanding TypeScript's type system deeply is crucial for leveraging its full power. We'll cover conditional types, mapped types, and template literal types.\n\nDesign Patterns\nWe'll explore several design patterns that work exceptionally well with TypeScript: Factory Pattern, Observer Pattern, Strategy Pattern, and Decorator Pattern.\n\nError Handling\nRobust error handling is essential for enterprise applications. We'll cover result types for explicit error handling, custom error classes with proper typing, and error boundaries.";

  const professionalPost2 = await prisma.post.create({
    data: {
      title: "Advanced TypeScript Patterns for Enterprise Applications",
      slug: createSlug(
        "Advanced TypeScript Patterns for Enterprise Applications"
      ),
      content: professionalContent2,
      excerpt:
        "Master advanced TypeScript patterns and design principles for building robust enterprise applications.",
      category: Category.PROFESSIONAL,
      status: Status.PUBLISHED,
      featured: false,
      readTime: calculateReadTime(professionalContent2),
      seoTitle: "Advanced TypeScript Patterns - Enterprise Development",
      seoDescription:
        "Learn advanced TypeScript patterns and design principles for enterprise applications. Type system mastery and robust error handling.",
      publishedAt: new Date("2024-01-10T14:30:00Z"),
      images: {
        create: [
          {
            url: "/images/typescript-patterns.jpg",
            alt: "TypeScript code examples",
            caption: "Advanced TypeScript patterns in action",
            width: 1200,
            height: 630,
            fileSize: 156800,
            mimeType: "image/jpeg",
            isFeatured: true,
            isOptimized: true,
          },
        ],
      },
      tags: {
        create: [
          { tag: { connect: { slug: "typescript" } } },
          { tag: { connect: { slug: "web-development" } } },
        ],
      },
    },
  });

  // Create Artistic Posts
  console.log("🎨 Creating artistic posts...");

  const artisticContent1 =
    "The Art of Creative Problem Solving in Design\n\nCreativity isn't just about artistic expression—it's a powerful tool for solving complex problems and creating meaningful user experiences.\n\nUnderstanding Creative Process\nThe creative process follows recognizable patterns: Preparation, Incubation, Illumination, and Verification.\n\nDesign Thinking Methodology\nDesign thinking provides a structured approach to creative problem solving through empathy, definition, ideation, prototyping, and testing.\n\nVisual Hierarchy and Composition\nGood design creates clear communication through visual hierarchy using scale, contrast, alignment, proximity, and repetition.\n\nColor Psychology in Design\nColors evoke emotions and influence behavior. Understanding color psychology helps create more effective designs.";

  const artisticPost1 = await prisma.post.create({
    data: {
      title: "The Art of Creative Problem Solving in Design",
      slug: createSlug("The Art of Creative Problem Solving in Design"),
      content: artisticContent1,
      excerpt:
        "Explore how creativity serves as a powerful tool for solving complex problems and creating meaningful user experiences through design thinking.",
      category: Category.ARTISTIC,
      status: Status.PUBLISHED,
      featured: true,
      readTime: calculateReadTime(artisticContent1),
      seoTitle: "Creative Problem Solving in Design - Art Meets Function",
      seoDescription:
        "Discover the art of creative problem solving in design. Learn design thinking methodology and visual hierarchy principles.",
      publishedAt: new Date("2024-01-20T09:00:00Z"),
      images: {
        create: [
          {
            url: "/images/creative-process.jpg",
            alt: "Creative design process illustration",
            caption: "The journey from idea to implementation",
            width: 1200,
            height: 630,
            fileSize: 145600,
            mimeType: "image/jpeg",
            isFeatured: true,
            isOptimized: true,
          },
          {
            url: "/images/color-psychology.jpg",
            alt: "Color wheel and psychology",
            caption: "Understanding color impact on user emotions",
            width: 800,
            height: 600,
            fileSize: 98400,
            mimeType: "image/jpeg",
            isFeatured: false,
            isOptimized: true,
          },
        ],
      },
      tags: {
        create: [
          { tag: { connect: { slug: "design" } } },
          { tag: { connect: { slug: "web-development" } } },
        ],
      },
    },
  });

  // Create Tutorial Posts
  console.log("📚 Creating tutorial posts...");

  const tutorialContent1 =
    "Complete Guide to Setting Up a Full-Stack Development Environment\n\nSetting up a productive development environment is crucial for efficient coding. This guide will walk you through creating the perfect setup for full-stack development.\n\nPrerequisites\nBefore we begin, make sure you have a computer with at least 8GB RAM, stable internet connection, and administrator access to install software.\n\nEssential Tools\nWe'll cover Node.js and package managers, Git and version control, code editor setup, and terminal enhancement.\n\nDatabase Tools\nPostgreSQL setup and database GUI tools like TablePlus, DBeaver, and pgAdmin.\n\nDocker for Development\nDocker helps maintain consistent development environments across different machines and operating systems.";

  const tutorialPost1 = await prisma.post.create({
    data: {
      title:
        "Complete Guide to Setting Up a Full-Stack Development Environment",
      slug: createSlug(
        "Complete Guide to Setting Up a Full-Stack Development Environment"
      ),
      content: tutorialContent1,
      excerpt:
        "Step-by-step guide to setting up the perfect development environment for full-stack development with all essential tools and configurations.",
      category: Category.TUTORIAL,
      status: Status.PUBLISHED,
      featured: false,
      readTime: calculateReadTime(tutorialContent1),
      seoTitle: "Full-Stack Development Environment Setup Guide",
      seoDescription:
        "Complete guide to setting up a productive full-stack development environment. Essential tools, configurations, and productivity tips.",
      publishedAt: new Date("2024-01-25T11:00:00Z"),
      images: {
        create: [
          {
            url: "/images/dev-environment.jpg",
            alt: "Development environment setup",
            caption: "A well-configured development workspace",
            width: 1200,
            height: 630,
            fileSize: 178400,
            mimeType: "image/jpeg",
            isFeatured: true,
            isOptimized: true,
          },
        ],
      },
      tags: {
        create: [
          { tag: { connect: { slug: "tutorial" } } },
          { tag: { connect: { slug: "web-development" } } },
        ],
      },
    },
  });

  // Create Draft Posts
  console.log("📝 Creating draft posts...");

  const draftPost = await prisma.post.create({
    data: {
      title: "Future of Web Development: Trends to Watch in 2024",
      slug: createSlug("Future of Web Development: Trends to Watch in 2024"),
      content:
        "This is a draft post about upcoming web development trends. Content will be completed soon...",
      excerpt:
        "Explore the emerging trends that will shape web development in 2024 and beyond.",
      category: Category.NEWS,
      status: Status.DRAFT,
      featured: false,
      readTime: 5,
      seoTitle: "Web Development Trends 2024 - What to Expect",
      seoDescription:
        "Discover the latest web development trends for 2024. Stay ahead with emerging technologies and frameworks.",
      publishedAt: null,
      tags: {
        create: [{ tag: { connect: { slug: "web-development" } } }],
      },
    },
  });

  console.log("✅ Database seeding completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`- Created ${tags.length} tags`);
  console.log(
    `- Created ${
      [
        professionalPost1,
        professionalPost2,
        artisticPost1,
        tutorialPost1,
        draftPost,
      ].length
    } posts`
  );
  console.log(`- Professional posts: 2`);
  console.log(`- Artistic posts: 1`);
  console.log(`- Tutorial posts: 1`);
  console.log(`- Draft posts: 1`);
  console.log("\n🎉 Your database is ready to use!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
