import type { ApiValidationError } from "@/types/api";

/**
 * Thrown when the Laravel API responds with a non-2xx status.
 *
 * Carries the HTTP status and parsed body so callers can branch on it, e.g.
 * `if (err instanceof ApiError && err.status === 422) { ...err.validationErrors }`.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }

  /** True when the request failed because the token is missing/expired. */
  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  /** Field-keyed validation messages from a 422 response, if present. */
  get validationErrors(): Record<string, string[]> | null {
    if (this.status === 422 && isValidationError(this.body)) {
      return this.body.errors;
    }
    return null;
  }
}

function isValidationError(body: unknown): body is ApiValidationError {
  return (
    typeof body === "object" &&
    body !== null &&
    "errors" in body &&
    typeof (body as ApiValidationError).errors === "object"
  );
}

