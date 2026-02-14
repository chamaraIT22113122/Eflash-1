// Inventory Management System
const INVENTORY_DB_KEY = 'eflash_inventory'

export const inventoryService = {
  // Initialize inventory from products
  initializeInventory: (products) => {
    const existing = localStorage.getItem(INVENTORY_DB_KEY)
    if (existing) return JSON.parse(existing)

    const inventory = {}
    products.forEach(product => {
      inventory[product.id] = {
        productId: product.id,
        productName: product.name,
        quantity: product.quantity || 50,
        reserved: 0,
        minStock: product.minStock || 5,
        sku: product.sku || `SKU-${product.id}`,
        updatedAt: new Date().toISOString()
      }
    })

    localStorage.setItem(INVENTORY_DB_KEY, JSON.stringify(inventory))
    return inventory
  },

  // Get all inventory
  getAllInventory: () => {
    const inventoryJson = localStorage.getItem(INVENTORY_DB_KEY)
    return inventoryJson ? JSON.parse(inventoryJson) : {}
  },

  // Get inventory for product
  getProductInventory: (productId) => {
    const inventory = inventoryService.getAllInventory()
    return inventory[productId] || null
  },

  // Check stock availability
  isInStock: (productId, quantity = 1) => {
    const item = inventoryService.getProductInventory(productId)
    if (!item) return false
    return (item.quantity - item.reserved) >= quantity
  },

  // Reserve stock (when order placed)
  reserveStock: (productId, quantity) => {
    const inventory = inventoryService.getAllInventory()
    const item = inventory[productId]

    if (!item || (item.quantity - item.reserved) < quantity) {
      return { success: false, error: 'Insufficient stock' }
    }

    item.reserved += quantity
    item.updatedAt = new Date().toISOString()
    localStorage.setItem(INVENTORY_DB_KEY, JSON.stringify(inventory))

    return { success: true, item }
  },

  // Confirm stock (order shipped)
  confirmStock: (productId, quantity) => {
    const inventory = inventoryService.getAllInventory()
    const item = inventory[productId]

    if (!item) return { success: false, error: 'Product not found' }

    item.quantity -= quantity
    item.reserved = Math.max(0, item.reserved - quantity)
    item.updatedAt = new Date().toISOString()
    localStorage.setItem(INVENTORY_DB_KEY, JSON.stringify(inventory))

    return { success: true, item }
  },

  // Cancel reservation (order cancelled)
  cancelReservation: (productId, quantity) => {
    const inventory = inventoryService.getAllInventory()
    const item = inventory[productId]

    if (item) {
      item.reserved = Math.max(0, item.reserved - quantity)
      item.updatedAt = new Date().toISOString()
      localStorage.setItem(INVENTORY_DB_KEY, JSON.stringify(inventory))
    }

    return { success: true, item }
  },

  // Get low stock items
  getLowStockItems: () => {
    const inventory = inventoryService.getAllInventory()
    return Object.values(inventory).filter(
      item => (item.quantity - item.reserved) <= item.minStock
    )
  },

  // Update stock quantity
  updateStockQuantity: (productId, newQuantity) => {
    const inventory = inventoryService.getAllInventory()
    const item = inventory[productId]

    if (item) {
      item.quantity = newQuantity
      item.updatedAt = new Date().toISOString()
      localStorage.setItem(INVENTORY_DB_KEY, JSON.stringify(inventory))
    }

    return item
  },

  // Get inventory report
  getInventoryReport: () => {
    const inventory = inventoryService.getAllInventory()
    const items = Object.values(inventory)

    return {
      totalItems: items.length,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      lowStockCount: items.filter(item => item.quantity <= item.minStock).length,
      outOfStock: items.filter(item => item.quantity === 0).length,
      totalReserved: items.reduce((sum, item) => sum + item.reserved, 0)
    }
  }
}

export default inventoryService
