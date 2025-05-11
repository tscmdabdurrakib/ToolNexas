import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info, Hash } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Number systems
type NumberSystem = 
  | "binary" 
  | "octal" 
  | "decimal" 
  | "hexadecimal" 
  | "base32" 
  | "base64";

// Unit display names with descriptions
const systemLabels: Record<NumberSystem, string> = {
  binary: "Binary (Base-2)",
  octal: "Octal (Base-8)",
  decimal: "Decimal (Base-10)",
  hexadecimal: "Hexadecimal (Base-16)",
  base32: "Base-32",
  base64: "Base-64"
};

/**
 * Numbers Converter Component
 * Allows users to convert between different number systems
 */
export default function NumbersConverter() {
  // State for input value, source and target systems
  const [inputValue, setInputValue] = useState<string>('');
  const [fromSystem, setFromSystem] = useState<NumberSystem>('decimal');
  const [toSystem, setToSystem] = useState<NumberSystem>('binary');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Validate input based on selected number system
  const validateInput = (value: string, system: NumberSystem): boolean => {
    if (!value) return true;
    
    switch (system) {
      case "binary":
        return /^[01]*$/.test(value);
      case "octal":
        return /^[0-7]*$/.test(value);
      case "decimal":
        return /^[0-9]*$/.test(value);
      case "hexadecimal":
        return /^[0-9A-Fa-f]*$/.test(value);
      case "base32":
        return /^[A-Z2-7=]*$/.test(value);
      case "base64":
        return /^[A-Za-z0-9+/=]*$/.test(value);
      default:
        return true;
    }
  };

  // Perform conversion when inputs change
  useEffect(() => {
    convertNumber();
  }, [inputValue, fromSystem, toSystem]);

  // Convert between number systems
  const convertNumber = () => {
    // Clear previous errors
    setError(null);

    // If input is empty, clear the result
    if (!inputValue) {
      setResult('');
      return;
    }

    // Validate input format
    if (!validateInput(inputValue, fromSystem)) {
      setError(`Invalid input for ${systemLabels[fromSystem]}`);
      setResult('');
      return;
    }

    try {
      let decimal: number;
      let resultValue: string;

      // First convert to decimal (common base)
      switch (fromSystem) {
        case "binary":
          decimal = parseInt(inputValue, 2);
          break;
        case "octal":
          decimal = parseInt(inputValue, 8);
          break;
        case "decimal":
          decimal = parseInt(inputValue, 10);
          break;
        case "hexadecimal":
          decimal = parseInt(inputValue, 16);
          break;
        case "base32":
        case "base64":
          setError(`Full ${systemLabels[fromSystem]} conversion requires a specialized encoding library`);
          setResult('');
          return;
        default:
          decimal = 0;
      }

      // Check if the conversion resulted in a valid number
      if (isNaN(decimal)) {
        setError('Invalid input or conversion');
        setResult('');
        return;
      }

      // Then convert decimal to target system
      switch (toSystem) {
        case "binary":
          resultValue = decimal.toString(2);
          break;
        case "octal":
          resultValue = decimal.toString(8);
          break;
        case "decimal":
          resultValue = decimal.toString(10);
          break;
        case "hexadecimal":
          resultValue = decimal.toString(16).toUpperCase();
          break;
        case "base32":
        case "base64":
          setError(`Full ${systemLabels[toSystem]} conversion requires a specialized encoding library`);
          setResult('');
          return;
        default:
          resultValue = "";
      }

      // Set result
      setResult(resultValue);
    } catch (err) {
      setError('Invalid conversion');
      setResult('');
    }
  };

  // Reset all fields to default
  const resetConverter = () => {
    setInputValue('');
    setFromSystem('decimal');
    setToSystem('binary');
    setResult('');
    setError(null);
  };

  // Get input placeholder text based on selected number system
  const getInputPlaceholder = (): string => {
    switch (fromSystem) {
      case "binary": return "Enter binary number (0s and 1s)";
      case "octal": return "Enter octal number (0-7)";
      case "decimal": return "Enter decimal number (0-9)";
      case "hexadecimal": return "Enter hexadecimal number (0-9, A-F)";
      case "base32": return "Enter Base-32 encoded value";
      case "base64": return "Enter Base-64 encoded value";
      default: return "Enter value";
    }
  };

  // Helper function to display input hint
  const getInputHint = (): string | null => {
    if (!inputValue) return null;
    
    switch (fromSystem) {
      case "binary": return "Use only 0 and 1";
      case "octal": return "Use only digits 0-7";
      case "decimal": return "Use only digits 0-9";
      case "hexadecimal": return "Use digits 0-9 and letters A-F";
      default: return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Hash className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Number System Converter</CardTitle>
            <CardDescription>
              Convert between binary, decimal, hexadecimal and other number systems
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and system selection */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="from-system" className="block text-sm font-medium mb-2">
                From System
              </label>
              <Select value={fromSystem} onValueChange={(value) => setFromSystem(value as NumberSystem)}>
                <SelectTrigger id="from-system">
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="binary">Binary (Base-2)</SelectItem>
                  <SelectItem value="octal">Octal (Base-8)</SelectItem>
                  <SelectItem value="decimal">Decimal (Base-10)</SelectItem>
                  <SelectItem value="hexadecimal">Hexadecimal (Base-16)</SelectItem>
                  <SelectItem value="base32" disabled>Base-32 (Coming soon)</SelectItem>
                  <SelectItem value="base64" disabled>Base-64 (Coming soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="to-system" className="block text-sm font-medium mb-2">
                To System
              </label>
              <Select value={toSystem} onValueChange={(value) => setToSystem(value as NumberSystem)}>
                <SelectTrigger id="to-system">
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="binary">Binary (Base-2)</SelectItem>
                  <SelectItem value="octal">Octal (Base-8)</SelectItem>
                  <SelectItem value="decimal">Decimal (Base-10)</SelectItem>
                  <SelectItem value="hexadecimal">Hexadecimal (Base-16)</SelectItem>
                  <SelectItem value="base32" disabled>Base-32 (Coming soon)</SelectItem>
                  <SelectItem value="base64" disabled>Base-64 (Coming soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Input value */}
          <div>
            <label htmlFor="number-value" className="block text-sm font-medium mb-2">
              Enter Value
            </label>
            <Input
              id="number-value"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={getInputPlaceholder()}
              className="w-full"
            />
            {getInputHint() && (
              <p className="text-xs text-muted-foreground mt-1">
                {getInputHint()}
              </p>
            )}
          </div>

          {/* Conversion Result */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Result in {systemLabels[toSystem]}</h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {result ? (
                  <>{result}</>
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
          {result && !error && (
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Conversion Details:</span>
                  <p className="text-muted-foreground mt-1">
                    {`${inputValue} (${systemLabels[fromSystem]}) = ${result} (${systemLabels[toSystem]})`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Number Systems Guide */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-2">Number Systems Guide:</h4>
            <div className="grid gap-2 text-muted-foreground">
              <div>
                <span className="font-semibold">Binary (Base-2):</span> Uses only 0 and 1. Each digit position represents a power of 2.
                <span className="text-xs block mt-0.5">Example: 1010₂ = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 10₁₀</span>
              </div>
              <div>
                <span className="font-semibold">Decimal (Base-10):</span> Uses digits 0-9. Each position represents a power of 10.
                <span className="text-xs block mt-0.5">Example: 365₁₀ = 3×10² + 6×10¹ + 5×10⁰</span>
              </div>
              <div>
                <span className="font-semibold">Hexadecimal (Base-16):</span> Uses digits 0-9 and letters A-F. Each position represents a power of 16.
                <span className="text-xs block mt-0.5">Example: 1A₁₆ = 1×16¹ + 10×16⁰ = 26₁₀</span>
              </div>
              <div>
                <span className="font-semibold">Octal (Base-8):</span> Uses digits 0-7. Each position represents a power of 8.
                <span className="text-xs block mt-0.5">Example: 17₈ = 1×8¹ + 7×8⁰ = 15₁₀</span>
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
          Convert between different number systems and bases
        </div>
      </CardFooter>
    </Card>
  );
}