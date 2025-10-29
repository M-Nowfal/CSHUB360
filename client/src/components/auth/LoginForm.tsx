import { useForm } from "react-hook-form";
import { useEffect } from "react";
import ASSETS from "../../assets/assets";
import { Button } from "../../components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import type { JSX } from "react";
import { ValidationError } from "../Error";
import useFetch from "../../hooks/useFetch";
import { SpinnerLoader } from "../ui/loader";
import { toast } from "sonner";
import { setStudent } from "../../redux/slice/studentSlice";
import { setInstructor } from "../../redux/slice/instructorSlice";
import { setRole } from "../../redux/slice/roleSlice";
import { useAppDispatch } from "../../redux/hooks";
import { setAuthState } from "../../redux/slice/authSlice";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  role?: "student" | "instructor" | "admin";
  onClose: () => void;
}

type FormData = {
  email: string;
  password: string;
};

const LoginForm = ({ onSwitchToSignup, role = "student", onClose }: LoginFormProps): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const dispatch = useAppDispatch();

  const { loading, error, data, refetch } = useFetch(
    `/auth/${role}/login`,
    "POST",
    {},
    {},
    true
  );

  const onSubmit = (data: FormData) => {
    try {
      refetch(undefined, data);
    } catch (error: unknown) {
      console.error("Login failed: ", error);
    }
  };

  // Effect to handle successful login and close dialog
  useEffect(() => {
    if (data && !error && !loading) {
      // Store user data in Redux based on role
      if (data.user) {
        dispatch(setRole(role));
        dispatch(setAuthState(true));

        switch (role) {
          case "student":
            dispatch(setStudent(data.user));
            break;
          case "instructor":
            dispatch(setInstructor(data.user));
            break;
        }
      }

      toast.success(data.message);

      const timer = setTimeout(() => {
        onClose();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">Welcome Back</DialogTitle>
        <DialogDescription className="text-center">
          Sign in to your account to continue
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
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
            />
            {errors.email && <ValidationError error={errors.email.message!} />}
          </div>

          {/* Password Field */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
              })}
              className="border-slate-300 dark:border-slate-700"
              placeholder="Enter your password"
            />
            {errors.password && <ValidationError error={errors.password.message!} />}
          </div>
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
          <Button variant="primary" type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                Signing In...
                <SpinnerLoader size={5} color="white" />
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </DialogFooter>
      </form>

      <Separator />

      {/* Google Login Button */}
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        Continue with
        <span className="flex">
          <img src={ASSETS.google} alt="google" width={15} height={15} />
          oogle
        </span>
      </Button>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto font-semibold"
            onClick={onSwitchToSignup}
            disabled={loading}
          >
            Sign up
          </Button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
