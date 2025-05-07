import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useTools } from "@/context/ToolsContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    setOutputValue(`Processed: ${inputValue}`);
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

  // Render specific tool interfaces based on tool ID and category
  const renderToolInterface = () => {
    
    // For Code & Developer tools
    if (toolId === 'json-formatter') {
      return (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Input JSON</h3>
              <div className="flex items-center space-x-2">
                <select 
                  className="text-xs bg-card border border-border rounded px-2 py-1"
                  value={indentation}
                  onChange={(e) => setIndentation(Number(e.target.value))}
                >
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                  <option value="8">8 spaces</option>
                </select>
                <Button size="sm" onClick={handleFormatJson}>Format</Button>
              </div>
            </div>
            <textarea
              className="w-full h-80 p-4 bg-card border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            {jsonError && (
              <div className="text-sm text-red-500 p-2 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800">
                {jsonError}
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Formatted Result</h3>
              {formattedJson && (
                <Button size="sm" variant="outline" onClick={handleCopyJson}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                  Copy
                </Button>
              )}
            </div>
            <div className="w-full h-80 p-4 bg-gray-900 rounded-md font-mono text-sm text-gray-200 overflow-auto">
              <pre>{formattedJson}</pre>
            </div>
          </div>
        </div>
      );
    }
    
    // For html-beautifier
    if (toolId === 'html-beautifier') {
      return (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Input HTML</h3>
              <div className="flex items-center space-x-2">
                <select 
                  className="text-xs bg-card border border-border rounded px-2 py-1"
                  value={indentation}
                  onChange={(e) => setIndentation(Number(e.target.value))}
                >
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                </select>
                <Button size="sm" onClick={() => {}}>Format</Button>
              </div>
            </div>
            <textarea
              className="w-full h-80 p-4 bg-card border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Paste your HTML here..."
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Formatted HTML</h3>
              <Button size="sm" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
                Copy
              </Button>
            </div>
            <div className="w-full h-80 p-4 bg-gray-900 rounded-md font-mono text-sm text-gray-200 overflow-auto">
              <pre>Your formatted HTML will appear here</pre>
            </div>
          </div>
        </div>
      );
    }
    
    // For Unit & Conversion Tools
    if (tool?.category.id === 'unit-conversion') {
      let fromOptions: string[] = [];
      let toOptions: string[] = [];
      
      // Set options based on specific tool
      switch (toolId) {
        case 'length-converter':
          fromOptions = ['meter', 'kilometer', 'centimeter', 'millimeter', 'inch', 'foot', 'yard', 'mile'];
          toOptions = ['meter', 'kilometer', 'centimeter', 'millimeter', 'inch', 'foot', 'yard', 'mile'];
          break;
        case 'weight-converter':
          fromOptions = ['kilogram', 'gram', 'milligram', 'pound', 'ounce', 'ton'];
          toOptions = ['kilogram', 'gram', 'milligram', 'pound', 'ounce', 'ton'];
          break;
        case 'temperature-converter':
          fromOptions = ['celsius', 'fahrenheit', 'kelvin'];
          toOptions = ['celsius', 'fahrenheit', 'kelvin'];
          break;
        case 'area-converter':
          fromOptions = ['square meter', 'square kilometer', 'square foot', 'acre', 'hectare'];
          toOptions = ['square meter', 'square kilometer', 'square foot', 'acre', 'hectare'];
          break;
        case 'volume-converter':
          fromOptions = ['liter', 'milliliter', 'cubic meter', 'gallon', 'quart', 'pint', 'cup'];
          toOptions = ['liter', 'milliliter', 'cubic meter', 'gallon', 'quart', 'pint', 'cup'];
          break;
        case 'currency-converter':
          fromOptions = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'INR'];
          toOptions = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'INR'];
          break;
        default:
          fromOptions = ['unit1', 'unit2', 'unit3'];
          toOptions = ['unit1', 'unit2', 'unit3'];
      }
      
      return (
        <div className="max-w-3xl mx-auto bg-card rounded-lg border border-border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">From</label>
              <div className="flex space-x-3">
                <select 
                  className="w-full bg-background border border-border rounded px-3 py-2"
                  defaultValue={fromOptions[0]}
                >
                  {fromOptions.map(option => (
                    <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="pt-2">
                <label className="block text-sm font-medium text-foreground mb-1">Value</label>
                <input
                  type="number"
                  className="w-full bg-background border border-border rounded px-3 py-2"
                  placeholder="Enter value"
                  value={conversionInput}
                  onChange={(e) => setConversionInput(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">To</label>
              <div className="flex space-x-3">
                <select 
                  className="w-full bg-background border border-border rounded px-3 py-2"
                  value={conversionTo}
                  onChange={(e) => setConversionTo(e.target.value)}
                >
                  {toOptions.map(option => (
                    <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="pt-2">
                <label className="block text-sm font-medium text-foreground mb-1">Result</label>
                <div className="w-full bg-background border border-border rounded px-3 py-2 h-[38px] flex items-center">
                  {conversionInput ? (Number(conversionInput) * 1.23).toFixed(4) : '0'} {conversionTo}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button onClick={() => {}}>
              Convert
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="font-medium mb-3">Conversion Formula:</h4>
            <div className="p-3 bg-background rounded text-sm font-mono">
              1 {conversionFrom} = 1.23 {conversionTo}
            </div>
          </div>
        </div>
      );
    }
    
    // For Calculation Tools
    if (tool?.category.id === 'calculation') {
      let calculatorFields = [];
      let calculatorTitle = "";
      
      // Set fields based on specific calculator tool
      switch (toolId) {
        case 'age-calculator':
          calculatorTitle = "Enter Date of Birth";
          calculatorFields = [
            { label: "Birth Date", type: "date", placeholder: "MM/DD/YYYY" }
          ];
          break;
        case 'loan-calculator':
          calculatorTitle = "Enter Loan Details";
          calculatorFields = [
            { label: "Loan Amount", type: "number", placeholder: "10000" },
            { label: "Interest Rate (%)", type: "number", placeholder: "5.5" },
            { label: "Loan Term (years)", type: "number", placeholder: "30" }
          ];
          break;
        case 'bmi-calculator':
          calculatorTitle = "Enter Your Details";
          calculatorFields = [
            { label: "Weight (kg)", type: "number", placeholder: "70" },
            { label: "Height (cm)", type: "number", placeholder: "175" }
          ];
          break;
        default:
          calculatorTitle = "Enter Values";
          calculatorFields = [
            { label: "Value 1", type: "number", placeholder: "0" },
            { label: "Value 2", type: "number", placeholder: "0" }
          ];
      }
      
      return (
        <div className="max-w-xl mx-auto bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-medium mb-4">{calculatorTitle}</h3>
          
          <div className="space-y-4">
            {calculatorFields.map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-foreground mb-1">{field.label}</label>
                <input
                  type={field.type}
                  className="w-full bg-background border border-border rounded px-3 py-2"
                  placeholder={field.placeholder}
                  onChange={(e) => {
                    if (index === 0) setCalculatorInput1(e.target.value);
                    else if (index === 1) setCalculatorInput2(e.target.value);
                  }}
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button onClick={() => {}}>
              Calculate
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-secondary/30 rounded-md">
            <div className="text-center">
              <h4 className="font-medium mb-2">Result</h4>
              <div className="text-2xl font-bold text-primary">
                {toolId === 'bmi-calculator' && calculatorInput1 && calculatorInput2 ? 
                  (Number(calculatorInput1) / Math.pow(Number(calculatorInput2)/100, 2)).toFixed(1) :
                  "Enter values to calculate"}
              </div>
              {toolId === 'bmi-calculator' && calculatorInput1 && calculatorInput2 && (
                <div className="mt-2 text-sm">
                  <p>Normal BMI range: 18.5 - 24.9</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // For Text & String Tools
    if (tool?.category.id === 'text-string') {
      let textActions = [];
      
      // Set actions based on specific text tool
      switch (toolId) {
        case 'case-converter':
          textActions = [
            { label: "UPPERCASE", action: () => setTextOutput(textInput.toUpperCase()) },
            { label: "lowercase", action: () => setTextOutput(textInput.toLowerCase()) },
            { label: "Title Case", action: () => setTextOutput(textInput.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())) },
            { label: "Sentence case", action: () => setTextOutput(textInput.charAt(0).toUpperCase() + textInput.slice(1).toLowerCase()) }
          ];
          break;
        case 'text-repeater':
          textActions = [
            { label: "Repeat 2x", action: () => setTextOutput(textInput.repeat(2)) },
            { label: "Repeat 5x", action: () => setTextOutput(textInput.repeat(5)) },
            { label: "Repeat 10x", action: () => setTextOutput(textInput.repeat(10)) }
          ];
          break;
        case 'line-break-remover':
          textActions = [
            { label: "Remove Line Breaks", action: () => setTextOutput(textInput.replace(/(\r\n|\n|\r)/gm, " ")) },
            { label: "Normalize Spaces", action: () => setTextOutput(textInput.replace(/\s+/g, " ")) }
          ];
          break;
        case 'character-counter':
          textActions = [
            { label: "Count", action: () => setTextOutput(`Characters: ${textInput.length}, Words: ${textInput.split(/\s+/).filter(Boolean).length}, Lines: ${textInput.split(/\r\n|\r|\n/).length}`) }
          ];
          break;
        case 'string-reverser':
          textActions = [
            { label: "Reverse Characters", action: () => setTextOutput(textInput.split('').reverse().join('')) },
            { label: "Reverse Words", action: () => setTextOutput(textInput.split(' ').reverse().join(' ')) }
          ];
          break;
        default:
          textActions = [
            { label: "Process Text", action: () => setTextOutput(textInput) }
          ];
      }
      
      return (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Input Text</h3>
            <textarea
              className="w-full h-80 p-4 bg-card border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter your text here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {textActions.map((action, index) => (
                <Button key={index} size="sm" onClick={action.action}>
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Result</h3>
              <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(textOutput)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
                Copy
              </Button>
            </div>
            <div className="w-full h-80 p-4 bg-card border border-border rounded-md font-mono text-sm overflow-auto">
              {textOutput || "Result will appear here"}
            </div>
            {toolId === 'character-counter' && textInput && (
              <div className="p-3 bg-secondary/30 rounded text-sm">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="font-medium">Characters</p>
                    <p className="text-lg">{textInput.length}</p>
                  </div>
                  <div>
                    <p className="font-medium">Words</p>
                    <p className="text-lg">{textInput.split(/\s+/).filter(Boolean).length}</p>
                  </div>
                  <div>
                    <p className="font-medium">Lines</p>
                    <p className="text-lg">{textInput.split(/\r\n|\r|\n/).length}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    // For File Management Tools
    if (tool?.category.id === 'file-management') {
      return (
        <div className="max-w-3xl mx-auto bg-card rounded-lg border border-border p-6">
          <div className="mb-6 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary">
                {tool.icon}
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">{tool.name}</h3>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
          
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-lg font-medium mb-2">Drag & Drop Files Here</p>
            <p className="text-sm text-muted-foreground mb-4">or</p>
            <Button>
              Choose Files
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Maximum file size: 100MB
            </p>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Settings</h4>
            </div>
            <div className="bg-background rounded-md p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Output Format</label>
                <select className="w-full bg-card border border-border rounded px-3 py-2">
                  <option>Select format</option>
                  <option>PDF</option>
                  <option>PNG</option>
                  <option>JPG</option>
                  <option>DOCX</option>
                </select>
              </div>
              {(toolId === 'file-compressor' || toolId === 'image-compressor') && (
                <div>
                  <label className="block text-sm font-medium mb-1">Compression Level</label>
                  <select className="w-full bg-card border border-border rounded px-3 py-2">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              )}
              {toolId === 'file-encryptor' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Password Protection</label>
                  <input type="password" className="w-full bg-card border border-border rounded px-3 py-2" placeholder="Set password" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button disabled>
              {toolId === 'file-converter' ? 'Convert' : 
               toolId === 'file-splitter' ? 'Split' :
               toolId === 'file-merger' ? 'Merge' :
               toolId === 'file-compressor' ? 'Compress' :
               toolId === 'file-encryptor' ? 'Encrypt' : 'Process'} Files
            </Button>
          </div>
        </div>
      );
    }
    
    // For Image & Media Tools
    if (tool?.category.id === 'image-media') {
      return (
        <div className="max-w-3xl mx-auto bg-card rounded-lg border border-border p-6">
          <div className="mb-6 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary">
                {tool.icon}
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">{tool.name}</h3>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
          
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-background">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <p className="text-lg font-medium mb-2">Drag & Drop Image Here</p>
            <p className="text-sm text-muted-foreground mb-4">or</p>
            <Button>
              Choose Image
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Supported formats: JPG, PNG, GIF, WebP, BMP
            </p>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Settings</h4>
            </div>
            <div className="bg-background rounded-md p-4 space-y-4">
              {toolId === 'image-resizer' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Width (px)</label>
                      <input type="number" className="w-full bg-card border border-border rounded px-3 py-2" placeholder="800" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Height (px)</label>
                      <input type="number" className="w-full bg-card border border-border rounded px-3 py-2" placeholder="600" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="maintain-aspect" className="mr-2" />
                    <label htmlFor="maintain-aspect" className="text-sm">Maintain aspect ratio</label>
                  </div>
                </>
              )}
              {toolId === 'image-compressor' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Quality</label>
                  <input type="range" min="1" max="100" defaultValue="80" className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Lower quality</span>
                    <span>Higher quality</span>
                  </div>
                </div>
              )}
              {toolId === 'image-cropper' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Aspect Ratio</label>
                  <select className="w-full bg-card border border-border rounded px-3 py-2">
                    <option>Free form</option>
                    <option>1:1 (Square)</option>
                    <option>4:3</option>
                    <option>16:9</option>
                    <option>3:2</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Output Format</label>
                <select className="w-full bg-card border border-border rounded px-3 py-2">
                  <option>PNG</option>
                  <option>JPG</option>
                  <option>WebP</option>
                  <option>GIF</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button disabled>
              {toolId === 'image-resizer' ? 'Resize' : 
               toolId === 'image-compressor' ? 'Compress' :
               toolId === 'image-cropper' ? 'Crop' :
               toolId === 'image-watermarker' ? 'Add Watermark' :
               toolId === 'image-ocr' ? 'Extract Text' : 'Process'} Image
            </Button>
          </div>
        </div>
      );
    }
    
    // For Color & Design Tools
    if (tool?.category.id === 'color-design') {
      return (
        <div className="max-w-3xl mx-auto bg-card rounded-lg border border-border p-6">
          {toolId === 'color-picker' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div>
                  <div 
                    className="w-32 h-32 rounded-lg shadow-lg" 
                    style={{ backgroundColor: colorInput }}
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">HEX</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        className="flex-1 bg-background border border-border rounded-l px-3 py-2" 
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                      />
                      <Button className="rounded-l-none">Copy</Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">RGB</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        className="flex-1 bg-background border border-border rounded-l px-3 py-2" 
                        value="rgb(59, 130, 246)"
                        readOnly
                      />
                      <Button className="rounded-l-none">Copy</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3">Color Picker</label>
                <input 
                  type="color" 
                  className="w-full h-10" 
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                />
              </div>
              <div className="p-4 bg-background rounded-lg">
                <h4 className="font-medium mb-3">Color Palette</h4>
                <div className="grid grid-cols-5 gap-2">
                  {['#ff6b6b', '#4ecdc4', '#1a535c', '#ff9f1c', '#2ec4b6'].map((color, i) => (
                    <div 
                      key={i} 
                      className="h-10 rounded cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      style={{ backgroundColor: color }}
                      onClick={() => setColorInput(color)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {toolId === 'gradient-generator' && (
            <div className="space-y-6">
              <div 
                className="w-full h-32 rounded-lg shadow-lg mb-4" 
                style={{ background: 'linear-gradient(to right, #4f46e5, #06b6d4)' }}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Color</label>
                  <div className="flex">
                    <input type="color" className="h-[38px] bg-background border border-border rounded-l w-12" defaultValue="#4f46e5" />
                    <input type="text" className="flex-1 bg-background border-y border-r border-border rounded-r px-3 py-2" defaultValue="#4f46e5" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Color</label>
                  <div className="flex">
                    <input type="color" className="h-[38px] bg-background border border-border rounded-l w-12" defaultValue="#06b6d4" />
                    <input type="text" className="flex-1 bg-background border-y border-r border-border rounded-r px-3 py-2" defaultValue="#06b6d4" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gradient Type</label>
                <select className="w-full bg-background border border-border rounded px-3 py-2">
                  <option>Linear</option>
                  <option>Radial</option>
                  <option>Conic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Direction</label>
                <select className="w-full bg-background border border-border rounded px-3 py-2">
                  <option>To Right</option>
                  <option>To Left</option>
                  <option>To Bottom</option>
                  <option>To Top</option>
                  <option>To Bottom Right</option>
                  <option>To Bottom Left</option>
                  <option>To Top Right</option>
                  <option>To Top Left</option>
                </select>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <h4 className="font-medium mb-2">CSS Code</h4>
                <div className="font-mono text-sm p-3 bg-card rounded">
                  background: linear-gradient(to right, #4f46e5, #06b6d4);
                </div>
                <Button className="mt-3 w-full">Copy CSS</Button>
              </div>
            </div>
          )}
          
          {!['color-picker', 'gradient-generator'].includes(toolId || '') && (
            <div className="space-y-6">
              <div className="mb-6 text-center">
                <h3 className="text-xl font-medium mb-2">{tool.name}</h3>
                <p className="text-muted-foreground">{tool.description}</p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <h4 className="font-medium mb-3">Color Input</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Color</label>
                    <div className="flex">
                      <input type="color" className="h-[38px] bg-background border border-border rounded-l w-12" defaultValue="#3b82f6" />
                      <input type="text" className="flex-1 bg-background border-y border-r border-border rounded-r px-3 py-2" defaultValue="#3b82f6" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Format</label>
                    <select className="w-full bg-background border border-border rounded px-3 py-2">
                      <option>HEX</option>
                      <option>RGB</option>
                      <option>HSL</option>
                      <option>CMYK</option>
                    </select>
                  </div>
                </div>
                <Button className="mt-4">
                  {toolId === 'hex-to-rgb' ? 'Convert' : 
                   toolId === 'contrast-checker' ? 'Check Contrast' :
                   toolId === 'palette-generator' ? 'Generate Palette' : 'Process'}
                </Button>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <h4 className="font-medium mb-3">Result</h4>
                <div className="font-mono text-sm p-3 bg-card rounded">
                  {toolId === 'hex-to-rgb' ? 'RGB: rgb(59, 130, 246)' : 'Result will appear here'}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // For PDF & Document Tools
    if (tool?.category.id === 'pdf-document') {
      return (
        <div className="max-w-3xl mx-auto bg-card rounded-lg border border-border p-6">
          <div className="mb-6 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary">
                {tool.icon}
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">{tool.name}</h3>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
          
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-background">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-lg font-medium mb-2">Drag & Drop PDF{toolId === 'pdf-merger' ? 's' : ''} Here</p>
            <p className="text-sm text-muted-foreground mb-4">or</p>
            <Button>
              Choose File{toolId === 'pdf-merger' ? 's' : ''}
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              {toolId === 'pdf-to-word' ? 'Convert PDF to editable Word document' :
               toolId === 'pdf-merger' ? 'Select multiple PDFs to merge into a single file' :
               toolId === 'pdf-splitter' ? 'Split a PDF into multiple documents' :
               toolId === 'pdf-compressor' ? 'Reduce your PDF size while maintaining quality' :
               toolId === 'pdf-encryptor' ? 'Add password protection to your PDF' :
               'Process your PDF document'}
            </p>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Settings</h4>
            </div>
            <div className="bg-background rounded-md p-4 space-y-4">
              {toolId === 'pdf-to-word' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Output Format</label>
                  <select className="w-full bg-card border border-border rounded px-3 py-2">
                    <option>DOCX</option>
                    <option>DOC</option>
                    <option>RTF</option>
                    <option>TXT</option>
                  </select>
                </div>
              )}
              
              {toolId === 'pdf-merger' && (
                <div>
                  <label className="block text-sm font-medium mb-1">File Order</label>
                  <p className="text-sm text-muted-foreground">No files selected yet</p>
                </div>
              )}
              
              {toolId === 'pdf-splitter' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Split Method</label>
                  <select className="w-full bg-card border border-border rounded px-3 py-2 mb-3">
                    <option>By page range</option>
                    <option>Extract all pages</option>
                    <option>Split by bookmarks</option>
                  </select>
                  <label className="block text-sm font-medium mb-1">Page Range</label>
                  <input type="text" className="w-full bg-card border border-border rounded px-3 py-2" placeholder="e.g. 1-5, 8, 11-13" />
                </div>
              )}
              
              {toolId === 'pdf-compressor' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Compression Level</label>
                  <select className="w-full bg-card border border-border rounded px-3 py-2">
                    <option>Low - Better Quality</option>
                    <option>Medium - Balanced</option>
                    <option>High - Smaller Size</option>
                  </select>
                </div>
              )}
              
              {toolId === 'pdf-encryptor' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input type="password" className="w-full bg-card border border-border rounded px-3 py-2" placeholder="Enter password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input type="password" className="w-full bg-card border border-border rounded px-3 py-2" placeholder="Confirm password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Permissions</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="allow-print" className="mr-2" />
                        <label htmlFor="allow-print" className="text-sm">Allow printing</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="allow-copy" className="mr-2" />
                        <label htmlFor="allow-copy" className="text-sm">Allow copying text</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="allow-edit" className="mr-2" />
                        <label htmlFor="allow-edit" className="text-sm">Allow editing</label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button disabled>
              {toolId === 'pdf-to-word' ? 'Convert to Word' : 
               toolId === 'pdf-merger' ? 'Merge PDFs' :
               toolId === 'pdf-splitter' ? 'Split PDF' :
               toolId === 'pdf-compressor' ? 'Compress PDF' :
               toolId === 'pdf-encryptor' ? 'Encrypt PDF' : 'Process PDF'}
            </Button>
          </div>
        </div>
      );
    }
    
    // For SEO & Marketing Tools
    if (tool?.category.id === 'seo') {
      return (
        <div className="max-w-3xl mx-auto bg-card rounded-lg border border-border p-6">
          {toolId === 'keyword-generator' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Generate Keywords for Your Content</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Main Topic or Seed Keyword</label>
                  <input 
                    type="text" 
                    className="w-full bg-background border border-border rounded px-3 py-2" 
                    placeholder="e.g. digital marketing, yoga poses, coffee brewing"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Industry/Niche</label>
                  <select className="w-full bg-background border border-border rounded px-3 py-2">
                    <option>Select industry</option>
                    <option>E-commerce</option>
                    <option>Health & Fitness</option>
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Travel</option>
                    <option>Food & Cooking</option>
                    <option>Education</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1">Generate Keywords</Button>
                  <Button variant="outline">Clear</Button>
                </div>
              </div>
              
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="bg-secondary/30 p-3 border-b border-border">
                  <h4 className="font-medium">Generated Keywords</h4>
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground text-center py-8">
                    Enter a topic and generate keywords to get started
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {toolId === 'meta-tag-generator' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Create Optimized Meta Tags</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Page Title</label>
                  <input 
                    type="text" 
                    className="w-full bg-background border border-border rounded px-3 py-2" 
                    placeholder="Page Title | Brand Name"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Recommended length: 50-60 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Meta Description</label>
                  <textarea 
                    className="w-full bg-background border border-border rounded px-3 py-2 min-h-[100px]" 
                    placeholder="Brief description of your page content (150-160 characters)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Recommended length: 150-160 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Keywords (comma separated)</label>
                  <input 
                    type="text" 
                    className="w-full bg-background border border-border rounded px-3 py-2" 
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1">Generate Meta Tags</Button>
                  <Button variant="outline">Preview</Button>
                </div>
              </div>
              
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="bg-secondary/30 p-3 border-b border-border">
                  <h4 className="font-medium">Generated HTML</h4>
                </div>
                <div className="p-4 font-mono text-sm text-muted-foreground">
                  <pre>
                    &lt;title&gt;Page Title | Brand Name&lt;/title&gt;<br/>
                    &lt;meta name="description" content="Brief description of your page content (150-160 characters)"&gt;<br/>
                    &lt;meta name="keywords" content="keyword1, keyword2, keyword3"&gt;
                  </pre>
                  <Button size="sm" className="mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                    </svg>
                    Copy HTML
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {!['keyword-generator', 'meta-tag-generator'].includes(toolId || '') && (
            <div className="space-y-6">
              <div className="mb-6 text-center">
                <h3 className="text-xl font-medium mb-2">{tool.name}</h3>
                <p className="text-muted-foreground">{tool.description}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">URL or Text to Analyze</label>
                  <input 
                    type="text" 
                    className="w-full bg-background border border-border rounded px-3 py-2" 
                    placeholder="https://example.com or paste content"
                  />
                </div>
                <Button className="w-full">Analyze</Button>
              </div>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="bg-secondary/30 p-3 border-b border-border">
                  <h4 className="font-medium">Results</h4>
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground text-center py-8">
                    Enter a URL or text to analyze and get insights
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // For other tools, display a generic interface
    return (
      <div className="max-w-3xl mx-auto bg-card rounded-lg border border-border p-6">
        <div className="mb-6 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary">
              {tool.icon}
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">{tool.name}</h3>
          <p className="text-muted-foreground">{tool.description}</p>
        </div>
        
        <div className="p-6 bg-background rounded-lg mb-6">
          <h4 className="font-medium mb-4">Main Functionality</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {tool?.category.id === 'writing' ? 'Enter your text content' :
                 tool?.category.id === 'grammar-plagiarism' ? 'Paste your text for analysis' :
                 tool?.category.id === 'ai-automation' ? 'Enter your prompt or instructions' :
                 tool?.category.id === 'privacy-security' ? 'Password or security parameters' :
                 tool?.category.id === 'data-visualization' ? 'Data input' :
                 'Input'}
              </label>
              <textarea
                className="w-full min-h-[120px] p-3 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder={`Enter ${tool.name.toLowerCase()} input here...`}
              />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                {tool?.category.id === 'writing' ? 'Generate Content' :
                 tool?.category.id === 'grammar-plagiarism' ? 'Check Text' :
                 tool?.category.id === 'ai-automation' ? 'Generate' :
                 tool?.category.id === 'privacy-security' ? 'Generate/Secure' :
                 tool?.category.id === 'social-media' ? 'Create/Generate' :
                 tool?.category.id === 'email-communication' ? 'Process' :
                 tool?.category.id === 'data-visualization' ? 'Visualize' :
                 tool?.category.id === 'website-domain' ? 'Check/Verify' :
                 tool?.category.id === 'network-ip' ? 'Lookup' :
                 'Process'}
              </Button>
              <Button variant="outline">Reset</Button>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-background rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Results</h4>
            <Button size="sm" variant="outline" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
              Copy
            </Button>
          </div>
          <div className="text-center p-10 text-muted-foreground">
            <p>Your results will appear here</p>
            <p className="text-sm mt-2">Use the options above to get started</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="container mx-auto px-4 md:px-6 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <Link href="/" className="text-muted-foreground hover:text-primary transition flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </Link>
        
        <div className="flex flex-wrap items-start gap-4 mb-6">
          <div className={`w-16 h-16 flex items-center justify-center rounded-lg ${tool.category.color.bg} ${tool.category.color.text} flex-shrink-0`}>
            {tool.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold">{tool.name}</h1>
              <span className={`${tool.category.color.badge.bg} ${tool.category.color.badge.text} text-xs px-2 py-1 rounded-full`}>
                {tool.category.name}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 max-w-2xl">{tool.description}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="tool" className="mb-12">
        <TabsList>
          <TabsTrigger value="tool">Tool</TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>
        <TabsContent value="tool" className="pt-6">
          {renderToolInterface()}
        </TabsContent>
        <TabsContent value="info" className="pt-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-xl font-semibold mb-4">About this Tool</h3>
            <p className="text-muted-foreground mb-6">
              {tool.description} This tool is designed to help users quickly and efficiently complete tasks related to {tool.category.name.toLowerCase()}.
            </p>
            
            {tool.features && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Features:</h4>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex items-center text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              {tool.views}K views
            </div>
          </div>
        </TabsContent>
        <TabsContent value="help" className="pt-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-xl font-semibold mb-4">How to Use</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>Follow these steps to use the {tool.name}:</p>
              
              {toolId === 'json-formatter' ? (
                <ol className="list-decimal ml-5 space-y-2">
                  <li>Paste your JSON data into the input field.</li>
                  <li>Select your preferred indentation level from the dropdown.</li>
                  <li>Click the "Format" button to format your JSON.</li>
                  <li>If there are syntax errors, they will be displayed below the input field.</li>
                  <li>Copy the formatted result using the copy button.</li>
                </ol>
              ) : (
                <p>Detailed instructions for this tool will be available soon.</p>
              )}
              
              <div className="mt-6 p-4 bg-secondary/30 rounded-md">
                <h4 className="font-medium mb-2">Need help?</h4>
                <p className="text-sm">
                  If you have any questions or encounter issues, please <Link href="/contact" className="text-primary hover:underline">contact our support team</Link>.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-6">Related Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools
            .filter(t => t.category.id === tool.category.id && t.id !== tool.id)
            .slice(0, 4)
            .map(relatedTool => (
              <div key={relatedTool.id} className="flex items-center p-4 bg-card rounded-lg border border-border hover:border-primary transition">
                <div className={`w-10 h-10 ${relatedTool.category.color.bg} ${relatedTool.category.color.text} rounded-md flex items-center justify-center mr-3 flex-shrink-0`}>
                  {relatedTool.icon}
                </div>
                <div>
                  <Link href={`/tool/${relatedTool.id}`} className="font-medium hover:text-primary transition">
                    {relatedTool.name}
                  </Link>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">{relatedTool.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
