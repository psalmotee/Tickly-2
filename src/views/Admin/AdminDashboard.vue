<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router"; // Replaces next/navigation and next/link
import { useAuthStore } from "../../lib/pinnaAuth"; // Centralized authentication logic
import { getAllTicketsStats } from "../../lib/tickets"; // Utility for fetching stats
import { isAdmin } from "../../lib/admin"; // Utility for admin check

import AdminHeader from "../../components/AdminHeader.vue";
import AdminStats from "../../components/AdminStats.vue";

// Import Lucide Vue icons
import { TrendingUp, Users, Ticket } from "lucide-vue-next";

// --- STORE & ROUTER ---
const router = useRouter();
const authStore = useAuthStore();

// --- STATE ---
const isLoading = ref(true);

// NOTE: We use a generic type here since the original getAllTicketsStats type is internal.
// Ensure this matches the structure: { total: number, open: number, inProgress: number, closed: number, byUser: Array<{ name: string, count: number, open: number, closed: number }> }
const stats = ref<ReturnType<typeof getAllTicketsStats> | null>(null);

// --- LIFECYCLE / SIDE EFFECTS (onMounted replaces useEffect) ---
onMounted(() => {
  // 1. Authentication Check
  const session = authStore.session;

  if (!session || !isAdmin(session)) {
    console.log("Access denied, redirecting to dashboard.");
    router.push("/dashboard");
    return;
  }

  // 2. Fetch Stats
  // NOTE: getAllTicketsStats is synchronous in the original code.
  stats.value = getAllTicketsStats();

  // 3. Update Loading State
  isLoading.value = false;
});
</script>

<template>
  <div
    v-if="isLoading || !stats"
    class="min-h-screen bg-background flex items-center justify-center"
  >
    <div class="text-center">
      <div
        class="inline-flex h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
      ></div>
      <p class="mt-4 text-muted-foreground">Loading...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-background">
    <AdminHeader />

    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p class="text-muted-foreground mt-2">
          Manage all tickets and users in the system
        </p>
      </div>

      <AdminStats
        :total="stats.total"
        :open="stats.open"
        :in-progress="stats.inProgress"
        :closed="stats.closed"
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <RouterLink
          to="/admin/tickets"
          class="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:bg-secondary/30 transition-all group"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground">Manage Tickets</p>
              <p class="text-2xl font-bold text-foreground mt-2">
                {{ stats.total }}
              </p>
            </div>
            <div
              class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
            >
              <Ticket class="h-6 w-6 text-primary" />
            </div>
          </div>
        </RouterLink>

        <RouterLink
          to="/admin/users"
          class="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:bg-secondary/30 transition-all group"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground">Manage Users</p>
              <p class="text-2xl font-bold text-foreground mt-2">
                {{ stats.byUser.length }}
              </p>
            </div>
            <div
              class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
            >
              <Users class="h-6 w-6 text-primary" />
            </div>
          </div>
        </RouterLink>

        <div class="rounded-lg border border-border bg-card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground">Closed Rate</p>
              <p class="text-2xl font-bold text-foreground mt-2">
                {{
                  stats.total > 0
                    ? Math.round((stats.closed / stats.total) * 100)
                    : 0
                }}%
              </p>
            </div>
            <div
              class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10"
            >
              <TrendingUp class="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-xl font-bold text-foreground mb-4">
          Top Users by Ticket Count
        </h2>
        <div class="rounded-lg border border-border bg-card overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border bg-secondary/50">
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-foreground"
                  >
                    User
                  </th>
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-foreground"
                  >
                    Total Tickets
                  </th>
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-foreground"
                  >
                    Open
                  </th>
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-foreground"
                  >
                    Closed
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="stats.byUser.length === 0">
                  <td
                    colspan="4"
                    class="px-6 py-8 text-center text-muted-foreground"
                  >
                    No users with tickets
                  </td>
                </tr>
                <template v-else>
                  <tr
                    v-for="user in stats.byUser.slice(0, 5)"
                    :key="user.name"
                    class="border-b border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td class="px-6 py-4 font-medium text-foreground">
                      {{ user.name }}
                    </td>
                    <td class="px-6 py-4 text-sm text-muted-foreground">
                      {{ user.count }}
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-700"
                      >
                        {{ user.open }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700"
                      >
                        {{ user.closed }}
                      </span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
