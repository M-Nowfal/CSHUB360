type ErrorVariant = "network" | "server" | "client" | "timeout" | "unknown" | "rate-limit";

interface FetchError {
  message: string;
  status?: number;
  code?: string;
  variant: ErrorVariant;
  timestamp: number;
  url?: string
};
