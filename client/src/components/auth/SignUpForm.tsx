import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ASSETS from "../../assets/assets";
import { Button } from "../../components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import type { JSX } from "react";
import { ValidationError } from "../Error";
import { Eye, EyeOff } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import { SpinnerLoader } from "../ui/loader";

interface SignUpFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
  role?: "student" | "instructor" | "admin";
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const SignUpForm = ({ onSwitchToLogin, onClose, role = "student" }: SignUpFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  // Use the useFetch hook for signup
  const { loading, error, data, refetch } = useFetch(
    `/auth/${role}/signup`,
    "POST",
    {},
    {},
    true
  );

  const onSubmit = async (data: FormData) => {
    try {
      // Remove confirmPassword and terms before sending to API
      const { confirmPassword, terms, ...submitData } = data;
      await refetch(undefined, submitData);
    } catch (error: unknown) {
      console.error("Signup failed: ", error);
    }
  };

  // Effect to handle successful signup and close dialog
  useEffect(() => {
    if (data && !error && !loading) {
      // Signup successful - close the dialog after a short delay
      const timer = setTimeout(() => {
        onClose();
      }, 1500); // Slightly longer delay to show success message

      return () => clearTimeout(timer);
    }
  }, [data, error, loading, onClose]);

  const password = watch("password");

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">Create Account</DialogTitle>
        <DialogDescription className="text-center">
          Join us today! Create your account to get started.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters"
                  }
                })}
                className="border-slate-300 dark:border-slate-700"
                placeholder="First Name"
                disabled={loading}
              />
              {errors.firstName && <ValidationError error={errors.firstName.message!} />}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters"
                  }
                })}
                className="border-slate-300 dark:border-slate-700"
                placeholder="Last Name"
                disabled={loading}
              />
              {errors.lastName && <ValidationError error={errors.lastName.message!} />}
            </div>
          </div>

          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className="border-slate-300 dark:border-slate-700"
              placeholder="Enter your email"
              disabled={loading}
            />
            {errors.email && <ValidationError error={errors.email.message!} />}
          </div>

          {/* Password Field */}
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              autoComplete="new-password"
              type={viewPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
                  message: "Must include at least one lowercase letter, one number, and one special character"
                }
              })}
              className="border-slate-300 dark:border-slate-700 pr-10"
              placeholder="Create a strong password"
              disabled={loading}
            />
            <Button
              variant="none"
              type="button"
              className="absolute right-0 top-10 transform -translate-y-1/2 text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-400"
              onClick={() => setViewPassword(prev => !prev)}
              disabled={loading}
            >
              {viewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </Button>
            {errors.password && <ValidationError error={errors.password.message!} />}
          </div>

          {/* Confirm Password Field */}
          <div className="grid gap-2 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              autoComplete="new-password"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="border-slate-300 dark:border-slate-700 pr-10"
              placeholder="Confirm your password"
              disabled={loading}
            />
            {errors.confirmPassword && <ValidationError error={errors.confirmPassword.message!} />}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="terms"
              {...register("terms", { required: "You must accept the terms and conditions" })}
              className="w-4 h-4 accent-emerald-600 border rounded"
              disabled={loading}
            />
            <Label htmlFor="terms" className="text-xs font-normal leading-relaxed">
              I agree to the{" "}
              <Button type="button" variant="link" className="text-xs p-0 h-auto font-semibold">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button type="button" variant="link" className="text-xs p-0 h-auto font-semibold">
                Privacy Policy
              </Button>
            </Label>
          </div>
          {errors.terms && <ValidationError error={errors.terms.message!} />}
        </div>

        {/* Show API error if any */}
        {error && (
          <div className="mt-4 text-center">
            <p className="text-red-500 font-semibold">{error.message || "Login failed. Please try again."}</p>
          </div>
        )}

        {/* Show success message */}
        {data && (
          <div className="text-center rounded-md mt-5">
            <p className="text-emerald-600 font-semibold animate-pulse">Login successful! Redirecting...</p>
          </div>
        )}

        <DialogFooter className="flex flex-col gap-2 mt-6 sm:flex-col">
          <Button
            variant="primary"
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                Creating Account...
                <SpinnerLoader size={5} color="white" />
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </DialogFooter>
      </form>

      <Separator className="dark:bg-slate-700" />

      {/* Google Sign Up Button */}
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={handleGoogleSignUp}
        disabled={loading}
      >
        Sign up with
        <span className="flex">
          <img src={ASSETS.google} alt="google" width={15} height={15} />
          oogle
        </span>
      </Button>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto font-semibold"
            onClick={onSwitchToLogin}
            disabled={loading}
          >
            Sign in
          </Button>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
