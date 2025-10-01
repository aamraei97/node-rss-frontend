export type LoginRequestType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  message: string;
  result: {
    token: string;
    user: {
      _id: string;
      email: string;
    };
    success: boolean;
  };
};
