import { AxiosError } from "axios";

export const createFetchError = (err: unknown, url?: string): FetchError => {
  const baseError: FetchError = {
    message: "An unexpected error occurred",
    variant: "unknown",
    timestamp: Date.now(),
    url
  };

  if (err instanceof AxiosError) {
    const status = err.response?.status || 0;
    
    const getVariant = (): ErrorVariant => {
      if (status === 429) return "rate-limit";
      if (!err.response) {
        if (err.code === "ECONNABORTED") return "timeout";
        return "network";
      }
      
      if (status >= 500) return "server";
      if (status >= 400) return "client";
      return "unknown";
    };

    return {
      ...baseError,
      message: err.response?.data?.message || err.message || "Request failed",
      status,
      code: err.code,
      variant: getVariant(),
      url: err.config?.url || url
    };
  }

  if (err instanceof Error) {
    return {
      ...baseError,
      message: err.message
    };
  }

  return baseError;
};

export const shouldStopFetching = (error: FetchError): boolean => {
  return error.variant === "rate-limit" || error.status === 429;
};
