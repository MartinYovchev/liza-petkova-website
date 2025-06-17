interface ProjectImage {
  url: string;
  description: string;
}

interface Project {
  title: string;
  status: string;
  completion: number;
  description: string;
  images?: ProjectImage[];
}

export const projects: Project[] = [
  {
    title: "Digital Art Series",
    status: "In Progress",
    completion: 75,
    description:
      "A collection of digital artworks exploring abstract concepts and emotions",
    images: [
      {
        url: "/images/digital-art-1.jpg",
        description:
          "Abstract composition exploring the relationship between form and color",
      },
      {
        url: "/images/digital-art-2.jpg",
        description: "Digital landscape merging reality with imagination",
      },
    ],
  },
  {
    title: "Photography Exhibition",
    status: "Planning",
    completion: 30,
    description:
      "Curating a series of photographs capturing urban life and architecture",
    images: [
      {
        url: "/images/photo-1.jpg",
        description: "Urban architecture study focusing on geometric patterns",
      },
    ],
  },
  {
    title: "Sculpture Project",
    status: "Completed",
    completion: 100,
    description:
      "Interactive sculpture installation exploring human connection",
    images: [
      {
        url: "/images/sculpture-1.jpg",
        description: "Final installation view showing the interactive elements",
      },
      {
        url: "/images/sculpture-2.jpg",
        description: "Detail shot of the main interactive component",
      },
    ],
  },
];
