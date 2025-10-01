import { Source } from "@/types/global";

export type GetSourcesRequestType = {
  page: number;
  limit: number;
};

export type GetSourcesResponseType = {
  result: Source[];
  total_page: number;
  current_page: number;
};
