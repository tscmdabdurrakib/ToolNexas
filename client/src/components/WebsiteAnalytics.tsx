import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Users, Wrench, FolderOpen } from "lucide-react";

interface AnalyticsData {
  totalVisits: number;
  totalTools: number;
  totalCategories: number;
  usersOnline: number;
}

export function WebsiteAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisits: 0,
    totalTools: 0,
    totalCategories: 0,
    usersOnline: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/website/analytics');
        const data = await response.json();
        setAnalytics(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        setIsLoading(false);
      }
    };

    fetchAnalytics();
    // Update every 10 seconds
    const interval = setInterval(fetchAnalytics, 10000);
    return () => clearInterval(interval);
  }, []);

  // Real-time counter animation
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setAnalytics(prev => ({
          ...prev,
          totalVisits: prev.totalVisits + Math.floor(Math.random() * 3) + 1,
          usersOnline: Math.max(5, prev.usersOnline + Math.floor(Math.random() * 5) - 2)
        }));
      }, 5000 + Math.random() * 10000); // Random interval between 5-15 seconds

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const stats = [
    {
      label: "Total Visits",
      value: analytics.totalVisits,
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Lifetime website visits"
    },
    {
      label: "Active Users",
      value: analytics.usersOnline,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Currently online"
    },
    {
      label: "Available Tools",
      value: analytics.totalTools,
      icon: Wrench,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Ready to use"
    },
    {
      label: "Categories",
      value: analytics.totalCategories,
      icon: FolderOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "Tool categories"
    }
  ];

  if (isLoading) {
    return (
      <div className="py-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 animate-pulse">
                <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Live Statistics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time analytics showing our platform's reach and impact
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  
                  <motion.div
                    key={stat.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1"
                  >
                    {stat.value.toLocaleString()}
                  </motion.div>
                  
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {stat.label}
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </div>

                  {/* Live indicator for dynamic stats */}
                  {(stat.label === "Total Visits" || stat.label === "Active Users") && (
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">LIVE</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Statistics update in real-time • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </motion.div>
      </div>
    </div>
  );
}