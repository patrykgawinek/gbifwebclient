import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
