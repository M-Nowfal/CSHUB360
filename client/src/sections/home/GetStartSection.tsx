import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import type { JSX } from "react";

const GetStartSection = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center gap-12 mb-10">
      <div className="flex flex-col gap-2 w-[90%] max-w-2xl m-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-3">
          Learn anything, anytime, anywhere
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          Level up your learning game! CSHUB360 is your all-in-one space where college students can explore curated courses, learn from real professors, and boost their skills at their own pace. Join now, start learning smarter, and unlock your next big move in tech & academics.
        </p>
      </div>
      <div className="flex flex-col md:flex-row m-auto gap-3 w-[90%] max-w-2xl">
        <Link to="/getstart" viewTransition className="flex-1">
          <Button variant="primary" size="lg" className="w-full">
            Get Started
          </Button>
        </Link>
        <Link to="/learnmore" className="sm:flex-1 group">
          <Button variant="secondary" size="lg" className="w-full">
            Learn More
            <ArrowRight className="group-hover:translate-x-3 transition-all duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default GetStartSection;
