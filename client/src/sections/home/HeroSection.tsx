import { Button } from "../../components/ui/button";
import { ArrowRight, Users, Award, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Link } from "react-router-dom";
import type { JSX } from "react";

const HeroSection = (): JSX.Element => {
  return (
    <div className="min-h-svh flex flex-col justify-center mt-20 lg:mt-10">
      <div className="flex flex-col justify-center items-center w-[90%] max-w-4xl xl:max-w-5xl m-auto">
        <h1 className="font-bold text-4xl md:text-5xl xl:text-6xl text-center leading-tight">
          Empower your future with courses designed to
          <span className="text-emerald-600">&nbsp;fit your choice.</span>
        </h1>

        <p className="text-center max-w-3xl mt-8 text-lg text-muted-foreground leading-relaxed">
          We bring together world-class instructors
          <span className="hidden md:inline-block">, interactive content, and a supportive community</span>
          &nbsp;to help you achieve your personal and professional goals.
          Learn at your own pace with our carefully curated curriculum.
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12">
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center">
              <Users className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-bold text-foreground">50K+</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Active Learners</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-bold text-foreground">500+</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Expert Courses</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-bold text-foreground">98%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Success Rate</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-2xl">
          <Link to="/courses" className="sm:flex-1 group">
            <Button variant="primary" size="lg" className="w-full">
              Explore Courses
              <ArrowRight className="group-hover:translate-x-3 transition-all duration-300" />
            </Button>
          </Link>
          <Link to="/learnmore" className="sm:flex-1 group">
            <Button variant="secondary" size="lg" className="w-full">
              Learn More
              <ArrowRight className="group-hover:translate-x-3 transition-all duration-300" />
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center max-w-4xl">

          <Card className="flex p-5">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-200 dark:bg-emerald-300/20 rounded-lg flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground">Learn Your Way</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Choose from self-paced, instructor-led, or hybrid learning formats that match your schedule and learning style.
              </p>
            </CardContent>
          </Card>

          <Card className="flex p-5">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-200 dark:bg-emerald-300/20 rounded-lg flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground">Industry Recognized</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Earn certificates and badges that are valued by employers and help advance your career.
              </p>
            </CardContent>
          </Card>

          <Card className="flex p-5">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-200 dark:bg-emerald-300/20 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground">Community Driven</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Join study groups, participate in discussions, and network with peers and mentors.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by teams at leading companies
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {["Google", "Microsoft", "Amazon", "Netflix", "Spotify"].map((company) => (
              <div key={company} className="text-lg font-medium text-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
