<script setup lang="ts">
import { Zap, ChartColumnDecreasing, Handshake } from 'lucide-vue-next'

const features = [
  {
    title: "Instant Ticketing",
    description: "Create tickets in seconds and move faster together",
    icon: Zap,
  },
  {
    title: "Smart Status",
    description: "Know what’s happening at a glance with clear visuals",
    icon: ChartColumnDecreasing,
  },
  {
    title: "Team Harmony",
    description: "Keep everyone aligned with shared visibility and updates",
    icon: Handshake,
  },
]
</script>

<template>
  <section id="features" class="bg-secondary/30 py-20 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          What makes Tickly different
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Lightweight, clear, and flexible — Tickly gives your team
          everything you need to stay on top of work, not buried under it.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="rounded-lg border border-border bg-background p-6 hover:border-primary/50 transition-colors"
        >
          <div class="mb-3 text-primary">
            <component :is="feature.icon" class="h-8 w-8" />
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-muted-foreground">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
