import { Link } from "wouter";
import { Tool } from "@/data/tools";
import { motion } from "framer-motion";
import { useFavorites } from "@/context/FavoritesContext";
import { Heart } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { id, name, description, category, icon } = tool;
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isToolFavorite = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isToolFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(tool);
    }
  };
  
  return (
    <Link to={`/tools/${id}`} className="group">
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="relative w-full h-full p-3 bg-transparent rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col"
      >
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
            {icon && <div className="w-6 h-6">{icon}</div>}
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${category.color.badge.bg} ${category.color.badge.text}`}>
            {category.name}
          </span>
        </div>
        <div className="flex-grow mt-4">
          <h3 className="font-bold text-sm text-gray-800 dark:text-white">{name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{description}</p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={handleFavoriteClick}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label={isToolFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                isToolFavorite ? "text-red-500 fill-current" : "text-gray-400 dark:text-gray-500"
              }`}
            />
          </button>
          <button className="text-xs font-semibold text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-3 py-1.5 rounded-md transition-colors duration-300">
            Use
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
