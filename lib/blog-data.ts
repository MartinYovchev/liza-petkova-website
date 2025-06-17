import type { BlogPost } from "./blog-storage"

export const samplePosts: Omit<BlogPost, "id" | "publishedAt" | "updatedAt" | "slug">[] = [
  {
    title: "Advanced GIS Techniques for Modern Surveying",
    content: `
      <h2>Introduction to Modern GIS</h2>
      <p>Geographic Information Systems (GIS) have revolutionized the way we approach surveying and mapping. In this comprehensive guide, we'll explore the latest techniques and technologies that are shaping the future of geodetic sciences.</p>
      
      <h3>Key Technologies</h3>
      <ul>
        <li>Real-time kinematic (RTK) positioning</li>
        <li>LiDAR integration</li>
        <li>Drone-based surveying</li>
        <li>Machine learning applications</li>
      </ul>
      
      <h3>Best Practices</h3>
      <p>When implementing GIS solutions, it's crucial to consider data accuracy, processing efficiency, and integration capabilities. Our team has developed proven methodologies that ensure reliable results across various project scales.</p>
      
      <h3>Future Outlook</h3>
      <p>The integration of artificial intelligence and IoT devices promises to further enhance the precision and efficiency of surveying operations. Stay ahead of the curve by adopting these emerging technologies.</p>
    `,
    excerpt:
      "Discover the latest GIS techniques and technologies that are transforming modern surveying practices. Learn about RTK positioning, LiDAR integration, and AI applications.",
    category: "professional",
    author: "Dr. Maria Petrova",
    featuredImage: undefined,
    images: [],
    published: true,
  },
  {
    title: "Unlocking Your Creative Potential: A Journey of Self-Discovery",
    content: `
      <h2>The Creative Journey Begins</h2>
      <p>Creativity is not a talent reserved for the chosen few—it's a birthright that belongs to every human being. Through my years of coaching and personal artistic exploration, I've witnessed countless individuals rediscover their creative spark.</p>
      
      <h3>Breaking Through Creative Blocks</h3>
      <p>Creative blocks are often symptoms of deeper fears and limiting beliefs. By addressing these root causes, we can unlock new levels of artistic expression and personal fulfillment.</p>
      
      <h3>Daily Practices for Creative Growth</h3>
      <ul>
        <li>Morning pages and journaling</li>
        <li>Mindful observation exercises</li>
        <li>Experimental art sessions</li>
        <li>Nature connection rituals</li>
      </ul>
      
      <h3>The Transformation Process</h3>
      <p>True creative awakening is a gradual process that requires patience, self-compassion, and consistent practice. Each small step forward builds momentum toward profound personal transformation.</p>
    `,
    excerpt:
      "Embark on a transformative journey to unlock your creative potential. Learn practical techniques to overcome blocks and cultivate a thriving artistic practice.",
    category: "artistic",
    author: "Elena Dimitrova",
    featuredImage: undefined,
    images: [],
    published: true,
  },
  {
    title: "Precision Mapping with Drone Technology",
    content: `
      <h2>The Drone Revolution in Surveying</h2>
      <p>Unmanned aerial vehicles (UAVs) have become indispensable tools in modern surveying operations. Their ability to capture high-resolution imagery and precise measurements has transformed how we approach mapping projects.</p>
      
      <h3>Technical Specifications</h3>
      <p>Modern surveying drones are equipped with advanced sensors including RGB cameras, multispectral sensors, and LiDAR systems. These technologies enable centimeter-level accuracy in mapping applications.</p>
      
      <h3>Workflow Optimization</h3>
      <p>Successful drone surveying requires careful planning, from flight path optimization to ground control point placement. Our proven workflows ensure maximum efficiency and data quality.</p>
      
      <h3>Regulatory Compliance</h3>
      <p>Operating drones for commercial surveying requires adherence to aviation regulations and safety protocols. We maintain all necessary certifications and follow best practices for safe operations.</p>
    `,
    excerpt:
      "Explore how drone technology is revolutionizing precision mapping and surveying. Learn about technical specifications, workflows, and regulatory requirements.",
    category: "professional",
    author: "Eng. Dimitar Georgiev",
    featuredImage: undefined,
    images: [],
    published: true,
  },
  {
    title: "The Art of Mindful Creation",
    content: `
      <h2>Mindfulness Meets Creativity</h2>
      <p>In our fast-paced world, the practice of mindful creation offers a sanctuary for the soul. By bringing full awareness to the creative process, we can access deeper levels of inspiration and authentic expression.</p>
      
      <h3>Present Moment Awareness</h3>
      <p>True creativity emerges when we release attachment to outcomes and immerse ourselves fully in the present moment. This state of flow allows for spontaneous and authentic artistic expression.</p>
      
      <h3>Meditation and Art</h3>
      <p>Regular meditation practice enhances our capacity for sustained attention and emotional regulation—essential qualities for any creative endeavor. Even five minutes of daily meditation can significantly impact your artistic practice.</p>
      
      <h3>Creating Sacred Space</h3>
      <p>Establishing a dedicated creative space, no matter how small, signals to your subconscious mind that creativity is valued and prioritized in your life.</p>
    `,
    excerpt:
      "Discover how mindfulness practices can deepen your creative expression and bring greater fulfillment to your artistic journey.",
    category: "artistic",
    author: "Elena Dimitrova",
    featuredImage: undefined,
    images: [],
    published: true,
  },
  {
    title: "Digital Transformation in Construction Surveying",
    content: `
      <h2>Embracing Digital Innovation</h2>
      <p>The construction industry is undergoing a digital transformation, and surveying is at the forefront of this revolution. From Building Information Modeling (BIM) to augmented reality applications, technology is reshaping how we approach construction projects.</p>
      
      <h3>BIM Integration</h3>
      <p>Building Information Modeling has become the standard for modern construction projects. Our surveying data seamlessly integrates with BIM workflows, providing accurate as-built documentation and progress monitoring.</p>
      
      <h3>Real-time Monitoring</h3>
      <p>IoT sensors and automated monitoring systems enable continuous tracking of construction progress and structural health. This real-time data helps prevent costly delays and ensures quality control.</p>
      
      <h3>Future Technologies</h3>
      <p>Emerging technologies like augmented reality and machine learning promise to further streamline construction surveying processes and improve project outcomes.</p>
    `,
    excerpt:
      "Learn how digital transformation is revolutionizing construction surveying through BIM integration, real-time monitoring, and emerging technologies.",
    category: "professional",
    author: "Dr. Maria Petrova",
    featuredImage: undefined,
    images: [],
    published: true,
  },
  {
    title: "Finding Your Authentic Voice Through Art",
    content: `
      <h2>The Quest for Authenticity</h2>
      <p>Every artist's journey is ultimately about discovering and expressing their unique voice. This process requires courage, vulnerability, and a willingness to explore the depths of one's inner landscape.</p>
      
      <h3>Beyond Technique</h3>
      <p>While technical skills are important, true artistic mastery comes from the ability to convey genuine emotion and personal truth through your chosen medium. Technique serves expression, not the other way around.</p>
      
      <h3>Embracing Imperfection</h3>
      <p>Perfectionism is the enemy of creativity. By embracing imperfection and viewing "mistakes" as opportunities for discovery, we open ourselves to unexpected breakthroughs and authentic expression.</p>
      
      <h3>The Courage to Be Seen</h3>
      <p>Sharing your art with the world requires tremendous courage. Remember that your unique perspective and experience have value, and there are people who need to hear your voice.</p>
    `,
    excerpt:
      "Explore the journey of finding your authentic artistic voice and the courage required to share your unique creative expression with the world.",
    category: "artistic",
    author: "Elena Dimitrova",
    featuredImage: undefined,
    images: [],
    published: true,
  },
]

export function initializeBlogData() {
  // This function can be called to ensure sample data exists
  // The actual initialization happens in the BlogContent component
}
