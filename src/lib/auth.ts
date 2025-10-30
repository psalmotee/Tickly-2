
// src/lib/auth.ts
// Authentication utility functions using localStorage

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

export interface AuthSession {
  user: User;
  token: string;
}

const STORAGE_KEY = "Tickly_session";

/**
 * Saves the authenticated session object to localStorage.
 * @param session The AuthSession object.
 */
export function saveSession(session: AuthSession): void {
  // We can assume localStorage is available in a Vue SPA
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

/**
 * Retrieves the session object from localStorage.
 * @returns The AuthSession object or null if not found/invalid.
 */
export function getSession(): AuthSession | null {
  try {
    const session = localStorage.getItem(STORAGE_KEY);
    return session ? JSON.parse(session) : null;
  } catch (e) {
    // Logging the error might be useful, but returning null maintains existing logic
    console.error("Error retrieving session from localStorage:", e);
    return null;
  }
}

/**
 * Clears the authenticated session from localStorage.
 */
export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Generates a mock authentication token.
 * @returns A random string token.
 */
export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Validates the email format.
 * @param email The email string to validate.
 * @returns True if valid, false otherwise.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates the password length.
 * @param password The password string to validate.
 * @returns An error message string if invalid, or null if valid.
 */
export function validatePassword(password: string): string | null {
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
}

// Mock user database (in real app, this would be a backend)
const users: Map<
  string,
  { email: string; password: string; name: string; role: "user" | "admin" }
> = new Map();

// Initialize with demo admin account and persist to localStorage
// to survive page reloads in the demo.
// The check for typeof window !== "undefined" is no longer strictly necessary
// in a Vue SPA but removing the old logic for a clean run.

const existingUsers = localStorage.getItem("Tickly_users");

if (existingUsers) {
  // Load existing users if the demo has been run before
  const parsedUsers = JSON.parse(existingUsers);
  for (const [email, userData] of Object.entries(parsedUsers)) {
    users.set(email, userData as any); // Use 'any' here for simplicity in a mock, or define a better type
  }
} else {
  // Initialize default demo accounts
  const initialUsers = {
    "admin@example.com": {
      email: "admin@example.com",
      password: "admin123",
      name: "Admin User",
      role: "admin" as "admin",
    },
    "demo@example.com": {
      email: "demo@example.com",
      password: "demo123",
      name: "Demo User",
      role: "user" as "user",
    },
  };
  users.set("admin@example.com", initialUsers["admin@example.com"]);
  users.set("demo@example.com", initialUsers["demo@example.com"]);

  // Save initial users to persist the Map state across reloads for the mock
  localStorage.setItem(
    "Tickly_users",
    JSON.stringify(Object.fromEntries(users))
  );
}

/**
 * Mocks user sign up.
 * @returns A success status object.
 */
export function signup(
  email: string,
  password: string,
  name: string
): { success: boolean; error?: string } {
  if (users.has(email)) {
    return { success: false, error: "Email already registered" };
  }

  // Add new user to mock database and persist the change
  users.set(email, { email, password, name, role: "user" });
  localStorage.setItem(
    "Tickly_users",
    JSON.stringify(Object.fromEntries(users))
  );

  return { success: true };
}

/**
 * Mocks user login.
 * @returns A status object with session data on success.
 */
export function login(
  email: string,
  password: string
): { success: boolean; session?: AuthSession; error?: string } {
  const user = users.get(email);

  if (!user || user.password !== password) {
    return { success: false, error: "Invalid email or password" };
  }

  const session: AuthSession = {
    user: {
      id: email,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token: generateToken(),
  };

  return { success: true, session };
}

/**
 * Retrieves a list of all mock users. (Admin function)
 * @returns An array of user details.
 */
export function getAllUsers(): Array<{
  email: string;
  name: string;
  role: "user" | "admin";
}> {
  return Array.from(users.values()).map(({ email, name, role }) => ({
    email,
    name,
    role,
  }));
}
