<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { getTicketsByUser, deleteTicket, type Ticket } from '../lib/tickets';
import { useAuthStore } from '../lib/pinnaAuth'; 
import { useToast } from 'vue-toastification';
import TicketCard from './TicketCard.vue';
import Modal from './Modal.vue';
import EditTicketForm from './EditTicketForm.vue';
import DeleteConfirmationModal from './DeleteConfirmationModal.vue';

// --- PROPS (replaces interface) ---
// The refreshTrigger prop is watched to refetch data.
const props = defineProps<{
  refreshTrigger: number;
}>();

// --- SETUP ---
const authStore = useAuthStore();
const toast = useToast();

// --- STATE (ref/reactive replaces useState) ---
const tickets = ref<Ticket[]>([]);
const selectedTicket = ref<Ticket | null>(null);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isDeleting = ref(false);

// --- DATA FETCHING LOGIC (replaces useEffect) ---

const fetchTickets = () => {
  const userId = authStore.user?.id;
  if (userId) {
    // NOTE: This assumes getTicketsByUser is synchronous (as in the lib file)
    tickets.value = getTicketsByUser(userId);
  } else {
    tickets.value = [];
  }
};

// 1. Initial Load 
onMounted(() => {
  fetchTickets();
});

// 2. Refresh Watcher 
watch(() => props.refreshTrigger, () => {
  fetchTickets();
});

// --- METHODS (replaces handlers) ---

const handleEdit = (ticket: Ticket) => {
  selectedTicket.value = ticket;
  isEditModalOpen.value = true;
};

const handleDeleteClick = (ticket: Ticket) => {
  selectedTicket.value = ticket;
  isDeleteModalOpen.value = true;
};

const handleConfirmDelete = () => {
  if (!selectedTicket.value) return;
  isDeleting.value = true;

  try {
    const success = deleteTicket(selectedTicket.value.id);
    
    if (success) {
      // Refresh the local list immediately after deletion
      fetchTickets();
      toast.success("Ticket deleted successfully ");
    } else {
      toast.error("Ticket not found or failed to delete.");
    }

  } catch (error) {
    toast.error("Failed to delete ticket");
  } finally {
    isDeleting.value = false;
    isDeleteModalOpen.value = false;
    selectedTicket.value = null;
  }
};

const handleEditSuccess = () => {
  isEditModalOpen.value = false;
  selectedTicket.value = null;
  // Refresh the local list immediately after successful edit
  fetchTickets();
  toast.success("Ticket updated successfully");
};
</script>

<template>
  <div v-if="tickets.length === 0" class="rounded-lg border border-border bg-card p-12 text-center">
    <p class="text-muted-foreground mb-4">
      No tickets yet. Create one to get started!
    </p>
  </div>

  <template v-else>
    <div class="grid gap-4">
      <TicketCard
        v-for="ticket in tickets"
        :key="ticket.id"
        :ticket="ticket"
        @edit="handleEdit(ticket)"
        @delete="handleDeleteClick(ticket)"
      />
    </div>

    <Modal
      :is-open="isEditModalOpen"
      @close="() => isEditModalOpen = false"
      title="Edit Ticket"
    >
      <EditTicketForm
        v-if="selectedTicket"
        :ticket="selectedTicket"
        @success="handleEditSuccess"
      />
    </Modal>

    <Modal
      :is-open="isDeleteModalOpen"
      @close="() => isDeleteModalOpen = false"
      title="Delete Ticket"
    >
      <DeleteConfirmationModal
        v-if="selectedTicket"
        title="Delete Ticket"
        description="Are you sure you want to delete this ticket?"
        :item-name="selectedTicket.title || ''"
        :is-loading="isDeleting"
        @confirm="handleConfirmDelete"
        @cancel="() => isDeleteModalOpen = false"
      />
    </Modal>
  </template>
</template>