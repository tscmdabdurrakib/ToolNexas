import React, { useState } from 'react';

interface ChangelogEntry {
  date: string;
  version?: string;
  category: 'Added' | 'Improved' | 'Fixed' | 'Removed';
  title: string;
  description: string;
  link?: string;
}

const changelogData: ChangelogEntry[] = [
  {
    date: 'October 8, 2025',
    version: 'v2.0.1',
    category: 'Improved',
    title: 'Tool Cards Redesign - Category Card Style',
    description:
      'Complete redesign of Tool Cards to match Category Card style with professional SVG icons in colored boxes, improved layout with icon-title pairing, clean description display, category badge at bottom, and arrow navigation icon. Favorite heart icon repositioned to top-right corner with backdrop blur effect. Enhanced hover animations and visual consistency across the platform.',
    link: '/category/text-string',
  },
  {
    date: 'October 8, 2025',
    version: 'v2.0.0',
    category: 'Added',
    title: 'Keyword Research Tool - SEO & Content Strategy',
    description:
      'Launch of professional Keyword Research Tool for SEO analysis. Discover high-value keywords with instant search volume, CPC, competition analysis, and trend indicators. Features include 20+ keyword variations, sortable data table, CSV export, and comprehensive SEO metrics dashboard. Perfect for content marketers and SEO professionals.',
    link: '/tools/keyword-research',
  },
  {
    date: 'October 8, 2025',
    version: 'v1.9.0',
    category: 'Added',
    title: 'New Advanced String Manipulation and Cipher Tools',
    description:
      'Added 5 advanced string manipulation tools: Rotate a String, ROT13 a String, ROT47 a String, Transpose a String, and Slice a String. All tools feature real-time processing, professional UI with gradient color theming, and comprehensive functionality.',
    link: '/tools/rotate-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Rotate a String Tool',
    description:
      'Shift characters in your text by specified positions. Supports positive (right) and negative (left) rotation with circular shift. Perfect for string manipulation and text transformations.',
    link: '/tools/rotate-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'ROT13 a String Tool',
    description:
      'Apply ROT13 cipher encryption and decryption to your text. Classic letter substitution cipher that shifts letters by 13 positions. Self-inverse encoding with instant results.',
    link: '/tools/rot13-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'ROT47 a String Tool',
    description:
      'Apply ROT47 cipher to encode/decode ASCII printable characters including numbers and symbols. Extended version of ROT13 covering 94 printable characters with instant conversion.',
    link: '/tools/rot47-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Transpose a String Tool',
    description:
      'Transpose text by swapping rows and columns. Convert vertical text to horizontal and vice versa. Perfect for text matrix manipulation and data transformation with real-time preview.',
    link: '/tools/transpose-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Slice a String Tool',
    description:
      'Extract a portion of text using start and end indices. Supports negative indices for counting from the end. Perfect for substring extraction and text manipulation with instant results.',
    link: '/tools/slice-string',
  },
  {
    date: 'October 8, 2025',
    version: 'v1.8.0',
    category: 'Added',
    title: 'New String Formatting and Alignment Tools',
    description:
      'Added 5 professional string formatting tools: Left-pad a String, Right-pad a String, Right-align a String, Center a String, and Sort Strings. All tools feature real-time processing, customizable options, and professional UI with gradient color theming.',
    link: '/tools/left-pad-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Left-pad a String Tool',
    description:
      'Add padding characters to the left of your text until it reaches target length. Perfect for formatting numbers with leading zeros and creating aligned text. Supports custom padding characters.',
    link: '/tools/left-pad-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Right-pad a String Tool',
    description:
      'Add padding characters to the right of your text until it reaches target length. Ideal for creating tables, lists, and aligned content. Supports custom padding characters like dots or spaces.',
    link: '/tools/right-pad-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Right-align a String Tool',
    description:
      'Align multiple lines of text to the right side with specified width. Perfect for creating right-aligned text blocks and professional document formatting with instant preview.',
    link: '/tools/right-align-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Center a String Tool',
    description:
      'Center text within specified width with custom fill characters. Great for creating headers, titles, and centered text blocks. Supports multiple lines with real-time preview.',
    link: '/tools/center-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Sort Strings Tool',
    description:
      'Sort multiple lines of text with various options: ascending, descending, by length, or reverse order. Supports case-sensitive and case-insensitive sorting with instant results.',
    link: '/tools/sort-strings',
  },
  {
    date: 'October 8, 2025',
    version: 'v1.7.0',
    category: 'Added',
    title: 'New Essential String Manipulation Tools',
    description:
      'Added 5 essential string manipulation tools: Repeat a String, Reverse a String, Find and Replace a String, Truncate a String, and Trim a String. All tools feature real-time processing, professional UI with shadcn/ui components, and comprehensive functionality.',
    link: '/tools/repeat-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Repeat a String Tool',
    description:
      'Repeat your text multiple times instantly with customizable repeat count up to 1000 times. Perfect for creating test data, patterns, and repeated text.',
    link: '/tools/repeat-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Reverse a String Tool',
    description:
      'Reverse your text character by character instantly. Supports Unicode characters including emojis. Great for text manipulation and palindrome testing.',
    link: '/tools/reverse-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Find and Replace a String Tool',
    description:
      'Search and replace text with custom options including case-sensitive and case-insensitive matching. Perfect for bulk text replacements and content editing.',
    link: '/tools/find-replace-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Truncate a String Tool',
    description:
      'Shorten text to a specified length with optional ellipsis (...). Ideal for creating previews, summaries, and limiting text display with character count tracking.',
    link: '/tools/truncate-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Trim a String Tool',
    description:
      'Remove whitespace from text with various trim options: trim both ends, start only, end only, remove all whitespace, or remove extra spaces. Perfect for data cleanup.',
    link: '/tools/trim-string',
  },
  {
    date: 'October 8, 2025',
    version: 'v1.6.0',
    category: 'Added',
    title: 'New Advanced String Manipulation Tools',
    description:
      'Added 5 professional string manipulation tools: Convert String to Image, Printf String, Split String, Join Strings, and Filter String Lines. All tools feature real-time processing, professional UI with shadcn/ui components, and comprehensive functionality.',
    link: '/tools/convert-string-to-image',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Convert String to Image Tool',
    description:
      'Transform text into downloadable images with customizable fonts, colors, and styles. Perfect for creating social media graphics, memes, and text-based visuals.',
    link: '/tools/convert-string-to-image',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Printf String Tool',
    description:
      'Format strings with printf-style placeholders like %s, %d, and %f. Perfect for template strings and formatted output with real-time preview.',
    link: '/tools/printf-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Split String Tool',
    description:
      'Split text into parts using custom delimiters like commas, pipes, or any character. Shows numbered results with instant updates.',
    link: '/tools/split-string',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Join Strings Tool',
    description:
      'Join multiple lines of text with custom separators. Perfect for creating CSV lists, comma-separated values, and formatted text.',
    link: '/tools/join-strings',
  },
  {
    date: 'October 8, 2025',
    category: 'Added',
    title: 'Filter String Lines Tool',
    description:
      'Filter text lines based on criteria like contains, starts with, ends with, equals, or not contains. Supports case-sensitive/insensitive filtering with real-time results.',
    link: '/tools/filter-string-lines',
  },
  {
    date: 'October 7, 2025',
    version: 'v1.5.0',
    category: 'Added',
    title: 'New String Generation & Regex Tools',
    description:
      'Added 5 powerful string manipulation tools: Generate Random String, Generate String from Regex, Extract Regex Matches, Test String with Regex, and Extract Substring. All tools feature real-time processing, professional UI, and comprehensive functionality.',
    link: '/tools/generate-random-string',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'Generate Random String Tool',
    description:
      'Create secure random strings with customizable length and character types. Choose from uppercase, lowercase, numbers, and symbols. Perfect for passwords, API keys, and unique identifiers.',
    link: '/tools/generate-random-string',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'Generate String from Regex Tool',
    description:
      'Generate sample strings matching regex patterns. Perfect for testing regex patterns and creating test data. Supports character classes, quantifiers, and special sequences.',
    link: '/tools/generate-string-from-regex',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'Extract Regex Matches Tool',
    description:
      'Find and extract all regex pattern matches from text. Supports case-insensitive matching and displays all found matches. Great for data extraction and validation.',
    link: '/tools/extract-regex-matches',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'Test String with Regex Tool',
    description:
      'Validate if text matches a regex pattern with instant results. Shows detailed match information including all matches found. Supports multiple regex flags.',
    link: '/tools/test-string-with-regex',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'Extract Substring Tool',
    description:
      'Extract portions of text using start and end indices with visual preview. Shows highlighted range and automatically adjusts indices if out of range.',
    link: '/tools/extract-substring',
  },
  {
    date: 'October 7, 2025',
    version: 'v1.4.0',
    category: 'Added',
    title: 'New Advanced Text & String Tools',
    description:
      'Added 5 new text processing tools: Base64 Decode, String to Netstring, Netstring to String, Slash Escape, and Slash Unescape. All tools feature instant real-time conversion, professional UI, and full responsive design.',
    link: '/tools/base64-decode',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'Base64 Decode Tool',
    description:
      'Convert Base64 encoded text back to readable format. Perfect for decoding JWT tokens, email attachments, and Base64 strings.',
    link: '/tools/base64-decode',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'String to Netstring Tool',
    description:
      'Convert plain text to netstring format (length:data,). A simple and efficient encoding method for network protocols.',
    link: '/tools/string-to-netstring',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'Netstring to String Tool',
    description:
      'Decode netstring format back to plain text. Parse and extract data from netstring encoded messages.',
    link: '/tools/netstring-to-string',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'Slash Escape Tool',
    description:
      'Add escape slashes to special characters. Convert newlines to \\n, tabs to \\t, and quotes for safe string literals.',
    link: '/tools/slash-escape',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'Slash Unescape Tool',
    description:
      'Remove escape slashes and convert to normal text. Transform \\n to actual newlines, \\t to tabs, and more.',
    link: '/tools/slash-unescape',
  },
  {
    date: 'October 7, 2025',
    version: 'v1.3.0',
    category: 'Added',
    title: 'New Text & String Encoding Tools',
    description:
      'Added 5 powerful text encoding/decoding tools: URL Encode, URL Decode, HTML Encode, HTML Decode, and Base64 Encode. All tools feature real-time conversion, copy-to-clipboard functionality, and responsive design with dark mode support.',
    link: '/tools/url-encode',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'URL Encode Tool',
    description:
      'Convert text to URL-safe encoded format. Perfect for encoding query parameters and URL paths with instant real-time conversion.',
    link: '/tools/url-encode',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'URL Decode Tool',
    description:
      'Convert URL-encoded text back to readable format. Decode %20 and other escape sequences instantly.',
    link: '/tools/url-decode',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'HTML Encode Tool',
    description:
      'Convert text to HTML-safe format. Protect against XSS attacks and safely display user content by encoding special HTML characters.',
    link: '/tools/html-encode',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'HTML Decode Tool',
    description:
      'Convert HTML entities back to readable text. Decode &amp;lt;, &amp;gt;, &amp;amp;, and other HTML entities instantly.',
    link: '/tools/html-decode',
  },
  {
    date: 'October 7, 2025',
    category: 'Added',
    title: 'Base64 Encode Tool',
    description:
      'Convert text to Base64 encoded format. Perfect for embedding data in JSON, creating data URIs, and encoding authentication tokens.',
    link: '/tools/base64-encode',
  },
  {
    date: 'October 3, 2025',
    version: 'v1.2.0',
    category: 'Improved',
    title: 'Redesigned Retirement Savings Calculator UI',
    description:
      'A completely refreshed, brighter UI for the Retirement Calculator to make inputs clearer and results easier to read. We also added new advanced options for inflation.',
    link: '/tools/calculation/retirement-calculator',
  },
  {
    date: 'September 28, 2025',
    category: 'Added',
    title: 'New Length Converter Tool',
    description:
      'Introduced a new Length Converter tool with full unit support for various length measurements.',
    link: '/tools/unit-conversion/length-converter',
  },
  {
    date: 'September 20, 2025',
    category: 'Fixed',
    title: 'Pension Calculator Formula Correction',
    description:
      'Addressed a critical bug in the Pension Calculator that was causing incorrect calculations for certain scenarios.',
    link: '/tools/calculation-tools/pension-calculator',
  },
  {
    date: 'September 15, 2025',
    category: 'Removed',
    title: 'Legacy Feature X Removed',
    description:
      'Removed an outdated feature that was no longer in use to streamline the platform.',
  },
];

const ChangelogPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredChangelog = changelogData.filter((entry) => {
    const matchesFilter = filter === 'All' || entry.category === filter;
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (category: ChangelogEntry['category']) => {
    switch (category) {
      case 'Added':
        return 'bg-green-100 text-green-800';
      case 'Improved':
        return 'bg-blue-100 text-blue-800';
      case 'Fixed':
        return 'bg-red-100 text-red-800';
      case 'Removed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Changelog</h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <div className="flex gap-2">
          {['All', 'Added', 'Improved', 'Fixed', 'Removed'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search updates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-full w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative border-l-2 border-gray-200 ml-4 md:ml-12">
        {filteredChangelog.map((entry, index) => (
          <div key={index} className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
              <svg
                className="w-3 h-3 text-blue-800"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
              {entry.title}
              <span
                className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${getCategoryColor(
                  entry.category
                )} ml-3`}
              >
                {entry.category}
              </span>
              {entry.version && (
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">
                  {entry.version}
                </span>
              )}
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
              {entry.date}
            </time>
            <p className="mb-4 text-base font-normal text-gray-500">
              {entry.description}
              {entry.link && (
                <a href={entry.link} className="text-blue-600 hover:underline ml-1">
                  Learn more
                </a>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangelogPage;