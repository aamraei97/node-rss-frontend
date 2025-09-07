import { MutationOptions, useMutation } from "@tanstack/react-query";

import { PopulateFeedRequestType, PopulateFeedResponseType } from "./types";

import { http } from "@/services/http";
import { AxiosResponse } from "axios";

async function populateFeed(args: PopulateFeedRequestType) {
  return await http.post<PopulateFeedResponseType>(
    `/v1/panel/feed/${args.sourceId}/populate`
  );
}

export function usePopulateFeed(
  options?: MutationOptions<
    AxiosResponse<PopulateFeedResponseType>,
    any,
    PopulateFeedRequestType
  >
) {
  return useMutation({
    mutationFn: (args: PopulateFeedRequestType) => populateFeed(args),
    ...options,
  });
}
