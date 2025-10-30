<script setup lang="ts">
import { computed } from 'vue';
import { BarChart3, AlertCircle, CheckCircle2, Clock } from 'lucide-vue-next';

// Define the required props
interface AdminStatsProps {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}
const props = defineProps<AdminStatsProps>();

// --- COMPUTED PROPERTY (replaces defining stats inside the function) ---
const stats = computed(() => [
  {
    label: "Total Tickets",
    value: props.total,
    icon: BarChart3,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    label: "Open",
    value: props.open,
    icon: AlertCircle,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "In Progress",
    value: props.inProgress,
    icon: Clock,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    label: "Closed",
    value: props.closed,
    icon: CheckCircle2,
    color: "bg-green-500/10 text-green-600",
  },
]);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="rounded-lg border border-border bg-card p-6"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-muted-foreground">{{ stat.label }}</p>
          <p class="text-3xl font-bold text-foreground mt-2">
            {{ stat.value }}
          </p>
        </div>
        <div
          :class="`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`"
        >
          <component :is="stat.icon" class="h-6 w-6" />
        </div>
      </div>
    </div>
  </div>
</template>