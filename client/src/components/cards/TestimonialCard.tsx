import type { JSX } from "react";
import type { Testimonial } from "../../types/testimonial";
import { getFirstTwoLettersOfName } from "../../utils/helpers";
import Profile from "../Profile";
import StarRatings from "../StarRatings";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }): JSX.Element => {
  const { avatar, name, profession, rating, review } = testimonial;

  return (

    <Card className="pb-3">
      <CardHeader className="flex items-center bg-emerald-100/70 dark:bg-slate-800 rounded-t-xl py-2">
        <Profile avatar={avatar} fallBack={getFirstTwoLettersOfName(name)} />
        <div>
          <h2 className="font-semibold">{name}</h2>
          <p className="text-gray-500">{profession}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{rating}</span>
          <StarRatings rating={rating} />
        </div>
        <CardDescription>
          {review}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;
