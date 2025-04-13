import { Link } from "wouter";
import { CategoryWithIcon } from "@/data/categories";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: CategoryWithIcon;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { id, name, description, count, icon, color } = category;
  
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/category/${id}`}>
        <a className="block h-full">
          <div className="category-card h-full rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl transition cursor-pointer">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${color.bg} ${color.text}`}>
                  {icon}
                </div>
                <h3 className="text-lg font-semibold">{name}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{description}</p>
              <div className="flex justify-between items-center">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${color.badge.bg} ${color.badge.text}`}>
                  {count} Tools
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
}
