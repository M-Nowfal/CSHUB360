import CourseListSection from "../sections/home/CourseListSection";
import GetStartSection from "../sections/home/GetStartSection";
import HeroSection from "../sections/home/HeroSection";
import TestimonialSection from "../sections/home/TestimonialSection";
import useScroll from "../hooks/useScroll";
import type { JSX } from "react";
import { Separator } from "../components/ui/separator";

const Divider = (): JSX.Element => {
  return (
    <div className="w-[80%] max-w-5xl flex justify-center m-auto">
      <Separator className="bg-gray-400 dark:bg-slate-700" />
    </div>
  );
};

const Home = (): JSX.Element => {
  useScroll("top");

  return (
    <div className="flex flex-col gap-10">
      <HeroSection />
      <Divider />
      <CourseListSection />
      <Divider />
      <TestimonialSection />
      <Divider />
      <GetStartSection />
    </div>
  );
}

export default Home;
