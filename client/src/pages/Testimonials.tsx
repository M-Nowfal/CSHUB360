import { useEffect, type JSX, useCallback, useRef } from "react";
import useFetchWithPagination from "../hooks/useFetchWithPagination";
import TestimonialCard from "../components/cards/TestimonialCard";
import type { Testimonial } from "../types/testimonial";
import { SpinnerLoader } from "../components/ui/loader";
import Error from "../components/Error";
import { Button } from "../components/ui/button";
import useScroll from "../hooks/useScroll";
import { MessageSquare, PlusCircle } from "lucide-react";

const Testimonials = (): JSX.Element => {
  const scrollTimeoutRef = useRef<number | null>(null);
  const isFetchingRef = useRef(false);

  // Use Testimonial type and correct data key
  const {
    data: testimonials,
    loading,
    error,
    refetch,
    loadMore,
    hasMore,
    isFetchingMore
  } = useFetchWithPagination<Testimonial>(
    "/testimonials",
    "GET",
    {},
    {},
    false,
    true,
    undefined,
    "testimonials" // Data key
  );

  useScroll("top");

  const handleScroll = useCallback(() => {
    // Clear previous timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set new timeout to debounce scroll events
    scrollTimeoutRef.current = setTimeout(() => {
      if (isFetchingRef.current || !hasMore || isFetchingMore || loading) {
        return;
      }

      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceFromBottom <= 500) {
        isFetchingRef.current = true;
        loadMore();

        // Reset the lock after a short delay
        setTimeout(() => {
          isFetchingRef.current = false;
        }, 1000); // Prevent multiple calls within 1 second
      }
    }, 150); // 150ms debounce delay
  }, [hasMore, isFetchingMore, loading, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Clean up timeout on unmount
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <div className="my-30 flex flex-col gap-5">
      {loading && testimonials.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <SpinnerLoader size={15} />
        </div>
      ) : error ? (
        <Error
          resource="testimonials"
          error={error}
          onRetry={() => refetch("/testimonials")}
        />
      ) : (
        <>
          <div className="text-center">
            <div className="flex justify-center gap-3">
              <MessageSquare className="size-10 text-emerald-600" />
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                Student Testimonials
              </h1>
            </div>
            <p className="text-lg text-muted-foreground w-[90%] max-w-2xl mx-auto">
              Discover how our courses have helped students achieve their learning goals
            </p>
          </div>

          <div className="flex justify-end pe-5 xl:fixed right-5">
            <Button variant="primary" size="lg">
              <PlusCircle />
              Add a Review
            </Button>
          </div>

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 m-auto w-[90%] max-w-7xl">
            {testimonials.map((testimonial: Testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
              />
            ))}
          </div>

          {/* Loading more indicator */}
          {isFetchingMore && (
            <div className="flex justify-center my-8">
              <SpinnerLoader />
              <span className="ml-3 text-gray-600 dark:text-gray-400">
                Loading more testimonials...
              </span>
            </div>
          )}

          {/* Load more button */}
          {hasMore && !isFetchingMore && (
            <div className="flex justify-center mt-8">
              <Button
                variant="secondary"
                onClick={loadMore}
                className="px-8 py-3"
                disabled={isFetchingMore}
              >
                Load More Testimonials
              </Button>
            </div>
          )}

          {/* No more testimonials message */}
          {!hasMore && testimonials.length > 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              You've reached the end of the testimonials
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Testimonials;