import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CategoryPage from "@/pages/CategoryPage";
import ToolPage from "@/pages/ToolPage";
import SearchPage from "@/pages/SearchPage";
import AboutPage from "@/pages/AboutPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import DisclaimerPage from "@/pages/DisclaimerPage";
import DMCAPolicyPage from "@/pages/DMCAPolicyPage";
import SitemapPage from "@/pages/SitemapPage";
import ContactPage from "@/pages/ContactPage";
import LengthConverterPage from "@/pages/tools/LengthConverterPage";
import WeightMassConverterPage from "@/pages/tools/WeightMassConverterPage";
import AuthorPage from "@/pages/AuthorPage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolsProvider } from "@/context/ToolsContext";
import { ThemeProvider } from "@/lib/ThemeProvider";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/category/:id">
            {(params) => (
              <ToolsProvider>
                <CategoryPage params={params} />
              </ToolsProvider>
            )}
          </Route>
          <Route path="/tool/:id">
            {(params) => (
              <ToolsProvider>
                <ToolPage params={params} />
              </ToolsProvider>
            )}
          </Route>
          <Route path="/search">
            <ToolsProvider>
              <SearchPage />
            </ToolsProvider>
          </Route>
          <Route path="/about" component={AboutPage} />
          <Route path="/author" component={AuthorPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/privacy" component={PrivacyPolicyPage} />
          <Route path="/terms" component={TermsOfServicePage} />
          <Route path="/disclaimer" component={DisclaimerPage} />
          <Route path="/dmca" component={DMCAPolicyPage} />
          <Route path="/sitemap">
            <ToolsProvider>
              <SitemapPage />
            </ToolsProvider>
          </Route>
          <Route path="/tools/length-converter" component={LengthConverterPage} />
          <Route path="/tools/weight-mass-converter" component={WeightMassConverterPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <ToolsProvider>
          <Router />
          <Toaster />
        </ToolsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
