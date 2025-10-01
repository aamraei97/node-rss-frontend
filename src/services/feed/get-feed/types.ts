import { Feed } from "@/types/global";

export type GetFeedRequestType = {
  page: number;
  limit: number;
  sourceId?: string;
  tagId?: string;
};

export type GetFeedResponseType = {
  data: Feed[];
  totalCount: number;
};
