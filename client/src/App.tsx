import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolsProvider } from "@/context/ToolsContext";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePreloadComponents } from "@/hooks/usePreloadComponents";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

// Lazy load components for better performance
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/not-found"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const ToolPage = lazy(() => import("@/pages/ToolPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const AuthorPage = lazy(() => import("@/pages/AuthorPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));

// Legal pages
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("@/pages/TermsOfServicePage"));
const DisclaimerPage = lazy(() => import("@/pages/DisclaimerPage"));
const DMCAPolicyPage = lazy(() => import("@/pages/DMCAPolicyPage"));
const SitemapPage = lazy(() => import("@/pages/SitemapPage"));

// Tool pages - lazy loaded
const LengthConverterPage = lazy(() => import("@/pages/tools/LengthConverterPage"));
const WeightMassConverterPage = lazy(() => import("@/pages/tools/WeightMassConverterPage"));
const VolumeConverterPage = lazy(() => import("@/pages/tools/VolumeConverterPage"));
const TemperatureConverterPage = lazy(() => import("@/pages/tools/TemperatureConverterPage"));
const AreaConverterPage = lazy(() => import("@/pages/tools/AreaConverterPage"));
const PressureConverterPage = lazy(() => import("@/pages/tools/PressureConverterPage"));
const DataStorageConverterPage = lazy(() => import("@/pages/tools/DataStorageConverterPage"));
const TimeConverterPage = lazy(() => import("@/pages/tools/TimeConverterPage"));
const SpeedConverterPage = lazy(() => import("@/pages/tools/SpeedConverterPage"));
const NumbersConverterPage = lazy(() => import("@/pages/tools/NumbersConverterPage"));
const EnergyConverterPage = lazy(() => import("@/pages/tools/EnergyConverterPage"));
const PowerConverterPage = lazy(() => import("@/pages/tools/PowerConverterPage"));
const ForceConverterPage = lazy(() => import("@/pages/tools/ForceConverterPage"));
const AngleConverterPage = lazy(() => import("@/pages/tools/AngleConverterPage"));
const MortgageCalculatorPage = lazy(() => import("@/pages/tools/MortgageCalculatorPage"));
const FuelConsumptionConverterPage = lazy(() => import("@/pages/tools/FuelConsumptionConverterPage"));
const VolumeDryConverterPage = lazy(() => import("@/pages/tools/VolumeDryConverterPage"));
const CurrencyConverterPage = lazy(() => import("@/pages/tools/CurrencyConverterPage"));
const CaseConverterPage = lazy(() => import("@/pages/tools/CaseConverterPage"));
const AngularVelocityConverterPage = lazy(() => import("@/pages/tools/AngularVelocityConverterPage"));
const AccelerationConverterPage = lazy(() => import("@/pages/tools/AccelerationConverterPage"));
const ImageResizerPage = lazy(() => import("@/pages/tools/ImageResizerPage"));
const ImageCropperPage = lazy(() => import("@/pages/tools/ImageCropperPage"));
const PDFEditorPage = lazy(() => import("@/pages/tools/PDFEditorPage"));

// Professional Unit Converters
const AccelerationAngularConverter = lazy(() => import("@/pages/tools/AccelerationAngularConverter"));
const DensityConverter = lazy(() => import("@/pages/tools/DensityConverter"));
const SpecificVolumeConverter = lazy(() => import("@/pages/tools/SpecificVolumeConverter"));
const MomentOfInertiaConverter = lazy(() => import("@/pages/tools/MomentOfInertiaConverter"));
const MomentOfForceConverter = lazy(() => import("@/pages/tools/MomentOfForceConverter"));

// New Advanced Converters
const TorqueConverter = lazy(() => import("@/pages/tools/TorqueConverter"));
const FuelEfficiencyMassConverter = lazy(() => import("@/pages/tools/FuelEfficiencyMassConverter"));
const FuelEfficiencyVolumeConverter = lazy(() => import("@/pages/tools/FuelEfficiencyVolumeConverter"));
const TemperatureIntervalConverter = lazy(() => import("@/pages/tools/TemperatureIntervalConverter"));
const ThermalExpansionConverter = lazy(() => import("@/pages/tools/ThermalExpansionConverter"));
const ThermalResistanceConverter = lazy(() => import("@/pages/tools/ThermalResistanceConverter"));
const SpecificHeatCapacityConverter = lazy(() => import("@/pages/tools/SpecificHeatCapacityConverter"));
const HeatDensityConverter = lazy(() => import("@/pages/tools/HeatDensityConverter"));
const HeatFluxDensityConverter = lazy(() => import("@/pages/tools/HeatFluxDensityConverter"));
const HeatTransferCoefficientConverter = lazy(() => import("@/pages/tools/HeatTransferCoefficientConverter"));
const FlowConverter = lazy(() => import("@/pages/tools/FlowConverter"));
const FlowMassConverter = lazy(() => import("@/pages/tools/FlowMassConverter"));
const FlowMolarConverter = lazy(() => import("@/pages/tools/FlowMolarConverter"));
const MassFluxDensityConverter = lazy(() => import("@/pages/tools/MassFluxDensityConverter"));
const ConcentrationMolarConverter = lazy(() => import("@/pages/tools/ConcentrationMolarConverter"));
const ConcentrationSolutionConverter = lazy(() => import("@/pages/tools/ConcentrationSolutionConverter"));
const ViscosityDynamicConverter = lazy(() => import("@/pages/tools/ViscosityDynamicConverter"));
const ViscosityKinematicConverter = lazy(() => import("@/pages/tools/ViscosityKinematicConverter"));
const SurfaceTensionConverter = lazy(() => import("@/pages/tools/SurfaceTensionConverter"));
const PermeabilityConverter = lazy(() => import("@/pages/tools/PermeabilityConverter"));
const LuminanceConverter = lazy(() => import("@/pages/tools/LuminanceConverter"));
const LuminousIntensityConverter = lazy(() => import("@/pages/tools/LuminousIntensityConverter"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

function Router() {
  // Enable preloading and performance optimization
  usePreloadComponents();
  const { useMemoryOptimization } = usePerformanceOptimization();
  useMemoryOptimization();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/tools/fuel-consumption-converter" component={FuelConsumptionConverterPage} />
            <Route path="/tools/volume-dry-converter" component={VolumeDryConverterPage} />
            <Route path="/tools/currency-converter" component={CurrencyConverterPage} />
            <Route path="/tools/case-converter" component={CaseConverterPage} />
            <Route path="/tools/angular-velocity-converter" component={AngularVelocityConverterPage} />
            <Route path="/tools/acceleration-converter" component={AccelerationConverterPage} />
            <Route path="/tools/image-resizer" component={ImageResizerPage} />
            <Route path="/tools/image-cropper" component={ImageCropperPage} />
            <Route path="/tools/pdf-editor" component={PDFEditorPage} />
            <Route path="/tools/mortgage-calculator" component={MortgageCalculatorPage} />
            
            {/* Professional Unit Converters */}
            <Route path="/tools/acceleration-angular-converter" component={AccelerationAngularConverter} />
            <Route path="/tools/density-converter" component={DensityConverter} />
            <Route path="/tools/specific-volume-converter" component={SpecificVolumeConverter} />
            <Route path="/tools/moment-of-inertia-converter" component={MomentOfInertiaConverter} />
            <Route path="/tools/moment-of-force-converter" component={MomentOfForceConverter} />
            {/* New Advanced Converters */}
            <Route path="/tools/torque-converter" component={TorqueConverter} />
            <Route path="/tools/fuel-efficiency-mass-converter" component={FuelEfficiencyMassConverter} />
            <Route path="/tools/fuel-efficiency-volume-converter" component={FuelEfficiencyVolumeConverter} />
            <Route path="/tools/temperature-interval-converter" component={TemperatureIntervalConverter} />
            <Route path="/tools/thermal-expansion-converter" component={ThermalExpansionConverter} />
            <Route path="/tools/thermal-resistance-converter" component={ThermalResistanceConverter} />
            <Route path="/tools/specific-heat-capacity-converter" component={SpecificHeatCapacityConverter} />
            <Route path="/tools/heat-density-converter" component={HeatDensityConverter} />
            <Route path="/tools/heat-flux-density-converter" component={HeatFluxDensityConverter} />
            <Route path="/tools/heat-transfer-coefficient-converter" component={HeatTransferCoefficientConverter} />
            <Route path="/tools/flow-converter" component={FlowConverter} />
            <Route path="/tools/flow-mass-converter" component={FlowMassConverter} />
            <Route path="/tools/flow-molar-converter" component={FlowMolarConverter} />
            <Route path="/tools/mass-flux-density-converter" component={MassFluxDensityConverter} />
            <Route path="/tools/concentration-molar-converter" component={ConcentrationMolarConverter} />
            <Route path="/tools/concentration-solution-converter" component={ConcentrationSolutionConverter} />
            <Route path="/tools/viscosity-dynamic-converter" component={ViscosityDynamicConverter} />
            <Route path="/tools/viscosity-kinematic-converter" component={ViscosityKinematicConverter} />
            <Route path="/tools/surface-tension-converter" component={SurfaceTensionConverter} />
            <Route path="/tools/permeability-converter" component={PermeabilityConverter} />
            <Route path="/tools/luminance-converter" component={LuminanceConverter} />
            <Route path="/tools/luminous-intensity-converter" component={LuminousIntensityConverter} />
            
            <Route component={NotFound} />
          </Switch>
        </Suspense>
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
