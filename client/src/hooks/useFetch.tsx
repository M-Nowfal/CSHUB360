import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CONSTANTS from "../utils/constants";
import type { BodyType, HeadersType, MethodType, URLType, UseFetchReturnType } from "../types/useFetch";
import SmartCache from "../lib/smartCache";
import { createFetchError, shouldStopFetching } from "../lib/errorHandler";

const cache = new SmartCache();

const useFetch = (
  url: URLType,
  method: MethodType = "GET",
  headers: HeadersType = {},
  body: BodyType = {},
  skip: boolean = method !== "GET",
  enableCache: boolean = true // New parameter to control caching
): UseFetchReturnType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchError | null>(null);
  const [data, setData] = useState<any>(null);
  const [stopFetch, setStopFetch] = useState<boolean>(false);

  const controllerRef = useRef<AbortController | null>(null);
  const base_url = CONSTANTS.API_URL;

  const fetchData = async (
    newUrl?: string,
    newBody?: BodyType,
    dontSkip?: boolean,
    bypassCache: boolean = false // Force fresh data
  ): Promise<void> => {

    if (!dontSkip && (skip || stopFetch) && (!newUrl && !newBody)) return;
    const finalUrl = newUrl ? `${base_url}${newUrl}` : `${base_url}${url}`;
    const finalBody = newBody ?? body;

    const cacheKey = `${method}_${finalUrl}_${JSON.stringify(finalBody)}`;

    // Smart cache check with bypass option
    if (!newUrl && enableCache && !bypassCache && method.toUpperCase() === "GET") {
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        setData(cachedData);
        return;
      }
    }

    setLoading(true);
    setError(null);

    // Abort previous request if it exists
    if (controllerRef.current)
      controllerRef.current.abort();

    // Create new abort controller
    controllerRef.current = new AbortController();

    try {
      const config = {
        headers,
        withCredentials: true,
        signal: controllerRef.current.signal,
      };

      let response;

      switch (method.toUpperCase()) {
        case "GET":
          response = await axios.get(finalUrl, config);
          break;
        case "POST":
          response = await axios.post(finalUrl, finalBody, config);
          break;
        case "PUT":
          response = await axios.put(finalUrl, finalBody, config);
          break;
        case "DELETE":
          response = await axios.delete(finalUrl, config);
          break;
        case "PATCH":
          response = await axios.patch(finalUrl, finalBody, config);
          break;
        default:
          throw new Error(`Invalid HTTP method: ${method}`);
      }

      // Only cache GET requests by default
      if (enableCache && method.toUpperCase() === "GET") {
        cache.set(cacheKey, response.data, finalUrl);
      }

      setData(response.data);
    } catch (err: unknown) {
      // Check if the error is from cancellation
      if (axios.isCancel(err)) return;

      const errorData = createFetchError(err, finalUrl);

      console.error(`Request failed with status code: ${errorData.status}`, errorData.message);
      setError(errorData);

      if (shouldStopFetching(errorData)) {
        setStopFetch(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on initial mount only
  useEffect(() => {
    if (!skip && url) {
      fetchData();
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [skip, url]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    // Additional utility functions
    clearCache: () => cache.clear(),
    getCacheStats: () => cache.getStats()
  };
};

export default useFetch;
