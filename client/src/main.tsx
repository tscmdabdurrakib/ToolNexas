import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./lib/ThemeProvider";
import { ToolsProvider } from "./context/ToolsContext";
import { FavoritesProvider } from "./context/FavoritesContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <ToolsProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </ToolsProvider>
  </ThemeProvider>
);
