import { Button } from "@/components/ui/button";

// Very simple Home page for testing mobile menu
export default function Home() {
  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">ToolHub</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Temporary placeholder page while we fix the context provider
        </p>
        
        <Button>Test Button</Button>
      </div>
    </main>
  );
}
