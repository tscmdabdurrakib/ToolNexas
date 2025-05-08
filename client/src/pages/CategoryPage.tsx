import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ToolCard } from "@/components/ToolCard";
import { useTools } from "@/context/ToolsContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:id");
  const { categories, tools } = useTools();
  const [isLoading, setIsLoading] = useState(true);
  
  const categoryId = params?.id;
  const category = categories.find(c => c.id === categoryId);
  const categoryTools = tools.filter(tool => tool.category.id === categoryId);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
          
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-14 h-14 flex items-center justify-center rounded-lg ${category.color.bg} ${category.color.text}`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{category.name}</h1>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categoryTools.length > 0 ? (
            categoryTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-4">No tools found in this category yet.</p>
              <Link href="/">
                <Button>Explore Other Categories</Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
