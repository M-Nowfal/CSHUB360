import { ArrowLeft } from "lucide-react";
import CONSTANTS from "../utils/constants";
import { Button } from "./ui/button";
import { ThemeToggler } from "./ui/theme-toggler";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import type { JSX } from "react";
import useHistory from "../hooks/useHistory";
import AuthDialog from "./auth/AuthDialog";
import { useAppSelector } from "../redux/hooks";
import UserMenu from "./UserMenu";

const Navbar = (): JSX.Element => {
  
  const navigate: NavigateFunction = useNavigate();
  const canGoBack = useHistory();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    <nav className={`flex items-center justify-between py-2 px-4 md:pe-20 ${canGoBack ? "md:ps-15" : "md:ps-7"} backdrop-blur-xl fixed top-0 w-full z-10 shadow dark:shadow-slate-700`}>
      <div className="flex items-center gap-2 md:gap-5">
        {canGoBack && <Tooltip>
          <TooltipTrigger asChild className="md:absolute left-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back</p>
          </TooltipContent>
        </Tooltip>}
        <Link to="/" className="flex gap-2 items-center" viewTransition>
          <figure className="flex items-center gap-2 relative">
            <img
              src={CONSTANTS.APP_LOGO}
              alt={CONSTANTS.APP_NAME}
              className="w-12 h-12 rounded-lg"
            />
            <div className="absolute -inset-1 bg-emerald-400/30 rounded-full blur-sm" />
            <figcaption hidden>{CONSTANTS.APP_NAME}</figcaption>
          </figure>
          <h1 className="font-bold text-lg">{CONSTANTS.APP_NAME}</h1>
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        {isLoggedIn ? (<>
          {/* User Profile goes here */}
          <UserMenu />
        </>) : (<>
          <AuthDialog defaultType="login" variant="ghost" />
          <AuthDialog defaultType="signup" variant="primary" className="hidden md:block" />
        </>)}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="md:absolute right-2">
              <ThemeToggler />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Theme</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
}

export default Navbar;
