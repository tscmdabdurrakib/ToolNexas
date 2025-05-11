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

// Data storage conversion factors (to bits)
const conversionFactors = {
  bit: 1,
  kilobit: 1000,
  megabit: 1000000,
  gigabit: 1000000000,
  terabit: 1000000000000,
  petabit: 1000000000000000,
  exabit: 1000000000000000000,
  kibibit: 1024,
  mebibit: 1048576,
  gibibit: 1073741824,
  tebibit: 1099511627776,
  pebibit: 1125899906842624,
  exbibit: 1152921504606846976,
  byte: 8,
  kilobyte: 8000,
  megabyte: 8000000,
  gigabyte: 8000000000,
  terabyte: 8000000000000,
  petabyte: 8000000000000000,
  exabyte: 8000000000000000000,
  kibibyte: 8192,
  mebibyte: 8388608,
  gibibyte: 8589934592,
  tebibyte: 8796093022208,
  pebibyte: 9007199254740992,
  exbibyte: 9223372036854775808
};

// Type for data storage units
type DataStorageUnit = keyof typeof conversionFactors;

// Unit display names with abbreviations
const unitLabels = {
  bit: "Bit (b)",
  kilobit: "Kilobit (kb)",
  megabit: "Megabit (Mb)",
  gigabit: "Gigabit (Gb)",
  terabit: "Terabit (Tb)",
  petabit: "Petabit (Pb)",
  exabit: "Exabit (Eb)",
  kibibit: "Kibibit (Kib)",
  mebibit: "Mebibit (Mib)",
  gibibit: "Gibibit (Gib)",
  tebibit: "Tebibit (Tib)",
  pebibit: "Pebibit (Pib)",
  exbibit: "Exbibit (Eib)",
  byte: "Byte (B)",
  kilobyte: "Kilobyte (kB)",
  megabyte: "Megabyte (MB)",
  gigabyte: "Gigabyte (GB)",
  terabyte: "Terabyte (TB)",
  petabyte: "Petabyte (PB)",
  exabyte: "Exabyte (EB)",
  kibibyte: "Kibibyte (KiB)",
  mebibyte: "Mebibyte (MiB)",
  gibibyte: "Gibibyte (GiB)",
  tebibyte: "Tebibyte (TiB)",
  pebibyte: "Pebibyte (PiB)",
  exbibyte: "Exbibyte (EiB)"
};

// Interface for common conversion examples
interface CommonConversion {
  from: DataStorageUnit;
  to: DataStorageUnit;
  value: number;
  result: number;
}

// Common conversion references for educational purposes
const commonConversions: CommonConversion[] = [
  { from: "byte", to: "bit", value: 1, result: 8 },
  { from: "kilobyte", to: "kibibyte", value: 1, result: 0.9765625 },
  { from: "megabyte", to: "mebibyte", value: 1, result: 0.9536743 },
  { from: "gigabyte", to: "gibibyte", value: 1, result: 0.9313225 },
  { from: "terabyte", to: "tebibyte", value: 1, result: 0.9094947 }
];

/**
 * Data Storage Converter Component
 * A modern, user-friendly tool for converting between different units of digital storage
 */
export default function DataStorageConverter() {
  const { toast } = useToast();
  const [fromUnit, setFromUnit] = useState<DataStorageUnit>("megabyte");
  const [toUnit, setToUnit] = useState<DataStorageUnit>("gigabyte");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [animateResult, setAnimateResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Group units for select dropdown
  const unitGroups = {
    decimal_bits: ["bit", "kilobit", "megabit", "gigabit", "terabit", "petabit", "exabit"],
    binary_bits: ["kibibit", "mebibit", "gibibit", "tebibit", "pebibit", "exbibit"],
    decimal_bytes: ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte", "petabyte", "exabyte"],
    binary_bytes: ["kibibyte", "mebibyte", "gibibyte", "tebibyte", "pebibyte", "exbibyte"]
  };

  /**
   * Convert from one data storage unit to another
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
      setError("Data storage cannot be negative");
      setResult("");
      return;
    }

    setError(null);
    
    // Convert to base unit (bits) then to target unit
    const inBits = numValue * conversionFactors[fromUnit];
    const converted = inBits / conversionFactors[toUnit];
    
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
    setFromUnit("megabyte");
    setToUnit("gigabyte");
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
              onValueChange={(value: string) => setFromUnit(value as DataStorageUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bit">Bit (b)</SelectItem>
                <SelectItem value="kilobit">Kilobit (kb)</SelectItem>
                <SelectItem value="megabit">Megabit (Mb)</SelectItem>
                <SelectItem value="gigabit">Gigabit (Gb)</SelectItem>
                <SelectItem value="terabit">Terabit (Tb)</SelectItem>
                <SelectItem value="petabit">Petabit (Pb)</SelectItem>
                <SelectItem value="exabit">Exabit (Eb)</SelectItem>
                <SelectItem value="kibibit">Kibibit (Kib)</SelectItem>
                <SelectItem value="mebibit">Mebibit (Mib)</SelectItem>
                <SelectItem value="gibibit">Gibibit (Gib)</SelectItem>
                <SelectItem value="tebibit">Tebibit (Tib)</SelectItem>
                <SelectItem value="pebibit">Pebibit (Pib)</SelectItem>
                <SelectItem value="exbibit">Exbibit (Eib)</SelectItem>
                <SelectItem value="byte">Byte (B)</SelectItem>
                <SelectItem value="kilobyte">Kilobyte (kB)</SelectItem>
                <SelectItem value="megabyte">Megabyte (MB)</SelectItem>
                <SelectItem value="gigabyte">Gigabyte (GB)</SelectItem>
                <SelectItem value="terabyte">Terabyte (TB)</SelectItem>
                <SelectItem value="petabyte">Petabyte (PB)</SelectItem>
                <SelectItem value="exabyte">Exabyte (EB)</SelectItem>
                <SelectItem value="kibibyte">Kibibyte (KiB)</SelectItem>
                <SelectItem value="mebibyte">Mebibyte (MiB)</SelectItem>
                <SelectItem value="gibibyte">Gibibyte (GiB)</SelectItem>
                <SelectItem value="tebibyte">Tebibyte (TiB)</SelectItem>
                <SelectItem value="pebibyte">Pebibyte (PiB)</SelectItem>
                <SelectItem value="exbibyte">Exbibyte (EiB)</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Enter value"
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
              onValueChange={(value: string) => setToUnit(value as DataStorageUnit)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bit">Bit (b)</SelectItem>
                <SelectItem value="kilobit">Kilobit (kb)</SelectItem>
                <SelectItem value="megabit">Megabit (Mb)</SelectItem>
                <SelectItem value="gigabit">Gigabit (Gb)</SelectItem>
                <SelectItem value="terabit">Terabit (Tb)</SelectItem>
                <SelectItem value="petabit">Petabit (Pb)</SelectItem>
                <SelectItem value="exabit">Exabit (Eb)</SelectItem>
                <SelectItem value="kibibit">Kibibit (Kib)</SelectItem>
                <SelectItem value="mebibit">Mebibit (Mib)</SelectItem>
                <SelectItem value="gibibit">Gibibit (Gib)</SelectItem>
                <SelectItem value="tebibit">Tebibit (Tib)</SelectItem>
                <SelectItem value="pebibit">Pebibit (Pib)</SelectItem>
                <SelectItem value="exbibit">Exbibit (Eib)</SelectItem>
                <SelectItem value="byte">Byte (B)</SelectItem>
                <SelectItem value="kilobyte">Kilobyte (kB)</SelectItem>
                <SelectItem value="megabyte">Megabyte (MB)</SelectItem>
                <SelectItem value="gigabyte">Gigabyte (GB)</SelectItem>
                <SelectItem value="terabyte">Terabyte (TB)</SelectItem>
                <SelectItem value="petabyte">Petabyte (PB)</SelectItem>
                <SelectItem value="exabyte">Exabyte (EB)</SelectItem>
                <SelectItem value="kibibyte">Kibibyte (KiB)</SelectItem>
                <SelectItem value="mebibyte">Mebibyte (MiB)</SelectItem>
                <SelectItem value="gibibyte">Gibibyte (GiB)</SelectItem>
                <SelectItem value="tebibyte">Tebibyte (TiB)</SelectItem>
                <SelectItem value="pebibyte">Pebibyte (PiB)</SelectItem>
                <SelectItem value="exbibyte">Exbibyte (EiB)</SelectItem>
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
          <h3 className="text-sm font-medium">Common Data Storage Conversions</h3>
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