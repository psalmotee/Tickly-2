import { getSession, type AuthSession } from "./auth";

/**
 * Checks if a given session object belongs to an administrator.
 * @param session The current authentication session.
 * @returns true if the user role is 'admin', false otherwise.
 */
export function isAdmin(session: AuthSession | null): boolean {
  return session?.user.role === "admin";
}

/**
 * Retrieves the current session and checks for admin access.
 * This is used for synchronous client-side checks.
 * @returns true if an active session belongs to an admin, false otherwise.
 */
export function checkAdminAccess(): boolean {
  const session = getSession();
  return isAdmin(session);
}
