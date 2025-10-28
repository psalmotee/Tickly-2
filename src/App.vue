<template>
  <AuthProvider>
    <router-view />
    <Toastification />
  </AuthProvider>
</template>

<script setup lang="ts">
// import AuthProvider from '@/components/AuthProvider.vue'
// import Toastification from '@/plugins/toast' // configured Vue Toastification
// import '@/assets/globals.css' // global Tailwind styles
</script>
