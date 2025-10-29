import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Brain } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import useScroll from "../hooks/useScroll";
import CONSTANTS from "../utils/constants";
import type { JSX } from "react";
import AuthDialog from "../components/auth/AuthDialog";
import { useAppSelector } from "../redux/hooks";

const GetStart = (): JSX.Element => {
  useScroll("top");
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    <section className="min-h-svh flex flex-col items-center justify-center px-6 py-30">
      <div className="max-w-5xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-emerald-600">
          Welcome to {CONSTANTS.APP_NAME}
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          Your one-stop platform for college-based e-learning - where professors share,
          students learn, and growth happens together. Let&apos;s make learning smarter, not harder.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 py-3">
            <CardHeader className="flex flex-col items-center text-center space-y-3">
              <BookOpen className="text-emerald-500 group-hover:scale-110 transition-transform" size={40} />
              <CardTitle className="text-lg font-semibold">Learn From Experts</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Access high-quality courses curated by real college professors.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 py-3">
            <CardHeader className="flex flex-col items-center text-center space-y-3">
              <Users className="text-sky-500 group-hover:scale-110 transition-transform" size={40} />
              <CardTitle className="text-lg font-semibold">Connect & Collaborate</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Join a growing community of learners and educators.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 py-3">
            <CardHeader className="flex flex-col items-center text-center space-y-3">
              <Brain className="text-purple-500 group-hover:scale-110 transition-transform" size={40} />
              <CardTitle className="text-lg font-semibold">Grow Your Skills</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Learn anytime, anywhere — track progress & master new topics fast.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full max-w-3xl m-auto">
          <Link to="/courses" viewTransition className="flex-1 w-full">
            <Button variant="secondary" size="lg" className="w-full group">
              Explore Courses <ArrowRight className="group-hover:translate-x-3 transition-all duration-300" />
            </Button>
          </Link>
          {!isLoggedIn && <div className="w-full md:flex-1">
            <AuthDialog defaultType="login" variant="primary" className="w-full" />
          </div>}
        </div>
      </div>
    </section>
  );
};

export default GetStart;
