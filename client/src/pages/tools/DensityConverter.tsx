import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, RotateCcw, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToolVisit } from "@/hooks/useToolVisit";

interface DensityUnit {
  name: string;
  factor: number;
  symbol: string;
}

const units: Record<string, DensityUnit> = {
  "kg_m3": { name: "Kilograms per cubic meter", factor: 1, symbol: "kg/m³" },
  "g_cm3": { name: "Grams per cubic centimeter", factor: 1000, symbol: "g/cm³" },
  "lb_ft3": { name: "Pounds per cubic foot", factor: 16.0185, symbol: "lb/ft³" },
  "lb_in3": { name: "Pounds per cubic inch", factor: 27679.9, symbol: "lb/in³" },
  "oz_in3": { name: "Ounces per cubic inch", factor: 1729.99, symbol: "oz/in³" },
  "g_ml": { name: "Grams per milliliter", factor: 1000, symbol: "g/mL" },
  "kg_l": { name: "Kilograms per liter", factor: 1000, symbol: "kg/L" },
  "slug_ft3": { name: "Slugs per cubic foot", factor: 515.379, symbol: "slug/ft³" },
  "t_m3": { name: "Tonnes per cubic meter", factor: 0.001, symbol: "t/m³" },
  "g_l": { name: "Grams per liter", factor: 1, symbol: "g/L" },
};

const materialDensities = [
  { name: "Water (20°C)", value: 1000, unit: "kg/m³" },
  { name: "Steel", value: 7850, unit: "kg/m³" },
  { name: "Aluminum", value: 2700, unit: "kg/m³" },
  { name: "Copper", value: 8960, unit: "kg/m³" },
  { name: "Gold", value: 19300, unit: "kg/m³" },
  { name: "Air (STP)", value: 1.225, unit: "kg/m³" },
  { name: "Concrete", value: 2400, unit: "kg/m³" },
  { name: "Wood (Oak)", value: 750, unit: "kg/m³" },
];

export default function DensityConverter() {
  useToolVisit("density-converter");
  
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("kg_m3");
  const [toUnit, setToUnit] = useState<string>("g_cm3");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetFields = () => {
    setInputValue("");
    setResult("");
    setError("");
  };

  const convertDensity = () => {
    const value = parseFloat(inputValue);

    if (isNaN(value)) {
      setError("Please enter a valid number");
      setResult("");
      return;
    }

    if (value < 0) {
      setError("Density cannot be negative");
      setResult("");
      return;
    }

    setError("");

    // Convert to base unit (kg/m³)
    const valueInBase = value * units[fromUnit].factor;
    
    // Convert from base to target unit
    const convertedValue = valueInBase / units[toUnit].factor;
    
    // Format result with appropriate decimal places
    const decimalPlaces = convertedValue < 1 ? 8 : convertedValue < 1000 ? 6 : 4;
    setResult(convertedValue.toFixed(decimalPlaces));
  };

  const loadMaterialDensity = (density: number) => {
    setInputValue(density.toString());
    setFromUnit("kg_m3");
  };

  useEffect(() => {
    if (inputValue) {
      convertDensity();
    } else {
      setResult("");
      setError("");
    }
  }, [inputValue, fromUnit, toUnit]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Density Converter
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between various units of density with high precision for scientific and engineering applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Density Conversion
              </CardTitle>
              <CardDescription>
                Enter a density value and select units to convert
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="input">From</Label>
                  <div className="flex gap-2">
                    <Input
                      id="input"
                      type="number"
                      step="any"
                      placeholder="Enter density value"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(units).map(([key, unit]) => (
                          <SelectItem key={key} value={key}>
                            {unit.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="result">To</Label>
                  <div className="flex gap-2">
                    <Input
                      id="result"
                      type="text"
                      value={result}
                      readOnly
                      placeholder="Result will appear here"
                      className="flex-1"
                    />
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(units).map(([key, unit]) => (
                          <SelectItem key={key} value={key}>
                            {unit.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={resetFields} 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Fields
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Material Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {materialDensities.map((material, index) => (
                    <button
                      key={index}
                      onClick={() => loadMaterialDensity(material.value)}
                      className="flex justify-between items-center p-2 text-sm hover:bg-muted rounded-lg transition-colors text-left"
                    >
                      <span>{material.name}</span>
                      <span className="text-muted-foreground">{material.value} {material.unit}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Formula:</h4>
                  <p className="font-mono text-sm">ρ = m/V</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Where ρ is density, m is mass, and V is volume
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Key Information:</h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Density is mass per unit volume</li>
                    <li>• Temperature affects density of most materials</li>
                    <li>• Critical property in engineering calculations</li>
                    <li>• Used in buoyancy and fluid mechanics</li>
                    <li>• Results shown with adaptive precision</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}