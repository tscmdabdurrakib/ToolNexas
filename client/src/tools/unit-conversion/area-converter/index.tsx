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

// Area conversion factors (to square meters)
const conversionFactors = {
  squareMeter: 1,
  squareKilometer: 1000000,
  squareCentimeter: 0.0001,
  squareMillimeter: 0.000001,
  squareMicrometer: 0.000000000001,
  hectare: 10000,
  squareMile: 2589988.11,
  squareYard: 0.83612736,
  squareFoot: 0.09290304,
  squareInch: 0.00064516,
  acre: 4046.8564224,
  arpent: 3418.89,
  circularmil: 0.0000000005067,
  township: 93239571.972,
  section: 2589988.11,
  homestead: 647497.027
};

// Type for Area units
type AreaUnit = keyof typeof conversionFactors;

// Unit display names with abbreviations
const unitLabels = {
  squareMeter: "Square Meter (m²)",
  squareKilometer: "Square Kilometer (km²)",
  squareCentimeter: "Square Centimeter (cm²)",
  squareMillimeter: "Square Millimeter (mm²)",
  squareMicrometer: "Square Micrometer (μm²)",
  hectare: "Hectare (ha)",
  squareMile: "Square Mile (mi²)",
  squareYard: "Square Yard (yd²)",
  squareFoot: "Square Foot (ft²)",
  squareInch: "Square Inch (in²)",
  acre: "Acre (ac)",
  arpent: "Arpent (arpent)",
  circularmil: "Circular Mil (cmil)",
  township: "Township (twp)",
  section: "Section (sec)",
  homestead: "Homestead (hmsd)"
};

// Interface for common conversion examples
interface CommonConversion {
  from: AreaUnit;
  to: AreaUnit;
  value: number;
  result: number;
}

// Common conversion references for educational purposes
const commonConversions: CommonConversion[] = [
  { from: "hectare", to: "acre", value: 1, result: 2.47105 },
  { from: "squareMeter", to: "squareFoot", value: 1, result: 10.7639 },
  { from: "acre", to: "squareMeter", value: 1, result: 4046.86 },
  { from: "squareMile", to: "squareKilometer", value: 1, result: 2.58999 },
  { from: "squareFoot", to: "squareInch", value: 1, result: 144 }
];

/**
 * Area Converter Component
 * A modern, user-friendly tool for converting between different units of area
 */
export default function AreaConverter() {
  const { toast } = useToast();
  const [fromUnit, setFromUnit] = useState<AreaUnit>("squareMeter");
  const [toUnit, setToUnit] = useState<AreaUnit>("squareFoot");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [animateResult, setAnimateResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Group units for select dropdown
  const unitGroups = {
    metric: ["squareMeter", "squareKilometer", "squareCentimeter", "squareMillimeter", "squareMicrometer", "hectare"],
    imperialUS: ["squareMile", "squareYard", "squareFoot", "squareInch", "acre", "township", "section", "homestead"],
    other: ["arpent", "circularmil"]
  };

  /**
   * Convert from one area unit to another
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
    
    if (numValue < 0) {
      setError("Area cannot be negative");
      setResult("");
      return;
    }

    setError(null);
    
    // Convert to base unit (square meters) then to target unit
    const inSquareMeters = numValue * conversionFactors[fromUnit];
    const converted = inSquareMeters / conversionFactors[toUnit];
    
    // Format result based on magnitude
    setResult(formatValue(converted));
    
    // Animate the result
    setAnimateResult(true);
    setTimeout(() => setAnimateResult(false), 500);
  };

  /**
   * Format number based on its magnitude
   */
  const formatValue = (value: number): string => {
    if (value === 0) return "0";
    
    const absValue = Math.abs(value);
    
    if (absValue < 0.0000001) return value.toExponential(6);
    if (absValue < 0.00001) return value.toFixed(10);
    if (absValue < 0.0001) return value.toFixed(8);
    if (absValue < 0.001) return value.toFixed(6);
    if (absValue < 0.01) return value.toFixed(5);
    if (absValue < 1) return value.toFixed(4);
    if (absValue < 10) return value.toFixed(3);
    if (absValue < 100) return value.toFixed(2);
    if (absValue < 1000) return value.toFixed(1);
    
    return value.toFixed(0);
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
    setFromUnit("squareMeter");
    setToUnit("squareFoot");
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
        description: `${result} ${unitLabels[toUnit as keyof typeof unitLabels]?.split(' ')[0]} copied to clipboard.`,
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
              onValueChange={(value: string) => setFromUnit(value as AreaUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="squareMeter">Square Meter (m²)</SelectItem>
                <SelectItem value="squareKilometer">Square Kilometer (km²)</SelectItem>
                <SelectItem value="squareCentimeter">Square Centimeter (cm²)</SelectItem>
                <SelectItem value="squareMillimeter">Square Millimeter (mm²)</SelectItem>
                <SelectItem value="squareMicrometer">Square Micrometer (μm²)</SelectItem>
                <SelectItem value="hectare">Hectare (ha)</SelectItem>
                <SelectItem value="squareMile">Square Mile (mi²)</SelectItem>
                <SelectItem value="squareYard">Square Yard (yd²)</SelectItem>
                <SelectItem value="squareFoot">Square Foot (ft²)</SelectItem>
                <SelectItem value="squareInch">Square Inch (in²)</SelectItem>
                <SelectItem value="acre">Acre (ac)</SelectItem>
                <SelectItem value="arpent">Arpent</SelectItem>
                <SelectItem value="circularmil">Circular Mil (cmil)</SelectItem>
                <SelectItem value="township">Township (twp)</SelectItem>
                <SelectItem value="section">Section (sec)</SelectItem>
                <SelectItem value="homestead">Homestead (hmsd)</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Enter area"
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
              onValueChange={(value: string) => setToUnit(value as AreaUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="squareMeter">Square Meter (m²)</SelectItem>
                <SelectItem value="squareKilometer">Square Kilometer (km²)</SelectItem>
                <SelectItem value="squareCentimeter">Square Centimeter (cm²)</SelectItem>
                <SelectItem value="squareMillimeter">Square Millimeter (mm²)</SelectItem>
                <SelectItem value="squareMicrometer">Square Micrometer (μm²)</SelectItem>
                <SelectItem value="hectare">Hectare (ha)</SelectItem>
                <SelectItem value="squareMile">Square Mile (mi²)</SelectItem>
                <SelectItem value="squareYard">Square Yard (yd²)</SelectItem>
                <SelectItem value="squareFoot">Square Foot (ft²)</SelectItem>
                <SelectItem value="squareInch">Square Inch (in²)</SelectItem>
                <SelectItem value="acre">Acre (ac)</SelectItem>
                <SelectItem value="arpent">Arpent</SelectItem>
                <SelectItem value="circularmil">Circular Mil (cmil)</SelectItem>
                <SelectItem value="township">Township (twp)</SelectItem>
                <SelectItem value="section">Section (sec)</SelectItem>
                <SelectItem value="homestead">Homestead (hmsd)</SelectItem>
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
                          {unitLabels[toUnit as keyof typeof unitLabels]?.match(/\(([^)]+)\)/)?.[1] || unitLabels[toUnit as keyof typeof unitLabels]?.split(' ')[1]}
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
                    {`${inputValue} ${unitLabels[fromUnit as keyof typeof unitLabels]?.split(' ')[0]} = ${result} ${unitLabels[toUnit as keyof typeof unitLabels]?.split(' ')[0]}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {`1 ${unitLabels[fromUnit as keyof typeof unitLabels]?.split(' ')[0]} = ${(conversionFactors[fromUnit] / conversionFactors[toUnit]).toExponential(6)} ${unitLabels[toUnit as keyof typeof unitLabels]?.split(' ')[0]}`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Common Conversions Table */}
        <Separator className="my-6" />
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Common Area Conversions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {commonConversions.map((conv, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Badge variant="outline" className="h-6 px-1.5 text-xs whitespace-nowrap">
                  {conv.value} {unitLabels[conv.from as keyof typeof unitLabels]?.match(/\(([^)]+)\)/)?.[1] || unitLabels[conv.from as keyof typeof unitLabels]?.split(' ')[1]}
                </Badge>
                <span>=</span>
                <Badge variant="outline" className="h-6 px-1.5 text-xs bg-primary/5 whitespace-nowrap">
                  {conv.result} {unitLabels[conv.to as keyof typeof unitLabels]?.match(/\(([^)]+)\)/)?.[1] || unitLabels[conv.to as keyof typeof unitLabels]?.split(' ')[1]}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}