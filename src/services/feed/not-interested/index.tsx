import { MutationOptions, useMutation } from "@tanstack/react-query";

import { NotInterestedRequestType, NotInterestedResponseType } from "./types";

import { http } from "@/services/http";
import { AxiosResponse } from "axios";

async function notInterested(args: NotInterestedRequestType) {
  return await http.patch<NotInterestedResponseType>(
    `/v1/panel/feed/${args.feedId}/not-interested`,
    args
  );
}

export function useNotInterested(
  options?: MutationOptions<
    AxiosResponse<NotInterestedResponseType>,
    any,
    NotInterestedRequestType
  >
) {
  return useMutation({
    mutationFn: (args: NotInterestedRequestType) => notInterested(args),
    ...options,
  });
}
