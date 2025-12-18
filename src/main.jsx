import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ⭐ GLOBAL STYLES
import "./index.css";

// ⭐ INIT LOCAL DB
import { initDB } from "./services/dbService";
initDB();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
