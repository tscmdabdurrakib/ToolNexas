import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon, X as XIcon } from "lucide-react";
import { useTools } from "@/context/ToolsContext";
import { useLocation } from "wouter";
import { Tool } from "@/data/tools";
import { CategoryWithIcon } from "@/data/categories";

interface Suggestion {
  text: string;
  type: "tool" | "category" | "general";
  id?: string;
}

export function SearchBar() {
  const { tools, categories } = useTools();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();

  // Generate dynamic suggestions based on user input
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const newSuggestions: Suggestion[] = [];
    
    // Find matching tools
    const matchedTools = tools.filter(tool => 
      tool.name.toLowerCase().includes(lowerQuery) || 
      tool.description.toLowerCase().includes(lowerQuery)
    );
    
    // Add top 2 tool matches
    matchedTools.slice(0, 2).forEach(tool => {
      newSuggestions.push({
        text: tool.name,
        type: "tool",
        id: tool.id
      });
    });
    
    // Find matching categories
    const matchedCategories = categories.filter(cat => 
      cat.name.toLowerCase().includes(lowerQuery) || 
      cat.description.toLowerCase().includes(lowerQuery)
    );
    
    // Add top 2 category matches
    matchedCategories.slice(0, 2).forEach(category => {
      newSuggestions.push({
        text: category.name,
        type: "category",
        id: category.id
      });
    });
    
    // Add contextual suggestions
    if (matchedTools.length === 0 && matchedCategories.length === 0) {
      // Only add these if we don't have direct matches
      if (lowerQuery.includes("convert")) {
        const category = categories.find(c => c.name.toLowerCase().includes("conversion"));
        newSuggestions.push({
          text: "Unit Conversion Tools",
          type: "general",
          id: category?.id
        });
      }
      
      if (lowerQuery.includes("text") || lowerQuery.includes("string")) {
        const category = categories.find(c => c.name.toLowerCase().includes("text"));
        newSuggestions.push({
          text: "Text & String Tools",
          type: "general",
          id: category?.id
        });
      }
      
      if (lowerQuery.includes("image") || lowerQuery.includes("picture")) {
        const category = categories.find(c => c.name.toLowerCase().includes("image"));
        newSuggestions.push({
          text: "Image & Media Tools",
          type: "general",
          id: category?.id
        });
      }
    }
    
    // Always add a general search suggestion
    newSuggestions.push({
      text: `Search for "${query}"`,
      type: "general"
    });
    
    setSuggestions(newSuggestions);
  }, [query, tools, categories]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function handleSearch() {
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  function handleSuggestionClick(suggestion: Suggestion) {
    if (suggestion.type === "tool" && suggestion.id) {
      // Navigate directly to the tool
      setLocation(`/tool/${suggestion.id}`);
    } else if (suggestion.type === "category" && suggestion.id) {
      // Navigate directly to the category
      setLocation(`/category/${suggestion.id}`);
    } else {
      // General search - show all results
      const searchQuery = suggestion.text === `Search for "${query}"` ? query : suggestion.text;
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted px-3 py-2 rounded-md transition-colors"
      >
        <SearchIcon className="h-4 w-4 mr-2" />
        <span>Search tools...</span>
      </button>

      {isOpen && (
        <div className="absolute top-0 left-0 w-72 sm:w-96 bg-card shadow-xl rounded-lg border border-border z-50 overflow-hidden">
          <div className="flex items-center p-3 border-b border-border">
            <SearchIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for tools..."
              className="flex-1 bg-transparent border-none outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs text-muted-foreground px-2 py-1">Suggestions</div>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-muted rounded-md text-sm transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span>{suggestion.text}</span>
                      {suggestion.type === "tool" && (
                        <span className="ml-2 text-xs text-muted-foreground">(Tool)</span>
                      )}
                      {suggestion.type === "category" && (
                        <span className="ml-2 text-xs text-muted-foreground">(Category)</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {query && suggestions.length === 0 && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No results found for "{query}"
            </div>
          )}
          
          {!query && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              Type to search for tools and categories
            </div>
          )}
        </div>
      )}
    </div>
  );
}