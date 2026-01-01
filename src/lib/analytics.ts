// Google Analytics tracking utility

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track button click events in Google Analytics
 * @param buttonName - Name of the button that was clicked
 * @param buttonLocation - Location of the button (e.g., "navigation", "hero", "footer")
 * @param buttonText - Text displayed on the button
 */
export const trackButtonClick = (
  buttonName: string,
  buttonLocation: string,
  buttonText?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      event_category: 'Button',
      event_label: buttonName,
      button_location: buttonLocation,
      button_text: buttonText || buttonName,
      value: 1
    });
  }
};

/**
 * Track "Start Earning Today" button click specifically
 * @param location - Where the button is located (e.g., "navigation_desktop", "navigation_mobile", "hero_mobile")
 */
export const trackStartEarningTodayClick = (location: string) => {
  trackButtonClick('start_earning_today', location, 'Start Earning Today!');
};

