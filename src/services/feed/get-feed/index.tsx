import { useQuery } from "@tanstack/react-query";

import { QueryOptionsType } from "@/lib/rq";
import { http } from "@/services/http";
import { GetFeedRequestType, GetFeedResponseType } from "./types";

async function getFeed(req: GetFeedRequestType | undefined) {
  const res = await http.get<GetFeedResponseType>("/v1/panel/feed", {
    params: req,
  });
  return res.data;
}

export function useGetFeed(
  args?: QueryOptionsType<GetFeedRequestType, GetFeedResponseType>
) {
  return useQuery<GetFeedResponseType, undefined>({
    queryKey: ["get-feed", args?.params],
    queryFn: () => getFeed(args?.params),
    retry: false,
    ...args?.options,
  });
}
