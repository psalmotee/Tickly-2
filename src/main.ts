// src/main.ts

import { createApp } from "vue";
import { useAuthStore } from "./lib/pinnaAuth"; // Assuming this path is correct now
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import Toast, { type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
const pinia = createPinia(); // 1. Create the Pinia instance

const toastOptions: PluginOptions = {
  position: "top-right",
  timeout: 3000,
  hideProgressBar: true, // Add other react-toastify options as needed
};

app.use(pinia); // 2. Register Pinia with the app
app.use(router);
app.use(Toast, toastOptions); // 3. Ensure Toast is registered correctly

// 4. Get the store instance by explicitly passing the Pinia instance
const authStore = useAuthStore(pinia);

// 5. Call the initialization function
authStore.initializeSession();

app.mount("#app");
