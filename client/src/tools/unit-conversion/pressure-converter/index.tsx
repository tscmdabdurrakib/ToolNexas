import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

/**
 * Pressure Converter Component
 * Allows users to convert between different pressure units
 */
export default function PressureConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<PressureUnit>('bar');
  const [toUnit, setToUnit] = useState<PressureUnit>('psi');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertPressure();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one pressure unit to another
   */
  const convertPressure = () => {
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
    
    // Validate negative pressure values (only some units allow negative values)
    if (value < 0 && fromUnit !== "psi") {
      setError('Pressure cannot be negative in this unit');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to Pascal (base unit), then to target unit
    const inPascal = value * conversionFactors[fromUnit];
    const converted = inPascal / conversionFactors[toUnit];

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
    setFromUnit('bar');
    setToUnit('psi');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Gauge className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Pressure Converter</CardTitle>
            <CardDescription>
              Convert between different units of pressure and stress measurements
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="pressure-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="pressure-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter pressure"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as PressureUnit)}>
                  <SelectTrigger id="from-unit">
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as PressureUnit)}>
                  <SelectTrigger id="to-unit">
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
          Accurate conversions between different pressure measurement systems
        </div>
      </CardFooter>
    </Card>
  );
}