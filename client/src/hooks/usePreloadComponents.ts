import { useEffect } from 'react';

// Preload strategy: Load popular components after idle time
const preloadComponent = (path: string) => {
  // Dynamically import the component
  import(/* @vite-ignore */ path).catch(err => console.error(`Failed to preload ${path}:`, err));
};

// Smart preloader based on user interaction and idle time
export const usePreloadComponents = () => {
  useEffect(() => {
    // Preload critical components after initial page load during idle time
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Preload most popular tools
        preloadComponent('@/pages/tools/PDFEditorPage');
        preloadComponent('@/pages/tools/LengthConverterPage');
        preloadComponent('@/pages/tools/WeightMassConverterPage');
      }, { timeout: 2000 }); // Prioritize within 2 seconds

      (window as any).requestIdleCallback(() => {
        // Preload navigation pages
        preloadComponent('@/pages/SearchPage');
        preloadComponent('@/pages/CategoryPage');
        preloadComponent('@/pages/AboutPage');
      }, { timeout: 4000 }); // Prioritize within 4 seconds

      (window as any).requestIdleCallback(() => {
        // Preload other converters
        preloadComponent('@/pages/tools/VolumeConverterPage');
        preloadComponent('@/pages/tools/TemperatureConverterPage');
        preloadComponent('@/pages/tools/CurrencyConverterPage');
        preloadComponent('@/pages/tools/ImageResizerPage');
      }, { timeout: 6000 }); // Prioritize within 6 seconds

    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(() => {
        preloadComponent('@/pages/tools/PDFEditorPage');
        preloadComponent('@/pages/tools/LengthConverterPage');
        preloadComponent('@/pages/tools/WeightMassConverterPage');
        preloadComponent('@/pages/SearchPage');
        preloadComponent('@/pages/CategoryPage');
        preloadComponent('@/pages/AboutPage');
        preloadComponent('@/pages/tools/VolumeConverterPage');
        preloadComponent('@/pages/tools/TemperatureConverterPage');
        preloadComponent('@/pages/tools/CurrencyConverterPage');
        preloadComponent('@/pages/tools/ImageResizerPage');
      }, 3000); // A single timeout for all preloads
    }

    return () => {
      // Cleanup if necessary
    };
  }, []);

  // Preload on hover - for instant navigation
  const preloadOnHover = (componentPath: string) => {
    return {
      onMouseEnter: () => {
        // Construct the full path based on common patterns
        let fullPath = '';
        if (componentPath.startsWith('/tools/')) {
          // For tool pages, convert to the lazy load path format
          const toolName = componentPath.split('/tools/')[1];
          // Assuming toolName will be like 'length-converter' and page is 'LengthConverterPage'
          const pageName = toolName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Page';
          fullPath = `@/pages/tools/${pageName}`;
        } else if (componentPath.startsWith('/')) {
          // For other main pages
          const pageName = componentPath.split('/')[1];
          if (pageName === '') fullPath = `@/pages/Home`; // Handle root path
          else fullPath = `@/pages/${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page`;
        }

        if (fullPath) {
          preloadComponent(fullPath);
        }
      }
    };
  };

  return { preloadOnHover };
};

// Enhanced navigation with preloading - simple export
export const preloadingEnabled = true;