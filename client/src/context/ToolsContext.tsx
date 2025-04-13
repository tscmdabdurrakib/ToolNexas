import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { categories } from '@/data/categories';
import { tools } from '@/data/tools';
import { apiRequest } from '@/lib/queryClient';

// Export data for testing or direct use if needed
export { categories, tools };

interface ToolsContextType {
  categories: typeof categories;
  tools: typeof tools;
  popularTools: typeof tools;
  recentTools: typeof tools;
  isLoading: boolean;
  error: Error | null;
}

export const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export function ToolsProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [popularTools, setPopularTools] = useState(tools.slice(0, 4));
  const [recentTools, setRecentTools] = useState(tools.slice(4, 7));

  useEffect(() => {
    async function fetchToolData() {
      try {
        setIsLoading(true);
        
        // Fetch data from the server if needed
        /*
        const response = await apiRequest('GET', '/api/tools', undefined);
        const data = await response.json();
        setTools(data);
        */
        
        // For now, we'll just simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setIsLoading(false);
      }
    }

    fetchToolData();
  }, []);

  // Log for debugging
  console.log("ToolsProvider rendering with categories:", categories.length);
  
  const contextValue = {
    categories,
    tools,
    popularTools,
    recentTools,
    isLoading,
    error
  };
  
  return (
    <ToolsContext.Provider value={contextValue}>
      {children}
    </ToolsContext.Provider>
  );
}

export function useTools() {
  const context = useContext(ToolsContext);
  if (context === undefined) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
}
