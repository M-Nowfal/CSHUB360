import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import type { JSX } from "react";

interface AuthDialogProps {
  defaultType: "login" | "signup";
  variant?: "ghost" | "primary" | "secondary";
  className?: string;
};

const AuthDialog = ({
  defaultType = "login", variant = "secondary", className = ""
}: AuthDialogProps): JSX.Element => {
  const [authType, setAuthType] = useState<"login" | "signup">(defaultType);
  const [isOpen, setIsOpen] = useState(false);

  const switchToLogin = () => setAuthType("login");
  const switchToSignup = () => setAuthType("signup");

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    // Reset to default type when dialog closes
    if (!open) {
      setAuthType(defaultType);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {defaultType === "login" ? (
          <Button variant={variant} className={className}>Login</Button>
        ) : (
          <Button variant={variant} className={className}>Create Account</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-emerald-50 dark:bg-[#121b33]">
        {authType === "login" ? (
          <LoginForm
            onSwitchToSignup={switchToSignup}
            onClose={() => setIsOpen(false)}
          />
        ) : (
          <SignUpForm
            onSwitchToLogin={switchToLogin}
            onClose={() => setIsOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
