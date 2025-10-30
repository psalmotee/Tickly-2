<script setup lang="ts">
import { computed } from 'vue';
// Import the Ticket type from the utility file
import type { Ticket } from "../lib/tickets"; 
import { Trash2, Edit2, CheckCircle2 } from 'lucide-vue-next';

// --- PROPS  ---
const props = defineProps<{
  ticket: Ticket;
}>();

// --- EVENTS ---
const emit = defineEmits<{
  (e: 'edit', ticket: Ticket): void;
  (e: 'delete', id: string): void;
}>();


// --- COMPUTED CONSTANTS ---
const statusColors = {
  open: "bg-amber-500/10 text-amber-700 border-amber-200",
  "in-progress": "bg-blue-500/10 text-blue-700 border-blue-200",
  closed: "bg-green-500/10 text-green-700 border-green-200",
};

const priorityColors = {
  low: "text-gray-600",
  medium: "text-amber-600",
  high: "text-red-600",
};

// --- COMPUTED PROPERTIES ---

// Status text display logic
const statusDisplay = computed(() => {
  if (props.ticket.status === "in-progress") return "In Progress";
  return props.ticket.status.charAt(0).toUpperCase() + props.ticket.status.slice(1);
});

// Priority text display logic
const priorityDisplay = computed(() => {
  return props.ticket.priority.charAt(0).toUpperCase() + props.ticket.priority.slice(1);
});

// Priority class display logic
const priorityClass = computed(() => {
  return priorityColors[props.ticket.priority];
});

// Status class display logic
const statusClass = computed(() => {
  return statusColors[props.ticket.status];
});

// Formatted date display
const formattedDate = computed(() => {
    return new Date(props.ticket.createdAt).toLocaleDateString();
});

// --- METHODS ---
const handleEditClick = () => {
    // Emit the 'edit' event instead of calling the prop function
    emit('edit', props.ticket);
}

const handleDeleteClick = () => {
    // Emit the 'delete' event instead of calling the prop function
    emit('delete', props.ticket.id);
}
</script>

<template>
  <div class="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
    <div class="flex items-start justify-between gap-4 mb-3">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-foreground">
          {{ props.ticket.title }}
        </h3>
        <p class="text-sm text-muted-foreground mt-1">
          {{ props.ticket.description }}
        </p>
      </div>
      
      <div class="flex gap-2">
        <button
          @click="handleEditClick"
          class="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground"
          title="Edit ticket"
        >
          <Edit2 class="h-4 w-4" />
        </button>
        <button
          @click="handleDeleteClick"
          class="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
          title="Delete ticket"
        >
          <Trash2 class="h-4 w-4" />
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 items-center">
      <span
        :class="['inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium', statusClass]"
      >
        <CheckCircle2 v-if="props.ticket.status === 'closed'" class="h-3 w-3 mr-1" />
        {{ statusDisplay }}
      </span>

      <span
        :class="['text-xs font-medium', priorityClass]"
      >
        {{ priorityDisplay }} Priority
      </span>
      
      <span class="text-xs text-muted-foreground ml-auto">
        {{ formattedDate }}
      </span>
    </div>
  </div>
</template>