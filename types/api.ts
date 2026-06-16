/**
 * Shared types describing the shape of responses from the Laravel API.
 *
 * Laravel API Resources wrap payloads in a `data` key and attach `meta`/`links`
 * when paginating. Validation errors come back as HTTP 422 with a `message` and
 * a field-keyed `errors` map. Adjust these to match your backend conventions.
 */

/** A single-resource response: `return new UserResource($user);` */
export interface ApiResource<T> {
  success: boolean;
  message: string;
  data: T;
}

/** Pagination metadata from Laravel's `->paginate()` resource collections. */
export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
  path: string;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

/** A paginated collection response. */
export interface ApiCollection<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

/** The body Laravel returns on a 422 validation failure. */
export interface ApiValidationError {
  message: string;
  errors: Record<string, string[]>;
}
