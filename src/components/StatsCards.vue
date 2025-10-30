<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '../lib/pinnaAuth'; 
import { getTicketStats } from '../lib/tickets'; 
import {BarChart3, AlertCircle, CheckCircle2, Clock} from 'lucide-vue-next';

// --- STATE & DATA ---````
const authStore = useAuthStore();

// Use a computed property to reactively calculate stats based on the user
const stats = computed(() => {
  const userId = authStore.user?.id;
  // Use the utility function if a user is logged in
  if (userId) {
    // NOTE: If getTicketStats were async, this would require a different pattern (like an async action in Pinia)
    return getTicketStats(userId); 
  }
  return { total: 0, open: 0, inProgress: 0, closed: 0 };
});

const cards = computed(() => [
  {
    label: "Total Tickets",
    value: stats.value.total,
    icon: BarChart3, 
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    label: "Open",
    value: stats.value.open,
    icon: AlertCircle,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "In Progress",
    value: stats.value.inProgress,
    icon: Clock,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    label: "Closed",
    value: stats.value.closed,
    icon: CheckCircle2,
    color: "bg-green-500/10 text-green-600",
  },
]);
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="card in cards"
      :key="card.label"
      class="rounded-lg border border-border bg-card p-6"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-muted-foreground">
            {{ card.label }}
          </p>
          <p class="text-3xl font-bold text-foreground mt-2">
            {{ card.value }}
          </p>
        </div>
        
        <div :class="['rounded-lg p-3', card.color]">
          <component :is="card.icon" class="h-6 w-6" /> 
        </div>
      </div>
    </div>
  </div>
</template>