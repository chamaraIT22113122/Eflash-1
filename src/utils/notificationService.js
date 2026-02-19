// Notification System
const NOTIFICATIONS_KEY = 'eflash_notifications'

export const notificationService = {
  // Send browser notification
  sendBrowserNotification: (title, options = {}) => {
    if (!('Notification' in window)) {
      console.log('Browser notifications not supported')
      return
    }

    if (Notification.permission === 'granted') {
      new Notification(title, options)
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, options)
        }
      })
    }
  },

  // Request notification permission
  requestNotificationPermission: () => {
    if (!('Notification' in window)) return false

    if (Notification.permission === 'granted') {
      return true
    } else if (Notification.permission !== 'denied') {
      return Notification.requestPermission().then(
        (permission) => permission === 'granted'
      )
    }
    return false
  },

  // Store notification
  storeNotification: (notification) => {
    const notifications = notificationService.getNotifications()
    
    const newNotification = {
      id: `NOTIF-${Date.now()}`,
      ...notification,
      createdAt: new Date().toISOString(),
      read: false
    }

    notifications.push(newNotification)
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications))
    
    return newNotification
  },

  // Get all notifications
  getNotifications: () => {
    const notificationsJson = localStorage.getItem(NOTIFICATIONS_KEY)
    return notificationsJson ? JSON.parse(notificationsJson) : []
  },

  // Get unread notifications
  getUnreadNotifications: () => {
    const notifications = notificationService.getNotifications()
    return notifications.filter(n => !n.read)
  },

  // Mark as read
  markAsRead: (notificationId) => {
    const notifications = notificationService.getNotifications()
    const notification = notifications.find(n => n.id === notificationId)
    
    if (notification) {
      notification.read = true
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications))
    }

    return notification
  },

  // Delete notification
  deleteNotification: (notificationId) => {
    const notifications = notificationService.getNotifications()
    const filtered = notifications.filter(n => n.id !== notificationId)
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(filtered))
  },

  // Send order notification
  sendOrderNotification: (order) => {
    const notification = notificationService.storeNotification({
      type: 'order',
      title: `Order ${order.id} Received`,
      message: `Your order of Rs ${order.totalAmount} has been received. Order ID: ${order.id}`,
      data: { orderId: order.id },
      priority: 'high'
    })

    notificationService.sendBrowserNotification(
      `Order ${order.id} Received`,
      {
        body: `Your order has been received. Total: Rs ${order.totalAmount}`,
        icon: 'assets/images/logo.png',
        tag: `order-${order.id}`
      }
    )

    return notification
  },

  // Send new blog post notification
  sendBlogPostNotification: (post) => {
    const notification = notificationService.storeNotification({
      type: 'blog',
      title: `New Blog Post: ${post.title}`,
      message: post.excerpt || post.content.substring(0, 100),
      data: { postId: post.id },
      priority: 'medium'
    })

    notificationService.sendBrowserNotification(
      `New Blog Post: ${post.title}`,
      {
        body: 'Check out our latest article',
        icon: 'assets/images/logo.png',
        tag: `blog-${post.id}`
      }
    )

    return notification
  },

  // Send order status update notification
  sendOrderStatusNotification: (order, status) => {
    const statusMessages = {
      confirmed: `Your order has been confirmed!`,
      processing: `Your order is being processed`,
      shipped: `Your order has been shipped!`,
      delivered: `Your order has been delivered`,
      cancelled: `Your order has been cancelled`
    }

    const notification = notificationService.storeNotification({
      type: 'order-status',
      title: `Order Status Updated`,
      message: `Order ${order.id}: ${statusMessages[status]}`,
      data: { orderId: order.id, status },
      priority: 'high'
    })

    notificationService.sendBrowserNotification(
      `Order ${order.id} - ${status.toUpperCase()}`,
      {
        body: statusMessages[status],
        icon: 'assets/images/logo.png',
        tag: `order-status-${order.id}`
      }
    )

    return notification
  },

  // Send promo notification
  sendPromoNotification: (promo) => {
    const notification = notificationService.storeNotification({
      type: 'promo',
      title: promo.title,
      message: promo.description,
      data: { promoId: promo.id },
      priority: 'low'
    })

    notificationService.sendBrowserNotification(promo.title, {
      body: promo.description,
      icon: 'assets/images/logo.png',
      tag: `promo-${promo.id}`
    })

    return notification
  },

  // Clear old notifications (older than 30 days)
  clearOldNotifications: () => {
    const notifications = notificationService.getNotifications()
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
    
    const filtered = notifications.filter(
      n => new Date(n.createdAt).getTime() > thirtyDaysAgo
    )

    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(filtered))
  }
}

export default notificationService
