import { MutationOptions, useMutation } from "@tanstack/react-query";

import { LoginRequestType, LoginResponseType } from "./types";

import { http } from "@/services/http";
import { AxiosResponse } from "axios";

async function login(args: LoginRequestType) {
  return await http.post<LoginResponseType>(`/v1/users/auth/login`, args);
}

export function useLogin(
  options?: MutationOptions<
    AxiosResponse<LoginResponseType>,
    any,
    LoginRequestType
  >
) {
  return useMutation({
    mutationFn: (args: LoginRequestType) => login(args),
    ...options,
  });
}
