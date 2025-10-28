<script setup lang="ts">
// Import your converted Vue components from the components directory.
// Assuming your components are named as standard Vue components (PascalCase).
import Header from '../views/LandingPage/Header.vue';
import Hero from '../views/LandingPage/Hero.vue';
import Features from '../views/LandingPage/Features.vue'; // Assuming you have converted this
import CTA from '../views/LandingPage/CTA.vue';           // Assuming you have converted this
import Footer from '../views/LandingPage/Footer.vue';     // Assuming you have converted this

// No reactive state or complex logic is needed here; the view is purely for assembly.
</script>

<template>
  <main class="min-h-screen bg-background">
    <Header />

    <Hero />

    <Features />

    <CTA />

    <Footer />
  </main>
</template>

<style scoped>
/* Scoped styles for the home view */
</style>