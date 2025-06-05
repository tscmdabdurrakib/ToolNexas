import { useEffect } from 'react';

// Preload strategy: Load popular components after idle time
const preloadComponents = () => {
  // Preload most popular tools after 2 seconds of idle time
  setTimeout(() => {
    // PDF Editor (most popular)
    import('@/pages/tools/PDFEditorPage');
    // Length Converter (high traffic)
    import('@/pages/tools/LengthConverterPage');
    // Weight Mass Converter (high traffic)
    import('@/pages/tools/WeightMassConverterPage');
  }, 2000);

  // Preload navigation pages after 4 seconds
  setTimeout(() => {
    import('@/pages/SearchPage');
    import('@/pages/CategoryPage');
    import('@/pages/AboutPage');
  }, 4000);

  // Preload other converters after 6 seconds
  setTimeout(() => {
    import('@/pages/tools/VolumeConverterPage');
    import('@/pages/tools/TemperatureConverterPage');
    import('@/pages/tools/CurrencyConverterPage');
    import('@/pages/tools/ImageResizerPage');
  }, 6000);
};

// Smart preloader based on user interaction
export const usePreloadComponents = () => {
  useEffect(() => {
    // Start preloading after initial page load
    const timer = setTimeout(() => {
      preloadComponents();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Preload on hover - for instant navigation
  const preloadOnHover = (componentPath: string) => {
    return {
      onMouseEnter: () => {
        switch (componentPath) {
          case 'pdf-editor':
            import('@/pages/tools/PDFEditorPage');
            break;
          case 'length-converter':
            import('@/pages/tools/LengthConverterPage');
            break;
          case 'weight-mass-converter':
            import('@/pages/tools/WeightMassConverterPage');
            break;
          case 'volume-converter':
            import('@/pages/tools/VolumeConverterPage');
            break;
          case 'search':
            import('@/pages/SearchPage');
            break;
          case 'about':
            import('@/pages/AboutPage');
            break;
          default:
            break;
        }
      }
    };
  };

  return { preloadOnHover };
};

// Enhanced navigation with preloading - simple export
export const preloadingEnabled = true;