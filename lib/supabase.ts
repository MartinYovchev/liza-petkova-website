import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to get public URL for uploaded images
export const getImageUrl = (imagePath: string | null): string | null => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}blog-images/${imagePath}`;
};

// Helper function to get file URL
export const getFileUrl = (
  filePath: string | null,
  bucket: string = 'blog-files'
): string | null => {
  if (!filePath) return null;
  if (filePath.startsWith('http')) return filePath;
  return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${bucket}/${filePath}`;
};
