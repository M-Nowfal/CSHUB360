import { Link } from "react-router-dom";
import TestimonialCard from "../../components/cards/TestimonialCard";
import Error from "../../components/Error";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../../components/ui/card";
import { SpinnerLoader } from "../../components/ui/loader";
import useFetch from "../../hooks/useFetch";
import type { Testimonial } from "../../types/testimonial";
import type { JSX } from "react";
import { MessageSquare } from "lucide-react";

const TestimonialSection = (): JSX.Element => {

  const { data, loading, error, refetch } = useFetch("/testimonials?limit=4");

  return (
    <div className="flex flex-col justify-center items-center gap-12 mb-10">
      <div className="flex flex-col gap-2 w-[85%] max-w-2xl m-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-3">
          Testimonials
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.
        </p>
      </div>
      {loading ? (
        <SpinnerLoader />
      ) : (
        error ? (
          <Error 
            resource="testimonials" 
            error={error}
            onRetry={() => refetch("/testimonials?limit=4")}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 m-auto w-[90%] max-w-6xl">
            {data?.testimonials?.map((testimonial: Testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
              />
            ))}
          </div>
        )
      )}

      {!loading && data?.testimonials?.length === 0 ? (
        <Card className="max-w-md mx-auto p-6 text-center border-gray-200 dark:border-gray-700 shadow-md">
          <CardContent className="flex flex-col gap-3">
            <CardTitle>No Reviews Yet</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              It looks like no reviews have been added yet.
              Please check back soon to see what others are saying about our courses!
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="flex justify-between">
          <Link to="/reviews" viewTransition>
            <Button variant="secondary" size="lg">
              <MessageSquare />
              Show All Reviews
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default TestimonialSection;
