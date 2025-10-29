import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import type { Course } from "../../types/course";
import CourseCard from "../../components/cards/CourseCard";
import { Button } from "../../components/ui/button";
import { SpinnerLoader } from "../../components/ui/loader";
import { Error } from "../../components/Error";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../../components/ui/card";
import SearchBar from "./SearchBar";
import type { JSX } from "react";
import { List } from "lucide-react";

const CourseListSection = (): JSX.Element => {
  const { data, loading, error, refetch } = useFetch("/courses?limit=5");

  return (
    <div className="flex flex-col justify-center items-center gap-7 mb-10">
      <div className="flex flex-col gap-2 w-[90%] max-w-2xl m-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-3">
          Learn from the best
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
        </p>
        <div className="mt-5">
          <SearchBar />
        </div>
      </div>

      {error ? (
        <Error
          resource="courses"
          onRetry={() => refetch("/courses?limit=5")}
          error={error}
        />
      ) : (loading ? (
        <SpinnerLoader />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 m-auto w-[90%] max-w-6xl">
          {data?.courses?.map((course: Course) => (
            <CourseCard
              key={course._id}
              course={course}
            />
          ))}
        </div>)
      )}

      {(!loading && data?.courses?.length === 0) ? (
        <Card className="max-w-md mx-auto p-6 text-center border-gray-200 dark:border-gray-700 shadow-md">
          <CardContent className="flex flex-col gap-3">
            <CardTitle>No Courses Available</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              It looks like we haven&apos;t uploaded any courses yet.
              Please check back soon for new and exciting courses coming your way!
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center mt-3 w-full">
            <Button variant="primary" className="w-full">
              Add a Course
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex justify-between">
          <Link to="/courses" viewTransition>
            <Button variant="secondary" size="lg">
              <List />
              Show All Courses
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CourseListSection;
