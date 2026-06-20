
export const SESSION_EXPIRED_PATH = "/session-expired";

/** Full-page navigation to the session-expired route (clears cookies → login). */
export function redirectToSessionExpired(): void {
  window.location.href = SESSION_EXPIRED_PATH;
}
