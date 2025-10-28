// src/main.ts

import { createApp } from "vue";
// import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router"; // Assuming your router setup is here

// --- 1. Global CSS Import (Replaces ./globals.css) ---
import "./style.css";

// --- 2. Toast Library Setup (Replaces react-toastify) ---
// You will need to install a Vue toast library, e.g., vue-toastification
// import Toast, { type PluginOptions } from "vue-toastification";
// import "vue-toastification/dist/index.css";

const app = createApp(App);
// const pinia = createPinia();

// const toastOptions: PluginOptions = {
//   position: "top-right",
//   timeout: 3000,
//   hideProgressBar: true,
//   // Add other react-toastify options as needed
// };

// app.use(pinia);
app.use(router);
// app.use(Toast, toastOptions); // Register toast library

app.mount("#app");
