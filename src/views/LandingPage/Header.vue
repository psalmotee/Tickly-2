<script setup lang="ts">
// Import Vue Router's component for navigation
import { RouterLink } from 'vue-router';

// This component is purely presentational, so the script block is minimal.
</script>

<template>
  <nav class="border-b border-border bg-background/95 backdrop-blur [backdrop-filter]:bg-background/60">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span class="text-sm font-bold text-primary-foreground">
              T
            </span>
          </div>
          <span class="text-xl font-bold text-foreground">Tickly</span>
        </div>
        
        <div class="flex items-center gap-4">
          <RouterLink
            to="/login"
            class="text-sm px-4 py-2 border border-border hover:border-primary/50 rounded-lg bg-primary/10 hover:bg-primary/20 font-medium text-foreground transition-colors"
          >
            Log in
          </RouterLink>
          
          <RouterLink
            to="/signup"
            class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Sign up
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Scoped styles go here if needed */
</style>