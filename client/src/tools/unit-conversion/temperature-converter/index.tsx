import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownUp, Copy, RotateCcw, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Temperature conversion functions
const conversionFunctions = {
  // Celsius conversions
  celsiusToFahrenheit: (celsius: number) => (celsius * 9/5) + 32,
  celsiusToKelvin: (celsius: number) => celsius + 273.15,
  celsiusToRankine: (celsius: number) => (celsius + 273.15) * 9/5,
  celsiusToReaumur: (celsius: number) => celsius * 4/5,
  
  // Fahrenheit conversions
  fahrenheitToCelsius: (fahrenheit: number) => (fahrenheit - 32) * 5/9,
  fahrenheitToKelvin: (fahrenheit: number) => (fahrenheit - 32) * 5/9 + 273.15,
  fahrenheitToRankine: (fahrenheit: number) => fahrenheit + 459.67,
  fahrenheitToReaumur: (fahrenheit: number) => (fahrenheit - 32) * 4/9,
  
  // Kelvin conversions
  kelvinToCelsius: (kelvin: number) => kelvin - 273.15,
  kelvinToFahrenheit: (kelvin: number) => (kelvin * 9/5) - 459.67,
  kelvinToRankine: (kelvin: number) => kelvin * 9/5,
  kelvinToReaumur: (kelvin: number) => (kelvin - 273.15) * 4/5,
  
  // Rankine conversions
  rankineToCelsius: (rankine: number) => (rankine - 491.67) * 5/9,
  rankineToFahrenheit: (rankine: number) => rankine - 459.67,
  rankineToKelvin: (rankine: number) => rankine * 5/9,
  rankineToReaumur: (rankine: number) => (rankine - 491.67) * 4/9,
  
  // Réaumur conversions
  reaumurToCelsius: (reaumur: number) => reaumur * 5/4,
  reaumurToFahrenheit: (reaumur: number) => (reaumur * 9/4) + 32,
  reaumurToKelvin: (reaumur: number) => (reaumur * 5/4) + 273.15,
  reaumurToRankine: (reaumur: number) => (reaumur * 9/4) + 491.67
};

// Type for Temperature units
type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin" | "rankine" | "reaumur";

// Unit display names with abbreviations
const unitLabels: Record<TemperatureUnit, string> = {
  celsius: "Celsius (°C)",
  fahrenheit: "Fahrenheit (°F)",
  kelvin: "Kelvin (K)",
  rankine: "Rankine (°R)",
  reaumur: "Réaumur (°Ré)"
};

// Interface for common conversion examples
interface CommonConversion {
  from: TemperatureUnit;
  to: TemperatureUnit;
  value: number;
  result: number;
}

// Common conversion references for educational purposes
const commonConversions: CommonConversion[] = [
  { from: "celsius", to: "fahrenheit", value: 0, result: 32 },
  { from: "celsius", to: "fahrenheit", value: 100, result: 212 },
  { from: "celsius", to: "kelvin", value: 0, result: 273.15 },
  { from: "fahrenheit", to: "celsius", value: 32, result: 0 },
  { from: "fahrenheit", to: "celsius", value: 212, result: 100 },
  { from: "kelvin", to: "celsius", value: 273.15, result: 0 }
];

/**
 * Temperature Converter Component
 * A modern, user-friendly tool for converting between different temperature units
 */
export default function TemperatureConverter() {
  const { toast } = useToast();
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>("celsius");
  const [toUnit, setToUnit] = useState<TemperatureUnit>("fahrenheit");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [animateResult, setAnimateResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Convert from one temperature unit to another
   */
  const convert = () => {
    if (!inputValue) {
      setResult("");
      setError(null);
      return;
    }

    const numValue = parseFloat(inputValue);
    
    // Validate input
    if (isNaN(numValue)) {
      setError("Please enter a valid number");
      setResult("");
      return;
    }
    
    // Clear previous errors
    setError(null);
    
    // Perform the conversion
    let convertedValue: number;
    
    // Select the appropriate conversion function
    if (fromUnit === toUnit) {
      convertedValue = numValue; // Same unit, no conversion needed
    } else if (fromUnit === "celsius" && toUnit === "fahrenheit") {
      convertedValue = conversionFunctions.celsiusToFahrenheit(numValue);
    } else if (fromUnit === "celsius" && toUnit === "kelvin") {
      convertedValue = conversionFunctions.celsiusToKelvin(numValue);
    } else if (fromUnit === "celsius" && toUnit === "rankine") {
      convertedValue = conversionFunctions.celsiusToRankine(numValue);
    } else if (fromUnit === "celsius" && toUnit === "reaumur") {
      convertedValue = conversionFunctions.celsiusToReaumur(numValue);
    } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
      convertedValue = conversionFunctions.fahrenheitToCelsius(numValue);
    } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
      convertedValue = conversionFunctions.fahrenheitToKelvin(numValue);
    } else if (fromUnit === "fahrenheit" && toUnit === "rankine") {
      convertedValue = conversionFunctions.fahrenheitToRankine(numValue);
    } else if (fromUnit === "fahrenheit" && toUnit === "reaumur") {
      convertedValue = conversionFunctions.fahrenheitToReaumur(numValue);
    } else if (fromUnit === "kelvin" && toUnit === "celsius") {
      convertedValue = conversionFunctions.kelvinToCelsius(numValue);
    } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
      convertedValue = conversionFunctions.kelvinToFahrenheit(numValue);
    } else if (fromUnit === "kelvin" && toUnit === "rankine") {
      convertedValue = conversionFunctions.kelvinToRankine(numValue);
    } else if (fromUnit === "kelvin" && toUnit === "reaumur") {
      convertedValue = conversionFunctions.kelvinToReaumur(numValue);
    } else if (fromUnit === "rankine" && toUnit === "celsius") {
      convertedValue = conversionFunctions.rankineToCelsius(numValue);
    } else if (fromUnit === "rankine" && toUnit === "fahrenheit") {
      convertedValue = conversionFunctions.rankineToFahrenheit(numValue);
    } else if (fromUnit === "rankine" && toUnit === "kelvin") {
      convertedValue = conversionFunctions.rankineToKelvin(numValue);
    } else if (fromUnit === "rankine" && toUnit === "reaumur") {
      convertedValue = conversionFunctions.rankineToReaumur(numValue);
    } else if (fromUnit === "reaumur" && toUnit === "celsius") {
      convertedValue = conversionFunctions.reaumurToCelsius(numValue);
    } else if (fromUnit === "reaumur" && toUnit === "fahrenheit") {
      convertedValue = conversionFunctions.reaumurToFahrenheit(numValue);
    } else if (fromUnit === "reaumur" && toUnit === "kelvin") {
      convertedValue = conversionFunctions.reaumurToKelvin(numValue);
    } else if (fromUnit === "reaumur" && toUnit === "rankine") {
      convertedValue = conversionFunctions.reaumurToRankine(numValue);
    } else {
      setError("Conversion not supported");
      setResult("");
      return;
    }
    
    // Format result based on magnitude
    setResult(formatValue(convertedValue));
    
    // Animate the result
    setAnimateResult(true);
    setTimeout(() => setAnimateResult(false), 500);
  };

  /**
   * Format number based on its magnitude
   */
  const formatValue = (value: number): string => {
    if (value === 0) return "0";
    
    // For temperature, we usually want 2 decimal places for most values
    if (Math.abs(value) < 0.01) return value.toFixed(4);
    if (Math.abs(value) < 10) return value.toFixed(2);
    
    // For larger values, fewer decimal places
    return value.toFixed(1);
  };

  /**
   * Swap the from and to units
   */
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  /**
   * Reset all fields to default
   */
  const resetFields = () => {
    setInputValue("");
    setResult("");
    setFromUnit("celsius");
    setToUnit("fahrenheit");
    setError(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  /**
   * Copy result to clipboard
   */
  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: `${result} ${unitLabels[toUnit]?.split(' ')[0]} copied to clipboard.`,
        duration: 2000,
      });
    }
  };

  // Convert when input or units change
  useEffect(() => {
    convert();
  }, [inputValue, fromUnit, toUnit]);

  return (
    <Card className="w-full max-w-4xl mx-auto border-none shadow-none">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6">
          {/* From Unit */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">From</h3>
            <Select 
              value={fromUnit} 
              onValueChange={(value: string) => setFromUnit(value as TemperatureUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                <SelectItem value="rankine">Rankine (°R)</SelectItem>
                <SelectItem value="reaumur">Réaumur (°Ré)</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Enter temperature"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-2"
              ref={inputRef}
              inputMode="decimal"
            />
            {error && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>

          {/* To Unit */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">To</h3>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
                onClick={swapUnits}
                title="Swap units"
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>
            <Select 
              value={toUnit} 
              onValueChange={(value: string) => setToUnit(value as TemperatureUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                <SelectItem value="rankine">Rankine (°R)</SelectItem>
                <SelectItem value="reaumur">Réaumur (°Ré)</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="border rounded-md mt-2 h-[40px] p-2 flex items-center justify-between bg-muted/30">
              <AnimatePresence>
                <motion.div
                  key={result}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between w-full"
                >
                  <div className="text-lg font-medium">
                    {result ? (
                      <motion.div 
                        animate={animateResult ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {result} <span className="text-sm font-normal">
                          {unitLabels[toUnit]?.match(/\(([^)]+)\)/)?.[1]}
                        </span>
                      </motion.div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Enter a value to convert</span>
                    )}
                  </div>
                  {result && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={copyResult}
                      title="Copy result"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFields}
            className="flex items-center gap-1"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset
          </Button>
        </div>
        
        {/* Conversion details box */}
        <div className="space-y-4">
          {inputValue && !error && result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-muted/30 p-4 rounded-lg text-sm"
            >
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Conversion Details:</span>
                  <p className="text-muted-foreground mt-1">
                    {`${inputValue} ${unitLabels[fromUnit]?.split(' ')[0]} = ${result} ${unitLabels[toUnit]?.split(' ')[0]}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {fromUnit === "celsius" && toUnit === "fahrenheit" && "Formula: °F = (°C × 9/5) + 32"}
                    {fromUnit === "fahrenheit" && toUnit === "celsius" && "Formula: °C = (°F - 32) × 5/9"}
                    {fromUnit === "celsius" && toUnit === "kelvin" && "Formula: K = °C + 273.15"}
                    {fromUnit === "kelvin" && toUnit === "celsius" && "Formula: °C = K - 273.15"}
                    {fromUnit === "fahrenheit" && toUnit === "kelvin" && "Formula: K = (°F - 32) × 5/9 + 273.15"}
                    {fromUnit === "kelvin" && toUnit === "fahrenheit" && "Formula: °F = (K × 9/5) - 459.67"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Common Conversions Table */}
        <Separator className="my-6" />
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Common Temperature Conversions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {commonConversions.map((conv, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Badge variant="outline" className="h-6 px-1.5 text-xs whitespace-nowrap">
                  {conv.value} {unitLabels[conv.from]?.match(/\(([^)]+)\)/)?.[1]}
                </Badge>
                <span>=</span>
                <Badge variant="outline" className="h-6 px-1.5 text-xs bg-primary/5 whitespace-nowrap">
                  {conv.result} {unitLabels[conv.to]?.match(/\(([^)]+)\)/)?.[1]}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}