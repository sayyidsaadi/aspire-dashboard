import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/style.css";
import "./assets/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Provider } from "react-redux";
import "./index.css";
import store from "./app/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
