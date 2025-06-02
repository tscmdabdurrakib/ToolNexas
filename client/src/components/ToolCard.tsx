import { Link } from "wouter";
import { Tool } from "@/data/tools";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { id, name, description, category, icon, views, gradient } = tool;
  const [currentViews, setCurrentViews] = useState(views);

  // Fetch real visit count from backend
  const { data: visitData } = useQuery({
    queryKey: ['tool-visits', id],
    queryFn: async () => {
      const response = await fetch(`/api/tool/${id}/visits`);
      if (!response.ok) throw new Error('Failed to fetch visit count');
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 20000,
  });

  // Update current views when real data is available
  useEffect(() => {
    if (visitData?.count) {
      setCurrentViews(visitData.count);
    }
  }, [visitData]);

  // Format views count for display
  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${Math.floor(count / 1000)}K`;
    }
    return count.toString();
  };
  
  return (
    <Link to={`/tools/${id}`}>
      <motion.div 
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="block w-full h-full"
      >
        <div className="tool-card h-full w-full rounded-xl overflow-hidden bg-card border border-border hover:border-primary shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col">
          <div className={`h-32 sm:h-36 ${gradient} relative flex items-center justify-center flex-shrink-0`}>
            <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg bg-card shadow-sm text-primary">
              {icon}
            </div>
            <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${category.color.badge.bg} ${category.color.badge.text} text-xs px-2 py-1 rounded-full font-medium`}>
              {category.name}
            </div>
          </div>
          <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col">
            <h3 className="font-semibold text-sm sm:text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">{name}</h3>
            <p className="text-muted-foreground text-xs sm:text-sm mb-4 flex-1 line-clamp-3">{description}</p>
            <div className="flex justify-between items-center mt-auto">
              <motion.span 
                className="text-xs text-muted-foreground flex items-center"
                key={currentViews}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                {formatViews(currentViews)}
              </motion.span>
              <button 
                className="text-xs bg-primary/10 hover:bg-primary hover:text-white text-primary px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                Use
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
