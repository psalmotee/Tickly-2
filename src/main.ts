import { createApp } from "vue";
import { useAuthStore } from "./lib/pinnaAuth";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style.css";
// import Toast, { type PluginOptions } from "vue-toastification";
// import "vue-toastification/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

// const toastOptions: PluginOptions = {
//   position: "top-right",
//   timeout: 3000,
//   hideProgressBar: true,
//   // Add other react-toastify options as needed
// };

app.use(pinia);
app.use(router);
// app.use(Toast, toastOptions); // Register toast library
const authStore = useAuthStore();
authStore.initializeSession();
app.mount("#app");
