import { tools, categories, type Tool, type Category } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  getAllTools(): Promise<Tool[]>;
  getToolById(id: string): Promise<Tool | undefined>;
  getToolsByCategoryId(categoryId: string): Promise<Tool[]>;
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

  private initializeData(): void {
    // This would normally come from a database, but we'll initialize with a few items
    // The frontend will use its own data initially, but the structure is ready for an API
    this.categoriesData = categories;
    this.toolsData = tools;
  }
}

export const storage = new MemStorage();
