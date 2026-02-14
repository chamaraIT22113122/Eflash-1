// Order Management System
const ORDERS_DB_KEY = 'eflash_orders'

export const orderService = {
  // Create new order
  createOrder: (orderData) => {
    const order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...orderData,
      status: 'pending', // pending, confirmed, processing, shipped, delivered, cancelled
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Save to backend when ready
    ;(async () => {
      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order)
        })
      } catch (error) {
        console.log('Backend unavailable, saving locally:', error)
      }
    })()

    // Save locally as backup
    const orders = orderService.getAllOrders()
    orders.push(order)
    localStorage.setItem(ORDERS_DB_KEY, JSON.stringify(orders))

    return order
  },

  // Get all orders
  getAllOrders: () => {
    const ordersJson = localStorage.getItem(ORDERS_DB_KEY)
    return ordersJson ? JSON.parse(ordersJson) : []
  },

  // Get order by ID
  getOrderById: (orderId) => {
    const orders = orderService.getAllOrders()
    return orders.find(order => order.id === orderId)
  },

  // Get user orders by email
  getUserOrders: (email) => {
    const orders = orderService.getAllOrders()
    return orders.filter(order => order.customerEmail === email)
  },

  // Update order status
  updateOrderStatus: (orderId, newStatus) => {
    const orders = orderService.getAllOrders()
    const orderIndex = orders.findIndex(order => order.id === orderId)
    
    if (orderIndex !== -1) {
      orders[orderIndex].status = newStatus
      orders[orderIndex].updatedAt = new Date().toISOString()
      localStorage.setItem(ORDERS_DB_KEY, JSON.stringify(orders))
      
      // Sync with backend
      ;(async () => {
        try {
          await fetch(`/api/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
          })
        } catch (error) {
          console.log('Backend sync failed:', error)
        }
      })()
      
      return orders[orderIndex]
    }
    return null
  },

  // Cancel order
  cancelOrder: (orderId, reason) => {
    return orderService.updateOrderStatus(orderId, 'cancelled')
  },

  // Get order statistics
  getOrderStats: () => {
    const orders = orderService.getAllOrders()
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue: orders
        .filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + (o.totalAmount || 0), 0)
    }
  }
}

export default orderService
