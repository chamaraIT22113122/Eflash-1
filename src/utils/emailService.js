// Email service for sending notifications
export const emailService = {
  sendContactFormNotification: async (formData) => {
    try {
      // When backend is ready, send to API endpoint
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact-form',
          to: 'info@eflash24.tech',
          data: formData
        })
      })
      return response.json()
    } catch (error) {
      console.error('Email notification error:', error)
      // Fallback: use EmailJS if backend fails
      return { success: false, error: error.message }
    }
  },

  sendOrderConfirmation: async (orderData) => {
    try {
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order-confirmation',
          to: orderData.customerEmail,
          cc: 'orders@eflash24.tech',
          data: orderData
        })
      })
      return response.json()
    } catch (error) {
      console.error('Order confirmation error:', error)
      return { success: false, error: error.message }
    }
  },

  sendAdminNotification: async (notificationData) => {
    try {
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'admin-notification',
          to: 'info@eflash24.tech',
          data: notificationData
        })
      })
      return response.json()
    } catch (error) {
      console.error('Admin notification error:', error)
      return { success: false, error: error.message }
    }
  }
}

export default emailService
