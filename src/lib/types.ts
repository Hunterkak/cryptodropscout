export interface Step {
  id: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: string;
  status: string;
  difficulty: string;
  reward: string;
  description: string;
  bannerImage: string;
  featured: boolean;
  websiteUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  steps: Step[];
  createdAt: number;
}