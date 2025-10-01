import { UseQueryOptions } from "@tanstack/react-query";

export type QueryOptionsType<T, U> = T extends object
  ? {
      params: T;
      options?: Partial<UseQueryOptions<U, undefined>>;
    }
  : T extends undefined
  ? undefined
  : {
      options?: Partial<UseQueryOptions<U, undefined>>;
    };
