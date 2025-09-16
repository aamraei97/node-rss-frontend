export type SendOtpToEmailRequestType = {
  email: string;
};

export type SendOtpToEmailResponseType = {
  message: string;
  result: {
    step: "otp";
  };
};
