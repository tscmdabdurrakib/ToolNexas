import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./lib/ThemeProvider";
import { ToolsProvider } from "./context/ToolsContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <ToolsProvider>
      <App />
    </ToolsProvider>
  </ThemeProvider>
);
