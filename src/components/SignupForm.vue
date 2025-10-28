<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signup, login, saveSession } from '../lib/auth';
import { validateSignupForm } from '../lib/validation';
import { Eye } from 'lucide-vue-next'; 

// --- ROUTING ---
const router = useRouter();

// --- STATE (Ref replaces useState) ---
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const error = ref('');
// Using a Record<string, string> for field errors
const fieldErrors = ref<Record<string, string>>({});
const isLoading = ref(false);

// --- METHODS ---
const handleSubmit = async () => {
  // @submit.prevent handles e.preventDefault()
  error.value = '';
  fieldErrors.value = {};
  isLoading.value = true;

  const validation = validateSignupForm(
    name.value,
    email.value,
    password.value,
    confirmPassword.value
  );

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

  const signupResult = signup(email.value, password.value, name.value);

  if (!signupResult.success) {
    error.value = signupResult.error || "Signup failed";
    isLoading.value = false;
    return;
  }

  // Auto-login after signup (logic remains the same, but using .value)
  const loginResult = login(email.value, password.value);

  if (loginResult.success && loginResult.session) {
    saveSession(loginResult.session);
    // Use Vue Router's push method
    router.push("/dashboard");
  } else {
    error.value = "Signup successful, but login failed. Please try logging in.";
  }

  isLoading.value = false;
};
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-lg border border-border bg-card p-8">
      <h1 class="text-2xl font-bold text-foreground mb-2">
        Create account
      </h1>
      <p class="text-muted-foreground mb-6">
        Join Tickly and start managing tickets
      </p>

      <FormError v-if="error" :message="error" />

      <form @submit.prevent="handleSubmit" class="space-y-4 mt-6">
        
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            v-model="name"
            placeholder="John Doe"
            :class="`w-full rounded-lg border px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              fieldErrors.name
                ? 'border-destructive bg-destructive/5'
                : 'border-input bg-background'
            }`"
            :disabled="isLoading"
          />
          <p v-if="fieldErrors.name" class="text-xs text-destructive mt-1">
            {{ fieldErrors.name }}
          </p>
        </div>

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
            v-model="email"
            placeholder="you@example.com"
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
              <Eye class="h-4 w-4" />
            </button>
          </div>
          <p v-if="fieldErrors.password" class="text-xs text-destructive mt-1">
            {{ fieldErrors.password }}
          </p>
        </div>

        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-foreground mb-2"
          >
            Confirm password
          </label>
          <div class="relative">
            <input
              id="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="••••••••"
              :class="`w-full rounded-lg border px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                fieldErrors.confirmPassword
                  ? 'border-destructive bg-destructive/5'
                  : 'border-input bg-background'
              }`"
              :disabled="isLoading"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              :disabled="isLoading"
            >
              <Eye class="h-4 w-4" />
            </button>
          </div>
          <p v-if="fieldErrors.confirmPassword" class="text-xs text-destructive mt-1">
            {{ fieldErrors.confirmPassword }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ isLoading ? "Creating account..." : "Create account" }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?
        <RouterLink
          to="/login"
          class="font-medium text-primary hover:underline"
        >
          Sign in
        </RouterLink>
      </p>
    </div>
  </div>
</template>