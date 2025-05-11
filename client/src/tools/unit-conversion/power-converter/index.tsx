import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, RotateCcw, Info, BatteryCharging } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Power conversion factors (to Watts)
const conversionFactors = {
  // SI units
  watt: 1,
  kilowatt: 1000,
  megawatt: 1000000,
  gigawatt: 1000000000,
  
  // Mechanical power
  horsepowerMechanical: 745.7, // Mechanical/Imperial horsepower
  horsepowerMetric: 735.5,     // Metric horsepower
  
  // Heat units
  btulHour: 0.29307107,        // BTU (IT) per hour
  btulMinute: 17.58426,        // BTU (IT) per minute
  btulSecond: 1055.056,        // BTU (IT) per second
  
  // Other units
  footPoundPerSecond: 1.355818, // Foot-pound per second
  caloriePerSecond: 4.184,      // Calorie per second
  ergPerSecond: 1e-7,           // Erg per second
  joulePerSecond: 1,            // Joule per second (same as watt)
  joulePerHour: 0.0002777778,   // Joule per hour
  
  // Electrical units
  voltAmpere: 1,                // Volt-ampere (apparent power)
  kilovoltAmpere: 1000,         // Kilovolt-ampere
};

// Type for Power units
type PowerUnit = keyof typeof conversionFactors;

// Unit display names with abbreviations
const unitLabels = {
  watt: "Watt (W)",
  kilowatt: "Kilowatt (kW)",
  megawatt: "Megawatt (MW)",
  gigawatt: "Gigawatt (GW)",
  horsepowerMechanical: "Horsepower (Mechanical) (hp)",
  horsepowerMetric: "Horsepower (Metric) (hp)",
  btulHour: "BTU per Hour (BTU/h)",
  btulMinute: "BTU per Minute (BTU/min)",
  btulSecond: "BTU per Second (BTU/s)",
  footPoundPerSecond: "Foot-pound per Second (ft·lb/s)",
  caloriePerSecond: "Calorie per Second (cal/s)",
  ergPerSecond: "Erg per Second (erg/s)",
  joulePerSecond: "Joule per Second (J/s)",
  joulePerHour: "Joule per Hour (J/h)",
  voltAmpere: "Volt-ampere (VA)",
  kilovoltAmpere: "Kilovolt-ampere (kVA)"
};

/**
 * Power Converter Component
 * Allows users to convert between different units of power
 */
export default function PowerConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<PowerUnit>('kilowatt');
  const [toUnit, setToUnit] = useState<PowerUnit>('horsepowerMechanical');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertPower();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one power unit to another
   */
  const convertPower = () => {
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
    
    // Power is typically positive in most applications
    if (value < 0) {
      setError('Power values are typically positive');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to watts (base unit), then to target unit
    const inWatts = value * conversionFactors[fromUnit];
    const converted = inWatts / conversionFactors[toUnit];

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
    setFromUnit('kilowatt');
    setToUnit('horsepowerMechanical');
    setResult('');
    setError(null);
  };

  // Generate the Select options grouped by category
  const renderUnitOptions = () => {
    const groups = {
      "SI Units": ["watt", "kilowatt", "megawatt", "gigawatt"],
      "Mechanical": ["horsepowerMechanical", "horsepowerMetric", "footPoundPerSecond"],
      "Heat & Energy": ["btulHour", "btulMinute", "btulSecond", "caloriePerSecond", "ergPerSecond", "joulePerSecond", "joulePerHour"],
      "Electrical": ["voltAmpere", "kilovoltAmpere"]
    };

    return Object.entries(groups).map(([groupName, units]) => (
      <React.Fragment key={groupName}>
        <SelectItem value={units[0]} disabled className="font-semibold text-primary">
          {groupName}
        </SelectItem>
        {units.map(unit => (
          <SelectItem key={unit} value={unit}>
            {unitLabels[unit as PowerUnit]}
          </SelectItem>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <BatteryCharging className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Power Converter</CardTitle>
            <CardDescription>
              Convert between different units of power and rate of energy
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="power-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="power-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter power amount"
                className="w-full"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as PowerUnit)}>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as PowerUnit)}>
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

          {/* About Power Units */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-1">What is Power?</h4>
            <p className="text-muted-foreground mb-2">
              Power is the rate at which energy is transferred, used, or transformed. It represents how quickly work is done or energy is converted from one form to another. The SI unit of power is the watt (W), which equals one joule per second (J/s).
            </p>

            <h4 className="font-medium mb-1">Common Power Units:</h4>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li><strong>Watt (W):</strong> The SI unit of power, equal to one joule of energy per second. Used for measuring electrical power, mechanical power, and heat flow rate.</li>
              <li><strong>Horsepower (hp):</strong> Originally defined as the power a horse could sustain while pulling, now standardized as approximately 745.7 watts (mechanical hp) or 735.5 watts (metric hp).</li>
              <li><strong>BTU per hour (BTU/h):</strong> Common in heating and cooling systems in North America. One BTU/h is approximately 0.293 watts.</li>
              <li><strong>Kilowatt (kW):</strong> Equal to 1,000 watts, commonly used for measuring electrical power in household and industrial applications.</li>
              <li><strong>Megawatt (MW):</strong> Equal to 1,000,000 watts, used for large power plants and industrial applications.</li>
            </ul>

            <h4 className="font-medium mt-2 mb-1">How Power Relates to Energy:</h4>
            <p className="text-muted-foreground">
              Power = Energy ÷ Time. While energy represents the capacity to do work, power describes how quickly that work is done. For example, a 100-watt light bulb uses 100 joules of energy every second it is turned on.
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
          Accurate conversions between different power measurement units
        </div>
      </CardFooter>
    </Card>
  );
}