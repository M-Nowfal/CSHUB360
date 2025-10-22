
export class AppError extends Error {
  public code: string;
  public status?: number;

  constructor(code: string, message: string, status?: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = this.constructor.name;
    (Error as any).captureStackTrace?.(this, this.constructor);
  }
}

// ---------- Specific frontend error types ----------

// For API failures (Axios, Fetch, etc.)
export class APIError extends AppError {
  constructor(message = "Failed to connect to the server", status = 500) {
    super("API_ERROR", message, status);
  }
}

// For form input / validation issues
export class ValidationError extends AppError {
  constructor(message = "Please check your input") {
    super("VALIDATION_ERROR", message);
  }
}

// For missing or expired tokens
export class AuthError extends AppError {
  constructor(message = "You need to log in first") {
    super("AUTH_ERROR", message, 401);
  }
}

// For data not found
export class NotFoundError extends AppError {
  constructor(resource = "Data") {
    super("NOT_FOUND", `${resource} not found`, 404);
  }
}

// For unexpected crashes (fallback UI)
export class UnknownError extends AppError {
  constructor(message = "Something went wrong") {
    super("UNKNOWN_ERROR", message);
  }
}
