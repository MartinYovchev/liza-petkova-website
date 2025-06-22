import { supabase } from "./supabase";

export const imageService = {
  // Upload single image
  async uploadImage(file: any, folder = "") {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      const { data, error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;
      return filePath;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  // Upload multiple images
  async uploadImages(files: any, folder = "") {
    try {
      const uploadPromises = files.map((file: any) =>
        this.uploadImage(file, folder)
      );
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  },

  // Delete image
  async deleteImage(imagePath: any) {
    try {
      const { error } = await supabase.storage
        .from("blog-images")
        .remove([imagePath]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  },

  // Delete multiple images
  async deleteImages(imagePaths: any) {
    try {
      const { error } = await supabase.storage
        .from("blog-images")
        .remove(imagePaths);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting images:", error);
      throw error;
    }
  },

  // Get image metadata
  async getImageInfo(imagePath: any) {
    try {
      const { data, error } = await supabase.storage
        .from("blog-images")
        .list(imagePath.split("/").slice(0, -1).join("/"), {
          search: imagePath.split("/").pop(),
        });

      if (error) throw error;
      return data[0] || null;
    } catch (error) {
      console.error("Error getting image info:", error);
      throw error;
    }
  },
};
