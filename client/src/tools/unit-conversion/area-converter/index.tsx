import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, SquareIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

// Common conversion references for educational purposes
const commonConversions = [
  { from: "hectare", to: "acre", value: 1, result: 2.47105 },
  { from: "squareMeter", to: "squareFoot", value: 1, result: 10.7639 },
  { from: "acre", to: "squareMeter", value: 1, result: 4046.86 },
  { from: "squareMile", to: "squareKilometer", value: 1, result: 2.58999 },
  { from: "squareFoot", to: "squareInch", value: 1, result: 144 }
];

/**
 * Area Converter Component
 * Allows users to convert between different area units
 */
export default function AreaConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<AreaUnit>('squareMeter');
  const [toUnit, setToUnit] = useState<AreaUnit>('squareFoot');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertArea();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one area unit to another
   */
  const convertArea = () => {
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
    
    // Area cannot be negative
    if (value < 0) {
      setError('Area cannot be negative');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to square meters (base unit), then to target unit
    const inSquareMeters = value * conversionFactors[fromUnit];
    const converted = inSquareMeters / conversionFactors[toUnit];

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
    setFromUnit('squareMeter');
    setToUnit('squareFoot');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <SquareIcon className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Area Converter</CardTitle>
            <CardDescription>
              Convert between different units of area and surface measurements
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="area-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="area-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter area"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as AreaUnit)}>
                  <SelectTrigger id="from-unit">
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as AreaUnit)}>
                  <SelectTrigger id="to-unit">
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
                    {`1 ${unitLabels[fromUnit]?.split(' ')[0]} = ${(conversionFactors[fromUnit] / conversionFactors[toUnit]).toFixed(6)} ${unitLabels[toUnit]?.split(' ')[0]}`}
                  </p>
                </div>
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
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Accurate conversions between metric and imperial area units
        </div>
      </CardFooter>
    </Card>
  );
}