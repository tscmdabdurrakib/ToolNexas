import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon, X as XIcon } from "lucide-react";
import { useTools } from "@/context/ToolsContext";
import { useLocation } from "wouter";

export function SearchBar() {
  const { tools, categories } = useTools();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
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
    
    // Get matches from tool names and descriptions
    const toolMatches = tools
      .filter(tool => 
        tool.name.toLowerCase().includes(lowerQuery) || 
        tool.description.toLowerCase().includes(lowerQuery)
      )
      .map(tool => tool.name);
    
    // Get matches from category names
    const categoryMatches = categories
      .filter(cat => 
        cat.name.toLowerCase().includes(lowerQuery) || 
        cat.description.toLowerCase().includes(lowerQuery)
      )
      .map(cat => cat.name);
    
    // Create smart suggestions based on user input
    let smartSuggestions: string[] = [];
    
    // Add direct matches first (deduplicated)
    const allMatches = [...toolMatches, ...categoryMatches];
    const uniqueMatches = allMatches.filter((item, pos) => allMatches.indexOf(item) === pos);
    smartSuggestions = uniqueMatches.slice(0, 3);
    
    // Add contextual suggestions
    if (lowerQuery.includes("convert")) {
      smartSuggestions.push("Unit Conversion Tools");
    }
    
    if (lowerQuery.includes("text") || lowerQuery.includes("string")) {
      smartSuggestions.push("Text & String Tools");
    }
    
    if (lowerQuery.includes("image") || lowerQuery.includes("picture")) {
      smartSuggestions.push("Image & Media Tools");
    }
    
    if (lowerQuery.includes("calc") || lowerQuery.includes("math")) {
      smartSuggestions.push("Calculation Tools");
    }
    
    if (lowerQuery.includes("seo") || lowerQuery.includes("marketing")) {
      smartSuggestions.push("SEO & Marketing Tools");
    }
    
    // Take max 5 unique suggestions
    const finalSuggestions = smartSuggestions.filter((item, pos) => 
      smartSuggestions.indexOf(item) === pos
    ).slice(0, 5);
    
    setSuggestions(finalSuggestions);
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

  function handleSuggestionClick(suggestion: string) {
    setQuery(suggestion);
    setLocation(`/search?q=${encodeURIComponent(suggestion)}`);
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
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {query && !suggestions.length && (
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