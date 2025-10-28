<script setup lang="ts">
import { ref } from 'vue';
import { createTicket } from '../lib/tickets';
import { validateTicketForm } from '../lib/validation'; 
import { useAuthStore } from '../lib/pinnaAuth'; 
import { useToast } from 'vue-toastification';

const emit = defineEmits<{
  (e: 'success'): void;
}>();


const authStore = useAuthStore();
const toast = useToast();

const title = ref("");
const description = ref("");
const priority = ref<"low" | "medium" | "high">("medium");
const isLoading = ref(false);

const handleSubmit = () => {
  isLoading.value = true;
  
  const validation = validateTicketForm(title.value, description.value);
  if (!validation.isValid) {
    validation.errors.forEach((err) => toast.error(err.message));
    isLoading.value = false;
    return;
  }
  
  const userId = authStore.user?.id;
  if (!userId) {
    toast.error("Authentication required to create a ticket.");
    isLoading.value = false;
    return;
  }

  // 3. Ticket Creation
  try {
    // Call the utility function
    createTicket(title.value, description.value, priority.value, userId);
    
    toast.success("Ticket created successfully!");
    
    // Reset form fields
    title.value = "";
    description.value = "";
    priority.value = "medium";

    // Emit success event (replaces onSuccess)
    emit('success');

  } catch (err) {
    console.error("Failed to create ticket:", err);
    toast.error("Failed to create ticket");
  }

  isLoading.value = false;
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    
    <div>
      <label class="block text-sm font-medium text-foreground mb-2">
        Title
      </label>
      <input
        type="text"
        v-model="title"
        placeholder="Ticket title"
        class="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        :disabled="isLoading"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-foreground mb-2">
        Description
      </label>
      <textarea
        v-model="description"
        placeholder="Ticket description"
        rows="4"
        class="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
        :disabled="isLoading"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-foreground mb-2">
        Priority
      </label>
      <select
        v-model="priority"
        class="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        :disabled="isLoading"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      class="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {{ isLoading ? "Creating..." : "Create Ticket" }}
    </button>
  </form>
</template>