// Articles for the Insights section. Add one object to this array to publish a new article.
// While the array is empty, /insights is hidden from Google and the nav, and left out of the sitemap.
export type Block = { h: string } | { p: string } | { ul: string[] };

export type Insight = {
  slug: string; // URL part, lowercase with hyphens: /insights/<slug>
  title: string;
  description: string; // 150 to 160 characters, shown in Google results
  date: string; // YYYY-MM-DD
  body: Block[];
};

export const insights: Insight[] = [];
