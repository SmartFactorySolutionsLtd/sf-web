export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  imageUrl: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
