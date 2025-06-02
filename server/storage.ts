import { tools, categories, type Tool, type Category } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  getAllTools(): Promise<Tool[]>;
  getToolById(id: string): Promise<Tool | undefined>;
  getToolsByCategoryId(categoryId: string): Promise<Tool[]>;
  recordToolVisit(toolId: string, sessionId?: string, userAgent?: string, ipAddress?: string): Promise<void>;
  getToolVisitCount(toolId: string): Promise<number>;
}

export class MemStorage implements IStorage {
  private categoriesData: Category[];
  private toolsData: Tool[];
  private visitCounts: Map<string, number> = new Map();

  constructor() {
    this.categoriesData = [];
    this.toolsData = [];
    
    // Initialize with some data
    this.initializeData();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoriesData;
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categoriesData.find(category => category.id === id);
  }

  async getAllTools(): Promise<Tool[]> {
    return this.toolsData;
  }

  async getToolById(id: string): Promise<Tool | undefined> {
    return this.toolsData.find(tool => tool.id === id);
  }

  async getToolsByCategoryId(categoryId: string): Promise<Tool[]> {
    return this.toolsData.filter(tool => tool.categoryId === categoryId);
  }

  async recordToolVisit(toolId: string, sessionId?: string, userAgent?: string, ipAddress?: string): Promise<void> {
    const currentCount = this.visitCounts.get(toolId) || 0;
    this.visitCounts.set(toolId, currentCount + 1);
    console.log(`Tool visit recorded: ${toolId} - Total visits: ${currentCount + 1}`);
  }

  async getToolVisitCount(toolId: string): Promise<number> {
    // Return only the actual visit count from tracking, not base views
    return this.visitCounts.get(toolId) || 0;
  }

  private initializeData(): void {
    // Initialize with empty arrays - data comes from frontend for now
    this.categoriesData = [];
    this.toolsData = [];
  }
}

export const storage = new MemStorage();
