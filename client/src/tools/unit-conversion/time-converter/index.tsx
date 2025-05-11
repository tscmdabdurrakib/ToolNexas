import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

/**
 * Time Converter Component
 * Allows users to convert between different time units
 */
export default function TimeConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<TimeUnit>('minute');
  const [toUnit, setToUnit] = useState<TimeUnit>('hour');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertTime();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one time unit to another
   */
  const convertTime = () => {
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
    
    // Time cannot be negative
    if (value < 0) {
      setError('Time cannot be negative');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to seconds (base unit), then to target unit
    const inSeconds = value * conversionFactors[fromUnit];
    const converted = inSeconds / conversionFactors[toUnit];

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
    setFromUnit('minute');
    setToUnit('hour');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Time Converter</CardTitle>
            <CardDescription>
              Convert between different units of time and duration
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="time-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="time-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter time"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as TimeUnit)}>
                  <SelectTrigger id="from-unit">
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as TimeUnit)}>
                  <SelectTrigger id="to-unit">
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
          Accurate conversions between different time measurement units
        </div>
      </CardFooter>
    </Card>
  );
}