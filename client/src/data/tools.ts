import React from 'react';
import { categories } from './categories';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: typeof categories[0];
  icon: React.ReactNode;
  views: number;
  gradient: string;
  features?: string[];
  codePreview?: React.ReactNode;
}

function getCategoryById(id: string) {
  return categories.find(cat => cat.id === id) || categories[0];
}

// Helper function to create SVG icons
function createIcon(pathD: string) {
  return React.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      className: "h-6 w-6"
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: pathD
    })
  );
}

// Tool data
export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate and beautify your JSON code with this easy-to-use tool.',
    category: getCategoryById('developer'),
    icon: createIcon("M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"),
    views: 21.5,
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    features: ['Format JSON', 'Validate JSON', 'Copy to Clipboard'],
    codePreview: React.createElement(
      "div", 
      { className: "whitespace-pre" },
      React.createElement("span", { className: "text-purple-400" }, "{"),
      React.createElement("br"),
      "  ", React.createElement("span", { className: "text-green-400" }, "\"name\""), 
      React.createElement("span", { className: "text-gray-400" }, ":"), " ", 
      React.createElement("span", { className: "text-yellow-300" }, "\"JSON Formatter\""), 
      React.createElement("span", { className: "text-gray-400" }, ","), 
      React.createElement("br"),
      "  ", React.createElement("span", { className: "text-green-400" }, "\"version\""), 
      React.createElement("span", { className: "text-gray-400" }, ":"), " ", 
      React.createElement("span", { className: "text-blue-400" }, "1.0"), 
      React.createElement("span", { className: "text-gray-400" }, ","), 
      React.createElement("br"),
      "  ", React.createElement("span", { className: "text-green-400" }, "\"features\""), 
      React.createElement("span", { className: "text-gray-400" }, ":"), " ", 
      React.createElement("span", { className: "text-purple-400" }, "["), 
      React.createElement("br"),
      "    ", React.createElement("span", { className: "text-yellow-300" }, "\"Format JSON\""), 
      React.createElement("span", { className: "text-gray-400" }, ","), 
      React.createElement("br"),
      "    ", React.createElement("span", { className: "text-yellow-300" }, "\"Validate JSON\""), 
      React.createElement("span", { className: "text-gray-400" }, ","), 
      React.createElement("br"),
      "    ", React.createElement("span", { className: "text-yellow-300" }, "\"Copy to Clipboard\""), 
      React.createElement("br"),
      "  ", React.createElement("span", { className: "text-purple-400" }, "]"), 
      React.createElement("span", { className: "text-gray-400" }, ","), 
      React.createElement("br"),
      "  ", React.createElement("span", { className: "text-green-400" }, "\"settings\""), 
      React.createElement("span", { className: "text-gray-400" }, ":"), " ", 
      React.createElement("span", { className: "text-purple-400" }, "{"), 
      React.createElement("br"),
      "    ", React.createElement("span", { className: "text-green-400" }, "\"indentation\""), 
      React.createElement("span", { className: "text-gray-400" }, ":"), " ", 
      React.createElement("span", { className: "text-blue-400" }, "2"), 
      React.createElement("span", { className: "text-gray-400" }, ","), 
      React.createElement("br"),
      "    ", React.createElement("span", { className: "text-green-400" }, "\"theme\""), 
      React.createElement("span", { className: "text-gray-400" }, ":"), " ", 
      React.createElement("span", { className: "text-yellow-300" }, "\"dark\""), 
      React.createElement("br"),
      "  ", React.createElement("span", { className: "text-purple-400" }, "}"), 
      React.createElement("br"),
      React.createElement("span", { className: "text-purple-400" }, "}")
    )
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Advanced color picker with color schemes, palettes, and accessibility check.',
    category: getCategoryById('design'),
    icon: createIcon("M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"),
    views: 18.9,
    gradient: 'bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20',
    features: ['Color palettes', 'Contrast checker', 'Export to CSS/SCSS']
  },
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    description: 'Boost productivity with this customizable Pomodoro technique timer app.',
    category: getCategoryById('productivity'),
    icon: createIcon("M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"),
    views: 15.3,
    gradient: 'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20',
    features: ['Customizable time intervals', 'Task tracking', 'Break reminders']
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress and optimize your images while maintaining quality.',
    category: getCategoryById('file'),
    icon: createIcon("M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"),
    views: 24.7,
    gradient: 'bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20',
    features: ['Bulk compression', 'Multiple formats', 'Adjustable quality']
  },
  {
    id: 'grammar-checker',
    name: 'Grammar Checker',
    description: 'Check and correct grammar, spelling and punctuation errors.',
    category: getCategoryById('writing'),
    icon: createIcon("M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"),
    views: 17.2,
    gradient: 'bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20'
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert currencies with real-time exchange rates.',
    category: getCategoryById('finance'),
    icon: createIcon("M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"),
    views: 14.8,
    gradient: 'bg-gradient-to-b from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20'
  },
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Create SEO-friendly meta tags for your website.',
    category: getCategoryById('seo'),
    icon: createIcon("M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"),
    views: 12.9,
    gradient: 'bg-gradient-to-b from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate and track your Body Mass Index for health monitoring.',
    category: getCategoryById('health'),
    icon: createIcon("M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"),
    views: 9.7,
    gradient: 'bg-gradient-to-b from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20'
  }
];
