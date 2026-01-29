// Performance monitoring utility

declare global {
  interface Window {
    // gtag is already defined by Google Analytics, we just need to ensure it exists
    performance: Performance;
  }
}

export const measurePerformance = () => {
  if (typeof window !== 'undefined' && window.performance) {
    // Wait for page load to complete
    window.addEventListener('load', () => {
      setTimeout(() => {
        // Use Navigation Timing API v2
        const navEntries = performance.getEntriesByType('navigation');
        if (navEntries.length > 0) {
          const navTiming = navEntries[0] as PerformanceNavigationTiming;
          const pageLoadTime = navTiming.loadEventEnd - navTiming.fetchStart;
          const connectTime = navTiming.responseEnd - navTiming.requestStart;
          // Use domInteractive instead of domLoading (both are valid timing points)
          const renderTime = navTiming.domInteractive - navTiming.fetchStart;
          
          console.log('📊 Performance Metrics:');
          console.log(`  Page Load Time: ${Math.round(pageLoadTime)}ms`);
          console.log(`  Connect Time: ${Math.round(connectTime)}ms`);
          console.log(`  Render Time: ${Math.round(renderTime)}ms`);
          
          // Track in Google Analytics if available
          if (typeof window !== 'undefined' && (window as any).gtag && localStorage.getItem('cookieConsent') === 'accepted') {
            (window as any).gtag('event', 'page_performance', {
              page_load_time: Math.round(pageLoadTime),
              connect_time: Math.round(connectTime),
              render_time: Math.round(renderTime),
            });
          }
        }
      }, 0);
    });
  }
};

// Measure Web Vitals (Core Web Vitals)
export const measureWebVitals = () => {
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcpValue = Math.round((lastEntry.renderTime || lastEntry.loadTime) * 100) / 100;
        console.log('🎨 LCP:', `${lcpValue}ms`);
        
        // Send to GA4
        if (typeof window !== 'undefined' && (window as any).gtag && localStorage.getItem('cookieConsent') === 'accepted') {
          (window as any).gtag('event', 'web_vital_lcp', {
            value: lcpValue,
            event_category: 'web_vitals',
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'], buffered: true });
    } catch (e) {
      console.warn('LCP measurement not supported:', e);
    }

    // First Input Delay (FID) / Interaction to Next Paint (INP)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          const fidValue = Math.round((entry.processingEnd - entry.startTime) * 100) / 100;
          console.log('⚡ FID:', `${fidValue}ms`);
          
          // Send to GA4
          if (typeof window !== 'undefined' && (window as any).gtag && localStorage.getItem('cookieConsent') === 'accepted') {
            (window as any).gtag('event', 'web_vital_fid', {
              value: fidValue,
              event_category: 'web_vitals',
            });
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'], buffered: true });
    } catch (e) {
      console.warn('FID measurement not supported:', e);
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
        const clsValue = Math.round(clsScore * 10000) / 10000;
        console.log('📐 CLS:', clsValue);
        
        // Send to GA4
        if (typeof window !== 'undefined' && (window as any).gtag && localStorage.getItem('cookieConsent') === 'accepted') {
          (window as any).gtag('event', 'web_vital_cls', {
            value: clsValue,
            event_category: 'web_vitals',
          });
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'], buffered: true });
    } catch (e) {
      console.warn('CLS measurement not supported:', e);
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fcpValue = Math.round(entry.startTime * 100) / 100;
          console.log('📄 FCP:', `${fcpValue}ms`);
          
          // Send to GA4
          if (typeof window !== 'undefined' && (window as any).gtag && localStorage.getItem('cookieConsent') === 'accepted') {
            (window as any).gtag('event', 'web_vital_fcp', {
              value: fcpValue,
              event_category: 'web_vitals',
            });
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'], buffered: true });
    } catch (e) {
      console.warn('FCP measurement not supported:', e);
    }
  }
};

// Initialize performance monitoring
if (process.env.NODE_ENV === 'development') {
  measurePerformance();
  measureWebVitals();
}
