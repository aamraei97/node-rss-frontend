import { Tag } from "@/types/global";

export type GetTagsRequestType = {
  page: number;
  limit: number;
};

export type GetTagsResponseType = {
  result: Tag[];
  total_page: number;
  current_page: number;
};
