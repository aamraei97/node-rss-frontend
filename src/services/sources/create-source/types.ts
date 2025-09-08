export type CreateSourceRequestType = {
  name: string;
  url: string;
  hrefSelector: string;
  titleSelector: string;
};

export type CreateSourceResponseType = {
  message: string;
};
