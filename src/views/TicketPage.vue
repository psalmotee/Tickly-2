<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
// Import converted Vue components
import DashboardHeader from '../components/DashboardHeader.vue';
import TicketList from '../components/TicketList.vue'; 
import CreateTicketForm from '../components/CreateTicketForm.vue';
import Modal from '../components/Modal.vue'; 
// Placeholder for the Vue-compatible icon component
import {Plus} from 'lucide-vue-next'; 

// --- STATE (ref replaces useState) ---
const isCreateModalOpen = ref(false);

// The refreshTrigger is needed here. In a true Vue app, 
// TicketList should ideally watch for a change in a Pinia store 
// that gets updated after creation, but using a numeric ref is the most direct conversion.
const refreshTrigger = ref(0);

// --- METHODS ---
const handleCreateSuccess = () => {
  isCreateModalOpen.value = false;
  // Force TicketList to refresh by incrementing the key/prop
  refreshTrigger.value += 1;
};

const closeModal = () => {
  isCreateModalOpen.value = false;
}
</script>

<template>
  <main class="min-h-screen bg-background">
    <DashboardHeader />

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-foreground mb-2">Tickets</h1>
          <p class="text-muted-foreground">
            Manage and track all your tickets
          </p>
        </div>
        
        <div class="flex gap-3 w-full sm:w-auto">
          <button
            @click="isCreateModalOpen = true"
            class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus class="h-4 w-4" />
            New Ticket
          </button>
          
          <RouterLink
            to="/dashboard"
            class="flex-1 sm:flex-none inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 font-medium text-foreground bg-primary/10 hover:bg-primary/20 hover:border-primary/50 transition-colors"
          >
            Dashboard
          </RouterLink>
        </div>
      </div>

      <TicketList :refresh-trigger="refreshTrigger" :key="refreshTrigger" />
    </div>

    <Modal
      :is-open="isCreateModalOpen"
      :on-close="closeModal"
      title="Create New Ticket"
    >
      <CreateTicketForm @success="handleCreateSuccess" />
    </Modal>
  </main>
</template>