import { supabase } from './supabase';

export interface ImageUploadResult {
  path: string;
  url: string;
}

export class ImageService {
  // Upload single image
  static async uploadImage(file: File, folder: string = ''): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;
      return filePath;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Upload multiple images
  static async uploadImages(
    files: File[],
    folder: string = ''
  ): Promise<string[]> {
    try {
      const uploadPromises = files.map(file => this.uploadImage(file, folder));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }

  // Delete image
  static async deleteImage(imagePath: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from('blog-images')
        .remove([imagePath]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  // Delete multiple images
  static async deleteImages(imagePaths: string[]): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from('blog-images')
        .remove(imagePaths);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting images:', error);
      throw error;
    }
  }

  // Get image metadata
  static async getImageInfo(imagePath: string): Promise<any> {
    try {
      const pathParts = imagePath.split('/');
      const fileName = pathParts.pop();
      const folderPath = pathParts.join('/');

      const { data, error } = await supabase.storage
        .from('blog-images')
        .list(folderPath, {
          search: fileName,
        });

      if (error) throw error;
      return data?.[0] || null;
    } catch (error) {
      console.error('Error getting image info:', error);
      throw error;
    }
  }
}

export const imageService = ImageService;
