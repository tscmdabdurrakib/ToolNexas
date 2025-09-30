import { motion } from "framer-motion";
import { Link } from "wouter";
import { CategoryCard } from "@/components/CategoryCard";
import { ToolCard } from "@/components/ToolCard";
// import { FeaturedTool } from "@/components/FeaturedTool";
// import { RecentToolCard } from "@/components/RecentToolCard";
import { Newsletter } from "@/components/Newsletter";
// import { WebsiteAnalytics } from "@/components/WebsiteAnalytics";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { blogs } from "@/data/blogs";
// import { useWebsiteTracking } from "@/hooks/useWebsiteTracking";

export default function Home() {
  // Track website visit
  // useWebsiteTracking();
  
  // Use direct imports for now
  // const popularTools = tools.slice(0, 4);
  // const recentTools = tools.slice(4, 7);
  const latestBlogs = blogs.slice(0, 3);
  const isLoading = false;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      {/* Hero Section */}
      <motion.section 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ToolShaala</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Your comprehensive collection of 70+ professional tools across 35 categories. Convert, calculate, edit and optimize with ease.
        </p>

        <div className="mt-8 max-w-xl mx-auto">
          <SearchBar variant="input" />
        </div>
        
        <div className="flex justify-center mt-8 gap-4 flex-wrap">
          <Button 
            size="lg" 
            className="px-6" 
            onClick={() => {
              document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Tools
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
          </Button>
          <Link to="/recent">
            <Button 
              size="lg" 
              variant="outline" 
              className="px-6"
            >
              Recently Added
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section 
        id="categories" 
        className="mb-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
          </svg>
          Categories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-items-center">
          {categories.map((category) => (
            <motion.div key={category.id} variants={item} className="w-full max-w-sm">
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Most Popular Tools Section */}
      <motion.section
       className="mb-16"
       variants={container}
       initial="hidden"
       animate="show"
     >
       <div className="flex justify-between items-center mb-8">
         <h2 className="text-2xl font-bold flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
           </svg>
           Our Most Popular Tools
         </h2>
         <Link to="/popular">
           <div className="text-primary hover:text-primary/90 text-sm font-medium flex items-center cursor-pointer">
             View all
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
             </svg>
           </div>
         </Link>
       </div>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center">
         {tools.slice(0, 4).map((tool) => (
           <motion.div key={tool.id} variants={item} className="w-full max-w-sm">
             <ToolCard tool={tool} />
           </motion.div>
         ))}
       </div>
     </motion.section>

     {/* Social Proof / Trust-Building Section */}
     <motion.section
       className="mb-16 bg-card py-12 rounded-lg text-center shadow-sm"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: 0.2 }}
     >
       <h2 className="text-3xl font-bold text-card-foreground mb-4">Trusted by 20,000+ users worldwide</h2>
       <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
         "This platform has revolutionized the way I handle my daily tasks. Absolutely indispensable!" - Happy User
       </p>
     </motion.section>

     {/* How It Works Section */}
     <motion.section
       className="mb-16"
       variants={container}
       initial="hidden"
       animate="show"
     >
       <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <motion.div variants={item} className="flex flex-col items-center text-center p-6 rounded-lg shadow-sm border">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
           <h3 className="text-xl font-semibold mb-2">1. Find Your Tool</h3>
           <p className="text-muted-foreground">Browse our extensive collection or use the search bar to find exactly what you need.</p>
         </motion.div>
         <motion.div variants={item} className="flex flex-col items-center text-center p-6 rounded-lg shadow-sm border">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 00-2 2v3a2 2 0 002 2h4a2 2 0 002-2V8a2 2 0 00-2-2m-2 0h-2m-6 0H6a2 2 0 00-2 2v3a2 2 0 002 2h4m-6 0h6m-6 0v4a2 2 0 002 2h2a2 2 0 002-2v-4m-6 0H6a2 2 0 00-2 2v4a2 2 0 002 2h2m-2 0h6" />
           </svg>
           <h3 className="text-xl font-semibold mb-2">2. Process Your File</h3>
           <p className="text-muted-foreground">Upload your file, input your data, and let our tools do the heavy lifting.</p>
         </motion.div>
         <motion.div variants={item} className="flex flex-col items-center text-center p-6 rounded-lg shadow-sm border">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           <h3 className="text-xl font-semibold mb-2">3. Get Instant Results</h3>
           <p className="text-muted-foreground">Download your processed files or view your results instantly.</p>
         </motion.div>
       </div>
     </motion.section>

     {/* Blog / Articles Section */}
     <motion.section
       className="mb-16"
       variants={container}
       initial="hidden"
       animate="show"
     >
       <div className="flex justify-between items-center mb-8">
         <h2 className="text-2xl font-bold">From Our Blog</h2>
         <Link to="/blog">
           <div className="text-primary hover:text-primary/90 text-sm font-medium flex items-center cursor-pointer">
             View all blog
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
             </svg>
           </div>
         </Link>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {latestBlogs.map((blog) => (
           <motion.div key={blog.id} variants={item} className="border rounded-lg overflow-hidden shadow-sm">
             <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
             <div className="p-4">
               <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
               <p className="text-muted-foreground text-sm">{blog.description}</p>
               <Link to={`/blog/${blog.id}`} className="text-primary hover:underline mt-2 inline-block">Read More</Link>
             </div>
           </motion.div>
         ))}
       </div>
     </motion.section>
     
     {/* Newsletter Section */}
     <motion.section
       className="mb-16"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: 0.3 }}
     >
       <Newsletter />
     </motion.section>
   </main>
 );
}
