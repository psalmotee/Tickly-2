<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; 
import { RouterLink } from 'vue-router'; 
import { useAuthStore } from '../lib/pinnaAuth'; 
import { storeToRefs } from 'pinia';
import {LogOut, Menu} from 'lucide-vue-next';

// --- STORE & ROUTER ---
const router = useRouter();
const authStore = useAuthStore();

// Access session data via the store's getter/state
const { session } = storeToRefs(authStore);

// --- STATE ---
const isMenuOpen = ref(false);

// --- METHODS ---
const handleLogout = () => {
  // Call the centralized store action
  authStore.logout(); 
  // Navigate to the landing page
  router.push("/");
};

// --- COMPUTED PROPERTIES ---
const isAdmin = computed(() => session.value?.user.role === "admin");
</script>

<template>
  <header class="border-b border-border bg-background">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <RouterLink to="/dashboard" class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span class="text-sm font-bold text-primary-foreground">
              T
            </span>
          </div>
          <span class="text-xl font-bold text-foreground">
            Tickly
          </span>
        </RouterLink>

        <div class="hidden sm:flex items-center gap-4">
          <RouterLink
            v-if="isAdmin"
            to="/admin"
            class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
          >
            Admin Panel
          </RouterLink>
          
          <div class="flex flex-col items-end">
            <p class="text-sm font-medium text-foreground">
              {{ session?.user.name }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ session?.user.email }}
            </p>
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
        <div class="px-2">
          <p class="text-sm font-medium text-foreground">
            {{ session?.user.name }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ session?.user.email }}
          </p>
        </div>
        
        <RouterLink
          v-if="isAdmin"
          to="/admin"
          @click="isMenuOpen = false"
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
        >
          Admin Panel
        </RouterLink>
        
        <button
          @click="handleLogout(); isMenuOpen = false;"
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        >
          <LogOut class="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  </header>
</template>