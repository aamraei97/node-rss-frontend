import { MutationOptions, useMutation } from "@tanstack/react-query";

import {
  IncreaseReadCountRequestType,
  IncreaseReadCountResponseType,
} from "./types";

import { http } from "@/services/http";
import { AxiosResponse } from "axios";

async function increaseReadCount(args: IncreaseReadCountRequestType) {
  return await http.patch<IncreaseReadCountResponseType>(
    `/v1/panel/feed/${args.feedId}/increase-read-count`,
    args
  );
}

export function useIncreaseReadCount(
  options?: MutationOptions<
    AxiosResponse<IncreaseReadCountResponseType>,
    any,
    IncreaseReadCountRequestType
  >
) {
  return useMutation({
    mutationFn: (args: IncreaseReadCountRequestType) => increaseReadCount(args),
    ...options,
  });
}
