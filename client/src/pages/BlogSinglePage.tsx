import { Link, useParams } from "wouter";
import { blogs } from "@/data/blogs";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Bookmark, Share2 } from "lucide-react";

export default function BlogSinglePage() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id || ""));

  if (!blog) {
    return (
      <div className="text-center py-20 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Blog post not found.</h1>
        <Link to="/blog">
          <a className="mt-4 inline-flex items-center text-blue-500 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <header className="max-w-4xl mx-auto text-center mb-12">
            <Link to="/blog">
              <a className="inline-flex items-center text-blue-500 hover:underline mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </a>
            </Link>
            <p className="text-blue-500 font-semibold">{blog.category}</p>
            <h1 className="text-5xl font-extrabold mt-2 text-gray-900 dark:text-white">{blog.title}</h1>
            <div className="flex justify-center items-center space-x-6 mt-6 text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <img src={blog.author.avatar} alt={blog.author.name} className="w-8 h-8 rounded-full" />
                <span>{blog.author.name}</span>
              </div>
              <span>•</span>
              <span>{blog.date}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{blog.readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="max-w-5xl mx-auto mb-12 rounded-lg overflow-hidden shadow-xl">
            <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover" />
          </div>

          {/* Content and Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-5xl mx-auto">
            {/* Floating Sidebar */}
            <aside className="lg:col-span-1 lg:sticky top-24 self-start hidden lg:block">
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center py-2 px-4 rounded-full bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow">
                  <Bookmark className="w-5 h-5 mr-2" /> Save
                </button>
                <button className="w-full flex items-center justify-center py-2 px-4 rounded-full bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow">
                  <Share2 className="w-5 h-5 mr-2" /> Share
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              <div
                className="prose dark:prose-invert max-w-none text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </main>
          </div>
        </motion.div>
      </div>
    </div>
  );
}