export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'archived';
  tags?: string[];
  images?: string[];
  cover_image?: string;
  meta_title?: string;
  meta_description?: string;
  author_name?: string;
  author_email?: string;
  featured: boolean;
  view_count: number;
  reading_time?: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
};

export type BlogPostFormData = {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'archived';
  tags: string;
  meta_title?: string;
  meta_description?: string;
  author_name?: string;
  author_email?: string;
  featured: boolean;
};

export type PaginatedResponse<T> = {
  posts: T[];
  totalCount: number;
};

export type BlogStats = {
  total: number;
  published: number;
  drafts: number;
  archived: number;
};

export type ImageUploadProps = {
  images?: File[];
  onImagesChange: (images: File[], existingImages?: string[]) => void;
  maxImages?: number;
  existingImages?: string[];
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupCredentials = LoginCredentials & {
  name: string;
  inviteCode: string;
};

export type Session = {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
};
