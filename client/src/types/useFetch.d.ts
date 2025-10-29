import type { Course } from "./course";

export type URLType = string;
export type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type HeadersType = Record<string, string> | {};
export type BodyType = Record<string, any> | {};

interface UseFetchReturnType {
  data: any;
  loading: boolean;
  error: FetchError | null;
  refetch: (newUrl?: string, newBody?: BodyType, dontSkip?: boolean, bypaceCache?: boolean) => Promise<void>;
  clearCache: () => void;
  getCacheStats: () => void;
};
