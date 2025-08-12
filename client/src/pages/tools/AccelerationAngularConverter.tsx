import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, RotateCcw, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToolVisit } from "@/hooks/useToolVisit";

interface ConversionUnits {
  acceleration: {
    [key: string]: { name: string; factor: number; symbol: string };
  };
  angularVelocity: {
    [key: string]: { name: string; factor: number; symbol: string };
  };
}

const units: ConversionUnits = {
  acceleration: {
    "m_s2": { name: "Meters per second²", factor: 1, symbol: "m/s²" },
    "ft_s2": { name: "Feet per second²", factor: 0.3048, symbol: "ft/s²" },
    "km_h_s": { name: "Kilometers per hour per second", factor: 0.277778, symbol: "km/(h⋅s)" },
    "g": { name: "Standard gravity", factor: 9.80665, symbol: "g" },
    "gal": { name: "Gal (centimeter per second²)", factor: 0.01, symbol: "Gal" },
  },
  angularVelocity: {
    "rad_s": { name: "Radians per second", factor: 1, symbol: "rad/s" },
    "rpm": { name: "Revolutions per minute", factor: Math.PI / 30, symbol: "RPM" },
    "deg_s": { name: "Degrees per second", factor: Math.PI / 180, symbol: "deg/s" },
    "rev_s": { name: "Revolutions per second", factor: 2 * Math.PI, symbol: "rev/s" },
  },
};

export default function AccelerationAngularConverter() {
  useToolVisit("acceleration-angular-converter");
  
  const [acceleration, setAcceleration] = useState<string>("");
  const [radius, setRadius] = useState<string>("1");
  const [accelerationUnit, setAccelerationUnit] = useState<string>("m_s2");
  const [angularVelocityUnit, setAngularVelocityUnit] = useState<string>("rad_s");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetFields = () => {
    setAcceleration("");
    setRadius("1");
    setResult("");
    setError("");
  };

  const calculateAngularVelocity = () => {
    const accelValue = parseFloat(acceleration);
    const radiusValue = parseFloat(radius);

    if (isNaN(accelValue) || isNaN(radiusValue)) {
      setError("Please enter valid numbers for acceleration and radius");
      setResult("");
      return;
    }

    if (radiusValue <= 0) {
      setError("Radius must be greater than zero");
      setResult("");
      return;
    }

    setError("");

    // Convert acceleration to m/s²
    const accelInMPerS2 = accelValue * units.acceleration[accelerationUnit].factor;
    
    // Calculate angular acceleration (α = a/r)
    const angularAcceleration = accelInMPerS2 / radiusValue;
    
    // Convert to desired angular velocity unit
    const angularVelocityInRadS = angularAcceleration;
    const finalResult = angularVelocityInRadS / units.angularVelocity[angularVelocityUnit].factor;
    
    setResult(finalResult.toFixed(8));
  };

  useEffect(() => {
    if (acceleration && radius) {
      calculateAngularVelocity();
    } else {
      setResult("");
      setError("");
    }
  }, [acceleration, radius, accelerationUnit, angularVelocityUnit]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Acceleration to Angular Velocity Converter
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert linear acceleration to angular velocity with professional precision for engineering applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Conversion Calculator
              </CardTitle>
              <CardDescription>
                Enter linear acceleration and radius to calculate angular velocity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="acceleration">Linear Acceleration</Label>
                  <div className="flex gap-2">
                    <Input
                      id="acceleration"
                      type="number"
                      step="any"
                      placeholder="Enter acceleration value"
                      value={acceleration}
                      onChange={(e) => setAcceleration(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={accelerationUnit} onValueChange={setAccelerationUnit}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(units.acceleration).map(([key, unit]) => (
                          <SelectItem key={key} value={key}>
                            {unit.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="radius">Radius (meters)</Label>
                  <Input
                    id="radius"
                    type="number"
                    step="any"
                    placeholder="Enter radius value"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="result">Angular Velocity Result</Label>
                  <div className="flex gap-2">
                    <Input
                      id="result"
                      type="text"
                      value={result}
                      readOnly
                      placeholder="Result will appear here"
                      className="flex-1"
                    />
                    <Select value={angularVelocityUnit} onValueChange={setAngularVelocityUnit}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(units.angularVelocity).map(([key, unit]) => (
                          <SelectItem key={key} value={key}>
                            {unit.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={resetFields} 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Fields
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Formula & Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Formula:</h4>
                <p className="font-mono text-sm">α = a / r</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Where α is angular acceleration, a is linear acceleration, and r is radius
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Key Information:</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Angular velocity relates rotational motion to linear motion</li>
                  <li>• Radius must be greater than zero for valid calculations</li>
                  <li>• Units are automatically converted for precision</li>
                  <li>• Results are displayed with 8 decimal places</li>
                  <li>• This conversion is fundamental in mechanical engineering</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Supported Units:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Acceleration:</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• m/s² (SI unit)</li>
                      <li>• ft/s²</li>
                      <li>• km/(h⋅s)</li>
                      <li>• g (gravity)</li>
                      <li>• Gal</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Angular Velocity:</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• rad/s (SI unit)</li>
                      <li>• RPM</li>
                      <li>• deg/s</li>
                      <li>• rev/s</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}