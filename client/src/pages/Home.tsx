import CourseListSection from "../sections/home/CourseListSection";
import GetStartSection from "../sections/home/GetStartSection";
import HeroSection from "../sections/home/HeroSection";
import TestimonialSection from "../sections/home/TestimonialSection";
import useScroll from "../hooks/useScroll";
import type { JSX } from "react";

const Home = (): JSX.Element => {
  useScroll("top");

  return (
    <div className="flex flex-col gap-10">
      <HeroSection />
      <CourseListSection />
      <TestimonialSection />
      <GetStartSection />
    </div>
  );
}

export default Home;
