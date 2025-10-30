<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
// Import the Pinia store and the utility for reactive state extraction
import { useAuthStore } from '../lib/pinnaAuth';
import { storeToRefs } from 'pinia'; 
import { LogOut, Menu, LayoutDashboard } from 'lucide-vue-next';

// --- STORE & ROUTER ---
const router = useRouter();
const authStore = useAuthStore();

// Extract reactive properties from the store
const { session } = storeToRefs(authStore);

// --- STATE (ref replaces useState) ---
const isMenuOpen = ref(false);

// --- METHODS ---
const handleLogout = () => {
  // Pinia store action handles clearing session and redirecting
  authStore.logout(); 
};

// --- COMPUTED (for template simplification) ---
// Use optional chaining for safety, although the component should only load for authenticated users
const userName = computed(() => session.value?.user.name || 'Admin User'); 
</script>

<template>
  <header class="border-b border-border bg-background">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        
        <div class="flex items-center gap-4">
          <RouterLink to="/admin" class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span class="text-sm font-bold text-primary-foreground">
                T
              </span>
            </div>
            <span class="text-xl font-bold text-foreground">
              Tickly
            </span>
          </RouterLink>
          <div class="hidden sm:flex items-center gap-2 ml-4 pl-4 border-l border-border">
            <span class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Admin Panel
            </span>
          </div>
        </div>

        <div class="hidden sm:flex items-center gap-4">
          
          <nav class="flex items-center gap-2">
            <RouterLink
              to="/admin"
              class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <LayoutDashboard class="h-4 w-4" />
              Dashboard
            </RouterLink>
            <RouterLink
              to="/admin/tickets"
              class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Tickets
            </RouterLink>
            <RouterLink
              to="/admin/users"
              class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Users
            </RouterLink>
          </nav>

          <div class="flex flex-col items-end">
            <p class="text-sm font-medium text-foreground">
              {{ userName }}
            </p>
            <p class="text-xs text-muted-foreground">Admin</p>
          </div>
          
          <button
            @click="handleLogout"
            class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-secondary transition-colors"
          >
            <LogOut class="h-4 w-4" />
            Logout
          </button>
        </div>

        <button
          @click="isMenuOpen = !isMenuOpen"
          class="sm:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <Menu class="h-5 w-5 text-foreground" />
        </button>
      </div>

      <div v-if="isMenuOpen" class="sm:hidden border-t border-border py-4 space-y-3">
        <nav class="flex flex-col gap-2">
          <RouterLink
            to="/admin"
            @click="isMenuOpen = false"
            class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <LayoutDashboard class="h-4 w-4" />
            Dashboard
          </RouterLink>
          <RouterLink
            to="/admin/tickets"
            @click="isMenuOpen = false"
            class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Tickets
          </RouterLink>
          <RouterLink
            to="/admin/users"
            @click="isMenuOpen = false"
            class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Users
          </RouterLink>
        </nav>
        
        <div class="px-3 py-2 border-t border-border">
          <p class="text-sm font-medium text-foreground">
            {{ userName }}
          </p>
          <p class="text-xs text-muted-foreground">Admin</p>
        </div>
        
        <button
          @click="handleLogout(); isMenuOpen = false;"
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-secondary transition-colors"
        >
          <LogOut class="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  </header>
</template>