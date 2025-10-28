import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default Toast({
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  hideProgressBar: true,
});
