// router/index.ts

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Features from "../views/LandingPage/Features.vue";
import Login from "../views/Auth/Login.vue";
import Signup from "../views/Auth/Signup.vue";
// 1. Import the new Dashboard component
import DashboardPage from "../views/dashboard/DashboardPage.vue";
import TicketPage from "../views/TicketPage.vue";
// You will also need the Pinia store to implement the navigation guard
import { useAuthStore } from "../lib/pinnaAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/feactures",
      name: "features",
      component: Features, 
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    // Dashboard route
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardPage, 
      meta: { requiresAuth: true }, 
    },
    // Ticket route
    {
      path: "/tickets",
      name: "tickets",
      component: TicketPage, 
      meta: { requiresAuth: true }, 
    },
  ],
});

// 3. Add a global navigation guard to protect authenticated routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // If the route requires auth and the user is not logged in, redirect to login
    next({ name: "login" });
  } else if (
    (to.name === "login" || to.name === "signup") &&
    authStore.isAuthenticated
  ) {
    // If the user is logged in and tries to access login/signup, redirect to dashboard
    next({ name: "dashboard" });
  } else {
    // Proceed as normal
    next();
  }
});

export default router;
