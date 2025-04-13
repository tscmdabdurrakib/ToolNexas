import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Get all tools
  app.get("/api/tools", async (req, res) => {
    try {
      const tools = await storage.getAllTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tools" });
    }
  });

  // Get tools by category
  app.get("/api/category/:id/tools", async (req, res) => {
    try {
      const categoryId = req.params.id;
      const tools = await storage.getToolsByCategoryId(categoryId);
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tools for this category" });
    }
  });

  // Get a specific tool
  app.get("/api/tool/:id", async (req, res) => {
    try {
      const toolId = req.params.id;
      const tool = await storage.getToolById(toolId);
      
      if (!tool) {
        return res.status(404).json({ error: "Tool not found" });
      }
      
      res.json(tool);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tool" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
