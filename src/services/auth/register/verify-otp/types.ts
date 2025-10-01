export type VerifyOtpRequestType = {
  otp: string;
  email: string;
};

export type VerifyOtpResponseType = {
  message: string;
  result: {
    step: "set-password";
  };
};
