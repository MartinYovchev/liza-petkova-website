// types/index.ts
export type Image = {
  id: number;
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
  isFeatured: boolean;
  isOptimized: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  postId: number;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type PostTag = {
  postId: number;
  tagId: number;
  tag: Tag;
  createdAt: string | Date;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: "PROFESSIONAL" | "ARTISTIC" | "PERSONAL" | "TUTORIAL" | "NEWS";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED";
  featured: boolean;
  viewCount: number;
  readTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  images: Image[];
  tags: PostTag[];
};

export type PostFormData = {
  title: string;
  content: string;
  excerpt?: string;
  category: "PROFESSIONAL" | "ARTISTIC" | "PERSONAL" | "TUTORIAL" | "NEWS";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED";
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  images: {
    url: string;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
    fileSize?: number;
    mimeType?: string;
    isFeatured: boolean;
    isOptimized?: boolean;
  }[];
  tags: string[]; // Array of tag slugs
};

// Category and Status options for forms
export const CATEGORIES = [
  { value: "PROFESSIONAL", label: "Professional" },
  { value: "ARTISTIC", label: "Artistic" },
  { value: "PERSONAL", label: "Personal" },
  { value: "TUTORIAL", label: "Tutorial" },
  { value: "NEWS", label: "News" },
] as const;

export const STATUSES = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
  { value: "SCHEDULED", label: "Scheduled" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];
export type Status = (typeof STATUSES)[number]["value"];
