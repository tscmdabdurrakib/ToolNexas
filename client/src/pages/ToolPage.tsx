import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useTools } from "@/context/ToolsContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ToolPage() {
  const [, params] = useRoute("/tool/:id");
  const { tools } = useTools();
  const [isLoading, setIsLoading] = useState(true);
  
  const toolId = params?.id;
  const tool = tools.find(t => t.id === toolId);
  
  // Common state
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Generic handlers
  const handleProcess = () => {
    // Process based on tool type
    if (tool?.category.id === 'unit-conversion') {
      setOutputValue(`Converted value: ${inputValue} units`);
    } else if (tool?.category.id === 'text-string') {
      setOutputValue(inputValue.toUpperCase());
    } else {
      setOutputValue(`Processed: ${inputValue}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Tool Not Found</h1>
        <p className="text-muted-foreground mb-8">The tool you're looking for doesn't exist.</p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  // Main content
  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-6">
          <Link href={`/category/${tool.category.id}`}>
            <span className="text-muted-foreground hover:text-foreground transition-colors">
              {tool.category.name}
            </span>
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl font-bold">{tool.name}</h1>
        </div>

        <div className="mb-8">
          <p className="text-muted-foreground max-w-3xl">{tool.description}</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <div className="mr-3 text-primary">{tool.icon}</div>
                <span>{tool.name}</span>
              </div>
            </CardTitle>
            <CardDescription>
              Enter your input below and click Process to use this tool.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium">Input</label>
                <Textarea 
                  className="min-h-32"
                  placeholder="Enter text or values here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button onClick={handleProcess}>Process</Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="block text-sm font-medium">Output</label>
                  {outputValue && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCopy}
                      className="flex items-center"
                    >
                      {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  )}
                </div>
                <div className="p-4 bg-muted rounded border min-h-32 font-mono">
                  {outputValue || "Result will appear here"}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex-col items-start">
            <h4 className="font-medium mb-2">Features</h4>
            <div className="flex flex-wrap gap-2">
              {tool.features ? tool.features.map((feature, i) => (
                <Badge key={i} variant="secondary">{feature}</Badge>
              )) : (
                <p className="text-sm text-muted-foreground">
                  This tool provides {tool.name.toLowerCase()} functionality.
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}