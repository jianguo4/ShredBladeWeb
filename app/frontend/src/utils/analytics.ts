// Google Analytics utility functions

/**
 * Initialize Google Analytics tracking
 * Should only be called after user has consented to cookies
 */
export const initializeGoogleAnalytics = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-G5TXXSC2LY');
    console.log('Google Analytics initialized');
  }
};

/**
 * Disable Google Analytics tracking
 * Called when user declines cookies
 */
export const disableGoogleAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Set the Google Analytics opt-out flag
    window['ga-disable-G-G5TXXSC2LY'] = true;
    console.log('Google Analytics disabled');
  }
};

/**
 * Track custom events in Google Analytics
 * @param eventName - Name of the event
 * @param eventParams - Additional parameters
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  const cookieConsent = localStorage.getItem('cookieConsent');
  
  if (cookieConsent === 'accepted' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track page views in Google Analytics
 * @param pagePath - Path of the page
 * @param pageTitle - Title of the page
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  const cookieConsent = localStorage.getItem('cookieConsent');
  
  if (cookieConsent === 'accepted' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}
