import { useSearchParams } from "react-router-dom";
import useFetchWithPagination from "../hooks/useFetchWithPagination"; // Import the new hook
import CourseCard from "../components/cards/CourseCard";
import type { Course } from "../types/course";
import { SpinnerLoader } from "../components/ui/loader";
import Error from "../components/Error";
import { Input } from "../components/ui/input";
import { useEffect, useId, useState, type JSX, useCallback, useRef } from "react";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";
import useScroll from "../hooks/useScroll";

const Courses = (): JSX.Element => {
  const [search] = useSearchParams();
  const [input, setInput] = useState<string>("");
  const course = search.get("search") || "all";
  const [lastSearch, setLastSearch] = useState<string>("");

  // Use the pagination hook
  const {
    data: courses,
    loading,
    error,
    refetch,
    loadMore,
    hasMore,
    isFetchingMore
  } = useFetchWithPagination<Course>(
    `/courses/${course}`,
    "GET",
    {},
    {},
    false,
    true,
    undefined,
    "courses" // To specify the data key
  );

  useScroll("top");

  useEffect(() => {
    if (!loading && courses.length > 0) {
      setLastSearch(input);
    }
  }, [loading, courses, input]);

  // Infinite scroll handler - trigger before footer
  const scrollTimeoutRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    // Clear previous timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set new timeout to debounce scroll events
    scrollTimeoutRef.current = setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceFromBottom <= 500) {
        if (hasMore && !isFetchingMore && !loading) {
          loadMore();
        }
      }
    }, 100); // 100ms debounce delay
  }, [hasMore, isFetchingMore, loading, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Handle search with pagination reset
  const handleSearch = useCallback(() => {
    refetch(`/courses/${input || "all"}`);
  }, [input, refetch]);

  // Handle Enter key press
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input) {
      handleSearch();
    }
  }, [input, handleSearch]);

  return (
    <div className="my-30 flex flex-col gap-10">
      <div className="flex items-center w-[90%] border dark:border-slate-700 max-w-2xl rounded-lg p-1 m-auto">
        <Search className="text-gray-400 size-7 ms-2" />
        <Input
          type="search"
          autoComplete="off"
          id={useId()}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          value={input}
          placeholder="Search for courses"
          className="ps-2 border-0 focus-visible:ring-0 focus:outline-0 w-full shadow-none"
        />
        <Button
          variant="primary"
          size="icon-lg"
          onClick={handleSearch}
        >
          <Search className="size-5" />
        </Button>
      </div>

      {loading && courses.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <SpinnerLoader size={15} />
        </div>
      ) : error ? (
        <Error
          resource="courses"
          error={error}
          onRetry={() => refetch(`/courses/${input || "all"}`)}
        />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 m-auto w-[90%] max-w-7xl">
            {courses.map((course: Course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
          </div>

          {/* Loading more indicator */}
          {isFetchingMore && (
            <div className="flex justify-center my-8">
              <SpinnerLoader />
            </div>
          )}

          {/* Load more button (alternative to infinite scroll) */}
          {hasMore && !isFetchingMore && (
            <div className="flex justify-center mt-8">
              <Button
                variant="secondary"
                onClick={loadMore}
                className="px-8 py-3"
              >
                Load More Courses
              </Button>
            </div>
          )}

          {/* No more courses message */}
          {!hasMore && courses.length > 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8 py-4">
              You"ve reached the end of the course list
            </div>
          )}
        </>
      )}

      {!loading && courses.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 text-center mt-10 p-7">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            No Courses Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            We couldn&apos;t find any courses matching{" "}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              "{lastSearch || "your search"}"
            </span>.
            Try adjusting your keywords or explore popular categories to discover something new!
          </p>
          <Button
            variant="secondary"
            onClick={() => refetch("/courses/all")}
            className="mt-2"
          >
            Browse All Courses
          </Button>
        </div>
      )}
    </div>
  );
}

export default Courses;
