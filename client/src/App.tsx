import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolsProvider } from "@/context/ToolsContext";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense, lazy } from "react";
import { usePreloadComponents } from "@/hooks/usePreloadComponents";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import {
  ArrowLeft,
  ArrowRight,
  Home as HomeIcon,
  RefreshCw,
  Star,
  Printer,
  Code2,
  Rss,
  Info,
  User,
  Mail,
} from "lucide-react";
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/not-found"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const EnhancedLoginPage = lazy(() => import("@/pages/EnhancedLoginPage"));
const ToolPage = lazy(() => import("@/pages/ToolPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const CategoriesPage = lazy(() => import("@/pages/CategoriesPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const AuthorPage = lazy(() => import("@/pages/AuthorPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FavoriteToolsPage = lazy(() => import("@/pages/FavoriteToolsPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogSinglePage = lazy(() => import("@/pages/BlogSinglePage"));
const ChangelogPage = lazy(() => import("@/pages/ChangelogPage"));

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

// Text & String Tools
const UrlEncodePage = lazy(() => import("@/pages/tools/UrlEncodePage"));
const UrlDecodePage = lazy(() => import("@/pages/tools/UrlDecodePage"));
const HtmlEncodePage = lazy(() => import("@/pages/tools/HtmlEncodePage"));
const HtmlDecodePage = lazy(() => import("@/pages/tools/HtmlDecodePage"));
const Base64EncodePage = lazy(() => import("@/pages/tools/Base64EncodePage"));
const Base64DecodePage = lazy(() => import("@/pages/tools/Base64DecodePage"));
const StringToNetstringPage = lazy(() => import("@/pages/tools/StringToNetstringPage"));
const NetstringToStringPage = lazy(() => import("@/pages/tools/NetstringToStringPage"));
const SlashEscapePage = lazy(() => import("@/pages/tools/SlashEscapePage"));
const SlashUnescapePage = lazy(() => import("@/pages/tools/SlashUnescapePage"));
const GenerateRandomStringPage = lazy(() => import("@/pages/tools/GenerateRandomStringPage"));
const GenerateStringFromRegexPage = lazy(() => import("@/pages/tools/GenerateStringFromRegexPage"));
const ExtractRegexMatchesPage = lazy(() => import("@/pages/tools/ExtractRegexMatchesPage"));
const TestStringWithRegexPage = lazy(() => import("@/pages/tools/TestStringWithRegexPage"));
const ExtractSubstringPage = lazy(() => import("@/pages/tools/ExtractSubstringPage"));
const ConvertStringToImagePage = lazy(() => import("@/pages/tools/ConvertStringToImagePage"));
const PrintfStringPage = lazy(() => import("@/pages/tools/PrintfStringPage"));
const SplitStringPage = lazy(() => import("@/pages/tools/SplitStringPage"));
const JoinStringsPage = lazy(() => import("@/pages/tools/JoinStringsPage"));
const FilterStringLinesPage = lazy(() => import("@/pages/tools/FilterStringLinesPage"));
const RepeatStringPage = lazy(() => import("@/pages/tools/RepeatStringPage"));
const ReverseStringPage = lazy(() => import("@/pages/tools/ReverseStringPage"));
const FindReplaceStringPage = lazy(() => import("@/pages/tools/FindReplaceStringPage"));
const TruncateStringPage = lazy(() => import("@/pages/tools/TruncateStringPage"));
const TrimStringPage = lazy(() => import("@/pages/tools/TrimStringPage"));
const LeftPadStringPage = lazy(() => import("@/pages/tools/LeftPadStringPage"));
const RightPadStringPage = lazy(() => import("@/pages/tools/RightPadStringPage"));
const RightAlignStringPage = lazy(() => import("@/pages/tools/RightAlignStringPage"));
const CenterStringPage = lazy(() => import("@/pages/tools/CenterStringPage"));
const SortStringsPage = lazy(() => import("@/pages/tools/SortStringsPage"));
const RotateStringPage = lazy(() => import("@/pages/tools/RotateStringPage"));
const ROT13StringPage = lazy(() => import("@/pages/tools/ROT13StringPage"));
const ROT47StringPage = lazy(() => import("@/pages/tools/ROT47StringPage"));
const TransposeStringPage = lazy(() => import("@/pages/tools/TransposeStringPage"));
const SliceStringPage = lazy(() => import("@/pages/tools/SliceStringPage"));

// SEO Tools
const KeywordResearchPage = lazy(() => import("@/pages/tools/KeywordResearchPage"));

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

// My New Converter Tools
const IlluminationConverter = lazy(() => import("@/pages/tools/IlluminationConverter"));
const DigitalImageResolutionConverter = lazy(() => import("@/pages/tools/DigitalImageResolutionConverter"));
const FrequencyWavelengthConverter = lazy(() => import("@/pages/tools/FrequencyWavelengthConverter"));
const ChargeConverter = lazy(() => import("@/pages/tools/ChargeConverter"));
const LinearChargeDensityConverter = lazy(() => import("@/pages/tools/LinearChargeDensityConverter"));
const SurfaceChargeDensityConverter = lazy(() => import("@/pages/tools/SurfaceChargeDensityConverter"));
const VolumeChargeDensityConverter = lazy(() => import("@/pages/tools/VolumeChargeDensityConverter"));
const CurrentConverter = lazy(() => import("@/pages/tools/CurrentConverter"));
const LinearCurrentDensityConverter = lazy(() => import("@/pages/tools/LinearCurrentDensityConverter"));
const SurfaceCurrentDensityConverter = lazy(() => import("@/pages/tools/SurfaceCurrentDensityConverter"));

// Electric Converter Tools  
const ElectricFieldStrengthConverter = lazy(() => import("@/pages/tools/ElectricFieldStrengthConverter"));
const ElectricPotentialConverter = lazy(() => import("@/pages/tools/ElectricPotentialConverter"));
const ElectricResistanceConverter = lazy(() => import("@/pages/tools/ElectricResistanceConverter"));
const ElectricResistivityConverter = lazy(() => import("@/pages/tools/ElectricResistivityConverter"));
const ElectricConductanceConverter = lazy(() => import("@/pages/tools/ElectricConductanceConverter"));

// Additional Electric/Magnetic Converter Tools
const ElectricConductivityConverter = lazy(() => import("@/pages/tools/ElectricConductivityConverter"));
const ElectrostaticCapacitanceConverter = lazy(() => import("@/pages/tools/ElectrostaticCapacitanceConverter"));
const InductanceConverter = lazy(() => import("@/pages/tools/InductanceConverter"));
const MagnetomotiveForceConverter = lazy(() => import("@/pages/tools/MagnetomotiveForceConverter"));
const MagneticFieldStrengthConverter = lazy(() => import("@/pages/tools/MagneticFieldStrengthConverter"));

// Magnetic Flux Tools
const MagneticFluxConverter = lazy(() => import("@/pages/tools/MagneticFluxConverter"));
const MagneticFluxDensityConverter = lazy(() => import("@/pages/tools/MagneticFluxDensityConverter"));

// Radiation Tool
const RadiationConverter = lazy(() => import("@/pages/tools/RadiationConverter"));

// New Radiation and Data Tools
const RadiationActivityConverterPage = lazy(() => import("@/pages/tools/RadiationActivityConverterPage"));
const RadiationExposureConverterPage = lazy(() => import("@/pages/tools/RadiationExposureConverterPage"));
const RadiationAbsorbedDoseConverterPage = lazy(() => import("@/pages/tools/RadiationAbsorbedDoseConverterPage"));
const PrefixesConverterPage = lazy(() => import("@/pages/tools/PrefixesConverterPage"));
const DataTransferConverterPage = lazy(() => import("@/pages/tools/DataTransferConverterPage"));

// Volume Lumber Tool
const VolumeLumberConverterPage = lazy(() => import("@/pages/tools/VolumeLumberConverterPage"));

// Financial Calculator Tools
const LoanCalculatorPage = lazy(() => import("@/pages/tools/LoanCalculatorPage"));
const AutoLoanCalculatorPage = lazy(() => import("@/pages/tools/AutoLoanCalculatorPage"));
const InterestCalculatorPage = lazy(() => import("@/pages/tools/InterestCalculatorPage"));
const PaymentCalculatorPage = lazy(() => import("@/pages/tools/PaymentCalculatorPage"));
const RetirementCalculatorPage = lazy(() => import("@/pages/tools/RetirementCalculatorPage"));

// New Finance Calculator Tools
const AmortizationCalculatorPage = lazy(() => import("@/pages/tools/AmortizationCalculatorPage"));
const InvestmentCalculatorPage = lazy(() => import("@/pages/tools/InvestmentCalculatorPage"));
const CurrencyCalculatorPage = lazy(() => import("@/pages/tools/CurrencyCalculatorPage"));
const InflationCalculatorPage = lazy(() => import("@/pages/tools/InflationCalculatorPage"));
const FinanceCalculatorPage = lazy(() => import("@/pages/tools/FinanceCalculatorPage"));
const MortgagePayoffCalculatorPage = lazy(() => import("@/pages/tools/MortgagePayoffCalculatorPage"));
const IncomeTaxCalculatorPage = lazy(() => import("@/pages/tools/IncomeTaxCalculatorPage"));
const CompoundInterestCalculatorPage = lazy(() => import("@/pages/tools/CompoundInterestCalculatorPage"));
const Professional401KCalculatorPage = lazy(() => import("@/pages/tools/Professional401KCalculatorPage"));
const AdvancedSalaryCalculatorPage = lazy(() => import("@/pages/tools/AdvancedSalaryCalculatorPage"));
const InterestRateCalculatorPage = lazy(() => import("@/pages/tools/InterestRateCalculatorPage"));
const SalesTaxCalculatorPage = lazy(() => import("@/pages/tools/SalesTaxCalculatorPage"));
const HouseAffordabilityCalculatorPage = lazy(() => import("@/pages/tools/HouseAffordabilityCalculatorPage"));
const SavingsCalculatorPage = lazy(() => import("@/pages/tools/SavingsCalculatorPage"));
const RentCalculatorPage = lazy(() => import("@/pages/tools/RentCalculatorPage"));
const MarriageTaxCalculatorPage = lazy(() => import("@/pages/tools/MarriageTaxCalculatorPage"));
const EstateTaxCalculatorPage = lazy(() => import("@/pages/tools/EstateTaxCalculatorPage"));
const RetirementSavingsPensionCalculatorPage = lazy(() => import("@/pages/tools/RetirementSavingsPensionCalculatorPage"));

function AppRouter() {
  // Enable preloading and performance optimization
  usePreloadComponents();
  const { useMemoryOptimization } = usePerformanceOptimization();
  useMemoryOptimization();
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Suspense fallback={null}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/categories" component={CategoriesPage} />
            <Route path="/category/:id" component={CategoryPage} />
            <Route path="/tool/:id" component={ToolPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/author" component={AuthorPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/favorite-tools" component={FavoriteToolsPage} />
            <Route path="/blog" component={BlogPage} />
            <Route path="/blog/:id" component={BlogSinglePage} />
            <Route path="/changelog" component={ChangelogPage} />
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
            
            {/* Text & String Tools */}
            <Route path="/tools/url-encode" component={UrlEncodePage} />
            <Route path="/tools/url-decode" component={UrlDecodePage} />
            <Route path="/tools/html-encode" component={HtmlEncodePage} />
            <Route path="/tools/html-decode" component={HtmlDecodePage} />
            <Route path="/tools/base64-encode" component={Base64EncodePage} />
            <Route path="/tools/base64-decode" component={Base64DecodePage} />
            <Route path="/tools/string-to-netstring" component={StringToNetstringPage} />
            <Route path="/tools/netstring-to-string" component={NetstringToStringPage} />
            <Route path="/tools/slash-escape" component={SlashEscapePage} />
            <Route path="/tools/slash-unescape" component={SlashUnescapePage} />
            <Route path="/tools/generate-random-string" component={GenerateRandomStringPage} />
            <Route path="/tools/generate-string-from-regex" component={GenerateStringFromRegexPage} />
            <Route path="/tools/extract-regex-matches" component={ExtractRegexMatchesPage} />
            <Route path="/tools/test-string-with-regex" component={TestStringWithRegexPage} />
            <Route path="/tools/extract-substring" component={ExtractSubstringPage} />
            <Route path="/tools/convert-string-to-image" component={ConvertStringToImagePage} />
            <Route path="/tools/printf-string" component={PrintfStringPage} />
            <Route path="/tools/split-string" component={SplitStringPage} />
            <Route path="/tools/join-strings" component={JoinStringsPage} />
            <Route path="/tools/filter-string-lines" component={FilterStringLinesPage} />
            <Route path="/tools/repeat-string" component={RepeatStringPage} />
            <Route path="/tools/reverse-string" component={ReverseStringPage} />
            <Route path="/tools/find-replace-string" component={FindReplaceStringPage} />
            <Route path="/tools/truncate-string" component={TruncateStringPage} />
            <Route path="/tools/trim-string" component={TrimStringPage} />
            <Route path="/tools/left-pad-string" component={LeftPadStringPage} />
            <Route path="/tools/right-pad-string" component={RightPadStringPage} />
            <Route path="/tools/right-align-string" component={RightAlignStringPage} />
            <Route path="/tools/center-string" component={CenterStringPage} />
            <Route path="/tools/sort-strings" component={SortStringsPage} />
            <Route path="/tools/rotate-string" component={RotateStringPage} />
            <Route path="/tools/rot13-string" component={ROT13StringPage} />
            <Route path="/tools/rot47-string" component={ROT47StringPage} />
            <Route path="/tools/transpose-string" component={TransposeStringPage} />
            <Route path="/tools/slice-string" component={SliceStringPage} />
            
            {/* SEO Tools */}
            <Route path="/tools/keyword-research" component={KeywordResearchPage} />
            
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
            
            {/* My New Converter Tools */}
            <Route path="/tools/illumination-converter" component={IlluminationConverter} />
            <Route path="/tools/digital-image-resolution-converter" component={DigitalImageResolutionConverter} />
            <Route path="/tools/frequency-wavelength-converter" component={FrequencyWavelengthConverter} />
            <Route path="/tools/charge-converter" component={ChargeConverter} />
            <Route path="/tools/linear-charge-density-converter" component={LinearChargeDensityConverter} />
            <Route path="/tools/surface-charge-density-converter" component={SurfaceChargeDensityConverter} />
            <Route path="/tools/volume-charge-density-converter" component={VolumeChargeDensityConverter} />
            <Route path="/tools/current-converter" component={CurrentConverter} />
            <Route path="/tools/linear-current-density-converter" component={LinearCurrentDensityConverter} />
            <Route path="/tools/surface-current-density-converter" component={SurfaceCurrentDensityConverter} />
            
            {/* Electric Converter Tools */}
            <Route path="/tools/electric-field-strength-converter" component={ElectricFieldStrengthConverter} />
            <Route path="/tools/electric-potential-converter" component={ElectricPotentialConverter} />
            <Route path="/tools/electric-resistance-converter" component={ElectricResistanceConverter} />
            <Route path="/tools/electric-resistivity-converter" component={ElectricResistivityConverter} />
            <Route path="/tools/electric-conductance-converter" component={ElectricConductanceConverter} />
            
            {/* Additional Electric/Magnetic Converter Tools */}
            <Route path="/tools/electric-conductivity-converter" component={ElectricConductivityConverter} />
            <Route path="/tools/electrostatic-capacitance-converter" component={ElectrostaticCapacitanceConverter} />
            <Route path="/tools/inductance-converter" component={InductanceConverter} />
            <Route path="/tools/magnetomotive-force-converter" component={MagnetomotiveForceConverter} />
            <Route path="/tools/magnetic-field-strength-converter" component={MagneticFieldStrengthConverter} />
            
            {/* Magnetic Flux Tools */}
            <Route path="/tools/magnetic-flux-converter" component={MagneticFluxConverter} />
            <Route path="/tools/magnetic-flux-density-converter" component={MagneticFluxDensityConverter} />
            
            {/* Radiation Tool */}
            <Route path="/tools/radiation-converter" component={RadiationConverter} />
            
            {/* New Radiation and Data Tools */}
            <Route path="/tools/radiation-activity-converter" component={RadiationActivityConverterPage} />
            <Route path="/tools/radiation-exposure-converter" component={RadiationExposureConverterPage} />
            <Route path="/tools/radiation-absorbed-dose-converter" component={RadiationAbsorbedDoseConverterPage} />
            <Route path="/tools/prefixes-converter" component={PrefixesConverterPage} />
            <Route path="/tools/data-transfer-rate-converter" component={DataTransferConverterPage} />
            
            {/* Volume Lumber Tool */}
            <Route path="/tools/volume-lumber-converter" component={VolumeLumberConverterPage} />
            
            {/* Financial Calculator Tools */}
            <Route path="/tools/loan-calculator" component={LoanCalculatorPage} />
            <Route path="/tools/auto-loan-calculator" component={AutoLoanCalculatorPage} />
            <Route path="/tools/interest-calculator" component={InterestCalculatorPage} />
            <Route path="/tools/payment-calculator" component={PaymentCalculatorPage} />
            <Route path="/tools/retirement-calculator" component={RetirementCalculatorPage} />
            
            {/* New Finance Calculator Tools */}
            <Route path="/tools/amortization-calculator" component={AmortizationCalculatorPage} />
            <Route path="/tools/investment-calculator" component={InvestmentCalculatorPage} />
            <Route path="/tools/currency-calculator" component={CurrencyCalculatorPage} />
            <Route path="/tools/inflation-calculator" component={InflationCalculatorPage} />
            <Route path="/tools/finance-calculator" component={FinanceCalculatorPage} />
            <Route path="/tools/mortgage-payoff-calculator" component={MortgagePayoffCalculatorPage} />
            <Route path="/tools/income-tax-calculator" component={IncomeTaxCalculatorPage} />
            <Route path="/tools/compound-interest-calculator" component={CompoundInterestCalculatorPage} />
            <Route path="/tools/401k-calculator" component={Professional401KCalculatorPage} />
            <Route path="/tools/advanced-salary-calculator" component={AdvancedSalaryCalculatorPage} />
            <Route path="/tools/interest-rate-calculator" component={InterestRateCalculatorPage} />
            <Route path="/tools/sales-tax-calculator" component={SalesTaxCalculatorPage} />
            <Route path="/tools/house-affordability-calculator" component={HouseAffordabilityCalculatorPage} />
            <Route path="/tools/savings-calculator" component={SavingsCalculatorPage} />
            <Route path="/tools/rent-calculator" component={RentCalculatorPage} />
            <Route path="/tools/marriage-tax-calculator" component={MarriageTaxCalculatorPage} />
            <Route path="/tools/estate-tax-calculator" component={EstateTaxCalculatorPage} />
            <Route path="/tools/retirement-savings-pension-calculator" component={RetirementSavingsPensionCalculatorPage} />
            
            {/* Authentication Pages */}
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/enhanced-login" component={EnhancedLoginPage} />
            
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
        <AuthProvider>
          <ToolsProvider>
              <AppRouter />
              <Toaster />
          </ToolsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
