<script setup lang="ts">
import { X } from 'lucide-vue-next'; 
import { onMounted, onUnmounted } from 'vue';

// --- PROPS & EVENTS ---
const props = defineProps<{
  isOpen: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

// --- METHODS ---
const handleClose = () => {
  emit('close'); // This is correct
};

// Optional: Add logic for closing with the Escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    handleClose();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      
      <div class="fixed inset-0 bg-black/50" @click="handleClose" />
      
      <div 
        class="relative bg-card rounded-lg border border-border shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        @click.stop >
        
        <div class="sticky top-0 flex items-center justify-between border-b border-border bg-card p-6">
          <h2 class="text-lg font-semibold text-foreground">{{ title }}</h2>
          <button
            @click="handleClose"
            class="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X class="h-5 w-5 text-foreground" />
          </button>
        </div>
        
        <div class="p-6">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>