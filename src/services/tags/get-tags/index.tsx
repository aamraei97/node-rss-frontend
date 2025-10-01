import { useQuery } from "@tanstack/react-query";

import { QueryOptionsType } from "@/lib/rq";
import { http } from "@/services/http";
import { GetTagsRequestType, GetTagsResponseType } from "./types";

async function getTags(req: GetTagsRequestType | undefined) {
  const res = await http.get<GetTagsResponseType>("/v1/admin/tags", {
    params: req,
  });
  return res.data;
}

export function useGetTags(
  args?: QueryOptionsType<GetTagsRequestType, GetTagsResponseType>
) {
  return useQuery<GetTagsResponseType, undefined>({
    queryKey: ["get-tags", args?.params],
    queryFn: () => getTags(args?.params),
    retry: false,
    ...args?.options,
  });
}
