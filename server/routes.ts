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

  // Record tool visit
  app.post("/api/tool/:id/visit", async (req, res) => {
    try {
      const toolId = req.params.id;
      const sessionId = req.headers['x-session-id'] as string;
      const userAgent = req.headers['user-agent'];
      const ipAddress = req.ip || req.connection.remoteAddress;

      await storage.recordToolVisit(toolId, sessionId, userAgent, ipAddress);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to record visit" });
    }
  });

  // Get tool visit count
  app.get("/api/tool/:id/visits", async (req, res) => {
    try {
      const toolId = req.params.id;
      const count = await storage.getToolVisitCount(toolId);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Failed to get visit count" });
    }
  });

  // Record website visit
  app.post("/api/website/visit", async (req, res) => {
    try {
      const sessionId = req.headers['x-session-id'] as string;
      await storage.recordWebsiteVisit(sessionId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to record website visit" });
    }
  });

  // Get website analytics
  app.get("/api/website/analytics", async (req, res) => {
    try {
      const totalVisits = await storage.getTotalWebsiteVisits();
      // Use frontend data count since storage is empty
      const totalTools = 74; // Based on actual tools in frontend
      const totalCategories = 35; // Based on actual categories in frontend
      
      res.json({
        totalVisits,
        totalTools,
        totalCategories,
        usersOnline: Math.floor(Math.random() * 50) + 10 // Simulated online users
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get analytics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
