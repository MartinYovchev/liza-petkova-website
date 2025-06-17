export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  experience: string;
  image: string;
  bio: string;
}

export interface Certification {
  name: string;
  description: string;
  icon: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Equipment {
  icon: string;
  title: string;
  description: string;
}
