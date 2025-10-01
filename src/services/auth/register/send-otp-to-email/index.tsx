import { MutationOptions, useMutation } from "@tanstack/react-query";

import { SendOtpToEmailRequestType, SendOtpToEmailResponseType } from "./types";

import { http } from "@/services/http";
import { AxiosResponse } from "axios";

async function sendOtpToEmail(args: SendOtpToEmailRequestType) {
  return await http.post<SendOtpToEmailResponseType>(
    `/v1/users/auth/enter-email`,
    args
  );
}

export function useSendOtpToEmail(
  options?: MutationOptions<
    AxiosResponse<SendOtpToEmailResponseType>,
    any,
    SendOtpToEmailRequestType
  >
) {
  return useMutation({
    mutationFn: (args: SendOtpToEmailRequestType) => sendOtpToEmail(args),
    ...options,
  });
}
