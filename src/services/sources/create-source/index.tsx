import { MutationOptions, useMutation } from "@tanstack/react-query";

import { CreateSourceRequestType, CreateSourceResponseType } from "./types";

import { http } from "@/services/http";
import { AxiosResponse } from "axios";

async function createSource(args: CreateSourceRequestType) {
  return await http.post<CreateSourceResponseType>(`/v1/panel/sources`, args);
}

export function useCreateSource(
  options?: MutationOptions<
    AxiosResponse<CreateSourceResponseType>,
    any,
    CreateSourceRequestType
  >
) {
  return useMutation({
    mutationFn: (args: CreateSourceRequestType) => createSource(args),
    ...options,
  });
}
