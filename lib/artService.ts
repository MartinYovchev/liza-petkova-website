import { supabase } from './supabase';

export interface ArtProject {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  completion: number;
  created_at: string;
  updated_at: string;
  images?: ArtProjectImage[];
}

export interface ArtProjectImage {
  id: string;
  project_id: string;
  url: string;
  description: string;
  upload_order: number;
  created_at: string;
}

export interface ArtProjectStats {
  total: number;
  planning: number;
  in_progress: number;
  completed: number;
  on_hold: number;
}

// Helper function to get art project image URL (following your pattern)
export const getArtImageUrl = (imagePath: string | null): string | null => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}art-projects/${imagePath}`;
};

class ArtProjectService {
  async getAllProjects(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const {
      data: projects,
      error,
      count,
    } = await supabase
      .from('art_projects')
      .select(
        `
        *,
        images:art_project_images(*)
      `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      projects: projects || [],
      totalCount: count || 0,
    };
  }

  async getProject(id: string) {
    const { data, error } = await supabase
      .from('art_projects')
      .select(
        `
        *,
        images:art_project_images(*)
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createProject(
    project: Omit<ArtProject, 'id' | 'created_at' | 'updated_at'>
  ) {
    const { data, error } = await supabase
      .from('art_projects')
      .insert([project])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateProject(id: string, updates: Partial<ArtProject>) {
    const { data, error } = await supabase
      .from('art_projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteProject(id: string) {
    const { error } = await supabase.from('art_projects').delete().eq('id', id);

    if (error) throw error;
  }

  async addProjectImage(
    projectId: string,
    imageData: {
      url: string;
      description: string;
      upload_order?: number;
    }
  ) {
    const { data, error } = await supabase
      .from('art_project_images')
      .insert([
        {
          project_id: projectId,
          ...imageData,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteProjectImage(imageId: string) {
    const { error } = await supabase
      .from('art_project_images')
      .delete()
      .eq('id', imageId);

    if (error) throw error;
  }

  async uploadImage(file: File, projectId: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${projectId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('art-projects')
      .upload(fileName, file);

    if (error) throw error;

    // Return the full public URL using your pattern
    return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}art-projects/${fileName}`;
  }

  async getStats(): Promise<ArtProjectStats> {
    const { data, error } = await supabase
      .from('art_projects')
      .select('status');

    if (error) throw error;

    const stats = {
      total: data.length,
      planning: data.filter(p => p.status === 'planning').length,
      in_progress: data.filter(p => p.status === 'in_progress').length,
      completed: data.filter(p => p.status === 'completed').length,
      on_hold: data.filter(p => p.status === 'on_hold').length,
    };

    return stats;
  }
}

export const artProjectService = new ArtProjectService();
