import { Link } from "wouter";
import { Tool } from "@/data/tools";
import { motion } from "framer-motion";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { id, name, description, category, icon, views, gradient } = tool;
  
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="tool-card h-full rounded-xl overflow-hidden bg-card border border-border hover:border-primary shadow-sm transition group">
        <div className={`h-36 ${gradient} relative flex items-center justify-center`}>
          <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-card shadow-sm text-primary">
            {icon}
          </div>
          <div className={`absolute top-3 right-3 ${category.color.badge.bg} ${category.color.badge.text} text-xs px-2 py-1 rounded-full`}>
            {category.name}
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold mb-2 group-hover:text-primary transition">{name}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              {views}K views
            </span>
            <button 
              onClick={() => window.location.href = `/tool/${id}`}
              className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              Use Tool
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
