/**
 * Google Analytics utility
 * Replace G-XXXXXXXXXX with your actual GA4 ID
 */

export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackPageView = (pagePath, pageTitle) => {
  if (window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Track specific user actions
export const trackClickEvent = (elementName) => {
  trackEvent('click', {
    element_name: elementName,
    timestamp: new Date().toISOString(),
  });
};

export const trackFormSubmit = (formName) => {
  trackEvent('form_submit', {
    form_name: formName,
    timestamp: new Date().toISOString(),
  });
};

export const trackContactFormSubmit = (formData = {}) => {
  trackEvent('contact_form_submit', {
    has_file: !!formData.file,
    subject_length: formData.subject?.length || 0,
    timestamp: new Date().toISOString(),
  });
};

export const trackProductView = (productName, price) => {
  trackEvent('view_item', {
    items: [
      {
        item_name: productName,
        price: price,
        quantity: 1,
      },
    ],
  });
};

export const trackAddToCart = (productName, price) => {
  trackEvent('add_to_cart', {
    items: [
      {
        item_name: productName,
        price: price,
        quantity: 1,
      },
    ],
  });
};

export const trackWhatsAppClick = (page) => {
  trackEvent('whatsapp_click', {
    page_name: page,
    timestamp: new Date().toISOString(),
  });
};

export const trackPackageSelect = (packageName) => {
  trackEvent('package_select', {
    package_name: packageName,
    timestamp: new Date().toISOString(),
  });
};

export const trackServiceClick = (serviceName) => {
  trackEvent('service_click', {
    service_name: serviceName,
    timestamp: new Date().toISOString(),
  });
};

export default {
  trackEvent,
  trackPageView,
  trackClickEvent,
  trackFormSubmit,
  trackContactFormSubmit,
  trackProductView,
  trackAddToCart,
  trackWhatsAppClick,
  trackPackageSelect,
  trackServiceClick,
};