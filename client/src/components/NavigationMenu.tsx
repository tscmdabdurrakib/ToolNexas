import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  NavigationMenuViewport 
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { categories } from '@/data/categories';
import { tools } from '@/data/tools';
import { ChevronUp, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

export function MainNavigationMenu() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [_location, setLocation] = useLocation();

  // Show back to top button when scrolled down 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Group tools by category ID
  const toolsByCategory = tools.reduce((acc, tool) => {
    const categoryId = tool.category.id;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  return (
    <>
      {/* Desktop and Tablet Navigation */}
      <div className="hidden md:block">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="flex-wrap justify-center">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-background hover:bg-secondary">Browse Categories</NavigationMenuTrigger>
              <NavigationMenuContent className="z-50">
                <div className="grid w-[800px] grid-cols-3 gap-3 p-4">
                  {categories.map((category) => (
                    <NavigationMenuItem key={category.id} className="row-span-1">
                      <NavigationMenuTrigger className="mb-1 w-full justify-between">
                        <div className="flex items-center">
                          <span className={cn("mr-2", category.color.text)}>{category.icon}</span>
                          <span>{category.name}</span>
                        </div>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[250px] gap-2 p-4">
                          {toolsByCategory[category.id]?.map((tool) => (
                            <li key={tool.id}>
                              <button 
                                className="w-full block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-left"
                                onClick={() => {
                                  setLocation(`/tool/${tool.id}`);
                                }}
                              >
                                <div className="flex items-center">
                                  <span className="mr-2 text-primary">{tool.icon}</span>
                                  <span className="text-sm font-medium leading-none">{tool.name}</span>
                                </div>
                              </button>
                            </li>
                          ))}
                          <li className="mt-3">
                            <button
                              className="block w-full rounded-md bg-primary/10 px-4 py-2 text-center text-sm font-medium text-primary hover:bg-primary/20"
                              onClick={() => {
                                setLocation(`/category/${category.id}`);
                              }}
                            >
                              View All {category.name}
                            </button>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <button 
                onClick={() => setLocation("/popular")}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary focus:bg-secondary focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Popular Tools
              </button>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <button
                onClick={() => setLocation("/recent")}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary focus:bg-secondary focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Recent Tools
              </button>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport className="origin-top-center" />
        </NavigationMenu>
      </div>

      {/* Mobile Navigation - Simplified dropdown list with scrolling */}
      <div className="md:hidden">
        <div className="px-4 pb-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <MobileNav categories={categories.slice(0, 12)} toolsByCategory={toolsByCategory} />
          
          {/* Show "View All Categories" button at the bottom */}
          <div className="mt-4 mb-2">
            <button
              className="w-full rounded-md bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90"
              onClick={() => setLocation("/categories")}
            >
              View All 35 Categories
            </button>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button 
              size="icon" 
              className="rounded-full shadow-lg w-12 h-12 bg-primary hover:bg-primary/90"
              onClick={scrollToTop}
            >
              <ChevronUp className="h-6 w-6" />
              <span className="sr-only">Back to top</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Mobile navigation component with accordion style dropdowns
function MobileNav({ 
  categories, 
  toolsByCategory 
}: { 
  categories: typeof import('@/data/categories').categories, 
  toolsByCategory: Record<string, typeof import('@/data/tools').tools> 
}) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [_location, setLocation] = useLocation();
  
  return (
    <div className="space-y-2">
      {categories.map((category: import('@/data/categories').CategoryWithIcon) => (
        <div key={category.id} className="border rounded-lg overflow-hidden">
          <button
            className={cn(
              "flex items-center justify-between w-full p-3 text-left",
              openCategory === category.id ? `${category.color.bg} ${category.color.text}` : "bg-card"
            )}
            onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
          >
            <div className="flex items-center">
              <span className="mr-2">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </div>
            <ChevronUp
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                openCategory === category.id ? "rotate-0" : "rotate-180"
              )}
            />
          </button>
          
          <AnimatePresence>
            {openCategory === category.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-2 space-y-1.5 bg-card/50">
                  <div className="max-h-[35vh] overflow-y-auto custom-scrollbar pr-1">
                    <div className="grid grid-cols-1 gap-1.5">
                      {toolsByCategory[category.id]?.slice(0, 8)?.map((tool) => (
                        <button
                          key={tool.id}
                          className="flex items-center w-full p-2 rounded-md hover:bg-secondary/50 text-left"
                          onClick={() => {
                            setLocation(`/tool/${tool.id}`);
                            setOpenCategory(null);
                          }}
                        >
                          <span className="mr-2 text-primary flex-shrink-0">{tool.icon}</span>
                          <span className="text-sm truncate">{tool.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <button
                      className="w-full rounded-md bg-primary/10 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                      onClick={() => {
                        setLocation(`/category/${category.id}`);
                        setOpenCategory(null);
                      }}
                    >
                      View All {category.name} ({toolsByCategory[category.id]?.length || 0})
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}