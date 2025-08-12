import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkshopProvider } from "./context/WorkshopContext/WorkshopContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WorkshopProvider>
      <App />
    </WorkshopProvider>
  </StrictMode>
);
