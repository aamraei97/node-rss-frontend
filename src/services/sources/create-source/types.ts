export type CreateSourceRequestType = {
  name: string;
  url: string;
  hrefSelector: string;
  titleSelector: string;
  timeSelector: string;
  type: "low" | "medium" | "high" | "very-high";
  tags?: string[];
};

export type CreateSourceResponseType = {
  message: string;
};
