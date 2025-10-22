import type { Course } from "./course";
import type { UseFetchReturnType } from "./useFetch";

// interface PaginationData {
//   courses: Course[];
//   pagination: {
//     page?: number;
//     limit: number;
//     totalCourses?: number;
//     totalPages?: number;
//     hasMore: boolean;
//     nextCursor?: string | null;
//   };
// };

// interface UseFetchReturnWithPagination extends UseFetchReturnType {
//   pagination: PaginationData["pagination"] | null;
//   loadMore: () => void;
//   hasMore: boolean;
//   isFetchingMore: boolean;
// };

export interface PaginationInfo {
  page?: number;
  limit: number;
  total?: number;
  totalPages?: number;
  hasMore: boolean;
  nextCursor?: string | null;
  nextPage?: number | null;
  [key: string]: any;
}

export interface UseFetchReturnWithPagination<T = any> {
  data: T[];
  loading: boolean;
  error: FetchError | null;
  refetch: (newUrl?: string, newBody?: BodyType, bypassCache?: boolean, isLoadMore?: boolean) => void;
  pagination: PaginationInfo | null;
  loadMore: () => void;
  hasMore: boolean;
  isFetchingMore: boolean;
  clearCache: () => void;
  getCacheStats: () => any;
  rawData?: any;
}