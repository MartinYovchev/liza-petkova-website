export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  category: "professional" | "artistic"
  author: string
  publishedAt: string
  updatedAt: string
  featuredImage?: string
  images: string[]
  slug: string
  published: boolean
}

export interface AdminUser {
  email: string
  password: string
  name: string
}

class BlogStorage {
  private readonly POSTS_KEY = "blog_posts"
  private readonly ADMIN_KEY = "blog_admin"
  private readonly SESSION_KEY = "blog_session"

  // Initialize with default admin user
  constructor() {
    if (typeof window !== "undefined") {
      const existingAdmin = localStorage.getItem(this.ADMIN_KEY)
      if (!existingAdmin) {
        const defaultAdmin: AdminUser = {
          email: "admin@example.com",
          password: "admin123",
          name: "Admin User",
        }
        localStorage.setItem(this.ADMIN_KEY, JSON.stringify(defaultAdmin))
      }
    }
  }

  // Auth methods
  login(email: string, password: string): boolean {
    if (typeof window === "undefined") return false

    const adminData = localStorage.getItem(this.ADMIN_KEY)
    if (!adminData) return false

    const admin: AdminUser = JSON.parse(adminData)
    if (admin.email === email && admin.password === password) {
      const session = {
        email: admin.email,
        name: admin.name,
        loginTime: new Date().toISOString(),
      }
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
      return true
    }
    return false
  }

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.SESSION_KEY)
    }
  }

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
    return !!localStorage.getItem(this.SESSION_KEY)
  }

  getSession() {
    if (typeof window === "undefined") return null
    const session = localStorage.getItem(this.SESSION_KEY)
    return session ? JSON.parse(session) : null
  }

  // Blog post methods
  getAllPosts(): BlogPost[] {
    if (typeof window === "undefined") return []

    const posts = localStorage.getItem(this.POSTS_KEY)
    return posts ? JSON.parse(posts) : []
  }

  getPublishedPosts(category?: "professional" | "artistic"): BlogPost[] {
    const allPosts = this.getAllPosts()
    let filteredPosts = allPosts.filter((post) => post.published)

    if (category) {
      filteredPosts = filteredPosts.filter((post) => post.category === category)
    }

    return filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }

  getPostBySlug(slug: string): BlogPost | null {
    const posts = this.getAllPosts()
    return posts.find((post) => post.slug === slug) || null
  }

  savePost(post: Omit<BlogPost, "id" | "publishedAt" | "updatedAt" | "slug">): BlogPost {
    const posts = this.getAllPosts()
    const now = new Date().toISOString()
    const slug = this.generateSlug(post.title)

    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      publishedAt: now,
      updatedAt: now,
      slug,
    }

    posts.push(newPost)
    localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts))
    return newPost
  }

  updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = this.getAllPosts()
    const index = posts.findIndex((post) => post.id === id)

    if (index === -1) return null

    posts[index] = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts))
    return posts[index]
  }

  deletePost(id: string): boolean {
    const posts = this.getAllPosts()
    const filteredPosts = posts.filter((post) => post.id !== id)

    if (filteredPosts.length === posts.length) return false

    localStorage.setItem(this.POSTS_KEY, JSON.stringify(filteredPosts))
    return true
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  // Image storage (base64 for simplicity)
  saveImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        const imageId = `img_${Date.now()}`
        const images = this.getImages()
        images[imageId] = base64
        localStorage.setItem("blog_images", JSON.stringify(images))
        resolve(imageId)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  getImage(imageId: string): string | null {
    const images = this.getImages()
    return images[imageId] || null
  }

  private getImages(): Record<string, string> {
    if (typeof window === "undefined") return {}
    const images = localStorage.getItem("blog_images")
    return images ? JSON.parse(images) : {}
  }
}

export const blogStorage = new BlogStorage()
