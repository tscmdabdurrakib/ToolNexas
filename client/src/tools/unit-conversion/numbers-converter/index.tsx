import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, RotateCcw, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

// Interface for common conversion examples
interface CommonConversion {
  value: string;
  fromSystem: NumberSystem;
  toSystem: NumberSystem;
  result: string;
}

// Common conversion references for educational purposes
const commonConversions: CommonConversion[] = [
  { value: "42", fromSystem: "decimal", toSystem: "binary", result: "101010" },
  { value: "255", fromSystem: "decimal", toSystem: "hexadecimal", result: "FF" },
  { value: "FF", fromSystem: "hexadecimal", toSystem: "decimal", result: "255" },
  { value: "1000", fromSystem: "binary", toSystem: "decimal", result: "8" },
  { value: "20", fromSystem: "decimal", toSystem: "octal", result: "24" }
];

/**
 * Numbers Converter Component
 * A modern, user-friendly tool for converting between different number systems
 */
export default function NumbersConverter() {
  const { toast } = useToast();
  const [fromSystem, setFromSystem] = useState<NumberSystem>("decimal");
  const [toSystem, setToSystem] = useState<NumberSystem>("binary");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [animateResult, setAnimateResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Validate input based on selected number system
  const validateInput = (value: string, system: NumberSystem): boolean => {
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

  // Convert between number systems
  const convert = () => {
    if (!inputValue) {
      setResult("");
      setError(null);
      return;
    }

    // Validate input format
    if (!validateInput(inputValue, fromSystem)) {
      setError(`Invalid input for ${systemLabels[fromSystem]}`);
      setResult("");
      return;
    }

    setError(null);
    
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
          // This is simplified and not complete Base32 decoding
          setError("Full Base32 conversion requires a specialized encoding library");
          return;
        case "base64":
          // This is simplified and not complete Base64 decoding
          setError("Full Base64 conversion requires a specialized encoding library");
          return;
        default:
          decimal = 0;
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
          // This is simplified and not complete Base32 encoding
          setError("Full Base32 conversion requires a specialized encoding library");
          return;
        case "base64":
          // This is simplified and not complete Base64 encoding
          setError("Full Base64 conversion requires a specialized encoding library");
          return;
        default:
          resultValue = "";
      }

      // Set result and animate
      setResult(resultValue);
      setAnimateResult(true);
      setTimeout(() => setAnimateResult(false), 500);
    } catch (err) {
      setError("Invalid conversion");
      setResult("");
    }
  };

  // Copy result to clipboard
  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: `${result} copied to clipboard.`,
        duration: 2000,
      });
    }
  };

  // Reset all fields
  const resetFields = () => {
    setInputValue("");
    setResult("");
    setFromSystem("decimal");
    setToSystem("binary");
    setError(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Convert when input or systems change
  useEffect(() => {
    convert();
  }, [inputValue, fromSystem, toSystem]);

  return (
    <Card className="w-full max-w-4xl mx-auto border-none shadow-none">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6">
          {/* From System */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">From</h3>
            <Select 
              value={fromSystem} 
              onValueChange={(value: string) => setFromSystem(value as NumberSystem)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number system" />
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
            <Input
              type="text"
              placeholder="Enter number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-2"
              ref={inputRef}
            />
            {error && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}

            {fromSystem === "binary" && inputValue && (
              <p className="text-xs text-muted-foreground mt-1">
                Use only 0 and 1
              </p>
            )}
            {fromSystem === "octal" && inputValue && (
              <p className="text-xs text-muted-foreground mt-1">
                Use only digits 0-7
              </p>
            )}
            {fromSystem === "hexadecimal" && inputValue && (
              <p className="text-xs text-muted-foreground mt-1">
                Use digits 0-9 and letters A-F
              </p>
            )}
          </div>

          {/* To System */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">To</h3>
            <Select 
              value={toSystem} 
              onValueChange={(value: string) => setToSystem(value as NumberSystem)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number system" />
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
            
            <div className="border rounded-md mt-2 h-[40px] p-2 flex items-center justify-between bg-muted/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={result}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between w-full"
                >
                  <div className="text-lg font-medium">
                    {result ? (
                      <motion.div 
                        animate={animateResult ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {result}
                      </motion.div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Enter a value to convert</span>
                    )}
                  </div>
                  {result && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={copyResult}
                      title="Copy result"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFields}
            className="flex items-center gap-1"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset
          </Button>
        </div>
        
        {/* Conversion details box */}
        <div className="space-y-4">
          {inputValue && !error && result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-muted/30 p-4 rounded-lg text-sm"
            >
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Conversion Details:</span>
                  <p className="text-muted-foreground mt-1">
                    {`${inputValue} (${systemLabels[fromSystem]}) = ${result} (${systemLabels[toSystem]})`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Common Conversions Table */}
        <Separator className="my-6" />
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Common Number System Conversions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {commonConversions.map((conv, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Badge variant="outline" className="h-6 px-1.5 text-xs whitespace-nowrap">
                  {conv.value} ({conv.fromSystem.substring(0, 3)})
                </Badge>
                <span>=</span>
                <Badge variant="outline" className="h-6 px-1.5 text-xs bg-primary/5 whitespace-nowrap">
                  {conv.result} ({conv.toSystem.substring(0, 3)})
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Number Systems Information */}
        <Separator className="my-6" />
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Number Systems Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium mb-1">Binary (Base-2)</h4>
              <p>Uses only 0 and 1. Each digit position represents a power of 2.</p>
              <p className="mt-1"><strong>Example:</strong> 1010 = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 10 in decimal</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Decimal (Base-10)</h4>
              <p>The standard number system with digits 0-9. Each position represents a power of 10.</p>
              <p className="mt-1"><strong>Example:</strong> 365 = 3×10² + 6×10¹ + 5×10⁰</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Hexadecimal (Base-16)</h4>
              <p>Uses digits 0-9 and letters A-F. Each position represents a power of 16.</p>
              <p className="mt-1"><strong>Example:</strong> 1A = 1×16¹ + 10×16⁰ = 26 in decimal</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Octal (Base-8)</h4>
              <p>Uses digits 0-7. Each position represents a power of 8.</p>
              <p className="mt-1"><strong>Example:</strong> 17 = 1×8¹ + 7×8⁰ = 15 in decimal</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}