<script setup lang="ts">
// Import the Vue-compatible icon component
import { AlertCircle } from 'lucide-vue-next';

// Define the required props
defineProps<{
  message: string;
}>();
</script>


<template>
  <div class="flex gap-3 rounded-lg bg-destructive/10 p-3 border border-destructive/20">
    <AlertCircle class="h-5 w-5 text-destructive shrink-0 mt-0.5" />
    <p class="text-sm text-destructive">{{ message }}</p>
  </div>
</template>