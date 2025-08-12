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

interface MomentOfInertiaUnit {
  name: string;
  factor: number;
  symbol: string;
}

const units: Record<string, MomentOfInertiaUnit> = {
  "kg_m2": { name: "Kilogram square meters", factor: 1, symbol: "kg⋅m²" },
  "g_cm2": { name: "Gram square centimeters", factor: 0.0000001, symbol: "g⋅cm²" },
  "lb_ft2": { name: "Pound square feet", factor: 0.04214, symbol: "lb⋅ft²" },
  "lb_in2": { name: "Pound square inches", factor: 0.0002926, symbol: "lb⋅in²" },
  "oz_in2": { name: "Ounce square inches", factor: 0.00001829, symbol: "oz⋅in²" },
  "slug_ft2": { name: "Slug square feet", factor: 1.3558, symbol: "slug⋅ft²" },
  "t_m2": { name: "Tonne square meters", factor: 1000, symbol: "t⋅m²" },
  "kg_cm2": { name: "Kilogram square centimeters", factor: 0.0001, symbol: "kg⋅cm²" },
  "g_m2": { name: "Gram square meters", factor: 0.001, symbol: "g⋅m²" },
  "kg_mm2": { name: "Kilogram square millimeters", factor: 0.000001, symbol: "kg⋅mm²" },
};

const commonShapes = [
  {
    name: "Solid Cylinder (about axis)",
    formula: "I = ½mr²",
    description: "Rotating about its central axis"
  },
  {
    name: "Thin Ring",
    formula: "I = mr²",
    description: "Mass concentrated at radius r"
  },
  {
    name: "Solid Sphere",
    formula: "I = ⅖mr²",
    description: "About any diameter"
  },
  {
    name: "Thin Rod (center)",
    formula: "I = 1/12 mL²",
    description: "About center perpendicular to length"
  },
  {
    name: "Rectangular Plate",
    formula: "I = 1/12 m(a² + b²)",
    description: "About axis through center"
  },
];

export default function MomentOfInertiaConverter() {
  useToolVisit("moment-of-inertia-converter");
  
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("kg_m2");
  const [toUnit, setToUnit] = useState<string>("lb_ft2");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetFields = () => {
    setInputValue("");
    setResult("");
    setError("");
  };

  const convertMomentOfInertia = () => {
    const value = parseFloat(inputValue);

    if (isNaN(value)) {
      setError("Please enter a valid number");
      setResult("");
      return;
    }

    if (value < 0) {
      setError("Moment of inertia cannot be negative");
      setResult("");
      return;
    }

    setError("");

    // Convert to base unit (kg⋅m²)
    const valueInBase = value * units[fromUnit].factor;
    
    // Convert from base to target unit
    const convertedValue = valueInBase / units[toUnit].factor;
    
    // Format result with appropriate decimal places
    const decimalPlaces = convertedValue < 0.0001 ? 10 : convertedValue < 1 ? 8 : convertedValue < 1000 ? 6 : 4;
    setResult(convertedValue.toFixed(decimalPlaces));
  };

  useEffect(() => {
    if (inputValue) {
      convertMomentOfInertia();
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
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Moment of Inertia Converter
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert moment of inertia units for mechanical engineering and rotational dynamics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Moment of Inertia Conversion
              </CardTitle>
              <CardDescription>
                Enter a moment of inertia value and select units to convert
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
                      placeholder="Enter moment of inertia value"
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
                  Common Shapes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {commonShapes.map((shape, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm">{shape.name}</h4>
                      <p className="font-mono text-xs text-blue-600 dark:text-blue-400 mt-1">{shape.formula}</p>
                      <p className="text-xs text-muted-foreground mt-1">{shape.description}</p>
                    </div>
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
                  <h4 className="font-semibold mb-2">Definition:</h4>
                  <p className="font-mono text-sm">I = Σmr²</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Moment of inertia quantifies rotational inertia about an axis
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Key Information:</h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Resistance to angular acceleration</li>
                    <li>• Depends on mass distribution</li>
                    <li>• Critical for rotating machinery design</li>
                    <li>• Used in dynamic analysis</li>
                    <li>• Parallel axis theorem applies</li>
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