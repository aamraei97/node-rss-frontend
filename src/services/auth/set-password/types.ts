export type SetPasswordRequestType = {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export type SetPasswordResponseType = {
  message: string;
  result: {};
};
