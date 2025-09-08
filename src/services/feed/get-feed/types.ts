import { Feed } from "@/types/global";

export type GetFeedRequestType = {
  page: number;
  limit: number;
};

export type GetFeedResponseType = {
  results: Feed[];
  total_page: number;
  current_page: number;
};
