import type { JSX } from "react";
import { BookOpen, Users, Target, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import CONSTANTS from "../utils/constants";
import useScroll from "../hooks/useScroll";

const LearnMore = (): JSX.Element => {
  const features = [
    {
      icon: <BookOpen className="size-15 text-emerald-500 bg-emerald-200/50 dark:bg-emerald-700/20 p-2 rounded-lg" />,
      title: "Comprehensive Courses",
      description: "Wide range of computer science courses from beginner to advanced."
    },
    {
      icon: <Users className="size-15 text-emerald-500 bg-emerald-200/50 dark:bg-emerald-700/20 p-2 rounded-lg" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals and experienced educators."
    },
    {
      icon: <Target className="size-15 text-emerald-500 bg-emerald-200/50 dark:bg-emerald-700/20 p-2 rounded-lg" />,
      title: "Project-Based Learning",
      description: "Build real-world projects to strengthen your portfolio."
    }
  ];

  const learningPaths = [
    {
      title: "Frontend Development",
      skills: ["HTML5 & CSS3", "JavaScript", "React", "TypeScript"],
      duration: "4-6 months"
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Databases", "API Development", "Authentication"],
      duration: "5-7 months"
    }
  ];

  useScroll("top");

  return (
    <div className="min-h-screen">
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Badge variant="secondary" className="my-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-700/20 dark:text-emerald-100">
            Learn Computer Science
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-emerald-600">{CONSTANTS.APP_NAME}</span>
          </h1>
          <p className="text-muted-foreground mb-8 w-[90%] max-w-2xl mx-auto">
            Master in-demand skills and launch your tech career with our comprehensive learning platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/getstart" viewTransition className="w-full md:flex-1 group">
              <Button variant="primary" size="lg" className="w-full">
                Start Learning
                <ArrowRight className="group-hover:translate-x-3 transition-all duration-300" />
              </Button>
            </Link>
            <Link to="/courses" viewTransition className="w-full md:flex-1">
              <Button variant="secondary" size="lg" className="w-full">
                View Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Choose CSHUB360?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to succeed in your coding journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-3">
                <CardHeader className="pb-1">
                  <div className="mb-2 flex justify-center">{feature.icon}</div>
                  <CardTitle className="text-xl ms-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Learning Paths</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Structured paths to become job-ready
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="p-3">
                <CardHeader>
                  <CardTitle className="text-xl">{path.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {path.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-emerald-700">
                    <span className="text-sm">Duration: {path.duration}</span>
                    <Button variant="primary" size="sm">
                      Explore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Start Your Journey?</h2>
          <p className="mb-6 w-[90%] max-w-xl mx-auto">
            Join thousands of students who transformed their careers with CSHUB360
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-3xl">
            <Link to="/getstart" className="w-full sm:flex-1">
              <Button size="lg" variant="primary" className="w-full">
                Get Started Today
              </Button>
            </Link>
            <Button size="lg" variant="secondary" className="sm:flex-1">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LearnMore;
