import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Database } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

/**
 * Data Storage Converter Component
 * Allows users to convert between different units of digital storage
 */
export default function DataStorageConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<DataStorageUnit>('megabyte');
  const [toUnit, setToUnit] = useState<DataStorageUnit>('gigabyte');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertDataStorage();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one data storage unit to another
   */
  const convertDataStorage = () => {
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
    
    // Data storage cannot be negative
    if (value < 0) {
      setError('Data storage cannot be negative');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to bits (base unit), then to target unit
    const inBits = value * conversionFactors[fromUnit];
    const converted = inBits / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (num === 0) return "0";
    
    const absNum = Math.abs(num);
    
    if (absNum < 0.0000001) return num.toExponential(6);
    if (absNum < 0.00001) return num.toFixed(10);
    if (absNum < 0.0001) return num.toFixed(8);
    if (absNum < 0.001) return num.toFixed(6);
    if (absNum < 0.01) return num.toFixed(5);
    if (absNum < 1) return num.toFixed(4);
    if (absNum < 10) return num.toFixed(3);
    if (absNum < 100) return num.toFixed(2);
    if (absNum < 1000) return num.toFixed(1);
    
    return num.toFixed(0);
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
    setFromUnit('megabyte');
    setToUnit('gigabyte');
    setResult('');
    setError(null);
  };

  // Generate the Select options grouped by category
  const renderUnitOptions = () => {
    const groups = {
      "Decimal Bits": ["bit", "kilobit", "megabit", "gigabit", "terabit", "petabit", "exabit"],
      "Binary Bits": ["bit", "kibibit", "mebibit", "gibibit", "tebibit", "pebibit", "exbibit"],
      "Decimal Bytes": ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte", "petabyte", "exabyte"],
      "Binary Bytes": ["byte", "kibibyte", "mebibyte", "gibibyte", "tebibyte", "pebibyte", "exbibyte"]
    };

    return Object.entries(groups).map(([groupName, units]) => (
      <React.Fragment key={groupName}>
        <SelectItem value={units[0]} disabled className="font-semibold text-primary">
          {groupName}
        </SelectItem>
        {units.map(unit => (
          <SelectItem key={unit} value={unit}>
            {unitLabels[unit as DataStorageUnit]}
          </SelectItem>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Database className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Data Storage Converter</CardTitle>
            <CardDescription>
              Convert between different units of digital data storage and memory
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="storage-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="storage-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter data size"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as DataStorageUnit)}>
                  <SelectTrigger id="from-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {renderUnitOptions()}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-center items-center sm:col-span-1">
                <motion.div
                  animate={{ rotate: swapAnimation ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full h-10 w-10 bg-muted hover:bg-primary/10"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    <span className="sr-only">Swap units</span>
                  </Button>
                </motion.div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="to-unit" className="block text-sm font-medium mb-2">
                  To
                </label>
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as DataStorageUnit)}>
                  <SelectTrigger id="to-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {renderUnitOptions()}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Conversion Result */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {result ? (
                  <>
                    {result} <span className="text-lg font-normal">{unitLabels[toUnit]?.split(' ')[1]?.replace(/[()]/g, '')}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground text-lg">— Enter a value to convert —</span>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Conversion Formula Display */}
          {result && (
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Conversion Details:</span>
                  <p className="text-muted-foreground mt-1">
                    {`${inputValue} ${unitLabels[fromUnit]?.split(' ')[0]} = ${result} ${unitLabels[toUnit]?.split(' ')[0]}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {`1 ${unitLabels[fromUnit]?.split(' ')[0]} = ${(conversionFactors[fromUnit] / conversionFactors[toUnit]).toExponential(6)} ${unitLabels[toUnit]?.split(' ')[0]}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Explanation of Decimal vs Binary units */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-1">About Digital Storage Units:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><strong>Decimal Units (kB, MB, GB):</strong> Base 10 - Powers of 1000 (1 kB = 1000 bytes)</li>
              <li><strong>Binary Units (KiB, MiB, GiB):</strong> Base 2 - Powers of 1024 (1 KiB = 1024 bytes)</li>
              <li>Storage manufacturers typically use decimal units, while operating systems often use binary units</li>
            </ul>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Accurate conversions between decimal and binary storage units
        </div>
      </CardFooter>
    </Card>
  );
}