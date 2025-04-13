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
  
  // Tool-specific state
  const [jsonInput, setJsonInput] = useState<string>('{\n  "example": "data",\n  "number": 42,\n  "nested": {\n    "array": [1, 2, 3],\n    "boolean": true\n  }\n}');
  const [formattedJson, setFormattedJson] = useState<string>('');
  const [jsonError, setJsonError] = useState<string>('');
  const [indentation, setIndentation] = useState<number>(2);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // For JSON formatter, initialize with formatted JSON
      if (toolId === 'json-formatter') {
        handleFormatJson();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toolId]);

  // Tool-specific functionality
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormattedJson(JSON.stringify(parsed, null, indentation));
      setJsonError('');
    } catch (err) {
      setJsonError(err instanceof Error ? err.message : 'Invalid JSON');
      setFormattedJson('');
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(formattedJson);
    // You could add a toast notification here
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

  // Render specific tool interfaces based on tool ID
  const renderToolInterface = () => {
    switch (toolId) {
      case 'json-formatter':
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
        
      default:
        return (
          <div className="text-center p-12 bg-card rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-4">Tool Interface Coming Soon</h3>
            <p className="text-muted-foreground">
              The interface for this tool is under development. Please check back later.
            </p>
          </div>
        );
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 md:px-6 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <Link href="/">
          <a className="text-muted-foreground hover:text-primary transition flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </a>
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
                  If you have any questions or encounter issues, please <Link href="/contact"><a className="text-primary hover:underline">contact our support team</a></Link>.
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
                  <Link href={`/tool/${relatedTool.id}`}>
                    <a className="font-medium hover:text-primary transition">{relatedTool.name}</a>
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
