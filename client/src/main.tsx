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


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => console.log('✅ Service Worker registered successfully'))
      .catch(err => console.log('❌ Service Worker registration failed:', err));
  });
}
