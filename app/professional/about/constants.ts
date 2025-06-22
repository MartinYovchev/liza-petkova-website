import { TeamMember, Certification, TimelineEvent, Equipment } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Dr. Michael Thompson',
    role: 'Chief Surveyor & Founder',
    credentials: 'PLS, PE, PhD',
    experience: '25+ years',
    image: '/placeholder.svg?height=300&width=300',
    bio: 'Leading expert in geodetic surveying with extensive experience in large-scale infrastructure projects.',
  },
  {
    name: 'Sarah Chen',
    role: 'GIS Director',
    credentials: 'GISP, MS',
    experience: '15+ years',
    image: '/placeholder.svg?height=300&width=300',
    bio: 'Specializes in spatial analysis and custom GIS solutions for municipal and commercial clients.',
  },
  {
    name: 'Robert Martinez',
    role: '3D Scanning Specialist',
    credentials: 'PLS, Certified Laser Scanning',
    experience: '12+ years',
    image: '/placeholder.svg?height=300&width=300',
    bio: 'Expert in cutting-edge 3D laser scanning technology and point cloud processing.',
  },
  {
    name: 'Jennifer Walsh',
    role: 'Project Manager',
    credentials: 'PMP, BS Surveying',
    experience: '18+ years',
    image: '/placeholder.svg?height=300&width=300',
    bio: 'Ensures seamless project delivery and maintains our high standards of client satisfaction.',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'ISO 9001:2015',
    description: 'Quality Management System',
    icon: '🏆',
  },
  {
    name: 'ISO 14001:2015',
    description: 'Environmental Management',
    icon: '🌱',
  },
  {
    name: 'NSPS Member',
    description: 'National Society of Professional Surveyors',
    icon: '📐',
  },
  {
    name: 'ASPRS Member',
    description: 'American Society for Photogrammetry',
    icon: '🛰️',
  },
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2008',
    title: 'Company Founded',
    description:
      'Started with a vision to provide precision surveying services',
  },
  {
    year: '2012',
    title: '3D Technology Integration',
    description: 'Invested in cutting-edge laser scanning equipment',
  },
  {
    year: '2016',
    title: 'GIS Division Launch',
    description: 'Expanded services to include comprehensive GIS solutions',
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description:
      'Implemented cloud-based workflows and remote collaboration tools',
  },
  {
    year: '2024',
    title: 'AI Integration',
    description: 'Pioneering AI-assisted data processing and analysis',
  },
];

export const EQUIPMENT: Equipment[] = [
  {
    icon: '📡',
    title: 'Leica ScanStation P50',
    description: 'Ultra-high speed 3D laser scanner with millimeter precision',
  },
  {
    icon: '🛰️',
    title: 'Trimble R12i GNSS',
    description: 'Advanced GNSS receiver with integrated IMU technology',
  },
  {
    icon: '📐',
    title: 'Leica TS16 Total Station',
    description:
      'Self-learning total station with automatic target recognition',
  },
  {
    icon: '🚁',
    title: 'DJI Phantom 4 RTK',
    description: 'Professional drone with real-time kinematic positioning',
  },
];
