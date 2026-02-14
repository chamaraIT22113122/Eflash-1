# Google Analytics 4 Setup Guide

## Current Status
Analytics infrastructure is fully implemented and ready. The system is currently using a placeholder Measurement ID.

## How to Configure

### 1. Get Your Google Analytics 4 Measurement ID
- Visit [Google Analytics](https://analytics.google.com/)
- Create or select your property
- Find your Measurement ID (looks like `G-XXXXXXXXXX`)

### 2. Replace the Placeholder ID

Replace `G-XXXXXXXXXX` in the following locations:

**In `index.html` (lines 16-22):**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID-HERE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR-ID-HERE');
</script>
```

### 3. Events Being Tracked

The system automatically tracks these events:

**Contact Form:**
- `contact_form_success` - When form submitted successfully
- `contact_form_error` - When validation fails
- `form_validation_error` - Validation errors

**Shop Page:**
- `product_order_initiated` - When product order starts
- `product_view` - When product is viewed
- `file_uploaded` - When file is attached

**Admin Panel:**
- `admin_login_success` - Successful login
- `admin_login_failed` - Failed login attempt

**Packages:**
- `package_selected` - When package is selected
- `whatsapp_click` - When WhatsApp button is clicked
- `custom_package_inquiry` - Custom package request

### 4. Verify Setup

After replacing the ID:
1. Deploy the updated `index.html`
2. Open your site in browser
3. Open DevTools → Console
4. You should see gtag messages confirming data collection
5. Check Google Analytics dashboard after a few hours

## Need Help?
Refer to [Google Analytics Setup Documentation](https://support.google.com/analytics/answer/9304153)
