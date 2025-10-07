import React, { useState, useEffect, lazy, Suspense } from "react";
import { useRoute, Link } from "wouter";
import { useTools } from "@/context/ToolsContext";
import { Button } from "@/components/ui/button";

// ⚡ ToolCard lazy load
const ToolCard = lazy(() => import('@/components/ToolCard').then(module => ({ default: module.ToolCard })));

export default function CategoryPage({ params }: { params?: { id?: string } }) {
  const [, routeParams] = useRoute("/category/:id");
  const effectiveParams = params || routeParams;

  const { categories = [], tools = [], isLoading: contextLoading } =
    useTools() || { categories: [], tools: [], isLoading: true };

  const categoryId = effectiveParams?.id;
  const category = categories.find((c: any) => c.id === categoryId);
  const categoryTools = tools.filter((tool: any) => tool.category.id === categoryId);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The category you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="p-0 h-auto mb-4" asChild>
            <div className="text-muted-foreground hover:text-primary transition flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back to Home
            </div>
          </Button>
        </Link>

        <div className="flex items-center space-x-4 mb-4">
          <div
            className={`w-14 h-14 flex items-center justify-center rounded-lg ${category.color.bg} ${category.color.text}`}
          >
            {category.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>
      </div>

      {/* ✅ Suspense এর ভেতরে lazy ToolCard render */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-items-center">
        {categoryTools.length > 0 ? (
          categoryTools.map((tool: any) => (
            <Suspense
              key={tool.id}
              fallback={<div className="w-full h-32 bg-muted animate-pulse rounded-lg" />}
            >
              <div className="w-full">
                <ToolCard tool={tool} />
              </div>
            </Suspense>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground mb-4">
              No tools found in this category yet.
            </p>
            <Link href="/">
              <Button>Explore Other Categories</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
