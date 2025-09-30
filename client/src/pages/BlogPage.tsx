import { useState } from "react";
import { Link } from "wouter";
import { blogs } from "@/data/blogs";
import { motion } from "framer-motion";
import { Search, Mail, Bookmark, Share2 } from "lucide-react";

export default function BlogPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];
  const featuredBlog = blogs.find((b) => b.featured);
  const popularBlogs = blogs.slice(0, 4);

  const filteredBlogs =
    filter === "All" ? blogs.filter((b) => !b.featured) : blogs.filter((b) => b.category === filter && !b.featured);

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">ToolShaala Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Your source for the latest in tech, tools, and development.
          </p>
        </header>

        {/* Featured Post */}
        {featuredBlog && (
          <motion.div
            className="mb-12 rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/blog/${featuredBlog.id}`}>
              <div className="relative">
                <img src={featuredBlog.image} alt={featuredBlog.title} className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <span className="text-sm font-semibold bg-blue-500 px-3 py-1 rounded-full">{featuredBlog.category}</span>
                  <h2 className="text-4xl font-bold mt-4">{featuredBlog.title}</h2>
                  <p className="mt-2 text-gray-300">{featuredBlog.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <main className="lg:col-span-2">
            {/* Category Filters */}
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors border ${
                    filter === category
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  className="bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  // whileHover={{ scale: 1.02 }}
                >
                  <Link to={`/blog/${blog.id}`}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-blue-500">{blog.category}</span>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Bookmark className="w-4 h-4 hover:text-blue-500 cursor-pointer" />
                        <Share2 className="w-4 h-4 hover:text-blue-500 cursor-pointer" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      <Link to={`/blog/${blog.id}`} className="hover:text-blue-500">
                        {blog.title}
                      </Link>
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <img src={blog.author.avatar} alt={blog.author.name} className="w-6 h-6 rounded-full mr-2" />
                      <span>{blog.author.name}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.date}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.readingTime} min read</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:sticky top-24 self-start space-y-8">
            {/* Search Bar */}
            <div className="bg-transparent border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Search</h3>
              <div className="relative">
                <Input type="text" placeholder="Search articles..." className="pr-10" />
                <Search className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-transparent border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Popular Posts</h3>
              <ul className="space-y-4">
                {popularBlogs.map((blog) => (
                  <li key={blog.id} className="flex items-start space-x-4">
                    <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <Link to={`/blog/${blog.id}`} className="font-semibold hover:text-blue-500">
                        {blog.title}
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{blog.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Subscribe to our Newsletter</h3>
              <p className="text-sm mb-4">Get the latest articles and updates delivered to your inbox.</p>
              <div className="flex">
                <Input type="email" placeholder="Your email" className="rounded-r-none text-gray-800" />
                <button className="bg-gray-800 text-white px-4 rounded-r-md hover:bg-gray-700">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// A simple Input component to be used in the search bar and newsletter
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className}`}
  />
);