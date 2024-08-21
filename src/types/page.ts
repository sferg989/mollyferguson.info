export type HeroImage = {
  id: string;
  url: string;
  alt: string;
  mimeType: "video/mp4" | "image/jpeg" | "image/png";
};

export type Page = {
  title: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  heroImage: HeroImage;
  body: {
    text: string;
  };
};

export type Pages = {
  pages: Page[];
};