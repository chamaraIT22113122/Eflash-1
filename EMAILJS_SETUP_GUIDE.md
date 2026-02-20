# EmailJS Configuration Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up Free"**
3. Create account with email or Google
4. Free plan includes **200 emails/month**

---

### Step 2: Add Email Service

1. **Go to Email Services**:
   - Dashboard → Email Services → Add New Service

2. **Choose Email Provider**:
   - **Gmail** (recommended for beginners)
   - Outlook
   - Yahoo
   - Custom SMTP

3. **For Gmail**:
   - Click "Connect Account"
   - Login with your Gmail
   - Allow EmailJS permissions
   - Name your service (e.g., "Eflash Contact")
   - Copy the **Service ID** (looks like: `service_abc1234`)

---

### Step 3: Create Email Templates

#### Contact Form Template

1. **Go to Email Templates** → Create New Template
2. **Template Name**: `contact_form`
3. **Template Content**:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
Sent from Eflash Contact Form
```

4. **Copy Template ID** (looks like: `template_xyz5678`)

#### Newsletter Template

1. **Create another template**
2. **Template Name**: `newsletter_broadcast`
3. **Template Content**:

```
Subject: {{subject}}

{{content}}

---
This email was sent to {{to_email}}
Unsubscribe: {{unsubscribe_link}}
```

4. **Copy Template ID**

---

### Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find **Public Key** (looks like: `user_aBcDeFgHiJkLmNoPqRs`)
3. Copy it

---

### Step 5: Configure in Your Project

#### Create Environment File

Create `.env` in project root:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_xyz5678
VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=template_xyz5679
VITE_EMAILJS_PUBLIC_KEY=user_aBcDeFgHiJkLmNoPqRs
```

Replace with your actual IDs!

---

### Step 6: Install EmailJS SDK

```bash
npm install @emailjs/browser
```

---

## 🔧 Implementation

### Contact Form (Already Configured)

Your Contact form is ready to use EmailJS. Just add the environment variables!

**Features**:
- ✅ Send email on form submission
- ✅ Loading state during send
- ✅ Success/error notifications
- ✅ Form validation

**Usage**: Fill out `/contact` form and submit

---

### Newsletter (Already Configured)

Newsletter component in admin panel ready!

**Features**:
- ✅ Compose email with subject and content
- ✅ Send to all subscribers or custom list
- ✅ HTML content support
- ✅ Subscriber management

**Usage**: Go to `/admin/newsletter` and compose

---

## 📋 Email Template Variables

### Contact Form Variables
- `{{from_name}}` - Customer name
- `{{from_email}}` - Customer email
- `{{phone}}` - Phone number
- `{{message}}` - Message content

### Newsletter Variables
- `{{subject}}` - Email subject
- `{{content}}` - Email body (HTML supported)
- `{{to_email}}` - Recipient email
- `{{unsubscribe_link}}` - Optional unsubscribe link

---

## ⚙️ Advanced Configuration

### Custom Email Templates

You can customize templates in EmailJS dashboard:

1. **Add dynamic content**:
   ```
   Hello {{to_name}},
   
   {{custom_message}}
   
   Best regards,
   {{from_name}}
   ```

2. **HTML Styling**:
   ```html
   <h2 style="color: #667eea;">{{subject}}</h2>
   <div style="padding: 20px; background: #f5f5f5;">
     {{content}}
   </div>
   ```

3. **Conditional Content**:
   - Use EmailJS template editor
   - Add if/else logic
   - Dynamic sections

---

### Auto-Reply Setup

1. **Create Auto-Reply Template**:
   ```
   Subject: Thank you for contacting Eflash!

   Hi {{from_name}},

   Thank you for reaching out! We've received your message and will get back to you within 24 hours.

   Your message:
   {{message}}

   Best regards,
   Eflash Team
   ```

2. **Update Contact Form** to send two emails:
   - One to you (notification)
   - One to customer (auto-reply)

---

### Email Validation

Add to forms:

```javascript
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

---

### Rate Limiting

Prevent spam:

```javascript
const sendEmail = async (data) => {
  const lastSent = localStorage.getItem('last_email_sent');
  const now = Date.now();
  
  if (lastSent && now - lastSent < 60000) {
    throw new Error('Please wait 1 minute before sending another email');
  }
  
  // Send email...
  localStorage.setItem('last_email_sent', now);
};
```

---

## 🔐 Security Best Practices

### 1. **Protect Your Keys**
- ✅ Store in `.env` file
- ✅ Add `.env` to `.gitignore`
- ❌ Never commit keys to Git
- ❌ Never expose in client-side code comments

### 2. **Add reCAPTCHA** (Optional)
Prevent bot spam:
1. Get reCAPTCHA keys from [Google reCAPTCHA](https://www.google.com/recaptcha/)
2. Add to forms
3. Verify before sending email

### 3. **Email Allowlist**
In EmailJS dashboard:
- Settings → Access Control
- Add allowed domains
- Prevent unauthorized usage

### 4. **Monitor Usage**
- Check EmailJS dashboard regularly
- Set up usage alerts
- Monitor for abuse

---

## 📊 Monitoring & Analytics

### EmailJS Dashboard
Track:
- Total emails sent
- Success/failure rates
- Usage statistics
- Error logs

### Custom Analytics
Add to your code:

```javascript
import { trackEvent } from '../utils/analyticsTracking';

// After successful email send
trackEvent('Contact', 'Email Sent', 'Contact Form');
```

---

## 🐛 Troubleshooting

### Email Not Sending?

1. **Check Environment Variables**:
   ```javascript
   console.log(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
   ```
   Should NOT be undefined

2. **Check Template IDs**:
   - Verify in EmailJS dashboard
   - Match exactly (case-sensitive)

3. **Check Template Variables**:
   - Variable names must match
   - Use double curly braces: `{{variable}}`

4. **Check Console**:
   - Look for error messages
   - EmailJS errors are descriptive

5. **Check Email Service**:
   - Ensure Gmail is connected
   - Re-authorize if needed

### Common Errors

**"Invalid Public Key"**:
- Verify public key is correct
- Check for typos
- Ensure `.env` is in root directory

**"Template Not Found"**:
- Check template ID spelling
- Ensure template is active in dashboard

**"Service Unavailable"**:
- Check service ID
- Verify email service is connected

**"Network Error"**:
- Check internet connection
- Try again after a few minutes

---

## 💡 Tips & Best Practices

### 1. **Test Thoroughly**
- Send test emails before going live
- Check spam folder
- Test on different devices

### 2. **Customize Templates**
- Add your branding
- Use company colors
- Include logo

### 3. **Set Up Notifications**
- Get notified of new contacts
- Forward to multiple team members
- Use filters in Gmail

### 4. **Track Conversions**
- Use Google Analytics events
- Monitor contact form submissions
- Track newsletter signups

### 5. **Backup Plan**
- Keep alternative contact method
- Show phone number
- Provide social media links

---

## 📧 Email Configuration Examples

### Gmail SMTP (Custom)
If not using EmailJS OAuth:
- Host: smtp.gmail.com
- Port: 587 (TLS) or 465 (SSL)
- Username: your-email@gmail.com
- App Password: Create in Google Account settings

### Outlook/Hotmail
- Host: smtp-mail.outlook.com
- Port: 587
- Username: your-email@outlook.com
- Password: Your account password

### Custom Domain (e.g., admin@eflash24.tech)
- Use your hosting provider's SMTP
- Contact hosting support for details
- Usually found in cPanel/Plesk

---

## 🚀 Next Steps

1. **Create EmailJS Account** (5 min)
2. **Set Up Service** (3 min)
3. **Create Templates** (5 min)
4. **Add Environment Variables** (2 min)
5. **Install SDK**: `npm install @emailjs/browser` (1 min)
6. **Test Contact Form** (2 min)
7. **Test Newsletter** (2 min)

**Total Time: ~20 minutes**

---

## 📚 Additional Resources

- **EmailJS Docs**: https://www.emailjs.com/docs/
- **Template Guide**: https://www.emailjs.com/docs/user-guide/creating-email-template/
- **SDK Reference**: https://www.emailjs.com/docs/sdk/installation/
- **Best Practices**: https://www.emailjs.com/docs/best-practices/

---

## ✅ Quick Checklist

- [ ] Created EmailJS account
- [ ] Connected email service (Gmail)
- [ ] Created contact form template
- [ ] Created newsletter template
- [ ] Copied Service ID
- [ ] Copied Template IDs
- [ ] Copied Public Key
- [ ] Created `.env` file
- [ ] Added all environment variables
- [ ] Installed EmailJS SDK: `npm install @emailjs/browser`
- [ ] Restarted dev server
- [ ] Tested contact form
- [ ] Tested newsletter send
- [ ] Checked email delivery
- [ ] Checked spam folder
- [ ] Set up auto-reply (optional)
- [ ] Added reCAPTCHA (optional)
- [ ] Configured allowlist in EmailJS

---

## 🎉 You're All Set!

Once configured, your website will have:
- ✅ Working contact form
- ✅ Newsletter email sending
- ✅ Professional email templates
- ✅ Delivery notifications
- ✅ Error handling

**Questions?** Check EmailJS support or the troubleshooting section above.

---

**Last Updated**: February 2026  
**EmailJS Version**: Compatible with latest SDK  
**Free Plan**: 200 emails/month

---

*Happy emailing! 📬*
