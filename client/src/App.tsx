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
import VolumeConverterPage from "@/pages/tools/VolumeConverterPage";
import TemperatureConverterPage from "@/pages/tools/TemperatureConverterPage";
import AreaConverterPage from "@/pages/tools/AreaConverterPage";
import PressureConverterPage from "@/pages/tools/PressureConverterPage";
import DataStorageConverterPage from "@/pages/tools/DataStorageConverterPage";
import TimeConverterPage from "@/pages/tools/TimeConverterPage";
import SpeedConverterPage from "@/pages/tools/SpeedConverterPage";
import NumbersConverterPage from "@/pages/tools/NumbersConverterPage";
import EnergyConverterPage from "@/pages/tools/EnergyConverterPage";
import PowerConverterPage from "@/pages/tools/PowerConverterPage";
import ForceConverterPage from "@/pages/tools/ForceConverterPage";
import AngleConverterPage from "@/pages/tools/AngleConverterPage";
import MortgageCalculatorPage from "@/pages/tools/MortgageCalculatorPage";
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
          <Route path="/category/:id" component={CategoryPage} />
          <Route path="/tool/:id" component={ToolPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/author" component={AuthorPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/privacy" component={PrivacyPolicyPage} />
          <Route path="/terms" component={TermsOfServicePage} />
          <Route path="/disclaimer" component={DisclaimerPage} />
          <Route path="/dmca" component={DMCAPolicyPage} />
          <Route path="/sitemap" component={SitemapPage} />
          <Route path="/tools/length-converter" component={LengthConverterPage} />
          <Route path="/tools/weight-mass-converter" component={WeightMassConverterPage} />
          <Route path="/tools/volume-converter" component={VolumeConverterPage} />
          <Route path="/tools/temperature-converter" component={TemperatureConverterPage} />
          <Route path="/tools/area-converter" component={AreaConverterPage} />
          <Route path="/tools/pressure-converter" component={PressureConverterPage} />
          <Route path="/tools/data-storage-converter" component={DataStorageConverterPage} />
          <Route path="/tools/time-converter" component={TimeConverterPage} />
          <Route path="/tools/speed-converter" component={SpeedConverterPage} />
          <Route path="/tools/numbers-converter" component={NumbersConverterPage} />
          <Route path="/tools/energy-converter" component={EnergyConverterPage} />
          <Route path="/tools/power-converter" component={PowerConverterPage} />
          <Route path="/tools/force-converter" component={ForceConverterPage} />
          <Route path="/tools/angle-converter" component={AngleConverterPage} />
          <Route path="/tools/mortgage-calculator" component={MortgageCalculatorPage} />
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
