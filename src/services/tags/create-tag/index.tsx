import { MutationOptions, useMutation } from "@tanstack/react-query";

import { CreateTagRequestType, CreateTagResponseType } from "./types";

import { http } from "@/services/http";
import { AxiosResponse } from "axios";

async function createTag(args: CreateTagRequestType) {
  return await http.post<CreateTagResponseType>(`/v1/panel/tags`, args);
}

export function useCreateTag(
  options?: MutationOptions<
    AxiosResponse<CreateTagResponseType>,
    any,
    CreateTagRequestType
  >
) {
  return useMutation({
    mutationFn: (args: CreateTagRequestType) => createTag(args),
    ...options,
  });
}
