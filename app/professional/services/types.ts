export interface Service {
  id: number;
  title: string;
  category: string;
  description: string;
  features: string[];
  duration: string;
  image: string;
  popular: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}
