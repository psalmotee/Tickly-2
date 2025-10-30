import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import {
  type AuthSession,
  type User,
  getSession,
  saveSession,
  clearSession,
  login as authLogin,
  signup as authSignup,
} from "../lib/auth";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter(); // Initialize router for use in actions

  // --- STATE ---
  // Hold the current session data, initialized to null
  const session = ref<AuthSession | null>(null);

  // --- GETTERS (Computed Properties) ---
  // Check if a user is currently logged in
  const isAuthenticated = computed(() => !!session.value);

  // Get the current user data
  const user = computed<User | null>(() => session.value?.user ?? null);

  // Check if the current user is an admin
  const isAdmin = computed(() => user.value?.role === "admin");

  // --- ACTIONS ---

  /**
   * Initializes the session state from localStorage on application startup.
   */
  function initializeSession() {
    session.value = getSession();
    // Optional: Log if a session was found
    if (session.value) {
      console.log("Session restored for user:", session.value.user.email);
    }
  }

  /**
   * Handles user login, saves the session, and updates state.
   * @param email The user's email.
   * @param password The user's password.
   * @returns The result of the login attempt.
   */
  async function login(email: string, password: string) {
    // In a real app, this would be an async API call
    const result = authLogin(email, password);

    if (result.success && result.session) {
      saveSession(result.session);
      session.value = result.session; // Update reactive state
    }
    return result;
  }

  /**
   * Handles user signup, automatically logging them in on success.
   * NOTE: This follows your original component logic (signup then auto-login).
   * @param name The user's name.
   * @param email The user's email.
   * @param password The user's password.
   * @returns The result of the signup attempt.
   */
  async function signup(name: string, email: string, password: string) {
    const signupResult = authSignup(email, password, name);

    if (signupResult.success) {
      // Attempt to auto-login after successful signup
      const loginResult = await login(email, password);

      if (loginResult.success) {
        return { success: true };
      } else {
        // This case handles the error where signup succeeded but login failed
        return {
          success: false,
          error:
            loginResult.error || "Signup successful, but auto-login failed.",
        };
      }
    }
    return signupResult;
  }

  /**
   * Clears the local session and updates state, then redirects to home.
   */
  function logout() {
    clearSession();
    session.value = null; // Clear reactive state
    // Redirecting is often handled by the component, but can be done here for forced route cleanup
    router.push("/");
  }

  // --- EXPORTED STATE AND ACTIONS ---
  return {
    session,
    isAuthenticated,
    user,
    isAdmin,
    initializeSession,
    login,
    signup,
    logout,
  };
});
