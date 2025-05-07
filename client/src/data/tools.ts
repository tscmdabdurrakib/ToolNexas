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
    views: 9721,
    gradient: 'from-red-500 to-orange-500'
  },

  // 4. File Management Tools
  {
    id: 'file-converter',
    name: 'File Converter',
    description: 'Convert files between different formats with ease',
    category: getCategoryById('file-management'),
    icon: createIcon("M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"),
    views: 12350,
    gradient: 'from-violet-500 to-purple-500',
    features: [
      'Convert between PDF, DOC, DOCX, JPG, PNG, and more',
      'Batch conversion for multiple files',
      'High-quality output preservation',
      'OCR for scanned documents',
      'Password protection options for output files',
      'Cloud storage integration'
    ]
  },
  {
    id: 'file-splitter',
    name: 'File Splitter',
    description: 'Split large files into smaller, manageable chunks',
    category: getCategoryById('file-management'),
    icon: createIcon("M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"),
    views: 5240,
    gradient: 'from-pink-500 to-rose-500',
    features: [
      'Split files by size, page count, or custom ranges',
      'Split PDF documents by pages',
      'Split archives (ZIP, RAR)',
      'Split video and audio files',
      'Join files back together',
      'Data integrity verification'
    ]
  },
  {
    id: 'file-merger',
    name: 'File Merger',
    description: 'Combine multiple files into a single file',
    category: getCategoryById('file-management'),
    icon: createIcon("M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"),
    views: 6780,
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      'Merge PDF files with customizable page order',
      'Combine image files (JPG, PNG, etc.)',
      'Join text and CSV files',
      'Merge audio files into a single track',
      'Add custom page numbers and bookmarks',
      'Preview merged output before saving'
    ]
  },
  {
    id: 'file-compressor',
    name: 'File Compressor',
    description: 'Compress files to reduce size while maintaining quality',
    category: getCategoryById('file-management'),
    icon: createIcon("M6 6h.008v.008H6V6zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 6h.008v.008H12V6zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM18 6h.008v.008H18V6zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM6 12h.008v.008H6V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 12h.008v.008H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM18 12h.008v.008H18V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM6 18h.008v.008H6V18zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 18h.008v.008H12V18zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM18 18h.008v.008H18V18zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"),
    views: 8420,
    gradient: 'from-green-500 to-teal-500',
    features: [
      'Compress files using various algorithms (ZIP, 7z, TAR, RAR)',
      'Image, audio, and video compression',
      'PDF file size reduction',
      'Batch compression of multiple files',
      'Customizable compression levels',
      'Password protection and encryption'
    ]
  },
  {
    id: 'file-encryptor',
    name: 'File Encryptor',
    description: 'Encrypt files with strong passwords for secure sharing',
    category: getCategoryById('file-management'),
    icon: createIcon("M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"),
    views: 5870,
    gradient: 'from-amber-500 to-orange-500',
    features: [
      'AES-256 encryption for files and folders',
      'Password-protected archives',
      'Secure file sharing with expiring links',
      'File integrity verification',
      'Multiple encryption algorithms',
      'Self-decrypting archives for recipients without the tool'
    ]
  },
  
  // 5. Image & Media Tools
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize and optimize images for web, social media, or print',
    category: getCategoryById('image-media'),
    icon: createIcon("M6.75 3.5v1m0 7.25v1m0 7.25v1m0-14.5h7.5m-7.5 7.25h7.5m-7.5 7.25h7.5M4 6.75h-.25a2 2 0 01-2-2V4.5a2 2 0 012-2H4v10.5a2 2 0 01-2 2H.5a2 2 0 01-2-2v-.25"),
    views: 15780,
    gradient: 'from-indigo-500 to-blue-500',
    features: [
      'Resize images with preserved aspect ratio',
      'Batch resize multiple images',
      'Crop and canvas adjustments',
      'Optimize for web with compression settings',
      'Social media platform presets',
      'Custom DPI for print output'
    ]
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images to reduce file size while maintaining quality',
    category: getCategoryById('image-media'),
    icon: createIcon("M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"),
    views: 13650,
    gradient: 'from-red-500 to-pink-500',
    features: [
      'Smart JPEG and PNG compression',
      'WebP conversion for modern browsers',
      'Bulk image compression',
      'Adjustable quality settings',
      'Before/after comparison',
      'Optimize images for specific platforms'
    ]
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    description: 'Crop and adjust images with precision tools',
    category: getCategoryById('image-media'),
    icon: createIcon("M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"),
    views: 9120,
    gradient: 'from-cyan-500 to-blue-500',
    features: [
      'Crop with free-form or aspect ratio constraints',
      'Rotate and flip images',
      'Advanced selection tools',
      'Crop multiple images at once',
      'Smart object detection for automatic cropping',
      'Instagram, Twitter, and Facebook presets'
    ]
  },
  {
    id: 'image-watermarker',
    name: 'Image Watermarker',
    description: 'Add custom text or image watermarks to protect your work',
    category: getCategoryById('image-media'),
    icon: createIcon("M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"),
    views: 6350,
    gradient: 'from-emerald-500 to-green-500',
    features: [
      'Add text watermarks with custom fonts and opacity',
      'Use image or logo watermarks',
      'Batch watermark multiple images',
      'Adjustable position, rotation, and size',
      'Mosaic and blur watermarking',
      'Save watermark templates for future use'
    ]
  },
  {
    id: 'image-ocr',
    name: 'Image OCR',
    description: 'Extract text from images with Optical Character Recognition',
    category: getCategoryById('image-media'),
    icon: createIcon("M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"),
    views: 8750,
    gradient: 'from-violet-500 to-purple-500',
    features: [
      'Extract text from images and scanned documents',
      'Support for over 100 languages',
      'Table and form detection',
      'Convert scanned PDFs to editable text',
      'Handwriting recognition',
      'Export to Word, PDF, or plain text'
    ]
  },
  
  // 6. Color & Design Tools
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Select and manage colors with precision tools',
    category: getCategoryById('color-design'),
    icon: createIcon("M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"),
    views: 12400,
    gradient: 'from-fuchsia-500 to-purple-500',
    features: [
      'Eyedropper tool for sampling colors',
      'RGB, HEX, HSL, and CMYK formats',
      'Color palette creation and management',
      'Color harmony and scheme generator',
      'Accessibility contrast checker',
      'Import colors from images'
    ]
  },
  {
    id: 'gradient-generator',
    name: 'Gradient Generator',
    description: 'Create beautiful color gradients for design projects',
    category: getCategoryById('color-design'),
    icon: createIcon("M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"),
    views: 8650,
    gradient: 'from-blue-500 to-indigo-500',
    features: [
      'Linear, radial, and conic gradient generation',
      'Multiple color stop management',
      'CSS code generation for web developers',
      'Angle and position control',
      'Save and share gradient presets',
      'Export as CSS, SVG, or PNG'
    ]
  },
  {
    id: 'hex-to-rgb',
    name: 'HEX to RGB Converter',
    description: 'Convert between color formats easily',
    category: getCategoryById('color-design'),
    icon: createIcon("M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"),
    views: 6820,
    gradient: 'from-amber-500 to-yellow-500',
    features: [
      'Convert between HEX, RGB, HSL, CMYK, and more',
      'Batch conversion for multiple colors',
      'Color adjustment and manipulation',
      'Instant copy to clipboard',
      'Color comparison tool',
      'Export results in various formats'
    ]
  },
  {
    id: 'contrast-checker',
    name: 'Contrast Checker',
    description: 'Ensure your designs meet accessibility standards',
    category: getCategoryById('color-design'),
    icon: createIcon("M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"),
    views: 5480,
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'Check text readability according to WCAG standards',
      'Analyze foreground and background color combinations',
      'Get pass/fail ratings for AA and AAA standards',
      'Color suggestion for better contrast',
      'Simulate color blindness modes',
      'Preview text samples with selected colors'
    ]
  },
  {
    id: 'palette-generator',
    name: 'Palette Generator',
    description: 'Create harmonious color palettes for your projects',
    category: getCategoryById('color-design'),
    icon: createIcon("M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"),
    views: 9240,
    gradient: 'from-red-500 to-orange-500',
    features: [
      'Generate color palettes from images',
      'Create complementary, analogous, and triadic color schemes',
      'Save and organize multiple palettes',
      'Export to design software or CSS',
      'Color blindness simulation',
      'Community palette sharing and inspiration'
    ]
  },
  
  // 7. PDF & Document Tools
  {
    id: 'pdf-to-word',
    name: 'PDF to Word Converter',
    description: 'Convert PDF documents to editable Word files',
    category: getCategoryById('pdf-document'),
    icon: createIcon("M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"),
    views: 17540,
    gradient: 'from-cyan-500 to-blue-500',
    features: [
      'Convert PDF to DOC/DOCX with formatting preserved',
      'Batch conversion for multiple documents',
      'Extract text, tables, and images',
      'Convert password-protected PDFs',
      'OCR for scanned documents',
      'Cloud storage integration'
    ]
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into a single document',
    category: getCategoryById('pdf-document'),
    icon: createIcon("M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"),
    views: 14320,
    gradient: 'from-violet-500 to-purple-500',
    features: [
      'Merge PDFs with customizable page order',
      'Add page numbers and bookmarks',
      'Set document properties',
      'Add watermarks and backgrounds',
      'Password protection for merged document',
      'Preview before merging'
    ]
  },
  {
    id: 'pdf-splitter',
    name: 'PDF Splitter',
    description: 'Extract specific pages or split PDF documents',
    category: getCategoryById('pdf-document'),
    icon: createIcon("M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"),
    views: 10840,
    gradient: 'from-pink-500 to-rose-500',
    features: [
      'Split by page ranges or intervals',
      'Extract specific pages',
      'Split large PDFs into multiple documents',
      'Split by bookmarks',
      'Organize output files',
      'Batch processing for multiple PDFs'
    ]
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'Reduce PDF file size while maintaining quality',
    category: getCategoryById('pdf-document'),
    icon: createIcon("M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"),
    views: 11760,
    gradient: 'from-amber-500 to-orange-500',
    features: [
      'Smart PDF compression with adjustable quality',
      'Image downsampling options',
      'Remove duplicate objects',
      'Flatten form fields and annotations',
      'Optimize file structure',
      'Batch processing capability'
    ]
  },
  {
    id: 'pdf-encryptor',
    name: 'PDF Encryptor',
    description: 'Secure PDF files with passwords and encryption',
    category: getCategoryById('pdf-document'),
    icon: createIcon("M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"),
    views: 8460,
    gradient: 'from-green-500 to-teal-500',
    features: [
      'Add password protection to PDF files',
      'Set permissions (printing, copying, editing)',
      '128/256-bit AES encryption',
      'Batch encrypt multiple documents',
      'Set document expiration dates',
      'Digital signature support'
    ]
  },
  
  // 8. Code & Developer Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data with ease',
    category: getCategoryById('developer'),
    icon: createIcon("M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"),
    views: 14680,
    gradient: 'from-violet-500 to-purple-500',
    features: [
      'Format and beautify JSON with customizable indentation',
      'Validate JSON for syntax errors',
      'Compare JSON files side by side',
      'Minify JSON to reduce file size',
      'Convert JSON to/from YAML, XML, and CSV',
      'Tree view for easier navigation of complex structures'
    ]
  },
  {
    id: 'html-beautifier',
    name: 'HTML Beautifier',
    description: 'Format and beautify HTML code for better readability',
    category: getCategoryById('developer'),
    icon: createIcon("M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"),
    views: 9870,
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      'Format HTML with customizable indentation',
      'Fix common HTML syntax errors',
      'Remove unnecessary attributes and comments',
      'Sort HTML attributes alphabetically',
      'Convert HTML to/from Markdown or JSX',
      'Syntax highlighting for easier editing'
    ]
  },
  
  // 9. SEO & Marketing Tools
  {
    id: 'keyword-generator',
    name: 'Keyword Generator',
    description: 'Generate relevant keywords for your content and SEO strategy',
    category: getCategoryById('seo'),
    icon: createIcon("M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"),
    views: 11250,
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'Generate keywords based on your topic or niche',
      'Analyze keyword difficulty and search volume',
      'Find long-tail keyword opportunities',
      'Group keywords by semantic relevance',
      'Export results to CSV or Excel',
      'Track keyword ranking over time'
    ]
  },
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Create optimized meta tags for better SEO performance',
    category: getCategoryById('seo'),
    icon: createIcon("M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"),
    views: 8340,
    gradient: 'from-red-500 to-orange-500',
    features: [
      'Generate title, description, and keyword meta tags',
      'Preview how your page will appear in search results',
      'Create Open Graph and Twitter Card tags for social sharing',
      'Analyze meta tag length and optimize for search engines',
      'Generate structured data markup (JSON-LD)',
      'Check for missing or duplicate meta tags'
    ]
  },

  // 10. Writing & Content Tools
  {
    id: 'blog-idea-generator',
    name: 'Blog Idea Generator',
    description: 'Generate creative blog post ideas for your content strategy',
    category: getCategoryById('writing'),
    icon: createIcon("M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"),
    views: 10120,
    gradient: 'from-pink-500 to-rose-500',
    features: [
      'Generate blog post ideas based on your niche or target audience',
      'Find trending topics in your industry',
      'Create clickable headlines that drive traffic',
      'Suggest content structures and outlines',
      'Analyze competition for similar content',
      'Schedule content ideas for your editorial calendar'
    ]
  },
  {
    id: 'headline-analyzer',
    name: 'Headline Analyzer',
    description: 'Analyze and optimize headlines for better engagement',
    category: getCategoryById('writing'),
    icon: createIcon("M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"),
    views: 7840,
    gradient: 'from-indigo-500 to-blue-500',
    features: [
      'Score headlines for emotional appeal and impact',
      'Analyze word balance and readability',
      'Get suggestions for power words to improve click-through rates',
      'Compare multiple headline variations',
      'Check length for SEO and social media optimization',
      'Historical data on successful headline patterns'
    ]
  },
  
  // 11. Grammar & Plagiarism Tools
  {
    id: 'grammar-checker',
    name: 'Grammar Checker',
    description: 'Check and correct grammar, spelling, and punctuation errors',
    category: getCategoryById('grammar-plagiarism'),
    icon: createIcon("M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"),
    views: 15320,
    gradient: 'from-amber-500 to-yellow-500',
    features: [
      'Check grammar, spelling, and punctuation in real-time',
      'Advanced AI-powered language suggestions',
      'Style and tone recommendations',
      'Vocabulary enhancement suggestions',
      'Support for multiple languages and dialects',
      'Browser extension for checking anywhere on the web'
    ]
  },
  {
    id: 'plagiarism-checker',
    name: 'Plagiarism Checker',
    description: 'Scan your content for potential plagiarism and duplication',
    category: getCategoryById('grammar-plagiarism'),
    icon: createIcon("M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"),
    views: 13250,
    gradient: 'from-green-500 to-teal-500',
    features: [
      'Check content against billions of web pages and publications',
      'Highlight exact matches and similar content',
      'Calculate originality score and similarity percentage',
      'Suggest ways to rewrite problematic sections',
      'Citation assistant for academic writing',
      'Batch checking for multiple documents'
    ]
  },
  
  // 12. AI & Automation Tools
  {
    id: 'ai-writer',
    name: 'AI Writer',
    description: 'Generate high-quality content with advanced AI technology',
    category: getCategoryById('ai-automation'),
    icon: createIcon("M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"),
    views: 18470,
    gradient: 'from-violet-500 to-purple-500',
    features: [
      'Generate articles, blog posts, and marketing copy',
      'Customize tone, style, and length of content',
      'Research-based content generation with citations',
      'Multi-language content creation',
      'Rewrite and paraphrase existing content',
      'Content templates for various industries and purposes'
    ]
  },
  {
    id: 'image-generator',
    name: 'AI Image Generator',
    description: 'Create unique images with AI from text descriptions',
    category: getCategoryById('ai-automation'),
    icon: createIcon("M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"),
    views: 16840,
    gradient: 'from-fuchsia-500 to-pink-500',
    features: [
      'Generate unique images from text descriptions',
      'Customize art style, mood, and composition',
      'Create variations of existing images',
      'Upscale and enhance image quality',
      'Remove backgrounds and edit generated images',
      'Commercial usage rights for created content'
    ]
  },

  // 13. Social Media Tools
  {
    id: 'hashtag-generator',
    name: 'Hashtag Generator',
    description: 'Find relevant hashtags to boost your social media reach',
    category: getCategoryById('social-media'),
    icon: createIcon("M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"),
    views: 9540,
    gradient: 'from-blue-500 to-indigo-500',
    features: [
      'Generate trending hashtags for your content',
      'Platform-specific hashtag recommendations',
      'Analyze hashtag popularity and competition',
      'Group hashtags by relevance and reach',
      'Track hashtag performance over time',
      'Save hashtag sets for different content types'
    ]
  },
  {
    id: 'post-scheduler',
    name: 'Social Media Scheduler',
    description: 'Plan and schedule your social media posts in advance',
    category: getCategoryById('social-media'),
    icon: createIcon("M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"),
    views: 8750,
    gradient: 'from-cyan-500 to-blue-500',
    features: [
      'Schedule posts across multiple social platforms',
      'Visual content calendar with drag-and-drop',
      'Best time to post recommendations',
      'Content recycling for evergreen posts',
      'Performance analytics for scheduled content',
      'Team collaboration tools for content approval'
    ]
  },

  // 14. Privacy & Security Tools
  {
    id: 'password-generator-sec',
    name: 'Password Generator',
    description: 'Create strong, unique passwords to secure your accounts',
    category: getCategoryById('privacy-security'),
    icon: createIcon("M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"),
    views: 14210,
    gradient: 'from-red-500 to-pink-500',
    features: [
      'Generate secure passwords with customizable parameters',
      'Password strength assessment',
      'Create memorable passphrases',
      'Password history and storage',
      'Check passwords against breach databases',
      'Generate password reset instructions for popular sites'
    ]
  },
  {
    id: 'two-factor-auth',
    name: '2FA Tool',
    description: 'Generate and manage two-factor authentication codes',
    category: getCategoryById('privacy-security'),
    icon: createIcon("M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"),
    views: 7840,
    gradient: 'from-amber-500 to-orange-500',
    features: [
      'Generate time-based one-time passwords (TOTP)',
      'QR code scanner for adding accounts',
      'Secure backup and sync across devices',
      'Offline code generation',
      'Organize accounts by categories',
      'Recovery code management'
    ]
  },

  // 15. Email & Communication Tools
  {
    id: 'email-verifier',
    name: 'Email Verifier',
    description: 'Verify email addresses for deliverability and validity',
    category: getCategoryById('email-communication'),
    icon: createIcon("M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"),
    views: 9870,
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'Verify email address format and syntax',
      'Check domain DNS records and mail server',
      'Detect disposable email addresses',
      'Bulk verification for email lists',
      'Remove duplicate and invalid emails',
      'Generate verification reports with deliverability scores'
    ]
  },
  {
    id: 'temp-mail',
    name: 'Temporary Email',
    description: 'Create disposable email addresses for privacy and security',
    category: getCategoryById('email-communication'),
    icon: createIcon("M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"),
    views: 12480,
    gradient: 'from-violet-500 to-purple-500',
    features: [
      'Create temporary email addresses instantly',
      'Auto-refreshing inbox with real-time updates',
      'Custom domain options for disposable emails',
      'Download and forward received messages',
      'Set auto-expiry for temporary addresses',
      'No registration required for basic usage'
    ]
  },

  // 16. Data Analysis & Visualization Tools
  {
    id: 'chart-maker',
    name: 'Chart Maker',
    description: 'Create professional charts and graphs for data visualization',
    category: getCategoryById('data-visualization'),
    icon: createIcon("M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"),
    views: 11250,
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      'Create various chart types (bar, line, pie, scatter, etc.)',
      'Interactive charts with hover and zoom features',
      'Customizable colors, fonts, and layouts',
      'Import data from Excel, CSV, or Google Sheets',
      'Responsive charts for websites and presentations',
      'Export in multiple formats (PNG, SVG, PDF)'
    ]
  },
  {
    id: 'graph-tool',
    name: 'Graph Tool',
    description: 'Create and analyze graphs and networks with powerful visualization',
    category: getCategoryById('data-visualization'),
    icon: createIcon("M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"),
    views: 8320,
    gradient: 'from-pink-500 to-rose-500',
    features: [
      'Create node-link diagrams and network visualizations',
      'Analyze network properties and metrics',
      'Interactive graph exploration tools',
      'Support for directed and undirected graphs',
      'Import data from various formats',
      'Apply layout algorithms for optimal visualization'
    ]
  },
  
  // 17. Website & Domain Tools
  {
    id: 'domain-checker',
    name: 'Domain Checker',
    description: 'Check domain availability and registration information',
    category: getCategoryById('website-domain'),
    icon: createIcon("M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"),
    views: 10480,
    gradient: 'from-amber-500 to-yellow-500',
    features: [
      'Check domain name availability across TLDs',
      'View WHOIS information for registered domains',
      'Domain price comparison across registrars',
      'Bulk domain search for multiple names',
      'Domain name suggestions and alternatives',
      'Expiry monitoring for owned domains'
    ]
  },
  {
    id: 'whois-lookup',
    name: 'WHOIS Lookup',
    description: 'Lookup domain registration and ownership information',
    category: getCategoryById('website-domain'),
    icon: createIcon("M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"),
    views: 8750,
    gradient: 'from-green-500 to-teal-500',
    features: [
      'Access detailed domain registration information',
      'Find domain owner and contact details',
      'Check registration and expiry dates',
      'View name server and DNS information',
      'Historical WHOIS data for ownership changes',
      'Privacy-protected domain detection'
    ]
  }
];
