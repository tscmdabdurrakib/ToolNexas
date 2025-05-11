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

// Time conversion factors (to seconds)
const conversionFactors = {
  nanosecond: 1e-9,
  microsecond: 1e-6,
  millisecond: 0.001,
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2592000, // 30-day month
  year: 31536000, // 365-day year
  decade: 315360000,
  century: 3153600000,
  millennium: 31536000000
};

// Type for Time units
type TimeUnit = keyof typeof conversionFactors;

// Unit display names with abbreviations
const unitLabels = {
  nanosecond: "Nanosecond (ns)",
  microsecond: "Microsecond (μs)",
  millisecond: "Millisecond (ms)",
  second: "Second (s)",
  minute: "Minute (min)",
  hour: "Hour (h)",
  day: "Day (d)",
  week: "Week (wk)",
  month: "Month (mo)",
  year: "Year (yr)",
  decade: "Decade (dec)",
  century: "Century (cent)",
  millennium: "Millennium (mill)"
};

// Interface for common conversion examples
interface CommonConversion {
  from: TimeUnit;
  to: TimeUnit;
  value: number;
  result: number;
}

// Common conversion references for educational purposes
const commonConversions: CommonConversion[] = [
  { from: "minute", to: "second", value: 1, result: 60 },
  { from: "hour", to: "minute", value: 1, result: 60 },
  { from: "day", to: "hour", value: 1, result: 24 },
  { from: "week", to: "day", value: 1, result: 7 },
  { from: "year", to: "day", value: 1, result: 365 }
];

/**
 * Time Converter Component
 * A modern, user-friendly tool for converting between different units of time
 */
export default function TimeConverter() {
  const { toast } = useToast();
  const [fromUnit, setFromUnit] = useState<TimeUnit>("minute");
  const [toUnit, setToUnit] = useState<TimeUnit>("hour");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [animateResult, setAnimateResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Group units for select dropdown
  const unitGroups = {
    small: ["nanosecond", "microsecond", "millisecond", "second"],
    medium: ["minute", "hour", "day", "week"],
    large: ["month", "year", "decade", "century", "millennium"]
  };

  /**
   * Convert from one time unit to another
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
      setError("Time cannot be negative");
      setResult("");
      return;
    }

    setError(null);
    
    // Convert to base unit (seconds) then to target unit
    const inSeconds = numValue * conversionFactors[fromUnit];
    const converted = inSeconds / conversionFactors[toUnit];
    
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
    setFromUnit("minute");
    setToUnit("hour");
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
              onValueChange={(value: string) => setFromUnit(value as TimeUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nanosecond">Nanosecond (ns)</SelectItem>
                <SelectItem value="microsecond">Microsecond (μs)</SelectItem>
                <SelectItem value="millisecond">Millisecond (ms)</SelectItem>
                <SelectItem value="second">Second (s)</SelectItem>
                <SelectItem value="minute">Minute (min)</SelectItem>
                <SelectItem value="hour">Hour (h)</SelectItem>
                <SelectItem value="day">Day (d)</SelectItem>
                <SelectItem value="week">Week (wk)</SelectItem>
                <SelectItem value="month">Month (mo)</SelectItem>
                <SelectItem value="year">Year (yr)</SelectItem>
                <SelectItem value="decade">Decade (dec)</SelectItem>
                <SelectItem value="century">Century (cent)</SelectItem>
                <SelectItem value="millennium">Millennium (mill)</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Enter time"
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
              onValueChange={(value: string) => setToUnit(value as TimeUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nanosecond">Nanosecond (ns)</SelectItem>
                <SelectItem value="microsecond">Microsecond (μs)</SelectItem>
                <SelectItem value="millisecond">Millisecond (ms)</SelectItem>
                <SelectItem value="second">Second (s)</SelectItem>
                <SelectItem value="minute">Minute (min)</SelectItem>
                <SelectItem value="hour">Hour (h)</SelectItem>
                <SelectItem value="day">Day (d)</SelectItem>
                <SelectItem value="week">Week (wk)</SelectItem>
                <SelectItem value="month">Month (mo)</SelectItem>
                <SelectItem value="year">Year (yr)</SelectItem>
                <SelectItem value="decade">Decade (dec)</SelectItem>
                <SelectItem value="century">Century (cent)</SelectItem>
                <SelectItem value="millennium">Millennium (mill)</SelectItem>
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
          <h3 className="text-sm font-medium">Common Time Conversions</h3>
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