export interface Blog {
  id: number;
  title: string;
  date: string;
  description: string;
  content: string;
  category: string;
  readingTime: number;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
  featured: boolean;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "The Ultimate Guide to Mastering React Hooks",
    date: "2024-07-28",
    description: "A deep dive into React Hooks, covering everything from useState to custom hooks. Learn how to write cleaner, more efficient React components.",
    content: `
      <p>React Hooks have revolutionized the way we write components. Before hooks, we had to rely on class components to manage state and lifecycle methods. Now, with hooks like <strong>useState</strong>, <strong>useEffect</strong>, and <strong>useContext</strong>, we can build powerful functional components with less boilerplate.</p>
      <h2 class="text-2xl font-bold my-4">useState: The Foundation of State</h2>
      <p>The <code>useState</code> hook is the most fundamental hook. It allows you to add state to your functional components. Here's a simple example:</p>
      <pre class="bg-gray-800 text-white p-4 rounded-md my-4"><code>
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
      </code></pre>
      <h2 class="text-2xl font-bold my-4">useEffect: Handling Side Effects</h2>
      <p>The <code>useEffect</code> hook lets you perform side effects in your components. This includes data fetching, subscriptions, or manually changing the DOM. It runs after every render by default, but you can control when it runs by passing a dependency array.</p>
    `,
    category: "React",
    readingTime: 8,
    author: {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "TailwindCSS for Modern Web Design",
    date: "2024-07-25",
    description: "Discover how TailwindCSS can speed up your development workflow and help you create beautiful, responsive designs without writing custom CSS.",
    content: `
      <p>TailwindCSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your HTML. This approach has several advantages over traditional CSS frameworks like Bootstrap.</p>
      <h2 class="text-2xl font-bold my-4">Why Utility-First?</h2>
      <p>With utility classes, you are not limited by pre-designed components. You have the freedom to create unique designs without fighting against the framework's styles. It also helps in keeping your CSS bundle size small, as you only include the styles you actually use.</p>
      <h2 class="text-2xl font-bold my-4">Responsive Design Made Easy</h2>
      <p>Tailwind makes responsive design intuitive. You can apply different classes for different screen sizes directly in your markup:</p>
      <pre class="bg-gray-800 text-white p-4 rounded-md my-4"><code>
<div class="w-full md:w-1/2 lg:w-1/3">
  {/* ... */}
</div>
      </code></pre>
      <p>This makes it easy to create complex responsive layouts without writing a single media query.</p>
    `,
    category: "CSS",
    readingTime: 5,
    author: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d"
    },
    image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: false,
  },
  {
    id: 3,
    title: "Getting Started with Vite: The Next-Generation Frontend Tool",
    date: "2024-07-22",
    description: "Learn why Vite is becoming the go-to build tool for modern web development, offering lightning-fast hot module replacement and optimized builds.",
    content: `
      <p>Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts: a dev server that provides rich feature enhancements over native ES modules, and a build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.</p>
      <h2 class="text-2xl font-bold my-4">Lightning-Fast HMR</h2>
      <p>One of Vite's standout features is its Hot Module Replacement (HMR) that stays fast regardless of the size of your application. This is a huge productivity boost for developers.</p>
      <h2 class="text-2xl font-bold my-4">Optimized Builds</h2>
      <p>Vite uses Rollup for its production builds, which is highly optimized and produces small bundle sizes. It also supports features like code splitting and CSS pre-processors out of the box.</p>
    `,
    category: "Tooling",
    readingTime: 6,
    author: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: false,
  },
  {
    id: 4,
    title: "A Guide to SEO for Developers",
    date: "2024-07-20",
    description: "SEO is not just for marketers. As a developer, you have a huge impact on your site's search engine ranking. This guide will cover the technical SEO basics you need to know.",
    content: `
        <p>Search Engine Optimization (SEO) is crucial for any website that wants to be discovered. While content is king, technical SEO forms the foundation upon which good content can rank. Developers play a key role in ensuring that a website is crawlable, indexable, and fast.</p>
        <h2 class="text-2xl font-bold my-4">Key Areas of Technical SEO</h2>
        <ul>
            <li><strong>Site Speed:</strong> A fast-loading website is a must. Optimize images, use a CDN, and leverage browser caching.</li>
            <li><strong>Mobile-Friendliness:</strong> With mobile-first indexing, your site must be responsive and provide a great user experience on all devices.</li>
            <li><strong>Crawlability:</strong> Ensure that search engine bots can easily crawl your site. Use a well-structured robots.txt file and a sitemap.</li>
        </ul>
    `,
    category: "SEO",
    readingTime: 7,
    author: {
        name: "Sarah Lee",
       avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    featured: false,
  }
];