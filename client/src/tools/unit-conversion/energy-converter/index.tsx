import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Energy conversion factors (to Joules)
const conversionFactors = {
  // SI units
  joule: 1,
  kilojoule: 1000,
  megajoule: 1000000,
  gigajoule: 1000000000,
  
  // Mechanical/electrical energy
  watthour: 3600,
  kilowatthour: 3600000,
  megawatthour: 3600000000,
  electronvolt: 1.602176634e-19,
  kilocalorie: 4184,
  calorie: 4.184,
  
  // Heat energy
  btu: 1055.06,
  therm: 105506000,
  
  // Explosive/nuclear energy
  tnt: 4184000000, // 1 ton of TNT in joules
  
  // Other
  footPound: 1.35582,
  ergon: 1e-7
};

// Type for Energy units
type EnergyUnit = keyof typeof conversionFactors;

// Unit display names with abbreviations
const unitLabels = {
  joule: "Joule (J)",
  kilojoule: "Kilojoule (kJ)",
  megajoule: "Megajoule (MJ)",
  gigajoule: "Gigajoule (GJ)",
  watthour: "Watt-hour (Wh)",
  kilowatthour: "Kilowatt-hour (kWh)",
  megawatthour: "Megawatt-hour (MWh)",
  electronvolt: "Electronvolt (eV)",
  kilocalorie: "Kilocalorie (kcal)",
  calorie: "Calorie (cal)",
  btu: "British Thermal Unit (BTU)",
  therm: "Therm",
  tnt: "Ton of TNT",
  footPound: "Foot-pound (ft⋅lb)",
  ergon: "Erg"
};

/**
 * Energy Converter Component
 * Allows users to convert between different units of energy
 */
export default function EnergyConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<EnergyUnit>('kilojoule');
  const [toUnit, setToUnit] = useState<EnergyUnit>('kilocalorie');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertEnergy();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one energy unit to another
   */
  const convertEnergy = () => {
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
    
    // Energy cannot be negative in most practical applications
    if (value < 0) {
      setError('Energy values are typically positive');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to joules (base unit), then to target unit
    const inJoules = value * conversionFactors[fromUnit];
    const converted = inJoules / conversionFactors[toUnit];

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
    setFromUnit('kilojoule');
    setToUnit('kilocalorie');
    setResult('');
    setError(null);
  };

  // Generate the Select options grouped by category
  const renderUnitOptions = () => {
    const groups = {
      "SI Units": ["joule", "kilojoule", "megajoule", "gigajoule"],
      "Electrical & Mechanical": ["watthour", "kilowatthour", "megawatthour", "electronvolt", "footPound", "ergon"],
      "Heat & Energy": ["calorie", "kilocalorie", "btu", "therm", "tnt"]
    };

    return Object.entries(groups).map(([groupName, units]) => (
      <React.Fragment key={groupName}>
        <SelectItem value={units[0]} disabled className="font-semibold text-primary">
          {groupName}
        </SelectItem>
        {units.map(unit => (
          <SelectItem key={unit} value={unit}>
            {unitLabels[unit as EnergyUnit]}
          </SelectItem>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Energy Converter</CardTitle>
            <CardDescription>
              Convert between different units of energy and work
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="energy-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="energy-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter energy amount"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as EnergyUnit)}>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as EnergyUnit)}>
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

          {/* About Energy Units */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-1">What is Energy?</h4>
            <p className="text-muted-foreground mb-2">
              Energy is the capacity to do work or produce heat. It exists in various forms such as kinetic, potential, thermal, electrical, chemical, nuclear, and electromagnetic energy.
            </p>

            <h4 className="font-medium mb-1">Common Energy Units:</h4>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li><strong>Joule (J):</strong> The SI unit of energy - the energy required to apply a force of 1 newton through a distance of 1 meter.</li>
              <li><strong>Kilowatt-hour (kWh):</strong> The amount of energy consumed at a rate of 1000 watts for 1 hour, commonly used for electrical energy on utility bills.</li>
              <li><strong>Calorie (cal):</strong> The energy needed to raise the temperature of 1 gram of water by 1°C.</li>
              <li><strong>British Thermal Unit (BTU):</strong> The energy required to raise the temperature of 1 pound of water by 1°F, commonly used in heating and cooling systems.</li>
              <li><strong>Electronvolt (eV):</strong> A very small unit of energy used in atomic and nuclear physics, equal to the energy gained by an electron moving through a potential difference of 1 volt.</li>
            </ul>

            <h4 className="font-medium mt-2 mb-1">How Energy Conversion Works:</h4>
            <p className="text-muted-foreground">
              Energy conversion uses the principle of energy conservation - energy can neither be created nor destroyed, only transformed. This converter uses a common base unit (joules) and conversion factors to translate between different units of measurement.
            </p>
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
          Accurate conversions between different energy measurement units
        </div>
      </CardFooter>
    </Card>
  );
}