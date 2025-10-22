import { Clock, IndianRupee } from "lucide-react";
import type { Course } from "../../types/course";
import StarRatings from "../StarRatings";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Profile from "../Profile";
import type { JSX } from "react";

const CourseCard = ({ course }: { course: Course }): JSX.Element => {
  const {
    imageUrl, title, category,
    instructor, rating, reviewsCount,
    price, isFree, duration
  } = course;

  return (
    <Card className="hover:-translate-y-1 group overflow-hidden relative">
      <figure className="group">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-t-xl group-hover:scale-105 w-full h-50 sm:h-40 lg:h-50 object-cover object-center transition-all duration-300"
        />
        <figcaption className="mt-5 text-xl font-bold">
          <CardHeader className="cursor-default">
            <CardTitle className="line-clamp-1 text-start pb-0.5">{title}</CardTitle>
          </CardHeader>
        </figcaption>
      </figure>

      <CardContent className="flex flex-col gap-2 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Profile avatar={instructor.avatar} fallBack="NA" />
              <span className="font-semibold line-clamp-1">{instructor.username}</span>
            </div>

            <div className="flex items-center gap-2">
              <span>{rating}</span>
              <StarRatings rating={rating} />
              <span>({reviewsCount.toLocaleString()})</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-muted-foreground" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <IndianRupee className="size-5" />
              <span className={`${isFree && "line-through text-gray-500"} text-xl font-bold`}>{price.toLocaleString()}</span>
            </div>
            <span className="text-lg text-green-600 font-semibold">{isFree && "Free"}</span>
          </div>
          <div className="bg-emerald-500/20 py-0.1 px-2 rounded-full shadow">
            <h2 className="text-sm font-semibold text-emerald-900 dark:text-white line-clamp-1">
              {category}
            </h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
