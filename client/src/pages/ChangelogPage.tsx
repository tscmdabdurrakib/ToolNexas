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