// types/index.ts
export type Image = {
  id: number;
  url: string;
  isFeatured: boolean;
  postId: number;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string | Date;
  category: string;
  published: boolean;
  images: Image[];
};

export type PostFormData = {
  title: string;
  content: string;
  category: string;
  published: boolean;
  images: Omit<Image, "id" | "postId">[];
};
