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
    // In memory storage - will be implemented with database
    console.log(`Tool visit recorded: ${toolId}`);
  }

  async getToolVisitCount(toolId: string): Promise<number> {
    // For now, return base tool views
    const tool = this.toolsData.find(t => t.id === toolId);
    return tool ? tool.views : 0;
  }

  private initializeData(): void {
    // Initialize with empty arrays - data comes from frontend for now
    this.categoriesData = [];
    this.toolsData = [];
  }
}

export const storage = new MemStorage();
