import { useQuery } from "@tanstack/react-query";

import { QueryOptionsType } from "@/lib/rq";
import { http } from "@/services/http";
import { GetSourcesRequestType, GetSourcesResponseType } from "./types";

async function getSources(req: GetSourcesRequestType | undefined) {
  const res = await http.get<GetSourcesResponseType>("/v1/panel/sources", {
    params: req,
  });
  return res.data;
}

export function useGetSources(
  args?: QueryOptionsType<GetSourcesRequestType, GetSourcesResponseType>
) {
  return useQuery<GetSourcesResponseType, undefined>({
    queryKey: ["get-sources", args?.params],
    queryFn: () => getSources(args?.params),
    retry: false,
    ...args?.options,
  });
}
