export const categories = [
  { id: "all", name: "All Services", count: 24 },
  { id: "surveying", name: "Land Surveying", count: 8 },
  { id: "mapping", name: "Mapping & GIS", count: 6 },
  { id: "construction", name: "Construction Support", count: 5 },
  { id: "legal", name: "Legal & Cadastral", count: 5 },
];

export const services = [
  {
    id: 1,
    title: "Boundary Surveys",
    category: "surveying",
    description:
      "Precise property boundary determination for legal and development purposes",
    features: [
      "Property line identification",
      "Corner monumentation",
      "Legal descriptions",
      "Dispute resolution",
    ],
    duration: "3-5 business days",
    image: "/placeholder.svg?height=200&width=300",
    popular: true,
  },
  {
    id: 2,
    title: "Topographic Surveys",
    category: "surveying",
    description:
      "Detailed terrain mapping for engineering and architectural design",
    features: [
      "Elevation mapping",
      "Contour generation",
      "Feature identification",
      "CAD deliverables",
    ],
    duration: "5-7 business days",
    image: "/placeholder.svg?height=200&width=300",
    popular: false,
  },
  {
    id: 3,
    title: "3D Laser Scanning",
    category: "mapping",
    description:
      "High-precision 3D documentation of buildings and infrastructure",
    features: [
      "Point cloud generation",
      "3D modeling",
      "As-built documentation",
      "Virtual reality tours",
    ],
    duration: "7-10 business days",
    image: "/placeholder.svg?height=200&width=300",
    popular: true,
  },
  {
    id: 4,
    title: "Construction Layout",
    category: "construction",
    description:
      "Precise positioning of structures and utilities during construction",
    features: [
      "Foundation layout",
      "Utility marking",
      "Grade verification",
      "Progress monitoring",
    ],
    duration: "1-2 business days",
    image: "/placeholder.svg?height=200&width=300",
    popular: false,
  },
  {
    id: 5,
    title: "ALTA/NSPS Surveys",
    category: "legal",
    description:
      "Comprehensive surveys meeting ALTA/NSPS standards for commercial properties",
    features: [
      "Title commitment review",
      "Easement identification",
      "Improvement location",
      "Zoning compliance",
    ],
    duration: "10-14 business days",
    image: "/placeholder.svg?height=200&width=300",
    popular: true,
  },
  {
    id: 6,
    title: "GIS Mapping Services",
    category: "mapping",
    description: "Custom geographic information systems and spatial analysis",
    features: [
      "Database development",
      "Spatial analysis",
      "Web mapping",
      "Data visualization",
    ],
    duration: "5-10 business days",
    image: "/placeholder.svg?height=200&width=300",
    popular: false,
  },
  {
    id: 7,
    title: "Subdivision Platting",
    category: "legal",
    description: "Complete subdivision design and platting services",
    features: [
      "Lot layout design",
      "Utility planning",
      "Regulatory compliance",
      "Plat preparation",
    ],
    duration: "14-21 business days",
    image: "/placeholder.svg?height=200&width=300",
    popular: false,
  },
  {
    id: 8,
    title: "Elevation Certificates",
    category: "legal",
    description: "FEMA flood zone documentation for insurance purposes",
    features: [
      "Flood zone determination",
      "Lowest floor elevation",
      "FEMA compliance",
      "Insurance support",
    ],
    duration: "2-3 business days",
    image: "/placeholder.svg?height=200&width=300",
    popular: true,
  },
];

export const processSteps = [
  {
    number: 1,
    title: "Initial Consultation",
    description:
      "We discuss your project requirements and provide expert recommendations",
  },
  {
    number: 2,
    title: "Site Assessment",
    description:
      "Our team conducts a thorough evaluation of the project site and conditions",
  },
  {
    number: 3,
    title: "Data Collection",
    description:
      "Using state-of-the-art equipment, we gather precise measurements and data",
  },
  {
    number: 4,
    title: "Analysis & Processing",
    description:
      "Our experts analyze the data and create detailed reports and drawings",
  },
  {
    number: 5,
    title: "Delivery",
    description:
      "Final deliverables are provided in your preferred format with full documentation",
  },
];
