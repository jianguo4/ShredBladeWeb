// Performance monitoring utility

export const measurePerformance = () => {
  if (typeof window !== 'undefined' && window.performance) {
    // Wait for page load to complete
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('📊 Performance Metrics:');
        console.log(`  Page Load Time: ${pageLoadTime}ms`);
        console.log(`  Connect Time: ${connectTime}ms`);
        console.log(`  Render Time: ${renderTime}ms`);
        
        // Track in Google Analytics if available
        if (window.gtag && localStorage.getItem('cookieConsent') === 'accepted') {
          window.gtag('event', 'page_performance', {
            page_load_time: pageLoadTime,
            connect_time: connectTime,
            render_time: renderTime,
          });
        }
      }, 0);
    });
  }
};

// Measure Web Vitals
export const measureWebVitals = () => {
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('🎨 LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Browser doesn't support LCP
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          console.log('⚡ FID:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Browser doesn't support FID
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
          }
        });
        console.log('📐 CLS:', clsScore);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Browser doesn't support CLS
    }
  }
};

// Initialize performance monitoring
if (process.env.NODE_ENV === 'development') {
  measurePerformance();
  measureWebVitals();
}
