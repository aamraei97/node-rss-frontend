import { MutationOptions, useMutation } from "@tanstack/react-query";

import { VerifyOtpRequestType, VerifyOtpResponseType } from "./types";

import { http } from "@/services/http";
import { AxiosResponse } from "axios";

async function verifyOtp(args: VerifyOtpRequestType) {
  return await http.post<VerifyOtpResponseType>(
    `/v1/users/auth/verify-otp`,
    args
  );
}

export function useVerifyOtp(
  options?: MutationOptions<
    AxiosResponse<VerifyOtpResponseType>,
    any,
    VerifyOtpRequestType
  >
) {
  return useMutation({
    mutationFn: (args: VerifyOtpRequestType) => verifyOtp(args),
    ...options,
  });
}
