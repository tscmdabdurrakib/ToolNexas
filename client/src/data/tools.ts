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
];
