export interface ContentFrontmatter {
  title: string;
  summary?: string;
  publishedAt?: string;
  category?: string;
  tags?: string[];
  readTime?: string;
  author?: string;
  [key: string]: string | string[] | undefined;
}

export interface ContentDocument<T extends ContentFrontmatter = ContentFrontmatter> {
  slug: string;
  frontmatter: T;
  body: string;
}
