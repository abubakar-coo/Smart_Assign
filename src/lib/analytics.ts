// Google Analytics 4 (GA4) tracking utility

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track CTA button click events in Google Analytics 4
 * @param buttonName - Name of the button that was clicked
 * @param buttonLocation - Location of the button (e.g., "navigation", "hero", "footer")
 * @param buttonText - Text displayed on the button
 */
export const trackCTAClick = (
  buttonName: string,
  buttonLocation: string,
  buttonText?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion_click', {
      event_category: 'CTA',
      event_label: buttonName,
      button_location: buttonLocation,
      button_text: buttonText || buttonName,
      value: 1
    });
  }
};

/**
 * Track "Registration" button click specifically
 * @param location - Where the button is located (e.g., "navigation_desktop", "navigation_mobile", "hero_mobile")
 */
export const trackStartEarningTodayClick = (location: string) => {
  trackCTAClick('registration', location, 'Registration');
};

/**
 * Track "Get Started" button click
 * @param location - Where the button is located
 */
export const trackGetStartedClick = (location: string) => {
  trackCTAClick('get_started', location, 'Get Started');
};

/**
 * Track "Contact Us" button click
 * @param location - Where the button is located
 */
export const trackContactUsClick = (location: string) => {
  trackCTAClick('contact_us', location, 'Contact Us');
};

/**
 * Track "Request Service" button click
 * @param location - Where the button is located
 * @param serviceName - Name of the service being requested
 */
export const trackRequestServiceClick = (location: string, serviceName?: string) => {
  trackCTAClick('request_service', location, serviceName ? `Request ${serviceName}` : 'Request Service');
};

/**
 * Track "Learn More" button click
 * @param location - Where the button is located
 * @param serviceName - Name of the service
 */
export const trackLearnMoreClick = (location: string, serviceName?: string) => {
  trackCTAClick('learn_more', location, serviceName ? `Learn More - ${serviceName}` : 'Learn More');
};

/**
 * Track "View All Services" button click
 * @param location - Where the button is located
 */
export const trackViewAllServicesClick = (location: string) => {
  trackCTAClick('view_all_services', location, 'View All Services');
};

/**
 * Track "Explore Services" button click
 * @param location - Where the button is located
 */
export const trackExploreServicesClick = (location: string) => {
  trackCTAClick('explore_services', location, 'Explore Services');
};

/**
 * Track "View Road Map" button click
 * @param location - Where the button is located
 */
export const trackViewRoadMapClick = (location: string) => {
  trackCTAClick('view_roadmap', location, 'View Road Map');
};

/**
 * Track "WhatsApp" button/link click
 * @param location - Where the button is located
 */
export const trackWhatsAppClick = (location: string) => {
  trackCTAClick('whatsapp_contact', location, 'WhatsApp');
};

/**
 * Track "Subscribe" newsletter button click
 * @param location - Where the button is located
 */
export const trackSubscribeClick = (location: string) => {
  trackCTAClick('newsletter_subscribe', location, 'Subscribe');
};

