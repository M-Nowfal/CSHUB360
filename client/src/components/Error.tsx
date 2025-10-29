import type { JSX } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AlertTriangle, RefreshCw, WifiOff, Server, AlertCircle } from "lucide-react";
import CONSTANTS from "../utils/constants";

interface ErrorProps {
  resource: string;
  onRetry: () => void;
  error?: FetchError;
  variant?: "network" | "server" | "not-found" | "generic";
  action?: {
    label: string;
    onClick: () => void;
  };
};

const Error = ({
  resource = "unknown",
  onRetry,
  error,
  variant = "generic",
  action
}: ErrorProps): JSX.Element => {

  const getIcon = () => {
    switch (variant) {
      case "network":
        return <WifiOff className="w-12 h-12 text-amber-500" />;
      case "server":
        return <Server className="w-12 h-12 text-rose-500" />;
      case "not-found":
        return <AlertCircle className="w-12 h-12 text-blue-500" />;
      default:
        return <AlertTriangle className="w-12 h-12 text-rose-500" />;
    }
  };

  const getTitle = () => {
    switch (variant) {
      case "network":
        return "Connection Issue";
      case "server":
        return "Server Error";
      case "not-found":
        return `${resource.charAt(0).toUpperCase() + resource.slice(1)} Not Found`;
      default:
        return `Failed to Load ${resource.charAt(0).toUpperCase() + resource.slice(1)}`;
    }
  };

  const getDescription = () => {
    if (error?.message) return error.message;

    switch (variant) {
      case "network":
        return `We"re having trouble connecting to the server. Please check your internet connection and try again.`;
      case "server":
        return `Something went wrong on our end while loading the ${resource}. Our team has been notified.`;
      case "not-found":
        return `The ${resource} you"re looking for couldn"t be found. It may have been removed or doesn"t exist.`;
      default:
        return `We encountered an unexpected error while loading the ${resource}. Please try again in a moment.`;
    }
  };

  return (
    <Card className="flex flex-col items-center text-center m-auto gap-6 w-[90%] max-w-md p-8 shadow-lg border border-slate-200 dark:border-slate-700">
      {/* Error Icon */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800">
        {getIcon()}
      </div>

      {/* Error Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {getTitle()}
        </h3>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {getDescription()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button
          onClick={() => onRetry()}
          variant="primary"
          className="w-full gap-2"
          size="lg"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>

        {action && (
          <Button
            onClick={action.onClick}
            variant="outline"
            className="flex-1"
            size="lg"
          >
            {action.label}
          </Button>
        )}
      </div>

      {/* Technical Details (for development) */}
      {CONSTANTS.NODE_ENV === "development" && error?.message && (
        <details className="w-full mt-4 text-left">
          <summary className="text-sm text-slate-500 dark:text-slate-400 cursor-pointer">
            Technical Details
          </summary>
          <pre className="mt-2 p-3 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-700 dark:text-slate-300 overflow-auto">
            {error?.message}
          </pre>
        </details>
      )}
    </Card>
  );
};

const ValidationError = ({ error }: { error: string }) => {
  return (
    <p className="text-xs font-semibold text-red-500">{error}</p>
  );
}

export { Error, ValidationError };
