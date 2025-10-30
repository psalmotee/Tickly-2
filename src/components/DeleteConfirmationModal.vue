<script setup lang="ts">
import {AlertTriangle} from 'lucide-vue-next'; 

// --- PROPS & EVENTS ---

// Define props matching the React interface
const props = defineProps<{
  title: string;
  description: string;
  itemName: string;
  isLoading?: boolean;
}>();

// Define custom events
const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

// --- METHODS ---
const handleConfirm = () => {
    // Only emit if not currently loading
    if (!props.isLoading) {
        emit('confirm');
    }
};

const handleCancel = () => {
    // Only emit if not currently loading
    if (!props.isLoading) {
        emit('cancel');
    }
};
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-4">
      <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
        <AlertTriangle class="h-5 w-5 text-destructive" />
      </div>
      <h2 class="text-lg font-semibold text-foreground">{{ props.title }}</h2>
    </div>

    <p class="text-sm text-muted-foreground mb-2">{{ props.description }}</p>
    
    <p class="text-sm font-medium text-foreground mb-6">
      This will permanently delete
      <span class="text-destructive">"{{ props.itemName }}"</span>
    </p>

    <div class="flex gap-3">
      <button
        @click="handleCancel"
        :disabled="props.isLoading"
        class="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Cancel
      </button>
      
      <button
        @click="handleConfirm"
        :disabled="props.isLoading"
        class="flex-1 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {{ props.isLoading ? "Deleting..." : "Delete" }}
      </button>
    </div>
  </div>
</template>