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
  // 1. Unit & Conversion Tools
  {
    id: 'length-converter',
    name: 'Length Converter',
    description: 'Convert between various units of length and distance',
    category: getCategoryById('unit-conversion'),
    icon: createIcon("M6 6V5a3 3 0 013-3h2.25M6 6h12M6 6v1a3 3 0 01-3 3m12-3v1a3 3 0 01-3 3M3 10v5a2 2 0 002 2h3.75M3 10h1m8-3v5a2 2 0 01-2 2H5.75m8 0h3.75a2 2 0 002-2v-5"),
    views: 8965,
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      'Convert between metric and imperial units',
      'Support for over 20 different length units',
      'Real-time conversion as you type',
      'History of recent conversions',
      'Precision control up to 10 decimal places',
      'Offline functionality'
    ]
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    description: 'Convert between different units of weight and mass',
    category: getCategoryById('unit-conversion'),
    icon: createIcon("M3 4.5h10A2.5 2.5 0 0115.5 7v10a2.5 2.5 0 01-2.5 2.5H3A2.5 2.5 0 01.5 17V7A2.5 2.5 0 013 4.5zm0 6v1.5m0 3v1.5m3-6v1.5m0 3v1.5m3-6v1.5m0 3v1.5m3-6v1.5m0 3v1.5m-9-9h1.5m3 0h1.5m3 0h1.5m3 0h7.5a2.5 2.5 0 012.5 2.5v10a2.5 2.5 0 01-2.5 2.5H16"),
    views: 7845,
    gradient: 'from-violet-500 to-purple-500',
    features: [
      'Convert between grams, kilograms, pounds, ounces, and more',
      'Support for traditional units like stone and ton',
      'Batch conversion for multiple values at once',
      'Save favorite conversion pairs',
      'Formula explanation for educational purposes',
      'Copy results with a single click'
    ]
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin temperature scales',
    category: getCategoryById('unit-conversion'),
    icon: createIcon("M15.75 15.75V18m-7.5-10.5H4.5m6.75 6.75v-3m3 3h.75m-3.75 3h-3M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"),
    views: 9578,
    gradient: 'from-red-500 to-orange-500',
    features: [
      'Convert between Celsius, Fahrenheit, and Kelvin',
      'Real-time bidirectional conversion',
      'Visual temperature scale comparison',
      'Temperature history by location (with weather integration)',
      'Cooking temperature reference guide',
      'Temperature facts and trivia'
    ]
  },
  {
    id: 'area-converter',
    name: 'Area Converter',
    description: 'Convert between square meters, acres, hectares and more',
    category: getCategoryById('unit-conversion'),
    icon: createIcon("M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"),
    views: 6320,
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'Convert between 30+ area units',
      'Special tools for land measurement',
      'Real estate specific conversions',
      'Visual size comparisons',
      'Calculate area from dimensions',
      'Land price calculator integration'
    ]
  },
  {
    id: 'volume-converter',
    name: 'Volume Converter',
    description: 'Convert between liters, gallons, cubic meters and more',
    category: getCategoryById('unit-conversion'),
    icon: createIcon("M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"),
    views: 5490,
    gradient: 'from-blue-500 to-indigo-500',
    features: [
      'Convert between fluid ounces, gallons, liters, and more',
      'Specialized for cooking measurements',
      'Tank volume calculator',
      'Fuel efficiency converter (MPG to L/100km)',
      'Chemistry specific volume units',
      'Visual container size comparisons'
    ]
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Live currency exchange rates with historical data',
    category: getCategoryById('unit-conversion'),
    icon: createIcon("M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"),
    views: 15670,
    gradient: 'from-yellow-500 to-amber-500',
    features: [
      'Real-time exchange rates for 170+ currencies',
      'Historical rate charts and trends',
      'Currency pair watchlist',
      'Rate alerts for target exchanges',
      'Offline mode with cached rates',
      'Commission calculator for money transfers'
    ]
  },
  
  // 2. Calculation Tools
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, weeks, and days',
    category: getCategoryById('calculation'),
    icon: createIcon("M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"),
    views: 8230,
    gradient: 'from-pink-500 to-rose-500',
    features: [
      'Calculate age down to seconds',
      'Find days until next birthday',
      'Calculate age on other planets',
      'Generate personalized age timeline',
      'Discover celebrities sharing your birthdate',
      'Save important dates with notifications'
    ]
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate loan payments, interest, and amortization schedules',
    category: getCategoryById('calculation'),
    icon: createIcon("M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 01-.75.75h-.75m-6-1.5H2.25m19.5 0h-6.75"),
    views: 11320,
    gradient: 'from-cyan-500 to-blue-500',
    features: [
      'Calculate monthly payments for any loan',
      'Generate detailed amortization schedules',
      'Compare multiple loan scenarios',
      'Early payoff calculator',
      'Export results to PDF or Excel',
      'Mortgage, auto, and personal loan presets'
    ]
  },
  {
    id: 'emi-calculator',
    name: 'EMI Calculator',
    description: 'Calculate Equated Monthly Installments for loans with interest',
    category: getCategoryById('calculation'),
    icon: createIcon("M6 6h.008v.008H6V6zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 6h.008v.008H12V6zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM18 6h.008v.008H18V6zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM6 12h.008v.008H6V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 12h.008v.008H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM18 12h.008v.008H18V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM6 18h.008v.008H6V18zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 18h.008v.008H12V18zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM18 18h.008v.008H18V18zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"),
    views: 9845,
    gradient: 'from-indigo-500 to-purple-500',
    features: [
      'Calculate EMIs for home, car, and personal loans',
      'Adjustable interest rates and loan terms',
      'Principal vs. interest breakdowns',
      'Payment schedule with calendar integration',
      'Loan affordability analysis',
      'Compare banks and their EMI offers'
    ]
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index and get health insights',
    category: getCategoryById('calculation'),
    icon: createIcon("M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"),
    views: 10478,
    gradient: 'from-green-500 to-teal-500',
    features: [
      'Calculate BMI with metric or imperial units',
      'Visual weight range guide',
      'Personalized health recommendations',
      'Track BMI changes over time',
      'Age and gender adjusted calculations',
      'Body fat percentage estimator'
    ]
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate sale prices, discounts, and savings',
    category: getCategoryById('calculation'),
    icon: createIcon("M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"),
    views: 7320,
    gradient: 'from-orange-500 to-amber-500',
    features: [
      'Calculate final price after discount',
      'Find the discount percentage from original and sale prices',
      'Compare multiple discounts',
      'Bulk discount calculations',
      'Tax calculations on discounted prices',
      'Split bill calculator with discounts'
    ]
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, decreases, and more',
    category: getCategoryById('calculation'),
    icon: createIcon("M15.75 15.75V18m-7.5-10.5H4.5m6.75 6.75v-3m3 3h.75m-3.75 3h-3M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"),
    views: 8925,
    gradient: 'from-red-500 to-orange-500',
    features: [
      'Calculate percentages of numbers',
      'Find percentage increases and decreases',
      'Calculate tips and commissions',
      'Percent change calculator',
      'Percentage point difference calculator',
      'Proportional division of values'
    ]
  },
  
  // 3. Text & String Tools
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between uppercase, lowercase, title case, and more',
    category: getCategoryById('text-string'),
    icon: createIcon("M19 15V10.82a3 3 0 00-1.5-2.6l-9-5.4a3 3 0 00-3 0l-9 5.4A3 3 0 003 10.82V21a3 3 0 003 3h8M11 21l3-1.5m0 0L17 16m-3 3.5L17 22"),
    views: 9520,
    gradient: 'from-blue-500 to-indigo-500',
    features: [
      'Convert to UPPERCASE, lowercase, Title Case, Sentence case',
      'Alternate case and inVeRsE case options',
      'camelCase, PascalCase, snake_case, and kebab-case',
      'Preserve special characters option',
      'Batch processing for multiple texts',
      'Copy to clipboard with one click'
    ]
  },
  {
    id: 'text-repeater',
    name: 'Text Repeater',
    description: 'Repeat text with custom separators and patterns',
    category: getCategoryById('text-string'),
    icon: createIcon("M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"),
    views: 4820,
    gradient: 'from-violet-500 to-purple-500',
    features: [
      'Repeat text a specified number of times',
      'Add custom separators (spaces, newlines, commas)',
      'Create patterns and sequences',
      'Generate dummy text for testing',
      'Preview output as you type',
      'Character and word count tracking'
    ]
  },
  {
    id: 'line-break-remover',
    name: 'Line Break Remover',
    description: 'Remove unwanted line breaks from text while preserving paragraphs',
    category: getCategoryById('text-string'),
    icon: createIcon("M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"),
    views: 5420,
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'Remove single line breaks while preserving paragraphs',
      'Consolidate multiple blank lines',
      'Convert between different line ending types',
      'Optional paragraph indentation',
      'Preserve list formatting option',
      'Handle copied text from PDFs and ebooks'
    ]
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    description: 'Count characters, words, sentences, and paragraphs in your text',
    category: getCategoryById('text-string'),
    icon: createIcon("M15.75 15.75V18m-7.5-10.5H4.5m6.75 6.75v-3m3 3h.75m-3.75 3h-3M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"),
    views: 7840,
    gradient: 'from-cyan-500 to-blue-500',
    features: [
      'Count characters (with and without spaces)',
      'Word, sentence, and paragraph counting',
      'Reading time estimation',
      'Keyword density analysis',
      'Social media character limit checker',
      'Text statistics and readability scores'
    ]
  },
  {
    id: 'string-reverser',
    name: 'String Reverser',
    description: 'Reverse text characters, words, or lines',
    category: getCategoryById('text-string'),
    icon: createIcon("M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"),
    views: 3760,
    gradient: 'from-pink-500 to-rose-500',
    features: [
      'Reverse text character by character',
      'Reverse words while keeping word order',
      'Reverse lines while maintaining line order',
      'Generate palindrome text',
      'Analyze reversed text statistics',
      'Mirrored text generator'
    ]
  },
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
