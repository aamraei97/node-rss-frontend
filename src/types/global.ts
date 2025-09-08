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
};
