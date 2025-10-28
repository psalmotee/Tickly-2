<!-- src/components/EditTicketForm.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { updateTicket, type Ticket, type TicketStatus } from '../lib/tickets';
// Use the global toast function (assuming vue-toastification setup)
import { useToast } from 'vue-toastification';
// Import the Vue-compatible icon component
import {AlertCircle} from 'lucide-vue-next';

// --- PROPS & EVENTS ---

// Define the required props
const props = defineProps<{
  ticket: Ticket;
}>();

// Define the custom event (replaces onSuccess)
const emit = defineEmits<{
  (e: 'success'): void;
}>();

// --- SETUP ---
const toast = useToast();

// --- STATE (ref replaces useState) ---
// Initialize form fields with prop values
const title = ref(props.ticket.title);
const description = ref(props.ticket.description);
const status = ref<TicketStatus>(props.ticket.status);
const priority = ref(props.ticket.priority);
const error = ref("");
const isLoading = ref(false);

// WATCHER: Reset form state if the parent component passes a new ticket prop
// This ensures the form updates if the user selects a different ticket in the parent list.
watch(() => props.ticket, (newTicket) => {
  title.value = newTicket.title;
  description.value = newTicket.description;
  status.value = newTicket.status;
  priority.value = newTicket.priority;
  error.value = "";
  isLoading.value = false;
}, { deep: true });


// --- METHODS ---
const handleSubmit = () => {
  error.value = "";
  isLoading.value = true;

  if (!title.value.trim()) {
    error.value = "Title is required";
    isLoading.value = false;
    return;
  }

  if (!description.value.trim()) {
    error.value = "Description is required";
    isLoading.value = false;
    return;
  }

  try {
    // Call the utility function to update the ticket
    updateTicket(props.ticket.id, { 
      title: title.value, 
      description: description.value, 
      status: status.value, 
      priority: priority.value 
    });
    
    toast.success("Ticket updated successfully!");
    // Emit the success event (replaces onSuccess)
    emit('success'); 

  } catch (err) {
    console.error("Update error:", err);
    error.value = "Failed to update ticket";
  }

  isLoading.value = false;
};
</script>

<template>
  <!-- @submit.prevent handles form submission in Vue -->
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Error Alert -->
    <div v-if="error" class="flex gap-3 rounded-lg bg-destructive/10 p-3 border border-destructive/20">
      <AlertCircle class="h-5 w-5 text-destructive shrink-0 mt-0.5" />
      <p class="text-sm text-destructive">{{ error }}</p>
    </div>

    <!-- Title Input -->
    <div>
      <label
        for="title"
        class="block text-sm font-medium text-foreground mb-2"
      >
        Title
      </label>
      <input
        id="title"
        type="text"
        v-model="title"
        class="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        :disabled="isLoading"
      />
    </div>

    <!-- Description Textarea -->
    <div>
      <label
        for="description"
        class="block text-sm font-medium text-foreground mb-2"
      >
        Description
      </label>
      <textarea
        id="description"
        v-model="description"
        rows="4"
        class="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
        :disabled="isLoading"
      />
    </div>

    <!-- Status and Priority Selects -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Status Select -->
      <div>
        <label
          for="status"
          class="block text-sm font-medium text-foreground mb-2"
        >
          Status
        </label>
        <select
          id="status"
          v-model="status"
          class="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          :disabled="isLoading"
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <!-- Priority Select -->
      <div>
        <label
          for="priority"
          class="block text-sm font-medium text-foreground mb-2"
        >
          Priority
        </label>
        <select
          id="priority"
          v-model="priority"
          class="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          :disabled="isLoading"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="isLoading"
      class="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {{ isLoading ? "Updating..." : "Update Ticket" }}
    </button>
  </form>
</template>