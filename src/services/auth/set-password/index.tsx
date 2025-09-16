import { MutationOptions, useMutation } from "@tanstack/react-query";

import { SetPasswordRequestType, SetPasswordResponseType } from "./types";

import { http } from "@/services/http";
import { AxiosResponse } from "axios";

async function setPassword(args: SetPasswordRequestType) {
  return await http.post<SetPasswordResponseType>(
    `/v1/users/auth/set-password`,
    args
  );
}

export function useSetPassword(
  options?: MutationOptions<
    AxiosResponse<SetPasswordResponseType>,
    any,
    SetPasswordRequestType
  >
) {
  return useMutation({
    mutationFn: (args: SetPasswordRequestType) => setPassword(args),
    ...options,
  });
}
