export interface Post {
  slug: string;
  title: string;
  mainImage: unknown;
  author: {
    name: string;
    image: unknown;
  };
  categories: string[];
  publishedAt: string;
  description: string;
}
