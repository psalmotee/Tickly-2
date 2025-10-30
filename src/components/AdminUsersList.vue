<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllUsers } from '../lib/auth'; 
import { Shield, User } from 'lucide-vue-next'; 

// Define the User type structure for local state
interface UserData {
  email: string;
  name: string;
  role: 'user' | 'admin';
}

// --- STATE (ref replaces useState) ---
const users = ref<UserData[]>([]);

onMounted(() => {
  // Synchronous data fetch from local storage utility
  users.value = getAllUsers();
});
</script>

<template>
  <div class="rounded-lg border border-border bg-card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-border bg-secondary/50">
            <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Name
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Email
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Role
            </th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-foreground">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="users.length === 0">
            <td
              colspan="4"
              class="px-6 py-8 text-center text-muted-foreground"
            >
              No users found
            </td>
          </tr>
          
          <tr
            v-for="user in users"
            :key="user.email"
            class="border-b border-border hover:bg-secondary/30 transition-colors"
          >
            <td class="px-6 py-4 font-medium text-foreground">
              {{ user.name }}
            </td>
            <td class="px-6 py-4 text-sm text-muted-foreground">
              {{ user.email }}
            </td>
            <td class="px-6 py-4">
              <div class="inline-flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-1">
                <template v-if="user.role === 'admin'">
                  <Shield class="h-4 w-4 text-primary" />
                  <span class="text-sm font-medium text-primary">
                    Admin
                  </span>
                </template>
                <template v-else>
                  <User class="h-4 w-4 text-muted-foreground" />
                  <span class="text-sm font-medium text-muted-foreground">
                    User
                  </span>
                </template>
              </div>
            </td>
            <td class="px-6 py-4 text-right">
              <span class="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-700">
                Active
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>