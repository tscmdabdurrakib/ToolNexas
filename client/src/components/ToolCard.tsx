import React from "react";
import { Link } from "wouter";
import { Tool } from "@/data/tools";
import { motion } from "framer-motion";
import { useFavorites } from "@/context/FavoritesContext";
import { Heart } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

const ToolCardComponent = ({ tool }: ToolCardProps) => {
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
    <Link to={`/tools/${id}`} className="block h-full w-full">
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="h-full w-full rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col relative cursor-pointer"
      >
        {/* Favorite Heart Icon - Top Right */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors duration-200"
          aria-label={isToolFavorite ? "Remove from favorites" : "Add to favorites"}
          data-testid={`favorite-${id}`}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${
              isToolFavorite ? "text-red-500 fill-current" : "text-gray-400 dark:text-gray-500"
            }`}
          />
        </button>

        <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
          {/* Icon and Title */}
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-5">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg ${category.color.bg} ${category.color.text} flex-shrink-0`}
            >
              {icon}
            </div>
            <h3 className="text-base sm:text-lg font-semibold line-clamp-2 flex-1 pr-6">{name}</h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-xs sm:text-sm mb-4 flex-1 line-clamp-3">{description}</p>

          {/* Category Badge and Arrow */}
          <div className="flex justify-between items-center mt-auto">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${category.color.badge.bg} ${category.color.badge.text}`}
            >
              {category.name}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const ToolCard = React.memo(ToolCardComponent);
