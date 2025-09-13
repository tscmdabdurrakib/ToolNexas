import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Box, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define unit conversion factors (to C/m³ as base unit)
const conversionFactors = {
  "C/m3": 1, // Coulomb per cubic meter (base unit)
  "C/cm3": 1000000, // Coulomb per cubic centimeter
  "C/mm3": 1000000000, // Coulomb per cubic millimeter
  "C/L": 1000, // Coulomb per liter
  "mC/m3": 0.001, // Millicoulomb per cubic meter
  "mC/cm3": 1000, // Millicoulomb per cubic centimeter
  "mC/mm3": 1000000, // Millicoulomb per cubic millimeter
  "mC/L": 1, // Millicoulomb per liter
  "μC/m3": 0.000001, // Microcoulomb per cubic meter
  "μC/cm3": 1, // Microcoulomb per cubic centimeter
  "μC/mm3": 1000, // Microcoulomb per cubic millimeter
  "μC/L": 0.001, // Microcoulomb per liter
  "nC/m3": 0.000000001, // Nanocoulomb per cubic meter
  "nC/cm3": 0.001, // Nanocoulomb per cubic centimeter
  "nC/mm3": 1, // Nanocoulomb per cubic millimeter
  "nC/L": 0.000001, // Nanocoulomb per liter
  "pC/m3": 0.000000000001, // Picocoulomb per cubic meter
  "pC/cm3": 0.000001, // Picocoulomb per cubic centimeter
  "pC/mm3": 0.001, // Picocoulomb per cubic millimeter
  "pC/L": 0.000000001, // Picocoulomb per liter
  "e/m3": 1.602176634e-19, // Elementary charges per cubic meter
  "e/cm3": 1.602176634e-13, // Elementary charges per cubic centimeter
  "e/mm3": 1.602176634e-10, // Elementary charges per cubic millimeter
  "e/L": 1.602176634e-16, // Elementary charges per liter
};

// Unit display names with abbreviations
const unitLabels = {
  "C/m3": "Coulomb per cubic meter (C/m³)",
  "C/cm3": "Coulomb per cubic centimeter (C/cm³)",
  "C/mm3": "Coulomb per cubic millimeter (C/mm³)",
  "C/L": "Coulomb per liter (C/L)",
  "mC/m3": "Millicoulomb per cubic meter (mC/m³)",
  "mC/cm3": "Millicoulomb per cubic centimeter (mC/cm³)",
  "mC/mm3": "Millicoulomb per cubic millimeter (mC/mm³)",
  "mC/L": "Millicoulomb per liter (mC/L)",
  "μC/m3": "Microcoulomb per cubic meter (μC/m³)",
  "μC/cm3": "Microcoulomb per cubic centimeter (μC/cm³)",
  "μC/mm3": "Microcoulomb per cubic millimeter (μC/mm³)",
  "μC/L": "Microcoulomb per liter (μC/L)",
  "nC/m3": "Nanocoulomb per cubic meter (nC/m³)",
  "nC/cm3": "Nanocoulomb per cubic centimeter (nC/cm³)",
  "nC/mm3": "Nanocoulomb per cubic millimeter (nC/mm³)",
  "nC/L": "Nanocoulomb per liter (nC/L)",
  "pC/m3": "Picocoulomb per cubic meter (pC/m³)",
  "pC/cm3": "Picocoulomb per cubic centimeter (pC/cm³)",
  "pC/mm3": "Picocoulomb per cubic millimeter (pC/mm³)",
  "pC/L": "Picocoulomb per liter (pC/L)",
  "e/m3": "Elementary charges per cubic meter (e/m³)",
  "e/cm3": "Elementary charges per cubic centimeter (e/cm³)",
  "e/mm3": "Elementary charges per cubic millimeter (e/mm³)",
  "e/L": "Elementary charges per liter (e/L)",
};

// Type for Volume Charge Density units
type VolumeChargeDensityUnit = keyof typeof conversionFactors;

/**
 * Volume Charge Density Converter Component
 * Allows users to convert between different volume charge density units
 */
export default function VolumeChargeDensityConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<VolumeChargeDensityUnit>('C/m3');
  const [toUnit, setToUnit] = useState<VolumeChargeDensityUnit>('μC/cm3');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertVolumeChargeDensity();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one volume charge density unit to another
   */
  const convertVolumeChargeDensity = () => {
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

    // Perform conversion
    // First convert to C/m³ (base unit), then to target unit
    const inCPerM3 = value * conversionFactors[fromUnit];
    const converted = inCPerM3 / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (Math.abs(num) < 1e-15) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.0001) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.01) {
      return num.toFixed(8);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 100) {
      return num.toFixed(4);
    } else if (Math.abs(num) < 10000) {
      return num.toFixed(2);
    } else if (Math.abs(num) > 1e6) {
      return num.toExponential(6);
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
    setFromUnit('C/m3');
    setToUnit('μC/cm3');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg" data-testid="card-volume-charge-density-converter">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Box className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Volume Charge Density Converter</CardTitle>
            <CardDescription>
              Convert between different volume charge density units (charge per unit volume)
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="density-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="density-value"
                data-testid="input-density-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter charge density"
                className="w-full"
                step="any"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as VolumeChargeDensityUnit)}>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as VolumeChargeDensityUnit)}>
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
                    {`1 ${unitLabels[fromUnit]?.match(/\(([^)]+)\)/)?.[1]} = ${(conversionFactors[fromUnit] / conversionFactors[toUnit]).toExponential(6)} ${unitLabels[toUnit]?.match(/\(([^)]+)\)/)?.[1]}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Formula and Applications */}
          {result && (
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Volume Charge Density:</h4>
              <div className="text-xs space-y-1">
                <div>Formula: ρ = Q/V (charge per unit volume)</div>
                <div>Applications: Dielectric materials, space charge regions, plasma physics</div>
                <div>Electric field: ∇·E = ρ/ε₀ (Gauss's law)</div>
                <div>Elementary charge: e = 1.602176634 × 10⁻¹⁹ C</div>
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
          Accurate conversions between volume charge density units
        </div>
      </CardFooter>
    </Card>
  );
}