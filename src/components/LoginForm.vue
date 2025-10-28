<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { login, saveSession } from '../lib/auth';
import { validateLoginForm } from '../lib/validation';
import { Eye } from 'lucide-vue-next'; 
// --- ROUTING ---
const router = useRouter();
const route = useRoute(); // useRoute to access query parameters

// --- STATE (Ref replaces useState) ---
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const error = ref('');
// Using a Record<string, string> for field errors
const fieldErrors = ref<Record<string, string>>({});
const isLoading = ref(false);
const isAdmin = ref(false);

// --- SIDE EFFECTS (watch & onMounted replace useEffect) ---

// 1. Initial setup logic (onMounted)
onMounted(() => {
  // Check the initial route query parameter when the component mounts
  const adminParam = route.query.admin as string | undefined;
  if (adminParam === 'true') {
    isAdmin.value = true;
    email.value = 'admin@example.com';
    password.value = 'admin123';
  } else {
    isAdmin.value = false;
  }
});

// 2. Logic to watch for changes in the 'admin' query parameter
watch(
  () => route.query.admin,
  (newAdminParam) => {
    const adminParam = newAdminParam === 'true';
    isAdmin.value = adminParam;

    if (adminParam) {
      email.value = 'admin@example.com';
      password.value = 'admin123';
    } else {
      // Clear fields if switching back from admin mode, or set default user demo
      email.value = '';
      password.value = '';
    }
  },
  { immediate: true } // Run immediately on component setup (optional, but good practice)
);

// --- METHODS (Replacing the handleSubmit function) ---
const handleSubmit = async () => {
  // Prevent default is handled implicitly by Vue's @submit.prevent
  error.value = '';
  fieldErrors.value = {};
  isLoading.value = true;

  const validation = validateLoginForm(email.value, password.value);

  if (!validation.isValid) {
    const errors: Record<string, string> = {};
    validation.errors.forEach((err) => {
      errors[err.field] = err.message;
    });
    fieldErrors.value = errors;
    isLoading.value = false;
    return;
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // The login function from your lib/auth.ts remains synchronous for this simulation
  const result = login(email.value, password.value);

  if (result.success && result.session) {
    saveSession(result.session);
    // Use Vue Router's push method
    router.push(
      result.session.user.role === 'admin' ? '/admin' : '/dashboard'
    );
  } else {
    error.value = result.error || 'Login failed';
  }

  isLoading.value = false;
};
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-lg border border-border bg-card p-8">
      <h1 class="text-2xl font-bold text-foreground mb-2">
        {{ isAdmin ? "Admin Login" : "Welcome back" }}
      </h1>
      <p class="text-muted-foreground mb-6">
        {{ isAdmin ? "Sign in to your admin account" : "Sign in to your Tickly account" }}
      </p>

      <FormError v-if="error" :message="error" />

      <form @submit.prevent="handleSubmit" class="space-y-4 mt-6">
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            v-model="email" placeholder="you@example.com"
            :class="`w-full rounded-lg border px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              fieldErrors.email
                ? 'border-destructive bg-destructive/5'
                : 'border-input bg-background'
            }`"
            :disabled="isLoading"
          />
          <p v-if="fieldErrors.email" class="text-xs text-destructive mt-1">
            {{ fieldErrors.email }}
          </p>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="••••••••"
              :class="`w-full rounded-lg border px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                fieldErrors.password
                  ? 'border-destructive bg-destructive/5'
                  : 'border-input bg-background'
              }`"
              :disabled="isLoading"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              :disabled="isLoading"
            >
              <Eye v-if="showPassword" class="h-4 w-4" />
              <Eye v-else class="h-4 w-4" />
            </button>
          </div>
          <p v-if="fieldErrors.password" class="text-xs text-destructive mt-1">
            {{ fieldErrors.password }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ isLoading ? "Signing in..." : "Sign in" }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-muted-foreground">
        <template v-if="isAdmin">
          Not an admin?
          <RouterLink
            to="/login"
            class="font-medium text-primary hover:underline"
          >
            User login
          </RouterLink>
        </template>
        <template v-else>
          Don't have an account?
          <RouterLink
            to="/signup"
            class="font-medium text-primary hover:underline"
          >
            Sign up
          </RouterLink>
        </template>
      </p>
    </div>

    <div class="mt-6 rounded-lg border border-border bg-secondary/30 p-4">
      <p class="text-xs font-medium text-muted-foreground mb-2">
        {{ isAdmin ? "Admin Demo Credentials:" : "Demo Credentials:" }}
      </p>
      <template v-if="isAdmin">
        <p class="text-xs text-muted-foreground">
          Email: admin@example.com
        </p>
        <p class="text-xs text-muted-foreground">Password: admin123</p>
      </template>
      <template v-else>
        <p class="text-xs text-muted-foreground">
          Email: demo@example.com
        </p>
        <p class="text-xs text-muted-foreground">Password: demo123</p>
        <hr class="m-2"/>
        <p class="text-xs text-muted-foreground">
          Email: admin@example.com
        </p>
        <p class="text-xs text-muted-foreground">Password: admin123</p>
      </template>
    </div>
  </div>
</template>