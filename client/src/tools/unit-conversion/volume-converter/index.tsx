import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

/**
 * Volume Converter Component
 * Allows users to convert between different volume units
 */
export default function VolumeConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<VolumeUnit>('liter');
  const [toUnit, setToUnit] = useState<VolumeUnit>('usGallon');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertVolume();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one volume unit to another
   */
  const convertVolume = () => {
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
    
    // Volume cannot be negative
    if (value < 0) {
      setError('Volume cannot be negative');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to cubic meters (base unit), then to target unit
    const inCubicMeters = value * conversionFactors[fromUnit];
    const converted = inCubicMeters / conversionFactors[toUnit];

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
    setFromUnit('liter');
    setToUnit('usGallon');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Droplets className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Volume Converter</CardTitle>
            <CardDescription>
              Convert between different units of volume and capacity measurements
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="volume-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="volume-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter volume"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as VolumeUnit)}>
                  <SelectTrigger id="from-unit">
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as VolumeUnit)}>
                  <SelectTrigger id="to-unit">
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
          Accurate conversions between metric and imperial volume units
        </div>
      </CardFooter>
    </Card>
  );
}