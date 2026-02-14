import React from 'react'
import { motion } from 'framer-motion'
import { FaTrash, FaShoppingBag, FaWhatsapp, FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { trackEvent } from '../utils/analytics'
import './Cart.css'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const toast = useToast()

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId)
    toast.success(`${productName} removed from cart`)
    trackEvent('cart_item_removed', { product_id: productId, product_name: productName })
  }

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity)
    trackEvent('cart_quantity_updated', { product_id: productId, quantity: newQuantity })
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    const cartSummary = cartItems
      .map((item) => `${item.name} x${item.quantity} - Rs ${(item.price * item.quantity).toFixed(2)}`)
      .join('\n')

    const total = getTotalPrice().toFixed(2)
    const message = `Hello! I would like to place an order:\n\n${cartSummary}\n\nTotal: Rs ${total}`

    const whatsappUrl = `https://wa.me/94775608073?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')

    toast.success('Opening WhatsApp for checkout')
    trackEvent('checkout_initiated', {
      total_items: cartItems.length,
      total_price: total,
      item_count: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    })
  }

  const handleClearCart = () => {
    if (cartItems.length === 0) {
      toast.warning('Cart is already empty')
      return
    }

    if (window.confirm('Are you sure you want to clear the entire cart?')) {
      clearCart()
      toast.success('Cart cleared')
      trackEvent('cart_cleared', {})
    }
  }

  return (
    <main className="cart-page">
      <SEO
        title="Shopping Cart - E Flash"
        description="Review your selected products and proceed to checkout"
        keywords="shopping cart, checkout, products, order"
      />

      <section className="cart-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cart-header-content"
          >
            <FaShoppingBag className="cart-icon" />
            <h1>Shopping Cart</h1>
            <p>{cartItems.length} item(s) in cart</p>
          </motion.div>
        </div>
      </section>

      <section className="cart-content">
        <div className="container">
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="empty-cart"
            >
              <FaShoppingBag className="empty-icon" />
              <h2>Your cart is empty</h2>
              <p>Explore our products and add something to your cart!</p>
              <Link to="/shop" className="btn btn-primary btn-lg">
                <FaArrowLeft /> Continue Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="cart-layout">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="cart-items-section"
              >
                <h2>Items in Cart</h2>
                <div className="cart-items">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="cart-item"
                    >
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p className="item-price">Rs {item.price.toFixed(2)}</p>
                        <p className="item-description">{item.description}</p>
                      </div>

                      <div className="cart-item-quantity">
                        <label>Quantity:</label>
                        <div className="quantity-controls">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="qty-btn"
                          >
                            <FaMinus />
                          </motion.button>
                          <span className="qty-value">{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="qty-btn"
                          >
                            <FaPlus />
                          </motion.button>
                        </div>
                      </div>

                      <div className="cart-item-total">
                        <label>Total:</label>
                        <span className="total-price">
                          Rs {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="remove-btn"
                        title="Remove from cart"
                      >
                        <FaTrash />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Cart Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="cart-summary-section"
              >
                <div className="cart-summary">
                  <h2>Order Summary</h2>

                  <div className="summary-item">
                    <span>Subtotal:</span>
                    <span>Rs {getTotalPrice().toFixed(2)}</span>
                  </div>

                  <div className="summary-item">
                    <span>Items:</span>
                    <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-total">
                    <span>Total:</span>
                    <span>Rs {getTotalPrice().toFixed(2)}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="btn btn-primary btn-checkout btn-lg"
                  >
                    <FaWhatsapp /> Proceed to Checkout
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClearCart}
                    className="btn btn-outline-danger btn-clear-cart"
                  >
                    Clear Cart
                  </motion.button>

                  <Link to="/shop" className="btn btn-outline-primary btn-continue">
                    <FaArrowLeft /> Continue Shopping
                  </Link>

                  <div className="cart-info">
                    <p>✓ Secure checkout via WhatsApp</p>
                    <p>✓ Fast delivery across Sri Lanka</p>
                    <p>✓ Multiple payment options available</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Cart
