<script setup lang="ts">
import LoginForm from '../../components/LoginForm.vue'; 
</script>

<template>
  <main class="min-h-screen bg-background flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <div class="flex items-center justify-center gap-2 mb-4">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span class="text-sm font-bold text-primary-foreground">
              T
            </span>
          </div>
          <span class="text-xl font-bold text-foreground">Tickly</span>
        </div>
      </div>

      <LoginForm />

      </div>
  </main>
</template>
