import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import CONSTANTS from "../utils/constants";
import type { BodyType, HeadersType, MethodType, URLType } from "../types/useFetch";
import SmartCache from "../lib/smartCache";
import { createFetchError, shouldStopFetching } from "../lib/errorHandler";

const defaultCache = new SmartCache();

// Generic pagination response interface
interface GenericPaginationResponse<T = any> {
  data: T[];
  pagination: {
    page?: number;
    limit: number;
    total?: number;
    totalPages?: number;
    hasMore: boolean;
    nextCursor?: string | null;
    nextPage?: number | null;
    [key: string]: any;
  };
}

// Generic hook return type
interface UseFetchReturnWithPagination<T = any> {
  data: T[];
  loading: boolean;
  error: FetchError | null;
  refetch: (newUrl?: string, newBody?: BodyType, bypassCache?: boolean, isLoadMore?: boolean) => void;
  pagination: GenericPaginationResponse['pagination'] | null;
  loadMore: () => void;
  hasMore: boolean;
  isFetchingMore: boolean;
  clearCache: () => void;
  getCacheStats: () => any;
  rawData?: any;
}

const useFetchWithPagination = <T = any>(
  url: URLType,
  method: MethodType = "GET",
  headers: HeadersType = {},
  body: BodyType = {},
  skip?: boolean,
  enableCache: boolean = true,
  customCache: SmartCache = defaultCache,
  dataKey?: string // Optional: specify the data key in response (e.g., 'courses', 'testimonials')
): UseFetchReturnWithPagination<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchError | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [stopFetch, setStopFetch] = useState<boolean>(false);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const controllerRef = useRef<AbortController | null>(null);
  const base_url = CONSTANTS.API_URL;

  // Extract data array from response (generic for any resource)
  const extractDataArray = (data: any): T[] => {
    if (!data) return [];
    
    // If data is already an array, return it
    if (Array.isArray(data)) return data;
    
    // If specific data key is provided, use it
    if (dataKey && data[dataKey] && Array.isArray(data[dataKey])) {
      return data[dataKey];
    }
    
    // Auto-detect common data keys
    const commonDataKeys = ['data', 'items', 'results', 'list', 'content'];
    for (const key of commonDataKeys) {
      if (data[key] && Array.isArray(data[key])) {
        return data[key];
      }
    }
    
    // Try to infer from URL (e.g., /courses -> 'courses', /testimonials -> 'testimonials')
    const resourceName = url.split('/').filter(Boolean).pop();
    if (resourceName && data[resourceName] && Array.isArray(data[resourceName])) {
      return data[resourceName];
    }
    
    // If no array found, check for pluralized resource name
    const pluralResourceName = resourceName ? `${resourceName}s` : null;
    if (pluralResourceName && data[pluralResourceName] && Array.isArray(data[pluralResourceName])) {
      return data[pluralResourceName];
    }
    
    // Fallback: return empty array
    return [];
  };

  // Get the data key used in the response
  const getDataKey = (data: any): string => {
    if (dataKey) return dataKey;
    
    if (Array.isArray(data)) return 'data';
    
    const commonKeys = ['data', 'items', 'results', 'list', 'content'];
    for (const key of commonKeys) {
      if (data[key] && Array.isArray(data[key])) {
        return key;
      }
    }
    
    const resourceName = url.split('/').filter(Boolean).pop();
    if (resourceName && data[resourceName] && Array.isArray(data[resourceName])) {
      return resourceName;
    }
    
    return 'data';
  };

  // All items accumulated from multiple pages
  const allItems = extractDataArray(responseData);

  const fetchData = useCallback(async (
    newUrl?: string,
    newBody?: BodyType,
    bypassCache: boolean = false,
    isLoadMore: boolean = false
  ): Promise<void> => {
    if (skip || (stopFetch && !newUrl)) return;

    const finalUrl = newUrl ? `${base_url}${newUrl}` : `${base_url}${url}`;
    const finalBody = newBody ?? body;

    // For load more, use cursor or page based on API
    let loadMoreUrl = finalUrl;
    if (isLoadMore && responseData?.pagination) {
      const { pagination } = responseData;
      
      if (pagination.nextCursor) {
        // Cursor-based pagination
        loadMoreUrl = `${finalUrl}${finalUrl.includes('?') ? '&' : '?'}cursor=${pagination.nextCursor}`;
      } else if (pagination.nextPage) {
        // Page-based pagination with nextPage
        loadMoreUrl = `${finalUrl}${finalUrl.includes('?') ? '&' : '?'}page=${pagination.nextPage}`;
      } else if (pagination.page) {
        // Page-based pagination (increment current page)
        loadMoreUrl = `${finalUrl}${finalUrl.includes('?') ? '&' : '?'}page=${pagination.page + 1}`;
      }
    }

    const cacheKey = `${method}_${loadMoreUrl}_${JSON.stringify(finalBody)}`;

    if (!isLoadMore && enableCache && !bypassCache && method.toUpperCase() === "GET") {
      const cachedData = customCache.get(cacheKey);
      if (cachedData) {
        setResponseData(cachedData);
        return;
      }
    }

    if (!isLoadMore) {
      setLoading(true);
    } else {
      setIsFetchingMore(true);
    }
    setError(null);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

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
          response = await axios.get(loadMoreUrl, config);
          break;
        case "POST":
          response = await axios.post(loadMoreUrl, finalBody, config);
          break;
        default:
          throw new Error(`Invalid HTTP method: ${method}`);
      }

      if (enableCache && method.toUpperCase() === "GET" && !isLoadMore) {
        customCache.set(cacheKey, response.data, loadMoreUrl);
      }

      if (isLoadMore && responseData) {
        // Merge new items with existing ones
        const currentDataArray = extractDataArray(responseData);
        const newDataArray = extractDataArray(response.data);
        const dataKeyUsed = getDataKey(responseData);
        
        setResponseData({
          ...response.data,
          [dataKeyUsed]: [...currentDataArray, ...newDataArray],
          pagination: response.data.pagination // Use latest pagination info
        });
      } else {
        setResponseData(response.data);
      }
    } catch (err: unknown) {
      if (axios.isCancel(err)) return;

      const errorData = createFetchError(err, finalUrl);
      console.error(`Request failed with status code: ${errorData.status}`, errorData.message);
      setError(errorData);

      if (shouldStopFetching(errorData)) {
        setStopFetch(true);
      }
    } finally {
      if (!isLoadMore) {
        setLoading(false);
      } else {
        setIsFetchingMore(false);
      }
    }
  }, [url, method, headers, body, skip, stopFetch, responseData, enableCache, customCache, base_url, dataKey]);

  const loadMore = useCallback(() => {
    if (responseData?.pagination?.hasMore && !isFetchingMore && !loading) {
      fetchData(undefined, undefined, false, true);
    }
  }, [responseData?.pagination?.hasMore, isFetchingMore, loading, fetchData]);

  useEffect(() => {
    if (!skip && url) {
      fetchData();
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return {
    data: allItems,
    loading,
    error,
    refetch: fetchData,
    pagination: responseData?.pagination || null,
    loadMore,
    hasMore: responseData?.pagination?.hasMore || false,
    isFetchingMore,
    clearCache: () => customCache.clear(),
    getCacheStats: () => customCache.getStats(),
    rawData: responseData
  };
};

export default useFetchWithPagination;
