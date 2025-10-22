import type { JSX, ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { ThemeToggler } from "./ui/theme-toggler";

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }): JSX.Element => (
  <div className="flex flex-col items-center justify-center h-screen text-center p-4">
    <div className="absolute top-2 right-0">
      <ThemeToggler />
    </div>
    <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong 💥</h1>
    <p className="text-sm mb-6">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 font-medium"
    >
      Retry
    </button>
  </div>
);

export const ErrorBoundary = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => console.error("Error caught by boundary:", error, info)}
      onReset={() => window.location.reload()}
    >
      {children}
    </ReactErrorBoundary>
  );
};
