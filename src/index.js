import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./views/App";
import store from "./redux/store.jsx";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
