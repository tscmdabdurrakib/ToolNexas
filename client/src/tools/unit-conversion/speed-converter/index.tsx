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

// Speed conversion factors (to meters per second)
const conversionFactors = {
  // Metric
  meterPerSecond: 1,
  kilometerPerSecond: 1000,
  kilometerPerHour: 0.277778,
  centimeterPerSecond: 0.01,
  millimeterPerSecond: 0.001,
  
  // Imperial/US
  milePerHour: 0.44704,
  milePerSecond: 1609.34,
  footPerSecond: 0.3048,
  footPerHour: 0.0000846667,
  inchPerSecond: 0.0254,
  yardPerSecond: 0.9144,
  
  // Marine
  knot: 0.514444,
  
  // Aeronautics & Space
  mach: 340.29, // at sea level, 15°C
  speedOfLight: 299792458,
  
  // Other
  beaufortScale: 0.836, // Beaufort scale 1 is approximately 0.836 m/s
};

// Type for Speed units
type SpeedUnit = keyof typeof conversionFactors;

// Unit display names with abbreviations
const unitLabels = {
  meterPerSecond: "Meter per Second (m/s)",
  kilometerPerSecond: "Kilometer per Second (km/s)",
  kilometerPerHour: "Kilometer per Hour (km/h)",
  centimeterPerSecond: "Centimeter per Second (cm/s)",
  millimeterPerSecond: "Millimeter per Second (mm/s)",
  milePerHour: "Mile per Hour (mph)",
  milePerSecond: "Mile per Second (mi/s)",
  footPerSecond: "Foot per Second (ft/s)",
  footPerHour: "Foot per Hour (ft/h)",
  inchPerSecond: "Inch per Second (in/s)",
  yardPerSecond: "Yard per Second (yd/s)",
  knot: "Knot (kn)",
  mach: "Mach (M)",
  speedOfLight: "Speed of Light (c)",
  beaufortScale: "Beaufort Scale (Bft)"
};

// Interface for common conversion examples
interface CommonConversion {
  from: SpeedUnit;
  to: SpeedUnit;
  value: number;
  result: number;
}

// Common conversion references for educational purposes
const commonConversions: CommonConversion[] = [
  { from: "kilometerPerHour", to: "milePerHour", value: 100, result: 62.14 },
  { from: "meterPerSecond", to: "kilometerPerHour", value: 1, result: 3.6 },
  { from: "knot", to: "kilometerPerHour", value: 1, result: 1.852 },
  { from: "milePerHour", to: "footPerSecond", value: 1, result: 1.467 },
  { from: "mach", to: "kilometerPerHour", value: 1, result: 1225.044 }
];

/**
 * Speed Converter Component
 * A modern, user-friendly tool for converting between different units of speed
 */
export default function SpeedConverter() {
  const { toast } = useToast();
  const [fromUnit, setFromUnit] = useState<SpeedUnit>("kilometerPerHour");
  const [toUnit, setToUnit] = useState<SpeedUnit>("milePerHour");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [animateResult, setAnimateResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Group units for select dropdown
  const unitGroups = {
    metric: ["meterPerSecond", "kilometerPerSecond", "kilometerPerHour", "centimeterPerSecond", "millimeterPerSecond"],
    imperial: ["milePerHour", "milePerSecond", "footPerSecond", "footPerHour", "inchPerSecond", "yardPerSecond"],
    marine: ["knot"],
    special: ["mach", "speedOfLight", "beaufortScale"]
  };

  /**
   * Convert from one speed unit to another
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
      setError("Speed cannot be negative");
      setResult("");
      return;
    }

    setError(null);
    
    // Convert to base unit (meters per second) then to target unit
    const inMetersPerSecond = numValue * conversionFactors[fromUnit];
    const converted = inMetersPerSecond / conversionFactors[toUnit];
    
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
    setFromUnit("kilometerPerHour");
    setToUnit("milePerHour");
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
              onValueChange={(value: string) => setFromUnit(value as SpeedUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meterPerSecond">Meter per Second (m/s)</SelectItem>
                <SelectItem value="kilometerPerSecond">Kilometer per Second (km/s)</SelectItem>
                <SelectItem value="kilometerPerHour">Kilometer per Hour (km/h)</SelectItem>
                <SelectItem value="centimeterPerSecond">Centimeter per Second (cm/s)</SelectItem>
                <SelectItem value="millimeterPerSecond">Millimeter per Second (mm/s)</SelectItem>
                <SelectItem value="milePerHour">Mile per Hour (mph)</SelectItem>
                <SelectItem value="milePerSecond">Mile per Second (mi/s)</SelectItem>
                <SelectItem value="footPerSecond">Foot per Second (ft/s)</SelectItem>
                <SelectItem value="footPerHour">Foot per Hour (ft/h)</SelectItem>
                <SelectItem value="inchPerSecond">Inch per Second (in/s)</SelectItem>
                <SelectItem value="yardPerSecond">Yard per Second (yd/s)</SelectItem>
                <SelectItem value="knot">Knot (kn)</SelectItem>
                <SelectItem value="mach">Mach (M)</SelectItem>
                <SelectItem value="speedOfLight">Speed of Light (c)</SelectItem>
                <SelectItem value="beaufortScale">Beaufort Scale (Bft)</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Enter speed"
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
              onValueChange={(value: string) => setToUnit(value as SpeedUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meterPerSecond">Meter per Second (m/s)</SelectItem>
                <SelectItem value="kilometerPerSecond">Kilometer per Second (km/s)</SelectItem>
                <SelectItem value="kilometerPerHour">Kilometer per Hour (km/h)</SelectItem>
                <SelectItem value="centimeterPerSecond">Centimeter per Second (cm/s)</SelectItem>
                <SelectItem value="millimeterPerSecond">Millimeter per Second (mm/s)</SelectItem>
                <SelectItem value="milePerHour">Mile per Hour (mph)</SelectItem>
                <SelectItem value="milePerSecond">Mile per Second (mi/s)</SelectItem>
                <SelectItem value="footPerSecond">Foot per Second (ft/s)</SelectItem>
                <SelectItem value="footPerHour">Foot per Hour (ft/h)</SelectItem>
                <SelectItem value="inchPerSecond">Inch per Second (in/s)</SelectItem>
                <SelectItem value="yardPerSecond">Yard per Second (yd/s)</SelectItem>
                <SelectItem value="knot">Knot (kn)</SelectItem>
                <SelectItem value="mach">Mach (M)</SelectItem>
                <SelectItem value="speedOfLight">Speed of Light (c)</SelectItem>
                <SelectItem value="beaufortScale">Beaufort Scale (Bft)</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="border rounded-md mt-2 h-[40px] p-2 flex items-center justify-between bg-muted/30">
              <AnimatePresence mode="wait">
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
          <h3 className="text-sm font-medium">Common Speed Conversions</h3>
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