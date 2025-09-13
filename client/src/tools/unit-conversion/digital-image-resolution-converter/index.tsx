import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Monitor, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to DPI as base unit)
const conversionFactors = {
  dpi: 1, // Dots per inch
  ppi: 1, // Pixels per inch (same as DPI for digital)
  dpcm: 2.54, // Dots per centimeter  
  ppcm: 2.54, // Pixels per centimeter
  dpmm: 25.4, // Dots per millimeter
  ppmm: 25.4, // Pixels per millimeter
  lpi: 1, // Lines per inch (for printing)
  lpcm: 2.54, // Lines per centimeter
};

// Unit display names with abbreviations
const unitLabels = {
  dpi: "Dots per Inch (DPI)",
  ppi: "Pixels per Inch (PPI)",
  dpcm: "Dots per Centimeter (DPCM)",
  ppcm: "Pixels per Centimeter (PPCM)",
  dpmm: "Dots per Millimeter (DPMM)",
  ppmm: "Pixels per Millimeter (PPMM)",
  lpi: "Lines per Inch (LPI)",
  lpcm: "Lines per Centimeter (LPCM)",
};

// Type for Resolution units
type ResolutionUnit = keyof typeof conversionFactors;

/**
 * Digital Image Resolution Converter Component
 * Allows users to convert between different digital image resolution units
 */
export default function DigitalImageResolutionConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<ResolutionUnit>('dpi');
  const [toUnit, setToUnit] = useState<ResolutionUnit>('ppi');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertResolution();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one resolution unit to another
   */
  const convertResolution = () => {
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

    if (value < 0) {
      setError('Resolution value cannot be negative');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to DPI (base unit), then to target unit
    const inDPI = value * conversionFactors[fromUnit];
    const converted = inDPI / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (Math.abs(num) < 0.0001) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.01) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(4);
    } else if (Math.abs(num) < 100) {
      return num.toFixed(2);
    } else if (Math.abs(num) < 10000) {
      return num.toFixed(1);
    } else {
      return num.toFixed(0);
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
    setFromUnit('dpi');
    setToUnit('ppi');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg" data-testid="card-resolution-converter">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Monitor className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Digital Image Resolution Converter</CardTitle>
            <CardDescription>
              Convert between different digital image resolution units
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="resolution-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="resolution-value"
                data-testid="input-resolution-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter resolution"
                className="w-full"
                min="0"
                step="any"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as ResolutionUnit)}>
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
                    data-testid="button-swap-units"
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as ResolutionUnit)}>
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

          {/* Conversion Result */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold" data-testid="text-result">
                {result ? (
                  <>
                    {result} <span className="text-lg font-normal">{unitLabels[toUnit]?.match(/\(([^)]+)\)/)?.[1]}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground text-lg">— Enter a value to convert —</span>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" data-testid="alert-error">
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
                    {`${inputValue} ${unitLabels[fromUnit]?.match(/\(([^)]+)\)/)?.[1]} = ${result} ${unitLabels[toUnit]?.match(/\(([^)]+)\)/)?.[1]}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {`1 ${unitLabels[fromUnit]?.match(/\(([^)]+)\)/)?.[1]} = ${(conversionFactors[fromUnit] / conversionFactors[toUnit]).toFixed(6)} ${unitLabels[toUnit]?.match(/\(([^)]+)\)/)?.[1]}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Common Resolution Standards */}
          {result && (
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Common Resolution Standards:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div>Web: 72 DPI</div>
                <div>Print: 300 DPI</div>
                <div>Large Format: 150 DPI</div>
                <div>Screen: 96 PPI</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
          data-testid="button-reset"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Accurate conversions between image resolution units
        </div>
      </CardFooter>
    </Card>
  );
}