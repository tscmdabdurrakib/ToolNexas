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

// Pressure conversion factors (to Pascal)
const conversionFactors = {
  pascal: 1,
  kilopascal: 1000,
  megapascal: 1000000,
  bar: 100000,
  millibar: 100,
  atmosphere: 101325,
  psi: 6894.76,
  torr: 133.322,
  mmHg: 133.322,
  inHg: 3386.39,
  kgfPerSqm: 9.80665,
  kgfPerSqcm: 98066.5,
  mmWater: 9.80665,
  cmWater: 98.0665,
  inWater: 249.089
};

// Type for Pressure units
type PressureUnit = keyof typeof conversionFactors;

// Unit display names with abbreviations
const unitLabels = {
  pascal: "Pascal (Pa)",
  kilopascal: "Kilopascal (kPa)",
  megapascal: "Megapascal (MPa)",
  bar: "Bar (bar)",
  millibar: "Millibar (mbar)",
  atmosphere: "Atmosphere (atm)",
  psi: "Pounds per Square Inch (psi)",
  torr: "Torr (Torr)",
  mmHg: "Millimeter of Mercury (mmHg)",
  inHg: "Inch of Mercury (inHg)",
  kgfPerSqm: "Kilogram-force per Square Meter (kgf/m²)",
  kgfPerSqcm: "Kilogram-force per Square Centimeter (kgf/cm²)",
  mmWater: "Millimeter of Water (mmH₂O)",
  cmWater: "Centimeter of Water (cmH₂O)",
  inWater: "Inch of Water (inH₂O)"
};

// Interface for common conversion examples
interface CommonConversion {
  from: PressureUnit;
  to: PressureUnit;
  value: number;
  result: number;
}

// Common conversion references for educational purposes
const commonConversions: CommonConversion[] = [
  { from: "bar", to: "psi", value: 1, result: 14.5038 },
  { from: "atmosphere", to: "bar", value: 1, result: 1.01325 },
  { from: "psi", to: "kilopascal", value: 1, result: 6.89476 },
  { from: "pascal", to: "torr", value: 100, result: 0.750062 },
  { from: "bar", to: "atmosphere", value: 1, result: 0.986923 }
];

/**
 * Pressure Converter Component
 * A modern, user-friendly tool for converting between different pressure units
 */
export default function PressureConverter() {
  const { toast } = useToast();
  const [fromUnit, setFromUnit] = useState<PressureUnit>("bar");
  const [toUnit, setToUnit] = useState<PressureUnit>("psi");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [animateResult, setAnimateResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Group units for select dropdown
  const unitGroups = {
    standard: ["pascal", "kilopascal", "megapascal", "bar", "millibar", "atmosphere"],
    technical: ["psi", "torr", "mmHg", "inHg"],
    hydrodynamic: ["kgfPerSqm", "kgfPerSqcm", "mmWater", "cmWater", "inWater"]
  };

  /**
   * Convert from one pressure unit to another
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
    
    if (numValue < 0 && fromUnit !== "psi") { // Vacuum pressure can be negative
      setError("Pressure cannot be negative in this unit");
      setResult("");
      return;
    }

    setError(null);
    
    // Convert to base unit (Pascal) then to target unit
    const inPascal = numValue * conversionFactors[fromUnit];
    const converted = inPascal / conversionFactors[toUnit];
    
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
    setFromUnit("bar");
    setToUnit("psi");
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
              onValueChange={(value: string) => setFromUnit(value as PressureUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pascal">Pascal (Pa)</SelectItem>
                <SelectItem value="kilopascal">Kilopascal (kPa)</SelectItem>
                <SelectItem value="megapascal">Megapascal (MPa)</SelectItem>
                <SelectItem value="bar">Bar (bar)</SelectItem>
                <SelectItem value="millibar">Millibar (mbar)</SelectItem>
                <SelectItem value="atmosphere">Atmosphere (atm)</SelectItem>
                <SelectItem value="psi">Pounds per Square Inch (psi)</SelectItem>
                <SelectItem value="torr">Torr (Torr)</SelectItem>
                <SelectItem value="mmHg">Millimeter of Mercury (mmHg)</SelectItem>
                <SelectItem value="inHg">Inch of Mercury (inHg)</SelectItem>
                <SelectItem value="kgfPerSqm">Kilogram-force per Square Meter (kgf/m²)</SelectItem>
                <SelectItem value="kgfPerSqcm">Kilogram-force per Square Centimeter (kgf/cm²)</SelectItem>
                <SelectItem value="mmWater">Millimeter of Water (mmH₂O)</SelectItem>
                <SelectItem value="cmWater">Centimeter of Water (cmH₂O)</SelectItem>
                <SelectItem value="inWater">Inch of Water (inH₂O)</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Enter pressure"
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
              onValueChange={(value: string) => setToUnit(value as PressureUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pascal">Pascal (Pa)</SelectItem>
                <SelectItem value="kilopascal">Kilopascal (kPa)</SelectItem>
                <SelectItem value="megapascal">Megapascal (MPa)</SelectItem>
                <SelectItem value="bar">Bar (bar)</SelectItem>
                <SelectItem value="millibar">Millibar (mbar)</SelectItem>
                <SelectItem value="atmosphere">Atmosphere (atm)</SelectItem>
                <SelectItem value="psi">Pounds per Square Inch (psi)</SelectItem>
                <SelectItem value="torr">Torr (Torr)</SelectItem>
                <SelectItem value="mmHg">Millimeter of Mercury (mmHg)</SelectItem>
                <SelectItem value="inHg">Inch of Mercury (inHg)</SelectItem>
                <SelectItem value="kgfPerSqm">Kilogram-force per Square Meter (kgf/m²)</SelectItem>
                <SelectItem value="kgfPerSqcm">Kilogram-force per Square Centimeter (kgf/cm²)</SelectItem>
                <SelectItem value="mmWater">Millimeter of Water (mmH₂O)</SelectItem>
                <SelectItem value="cmWater">Centimeter of Water (cmH₂O)</SelectItem>
                <SelectItem value="inWater">Inch of Water (inH₂O)</SelectItem>
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
          <h3 className="text-sm font-medium">Common Pressure Conversions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
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