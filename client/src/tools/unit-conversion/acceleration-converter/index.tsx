import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";

// Acceleration unit types
type AccelerationUnit = 
  | "meterPerSecondSquared" | "footPerSecondSquared" | "gal" 
  | "gravity" | "kilometerPerHourSquared" | "milePerHourSquared" 
  | "centimeterPerSecondSquared" | "inchPerSecondSquared";

// Conversion factors to m/s² (base unit)
const conversionFactors: Record<AccelerationUnit, number> = {
  meterPerSecondSquared: 1,
  footPerSecondSquared: 0.3048,
  gal: 0.01, // 1 gal = 1 cm/s² = 0.01 m/s²
  gravity: 9.80665, // 1g = 9.80665 m/s²
  kilometerPerHourSquared: 1 / 12960, // km/h² to m/s²
  milePerHourSquared: 0.44704 / 3600, // mph² to m/s²
  centimeterPerSecondSquared: 0.01,
  inchPerSecondSquared: 0.0254,
};

// Unit display labels
const unitLabels: Record<AccelerationUnit, string> = {
  meterPerSecondSquared: "Meter per Second Squared (m/s²)",
  footPerSecondSquared: "Foot per Second Squared (ft/s²)",
  gal: "Gal (cm/s²)",
  gravity: "Standard Gravity (g)",
  kilometerPerHourSquared: "Kilometer per Hour Squared (km/h²)",
  milePerHourSquared: "Mile per Hour Squared (mph²)",
  centimeterPerSecondSquared: "Centimeter per Second Squared (cm/s²)",
  inchPerSecondSquared: "Inch per Second Squared (in/s²)",
};

function AccelerationConverter() {
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<AccelerationUnit>('gravity');
  const [toUnit, setToUnit] = useState<AccelerationUnit>('meterPerSecondSquared');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertAcceleration();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one acceleration unit to another
   */
  const convertAcceleration = () => {
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
    // First convert to m/s² (base unit), then to target unit
    const inMeterPerSecondSquared = value * conversionFactors[fromUnit];
    const converted = inMeterPerSecondSquared / conversionFactors[toUnit];

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
    
    if (absNum < 0.0001) return num.toExponential(4);
    if (absNum < 0.001) return num.toFixed(6);
    if (absNum < 0.01) return num.toFixed(4);
    if (absNum < 1) return num.toFixed(3);
    if (absNum < 10) return num.toFixed(2);
    if (absNum < 100) return num.toFixed(1);
    
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
    setFromUnit('gravity');
    setToUnit('meterPerSecondSquared');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Acceleration Converter</CardTitle>
            <CardDescription>
              Convert between different units of acceleration and gravitational force
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="acceleration-value" className="block text-sm font-medium mb-2">
                Enter Value
              </label>
              <Input
                id="acceleration-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter acceleration"
                className="w-full"
                step="0.01"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-unit" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as AccelerationUnit)}>
                  <SelectTrigger id="from-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meterPerSecondSquared">Meter per Second² (m/s²)</SelectItem>
                    <SelectItem value="footPerSecondSquared">Foot per Second² (ft/s²)</SelectItem>
                    <SelectItem value="gravity">Standard Gravity (g)</SelectItem>
                    <SelectItem value="gal">Gal (cm/s²)</SelectItem>
                    <SelectItem value="centimeterPerSecondSquared">Centimeter per Second² (cm/s²)</SelectItem>
                    <SelectItem value="inchPerSecondSquared">Inch per Second² (in/s²)</SelectItem>
                    <SelectItem value="kilometerPerHourSquared">Kilometer per Hour² (km/h²)</SelectItem>
                    <SelectItem value="milePerHourSquared">Mile per Hour² (mph²)</SelectItem>
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
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as AccelerationUnit)}>
                  <SelectTrigger id="to-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meterPerSecondSquared">Meter per Second² (m/s²)</SelectItem>
                    <SelectItem value="footPerSecondSquared">Foot per Second² (ft/s²)</SelectItem>
                    <SelectItem value="gravity">Standard Gravity (g)</SelectItem>
                    <SelectItem value="gal">Gal (cm/s²)</SelectItem>
                    <SelectItem value="centimeterPerSecondSquared">Centimeter per Second² (cm/s²)</SelectItem>
                    <SelectItem value="inchPerSecondSquared">Inch per Second² (in/s²)</SelectItem>
                    <SelectItem value="kilometerPerHourSquared">Kilometer per Hour² (km/h²)</SelectItem>
                    <SelectItem value="milePerHourSquared">Mile per Hour² (mph²)</SelectItem>
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

          {/* Conversion Details */}
          {result && (
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Conversion Details:</span>
                  <p className="text-muted-foreground mt-1">
                    {`${inputValue} ${unitLabels[fromUnit]} = ${result} ${unitLabels[toUnit]}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {`1 ${unitLabels[fromUnit]} = ${(conversionFactors[fromUnit] / conversionFactors[toUnit]).toFixed(6)} ${unitLabels[toUnit]}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Common Acceleration Reference */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-2">Common Acceleration References:</h4>
            <div className="grid gap-1 text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>1 g (gravity)</span>
                <span>=</span>
                <span>9.81 m/s²</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1 gal</span>
                <span>=</span>
                <span>1 cm/s²</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Car acceleration</span>
                <span>≈</span>
                <span>3-5 m/s²</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Elevator acceleration</span>
                <span>≈</span>
                <span>1-2 m/s²</span>
              </div>
            </div>
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
          Accurate acceleration and gravitational force conversions
        </div>
      </CardFooter>
    </Card>
  );
}

export default AccelerationConverter;