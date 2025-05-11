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

// Volume conversion factors (to cubic meters)
const conversionFactors = {
  cubicMeter: 1,
  liter: 0.001,
  milliliter: 0.000001,
  cubicCentimeter: 0.000001,
  cubicInch: 0.0000163871,
  cubicFoot: 0.0283168,
  cubicYard: 0.764555,
  usGallon: 0.00378541,
  usQuart: 0.000946353,
  usPint: 0.000473176,
  usCup: 0.000236588,
  usFluidOunce: 0.0000295735,
  usTablespoon: 0.0000147868,
  usTeaspoon: 0.00000492892,
  imperialGallon: 0.00454609,
  imperialQuart: 0.00113652,
  imperialPint: 0.000568261,
  imperialFluidOunce: 0.0000284131
};

// Type for Volume units
type VolumeUnit = keyof typeof conversionFactors;

// Unit display names with abbreviations
const unitLabels = {
  cubicMeter: "Cubic Meter (m³)",
  liter: "Liter (L)",
  milliliter: "Milliliter (mL)",
  cubicCentimeter: "Cubic Centimeter (cm³)",
  cubicInch: "Cubic Inch (in³)",
  cubicFoot: "Cubic Foot (ft³)",
  cubicYard: "Cubic Yard (yd³)",
  usGallon: "US Gallon (gal)",
  usQuart: "US Quart (qt)",
  usPint: "US Pint (pt)",
  usCup: "US Cup (cup)",
  usFluidOunce: "US Fluid Ounce (fl oz)",
  usTablespoon: "US Tablespoon (tbsp)",
  usTeaspoon: "US Teaspoon (tsp)",
  imperialGallon: "Imperial Gallon (gal)",
  imperialQuart: "Imperial Quart (qt)",
  imperialPint: "Imperial Pint (pt)",
  imperialFluidOunce: "Imperial Fluid Ounce (fl oz)"
};

// Interface for common conversion examples
interface CommonConversion {
  from: VolumeUnit;
  to: VolumeUnit;
  value: number;
  result: number;
}

// Common conversion references for educational purposes
const commonConversions: CommonConversion[] = [
  { from: "liter", to: "usGallon", value: 1, result: 0.264172 },
  { from: "usGallon", to: "liter", value: 1, result: 3.78541 },
  { from: "imperialGallon", to: "usGallon", value: 1, result: 1.20095 },
  { from: "cubicFoot", to: "cubicMeter", value: 1, result: 0.0283168 },
  { from: "cubicMeter", to: "liter", value: 1, result: 1000 }
];

/**
 * Volume Converter Component
 * A modern, user-friendly tool for converting between different volume units
 */
export default function VolumeConverter() {
  const { toast } = useToast();
  const [fromUnit, setFromUnit] = useState<VolumeUnit>("liter");
  const [toUnit, setToUnit] = useState<VolumeUnit>("usGallon");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [animateResult, setAnimateResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Group units for select dropdown
  const unitGroups = {
    metric: ["cubicMeter", "liter", "milliliter", "cubicCentimeter"],
    imperial: ["cubicInch", "cubicFoot", "cubicYard"],
    us: [
      "usGallon", 
      "usQuart", 
      "usPint", 
      "usCup", 
      "usFluidOunce", 
      "usTablespoon", 
      "usTeaspoon"
    ],
    uk: [
      "imperialGallon", 
      "imperialQuart", 
      "imperialPint", 
      "imperialFluidOunce"
    ]
  };

  /**
   * Convert from one volume unit to another
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
      setError("Volume cannot be negative");
      setResult("");
      return;
    }

    setError(null);
    
    // Convert to base unit (cubic meters) then to target unit
    const inCubicMeters = numValue * conversionFactors[fromUnit];
    const converted = inCubicMeters / conversionFactors[toUnit];
    
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
    setFromUnit("liter");
    setToUnit("usGallon");
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
              onValueChange={(value: string) => setFromUnit(value as VolumeUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cubicMeter">Cubic Meter (m³)</SelectItem>
                <SelectItem value="liter">Liter (L)</SelectItem>
                <SelectItem value="milliliter">Milliliter (mL)</SelectItem>
                <SelectItem value="cubicCentimeter">Cubic Centimeter (cm³)</SelectItem>
                <SelectItem value="cubicInch">Cubic Inch (in³)</SelectItem>
                <SelectItem value="cubicFoot">Cubic Foot (ft³)</SelectItem>
                <SelectItem value="cubicYard">Cubic Yard (yd³)</SelectItem>
                <SelectItem value="usGallon">US Gallon (gal)</SelectItem>
                <SelectItem value="usQuart">US Quart (qt)</SelectItem>
                <SelectItem value="usPint">US Pint (pt)</SelectItem>
                <SelectItem value="usCup">US Cup (cup)</SelectItem>
                <SelectItem value="usFluidOunce">US Fluid Ounce (fl oz)</SelectItem>
                <SelectItem value="usTablespoon">US Tablespoon (tbsp)</SelectItem>
                <SelectItem value="usTeaspoon">US Teaspoon (tsp)</SelectItem>
                <SelectItem value="imperialGallon">Imperial Gallon (gal)</SelectItem>
                <SelectItem value="imperialQuart">Imperial Quart (qt)</SelectItem>
                <SelectItem value="imperialPint">Imperial Pint (pt)</SelectItem>
                <SelectItem value="imperialFluidOunce">Imperial Fluid Ounce (fl oz)</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Enter volume"
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
              onValueChange={(value: string) => setToUnit(value as VolumeUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cubicMeter">Cubic Meter (m³)</SelectItem>
                <SelectItem value="liter">Liter (L)</SelectItem>
                <SelectItem value="milliliter">Milliliter (mL)</SelectItem>
                <SelectItem value="cubicCentimeter">Cubic Centimeter (cm³)</SelectItem>
                <SelectItem value="cubicInch">Cubic Inch (in³)</SelectItem>
                <SelectItem value="cubicFoot">Cubic Foot (ft³)</SelectItem>
                <SelectItem value="cubicYard">Cubic Yard (yd³)</SelectItem>
                <SelectItem value="usGallon">US Gallon (gal)</SelectItem>
                <SelectItem value="usQuart">US Quart (qt)</SelectItem>
                <SelectItem value="usPint">US Pint (pt)</SelectItem>
                <SelectItem value="usCup">US Cup (cup)</SelectItem>
                <SelectItem value="usFluidOunce">US Fluid Ounce (fl oz)</SelectItem>
                <SelectItem value="usTablespoon">US Tablespoon (tbsp)</SelectItem>
                <SelectItem value="usTeaspoon">US Teaspoon (tsp)</SelectItem>
                <SelectItem value="imperialGallon">Imperial Gallon (gal)</SelectItem>
                <SelectItem value="imperialQuart">Imperial Quart (qt)</SelectItem>
                <SelectItem value="imperialPint">Imperial Pint (pt)</SelectItem>
                <SelectItem value="imperialFluidOunce">Imperial Fluid Ounce (fl oz)</SelectItem>
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
                          {unitLabels[toUnit as keyof typeof unitLabels]?.match(/\(([^)]+)\)/)?.[1]}
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
                    {`1 ${unitLabels[fromUnit as keyof typeof unitLabels]?.split(' ')[0]} = ${(conversionFactors[fromUnit] / conversionFactors[toUnit]).toFixed(6)} ${unitLabels[toUnit as keyof typeof unitLabels]?.split(' ')[0]}`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Common Conversions Table */}
        <Separator className="my-6" />
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Common Volume Conversions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {commonConversions.map((conv, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Badge variant="outline" className="h-6 px-1.5 text-xs whitespace-nowrap">
                  {conv.value} {unitLabels[conv.from as keyof typeof unitLabels]?.match(/\(([^)]+)\)/)?.[1]}
                </Badge>
                <span>=</span>
                <Badge variant="outline" className="h-6 px-1.5 text-xs bg-primary/5 whitespace-nowrap">
                  {conv.result} {unitLabels[conv.to as keyof typeof unitLabels]?.match(/\(([^)]+)\)/)?.[1]}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}