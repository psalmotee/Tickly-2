<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import { useAuthStore } from '../../lib/pinnaAuth'; 
import { isAdmin } from '../../lib/admin'; 
import AdminHeader from '../../components/AdminHeader.vue'; 
import AdminUsersList from '../../components/AdminUsersList.vue';

// --- STATE ---
const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);

// --- LIFECYCLE / SIDE EFFECTS ---
onMounted(() => {
  // 1. Authentication Check
  const session = authStore.session;
  
  // Check if a session exists AND if the user is an admin
  if (!session || !isAdmin(session)) {
    console.log("Admin access required, redirecting.");
    router.push("/dashboard");
    return;
  }
  
  // 2. Hide Loading State
  isLoading.value = false;
});
</script>

<template>
  <div v-if="isLoading" class="min-h-screen bg-background flex items-center justify-center">
    <div class="text-center">
      <div class="inline-flex h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p class="mt-4 text-muted-foreground">Loading...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-background">
    <AdminHeader />

    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">Manage Users</h1>
        <p class="text-muted-foreground mt-2">
          View all registered users in the system
        </p>
      </div>

      <AdminUsersList />
    </main>
  </div>
</template>