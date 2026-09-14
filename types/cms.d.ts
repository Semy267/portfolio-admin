declare interface ICmsProfile {
  id: string;
  name: string;
  headline: string;
  bio: string;
  profileImageId?: string | null;
  email: string;
  location?: string | null;
  updatedAt?: string;
}

declare interface ICmsTechnology {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  category: string;
  sortOrder: number;
  _count?: { projects: number };
}

declare interface ICmsSkill {
  id: string;
  name: string;
  category: string;
  icon?: string | null;
  sortOrder: number;
  visible: boolean;
}

declare interface ICmsExperience {
  id: string;
  title: string;
  organization: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  sortOrder: number;
  visible: boolean;
}

declare interface ICmsSocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon?: string | null;
  sortOrder: number;
  visible: boolean;
}

declare interface ICmsProject {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content?: string | null;
  category: string;
  year: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured: boolean;
  sortOrder: number;
  thumbnailId?: string | null;
  thumbnail?: ICmsMedia | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  technologies?: {
    projectId: string;
    technologyId: string;
    sortOrder: number;
    technology: ICmsTechnology;
  }[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

declare interface ICmsMedia {
  id: string;
  filename: string;
  url: string;
  altText?: string | null;
  mimeType: string;
  size: number;
  width?: number | null;
  height?: number | null;
  createdAt: string;
}

declare interface ICmsProjectListResponse {
  items: ICmsProject[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
