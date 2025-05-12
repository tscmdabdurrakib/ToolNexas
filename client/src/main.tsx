import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./lib/ThemeProvider";
import { ToolsProvider } from "./context/ToolsContext";
import { I18nextProvider } from "react-i18next";
import i18n, { detectCountryAndSetLanguage } from "./i18n";

// Detect country and set language on initial load
detectCountryAndSetLanguage();

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <ThemeProvider>
      <ToolsProvider>
        <App />
      </ToolsProvider>
    </ThemeProvider>
  </I18nextProvider>
);
