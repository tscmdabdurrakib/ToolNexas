import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Scale, RefreshCw, Copy, Check, Info, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define conversion factors (to grams as base unit)
const conversionFactors = {
  gram: 1,
  kilogram: 1000,
  milligram: 0.001,
  metricTon: 1000000,
  pound: 453.59237,
  ounce: 28.3495231,
  stone: 6350.29318,
  // Additional units for more comprehensive conversion
  tonne: 1000000, // Metric ton alternative name
  imperialTon: 1016046.9088,
  usTon: 907184.74,
  carat: 0.2,
  grain: 0.06479891
};

// Unit display names with abbreviations
const unitLabels = {
  gram: "Gram (g)",
  kilogram: "Kilogram (kg)",
  milligram: "Milligram (mg)",
  metricTon: "Metric Ton (t)",
  pound: "Pound (lb)",
  ounce: "Ounce (oz)",
  stone: "Stone (st)",
  tonne: "Tonne (t)",
  imperialTon: "Imperial Ton (long ton)",
  usTon: "US Ton (short ton)",
  carat: "Carat (ct)",
  grain: "Grain (gr)"
};

// Common conversion references for educational purposes
const commonConversions = [
  { from: "kilogram", to: "pound", value: 1, result: 2.20462 },
  { from: "pound", to: "kilogram", value: 1, result: 0.453592 },
  { from: "gram", to: "ounce", value: 28, result: 0.987563 },
  { from: "stone", to: "kilogram", value: 1, result: 6.35029 },
  { from: "ounce", to: "gram", value: 1, result: 28.3495 }
];

// Type for Weight/Mass units
type WeightUnit = keyof typeof conversionFactors;

/**
 * Weight and Mass Converter Component
 * A modern, user-friendly tool for converting between different weight and mass units
 */
export default function WeightMassConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<WeightUnit>('kilogram');
  const [toUnit, setToUnit] = useState<WeightUnit>('pound');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertWeight();
  }, [inputValue, fromUnit, toUnit]);

  // Animated hint tooltip for better UX
  const [showHint, setShowHint] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!inputValue && !result) {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 5000);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [inputValue, result]);

  /**
   * Convert from one weight/mass unit to another
   */
  const convertWeight = () => {
    // Clear previous errors and animation states
    setError(null);
    setAnimateResult(false);

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

    // Check for negative values (optional validation)
    if (value < 0) {
      setError('Weight/mass cannot be negative');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to grams (base unit), then to target unit
    const inGrams = value * conversionFactors[fromUnit];
    const converted = inGrams / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
    
    // Trigger animation for the new result
    setAnimateResult(true);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (Math.abs(num) < 0.000001) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.0001) {
      return num.toFixed(8);
    } else if (Math.abs(num) < 0.01) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(4);
    } else if (Math.abs(num) < 100) {
      return num.toFixed(3);
    } else if (Math.abs(num) < 10000) {
      return num.toFixed(2);
    } else {
      return num.toFixed(1);
    }
  };

  /**
   * Swap the from and to units
   */
  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    
    // If we have a result, also swap the input value
    if (result && !error) {
      setInputValue(result);
    }
  };

  /**
   * Reset all fields to default
   */
  const resetConverter = () => {
    setInputValue('');
    setFromUnit('kilogram');
    setToUnit('pound');
    setResult('');
    setError(null);
    setCopied(false);
  };

  /**
   * Copy result to clipboard
   */
  const copyToClipboard = () => {
    if (!result) return;
    
    // Extract abbreviations from unit labels
    const fromUnitAbbr = unitLabels[fromUnit as keyof typeof unitLabels].match(/\(([^)]+)\)/)?.[1] || fromUnit;
    const toUnitAbbr = unitLabels[toUnit as keyof typeof unitLabels].match(/\(([^)]+)\)/)?.[1] || toUnit;
    
    // Create text to copy (with units)
    const textToCopy = `${inputValue} ${fromUnitAbbr} = ${result} ${toUnitAbbr}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg overflow-hidden border border-border/40">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
            <Scale className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Weight & Mass Converter</CardTitle>
            <CardDescription>
              Convert between various weight and mass units with precision
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 pb-3">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 md:grid-cols-5">
            <div className="md:col-span-2">
              <label htmlFor="weight-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="weight-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter weight or mass"
                className="w-full"
                autoFocus
                aria-label="Weight or mass value"
              />
            </div>
            
            <div className="md:col-span-3 grid grid-cols-7 gap-3 items-end">
              <div className="col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as WeightUnit)}>
                  <SelectTrigger id="from-unit">
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
              
              <div className="flex justify-center items-center col-span-1">
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full h-10 w-10 bg-muted hover:bg-primary/10"
                    aria-label="Swap units"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
              
              <div className="col-span-3">
                <label htmlFor="to-unit" className="block text-sm font-medium mb-2">
                  To
                </label>
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as WeightUnit)}>
                  <SelectTrigger id="to-unit">
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
          <div className="relative bg-gradient-to-r from-muted/30 to-muted/60 p-4 rounded-lg overflow-hidden">
            {/* Ambient background animation */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-primary"
                  initial={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: Math.random() * 0.5 + 0.5,
                    opacity: Math.random() * 0.5 + 0.1,
                  }}
                  animate={{
                    x: [
                      `${Math.random() * 100}%`,
                      `${Math.random() * 100}%`,
                      `${Math.random() * 100}%`,
                    ],
                    y: [
                      `${Math.random() * 100}%`,
                      `${Math.random() * 100}%`,
                      `${Math.random() * 100}%`,
                    ],
                    opacity: [Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.2],
                  }}
                  transition={{
                    duration: Math.random() * 20 + 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    width: `${Math.random() * 150 + 50}px`,
                    height: `${Math.random() * 150 + 50}px`,
                  }}
                />
              ))}
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Result</h3>
                {result && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="h-7 text-xs gap-1"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                )}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={result}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between"
                >
                  <div className="text-3xl font-bold">
                    {result ? (
                      <motion.div 
                        animate={animateResult ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {result} <span className="text-lg font-normal">{unitLabels[toUnit]?.match(/\(([^)]+)\)/)?.[1]}</span>
                      </motion.div>
                    ) : (
                      <span className="text-muted-foreground text-lg">Enter a value to convert</span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Helpful hint tooltip */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute right-4 top-2"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: 2, duration: 1 }}
                        >
                          <Info className="h-4 w-4 text-primary animate-pulse" />
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Try entering a value to see the conversion result</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="text-sm py-2">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conversion Formula Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-muted/30 p-4 rounded-lg text-sm"
            >
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
            </motion.div>
          )}
        </div>
        
        {/* Common Conversions Table */}
        <Separator className="my-6" />
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Common Weight Conversions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {commonConversions.map((conv, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Badge variant="outline" className="h-6 px-1.5 text-xs whitespace-nowrap">
                  {conv.value} {unitLabels[conv.from]?.match(/\(([^)]+)\)/)?.[1]}
                </Badge>
                <span>=</span>
                <Badge variant="outline" className="h-6 px-1.5 text-xs bg-primary/5 whitespace-nowrap">
                  {conv.result} {unitLabels[conv.to]?.match(/\(([^)]+)\)/)?.[1]}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/5">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Accurate conversions with scientific precision
        </div>
      </CardFooter>
    </Card>
  );
}