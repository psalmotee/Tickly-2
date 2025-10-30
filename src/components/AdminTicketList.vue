<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  getAllTickets,
  updateTicket,
  deleteTicket,
  type Ticket,
} from '../lib/tickets';
import Modal from './Modal.vue'; 
import DeleteConfirmationModal from './DeleteConfirmationModal.vue'; 
import { Trash2, ChevronDown, CheckCircle2 } from 'lucide-vue-next'; 
import { useToast } from 'vue-toastification';


// --- STATE (ref replaces useState) ---
const toast = useToast();
const tickets = ref<Ticket[]>([]);
const deleteModal = ref<{
  isOpen: boolean;
  ticket: Ticket | null;
}>({
  isOpen: false,
  ticket: null,
});
const editingId = ref<string | null>(null);
const isLoading = ref(false);

// --- UTILITY FUNCTIONS ---

const getStatusLabel = (status: string) => {
  if (status === 'closed') return 'Resolved';
  if (status === 'in-progress') return 'In Progress';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-amber-500/10 text-amber-700 border-amber-200';
    case 'in-progress':
      return 'bg-blue-500/10 text-blue-700 border-blue-200';
    case 'closed':
      return 'bg-green-500/10 text-green-700 border-green-200';
    default:
      return 'bg-gray-500/10 text-gray-700 border-gray-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-600';
    case 'medium':
      return 'text-amber-600';
    case 'low':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
};

// --- CORE METHODS ---

const loadTickets = () => {
  tickets.value = getAllTickets();
};

const handleStatusChange = (
  ticket: Ticket,
  status: 'open' | 'in-progress' | 'closed'
) => {
  updateTicket(ticket.id, { status });
  loadTickets();
  editingId.value = null;
  toast.success(`Ticket marked as ${getStatusLabel(status)} `);
};

const handleDeleteClick = (ticket: Ticket) => {
  deleteModal.value = { isOpen: true, ticket };
};

const handleConfirmDelete = async () => {
  if (!deleteModal.value.ticket) return;
  isLoading.value = true;
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300)); 
  
  deleteTicket(deleteModal.value.ticket.id);
  loadTickets();
  
  deleteModal.value = { isOpen: false, ticket: null };
  isLoading.value = false;
  toast.success('Ticket deleted successfully');
};

onMounted(() => {
  loadTickets();
});

</script>

<template>
  <div class="rounded-lg border border-border bg-card">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-border bg-secondary/50">
            <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Title
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">
              User
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Status
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Priority
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Created
            </th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="tickets.length === 0">
            <td
              colspan="6"
              class="px-6 py-8 text-center text-muted-foreground"
            >
              No tickets found
            </td>
          </tr>
          
          <tr
            v-for="ticket in tickets"
            :key="ticket.id"
            class="border-b border-border hover:bg-secondary/30 transition-colors"
          >
            <td class="px-6 py-4">
              <div>
                <p class="font-medium text-foreground">
                  {{ ticket.title }}
                </p>
                <p class="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {{ ticket.description }}
                </p>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-muted-foreground">
              {{ ticket.userId }}
            </td>
            
            <td class="px-6 py-4">
              <div class="relative">
                <button
                  @click="editingId = editingId === ticket.id ? null : ticket.id"
                  :class="[
                    'inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-medium transition-colors',
                    getStatusColor(ticket.status)
                  ]"
                >
                  <CheckCircle2 v-if="ticket.status === 'closed'" class="h-3 w-3" />
                  {{ getStatusLabel(ticket.status) }}
                  <ChevronDown class="h-3 w-3" />
                </button>
                
                <div 
                  v-if="editingId === ticket.id" 
                  class="absolute top-full mt-1 left-0 z-10 rounded-lg border border-border bg-card shadow-lg w-32"
                >
                  <button
                    v-for="status in (['open', 'in-progress', 'closed'] as const)"
                    :key="status"
                    @click="handleStatusChange(ticket, status)"
                    class="block w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {{ getStatusLabel(status) }}
                  </button>
                </div>
              </div>
            </td>
            
            <td class="px-6 py-4">
              <span
                :class="[
                  'text-sm font-medium capitalize',
                  getPriorityColor(ticket.priority)
                ]"
              >
                {{ ticket.priority }}
              </span>
            </td>
            
            <td class="px-6 py-4 text-sm text-muted-foreground">
              {{ new Date(ticket.createdAt).toLocaleDateString() }}
            </td>
            
            <td class="px-6 py-4 text-right">
              <button
                @click="handleDeleteClick(ticket)"
                class="inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 class="h-4 w-4" />
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <Modal
    :is-open="deleteModal.isOpen"
    @close="deleteModal = { isOpen: false, ticket: null }"
    title="Delete Ticket"
  >
    <DeleteConfirmationModal
      v-if="deleteModal.ticket"
      title="Delete Ticket"
      description="Are you sure you want to delete this ticket?"
      :item-name="deleteModal.ticket.title"
      @confirm="handleConfirmDelete"
      @cancel="deleteModal = { isOpen: false, ticket: null }"
      :is-loading="isLoading"
    />
  </Modal>
</template>