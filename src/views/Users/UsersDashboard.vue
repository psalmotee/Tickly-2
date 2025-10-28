<script setup>
import { ArrowRight } from "lucide-vue-next"
import { RouterLink } from "vue-router"
import DashboardHeader from "../../components/DashboardHeader.vue"
import StatsCards from "../../components/StatsCards.vue"
</script>

<template>
  <main class="min-h-screen bg-background">
    <DashboardHeader />

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p class="text-muted-foreground">
          Welcome back! Here's an overview of your tickets.
        </p>
      </div>

      <StatsCards />

      <div class="mt-12">
        <div
          class="rounded-lg border border-border bg-card p-8 text-center shadow-sm"
        >
          <h2 class="text-2xl font-bold text-foreground mb-4">
            Ready to manage your tickets?
          </h2>
          <p class="text-muted-foreground mb-6 max-w-md mx-auto">
            Create, view, and manage all your tickets in one place.
          </p>
          <RouterLink
            to="/tickets"
            class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Go to Tickets
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

