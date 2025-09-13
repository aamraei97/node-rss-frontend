export type Feed = {
  _id: string;
  link: string;
  title: string;
  publishedAt: string;
  source: Source;
  readCount: number;
};
export type Source = {
  _id: string;
  name: string;
  favicon: string;
  lastCrawl: string;
  link: string;
  sourceCredibility: "low" | "medium" | "high" | "very-high";
};
export type Tag = {
  _id: string;
  name: string;
};