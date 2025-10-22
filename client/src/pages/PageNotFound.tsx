import { ArrowLeft } from "lucide-react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { Button } from "../components/ui/button";
import ASSETS from "../assets/assets";
import { ThemeToggler } from "../components/ui/theme-toggler";
import type { JSX } from "react";

const PageNotFound = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="absolute top-2 right-2">
        <ThemeToggler />
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="w-80 animate-pulse">
          <img src={ASSETS.pageNotFound} alt="404 Page not found" />
        </div>
        <span className="text-3xl font-semibold">Page Not Found</span>
        <Button variant="primary" size="lg" className="mt-5 shadow-xl" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-5" />
          Go back to home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
