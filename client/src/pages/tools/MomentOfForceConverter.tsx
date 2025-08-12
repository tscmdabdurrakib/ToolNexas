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

interface TorqueUnit {
  name: string;
  factor: number;
  symbol: string;
}

const units: Record<string, TorqueUnit> = {
  "n_m": { name: "Newton meters", factor: 1, symbol: "N⋅m" },
  "kn_m": { name: "Kilonewton meters", factor: 1000, symbol: "kN⋅m" },
  "lb_ft": { name: "Pound-feet", factor: 1.35582, symbol: "lb⋅ft" },
  "lb_in": { name: "Pound-inches", factor: 0.112985, symbol: "lb⋅in" },
  "kg_m": { name: "Kilogram-force meters", factor: 9.80665, symbol: "kg⋅m" },
  "g_cm": { name: "Gram-force centimeters", factor: 0.000098067, symbol: "g⋅cm" },
  "oz_in": { name: "Ounce-inches", factor: 0.007062, symbol: "oz⋅in" },
  "dyn_cm": { name: "Dyne centimeters", factor: 0.0000001, symbol: "dyn⋅cm" },
  "kgf_cm": { name: "Kilogram-force centimeters", factor: 0.0980665, symbol: "kgf⋅cm" },
  "ft_lbf": { name: "Foot pound-force", factor: 1.35582, symbol: "ft⋅lbf" },
};

const applicationExamples = [
  {
    application: "Car Lug Nuts",
    range: "80-120 N⋅m",
    description: "Typical torque specification"
  },
  {
    application: "Bicycle Pedals",
    range: "35-50 N⋅m",
    description: "Standard installation torque"
  },
  {
    application: "Engine Head Bolts",
    range: "50-100 N⋅m",
    description: "Varies by engine size"
  },
  {
    application: "Door Hinges",
    range: "2-8 N⋅m",
    description: "Residential door hardware"
  },
  {
    application: "Industrial Motors",
    range: "1000+ N⋅m",
    description: "High-power applications"
  },
];

export default function MomentOfForceConverter() {
  useToolVisit("moment-of-force-converter");
  
  const [inputValue, setInputValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("n_m");
  const [toUnit, setToUnit] = useState<string>("lb_ft");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetFields = () => {
    setInputValue("");
    setResult("");
    setError("");
  };

  const convertTorque = () => {
    const value = parseFloat(inputValue);

    if (isNaN(value)) {
      setError("Please enter a valid number");
      setResult("");
      return;
    }

    setError("");

    // Convert to base unit (N⋅m)
    const valueInBase = value * units[fromUnit].factor;
    
    // Convert from base to target unit
    const convertedValue = valueInBase / units[toUnit].factor;
    
    // Format result with appropriate decimal places
    const decimalPlaces = convertedValue < 0.001 ? 8 : convertedValue < 1 ? 6 : convertedValue < 1000 ? 4 : 2;
    setResult(convertedValue.toFixed(decimalPlaces));
  };

  useEffect(() => {
    if (inputValue) {
      convertTorque();
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
            <div className="p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Moment of Force Converter
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert torque and moment of force units with engineering precision for mechanical applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Torque Conversion
              </CardTitle>
              <CardDescription>
                Enter a torque value and select units to convert
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
                      placeholder="Enter torque value"
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
                  Common Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applicationExamples.map((example, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-sm">{example.application}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{example.description}</p>
                        </div>
                        <span className="text-xs font-mono text-blue-600 dark:text-blue-400">{example.range}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Formula & Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Formula:</h4>
                  <p className="font-mono text-sm">τ = r × F</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Where τ is torque, r is radius vector, and F is applied force
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Key Information:</h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Torque causes rotational motion</li>
                    <li>• Depends on force magnitude and distance</li>
                    <li>• Critical in bolt tightening specifications</li>
                    <li>• Used in motor and engine design</li>
                    <li>• Vector quantity with direction</li>
                  </ul>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Safety Note:
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Always follow manufacturer's torque specifications for critical fasteners to ensure safety and prevent damage.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}