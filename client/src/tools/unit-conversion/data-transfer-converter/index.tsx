import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Data transfer rate conversion factors (to bits per second as base unit)
const conversionFactors = {
  bitsPerSecond: 1,
  kilobitsPerSecond: 1000,
  megabitsPerSecond: 1000000,
  gigabitsPerSecond: 1000000000,
  terabitsPerSecond: 1000000000000,
  kibibitsPerSecond: 1024,
  mebibitsPerSecond: 1048576,
  gibibitsPerSecond: 1073741824,
  tebibitsPerSecond: 1099511627776,
  bytesPerSecond: 8,
  kilobytesPerSecond: 8000,
  megabytesPerSecond: 8000000,
  gigabytesPerSecond: 8000000000,
  terabytesPerSecond: 8000000000000,
  kibibytesPerSecond: 8192,
  mebibytesPerSecond: 8388608,
  gibibytesPerSecond: 8589934592,
  tebibytesPerSecond: 8796093022208
};

// Unit display names with abbreviations
const unitLabels = {
  bitsPerSecond: "bits per second (bps)",
  kilobitsPerSecond: "kilobits per second (kbps)",
  megabitsPerSecond: "megabits per second (Mbps)",
  gigabitsPerSecond: "gigabits per second (Gbps)",
  terabitsPerSecond: "terabits per second (Tbps)",
  kibibitsPerSecond: "kibibits per second (Kibps)",
  mebibitsPerSecond: "mebibits per second (Mibps)",
  gibibitsPerSecond: "gibibits per second (Gibps)",
  tebibitsPerSecond: "tebibits per second (Tibps)",
  bytesPerSecond: "bytes per second (B/s)",
  kilobytesPerSecond: "kilobytes per second (kB/s)",
  megabytesPerSecond: "megabytes per second (MB/s)",
  gigabytesPerSecond: "gigabytes per second (GB/s)",
  terabytesPerSecond: "terabytes per second (TB/s)",
  kibibytesPerSecond: "kibibytes per second (KiB/s)",
  mebibytesPerSecond: "mebibytes per second (MiB/s)",
  gibibytesPerSecond: "gibibytes per second (GiB/s)",
  tebibytesPerSecond: "tebibytes per second (TiB/s)"
};

// Type for data transfer rate units
type DataTransferUnit = keyof typeof conversionFactors;

/**
 * Data Transfer Rate Converter Component
 * Allows users to convert between different units of data transfer rates
 */
export default function DataTransferConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<DataTransferUnit>('megabitsPerSecond');
  const [toUnit, setToUnit] = useState<DataTransferUnit>('megabytesPerSecond');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertDataTransfer();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one data transfer unit to another
   */
  const convertDataTransfer = () => {
    // Clear previous errors
    setError(null);

    // If input is empty, clear the result
    if (!inputValue) {
      setResult('');
      return;
    }

    // Parse the input value
    const value = parseFloat(inputValue);

    // Validate the input is a number
    if (isNaN(value)) {
      setError('Please enter a valid number');
      setResult('');
      return;
    }

    // Validate that value is not negative (transfer rate cannot be negative)
    if (value < 0) {
      setError('Data transfer rate cannot be negative');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to bits per second (base unit), then to target unit
    const inBitsPerSecond = value * conversionFactors[fromUnit];
    const converted = inBitsPerSecond / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (num === 0) return "0";
    
    if (Math.abs(num) < 0.000001) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.001) {
      return num.toFixed(8);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 100) {
      return num.toFixed(4);
    } else if (Math.abs(num) < 10000) {
      return num.toFixed(2);
    } else if (Math.abs(num) < 1000000) {
      return num.toFixed(1);
    } else {
      return num.toExponential(4);
    }
  };

  /**
   * Swap the from and to units
   */
  const swapUnits = () => {
    setSwapAnimation(true);
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    
    // Reset animation state after animation completes
    setTimeout(() => setSwapAnimation(false), 500);
  };

  /**
   * Reset all fields to default
   */
  const resetConverter = () => {
    setInputValue('');
    setFromUnit('megabitsPerSecond');
    setToUnit('megabytesPerSecond');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Wifi className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Data Transfer Rate Converter</CardTitle>
            <CardDescription>
              Convert between different units of data transmission speed and bandwidth
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <Label htmlFor="transfer-value" className="block text-sm font-medium mb-2">
                Enter Value
              </Label>
              <Input
                id="transfer-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter transfer rate"
                className="w-full"
                data-testid="input-transfer-value"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <Label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </Label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as DataTransferUnit)}>
                  <SelectTrigger id="from-unit" data-testid="select-from-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitLabels).map(([unit, label]) => (
                      <SelectItem key={unit} value={unit}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-1 flex justify-center">
                <motion.div
                  animate={{ rotate: swapAnimation ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={swapUnits}
                    className="h-10 w-10 rounded-full"
                    data-testid="button-swap-units"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="to-unit" className="block text-sm font-medium mb-2">
                  To
                </Label>
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as DataTransferUnit)}>
                  <SelectTrigger id="to-unit" data-testid="select-to-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitLabels).map(([unit, label]) => (
                      <SelectItem key={unit} value={unit}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Result display */}
          {result && !error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-muted rounded-lg"
            >
              <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                Result
              </Label>
              <div className="text-2xl font-bold text-primary" data-testid="text-result">
                {result} {unitLabels[toUnit].split(' (')[1].replace(')', '')}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {inputValue} {unitLabels[fromUnit].split(' (')[1].replace(')', '')} = {result} {unitLabels[toUnit].split(' (')[1].replace(')', '')}
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={resetConverter}
              className="flex items-center gap-2"
              data-testid="button-reset"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* Info section */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>About Data Transfer Rates:</strong> Data transfer rate measures how fast information moves 
              from one place to another. It's expressed in bits or bytes per second. Remember that 1 byte = 8 bits. 
              Internet speeds are usually advertised in megabits per second (Mbps), while file transfer speeds 
              are often shown in megabytes per second (MB/s). This converter helps you understand the relationship 
              between different units and convert between bits and bytes measurements.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}