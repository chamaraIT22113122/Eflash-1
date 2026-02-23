import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaImage, FaTags, FaShoppingBag } from 'react-icons/fa'
import productService from '../../utils/productService'
import './ManageProjects.css'   // base form styles (grid, inputs, tags, etc.)
import './ManageProducts.css'
import './AdminBase.css'

const SHOP_CATEGORIES_KEY = 'shopCategories'

const ManageProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // ── Category management ──
    const [categories, setCategories] = useState(() => {
        try {
            const saved = localStorage.getItem(SHOP_CATEGORIES_KEY)
            return saved ? JSON.parse(saved) : ['clothes', 'accessories', 'watch', 'other']
        } catch { return ['clothes', 'accessories', 'watch', 'other'] }
    })
    const [showCategoryManager, setShowCategoryManager] = useState(false)
    const [categoryInput, setCategoryInput] = useState('')

    useEffect(() => {
        localStorage.setItem(SHOP_CATEGORIES_KEY, JSON.stringify(categories))
    }, [categories])

    const addCategory = () => {
        const trimmed = categoryInput.trim()
        if (!trimmed || categories.includes(trimmed)) return
        setCategories(prev => [...prev, trimmed])
        setCategoryInput('')
    }
    const removeCategory = (cat) => setCategories(prev => prev.filter(c => c !== cat))

    // ── Load products ──
    useEffect(() => { loadProducts() }, [])

    const loadProducts = async () => {
        try {
            setLoading(true)
            setError('')
            const all = await productService.getAllProducts()
            setProducts(all)
        } catch {
            setError('Failed to load products. Using offline mode.')
            setProducts(productService.getFallbackProducts())
        } finally {
            setLoading(false)
        }
    }

    const [isAddingNew, setIsAddingNew] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [tagInput, setTagInput] = useState('')
    const [editTagInput, setEditTagInput] = useState('')

    const emptyProduct = {
        name: '',
        description: '',
        price: '',
        category: 'clothes',
        tags: [],
        image: '',
        images: [],
        inStock: true,
        badge: ''   // e.g. "New", "Sale", "Hot"
    }
    const [newProduct, setNewProduct] = useState(emptyProduct)

    // ── CRUD handlers ──
    const handleAddProduct = async () => {
        // Validate required fields
        if (!newProduct.name.trim()) {
            setError('⚠️ Please enter a Product Name.')
            return
        }
        if (!newProduct.price || parseFloat(newProduct.price) <= 0) {
            setError('⚠️ Please enter a valid Price (greater than 0).')
            return
        }
        try {
            setLoading(true)
            setError('')
            const data = {
                ...newProduct,
                price: parseFloat(newProduct.price),
                tags: newProduct.tags.filter(t => t.trim()),
                image: newProduct.image || newProduct.images?.[0] || ''
            }
            await productService.addProduct(data)
            await loadProducts()
            setNewProduct(emptyProduct)
            setIsAddingNew(false)
        } catch {
            setError('Failed to add product. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleSaveEdit = async () => {
        if (!editingProduct) return
        try {
            setLoading(true)
            setError('')
            const id = editingProduct._id || editingProduct.id
            const data = {
                ...editingProduct,
                price: parseFloat(editingProduct.price),
                image: editingProduct.image || editingProduct.images?.[0] || ''
            }
            await productService.updateProduct(id, data)
            await loadProducts()
            setEditingProduct(null)
        } catch {
            setError('Failed to update product. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return
        try {
            setLoading(true)
            setError('')
            await productService.deleteProduct(id)
            await loadProducts()
        } catch {
            setError('Failed to delete product. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // ── Image upload ──
    const handleImageUpload = (e, isEdit = false) => {
        Array.from(e.target.files).forEach(file => {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (isEdit) {
                    setEditingProduct(prev => ({ ...prev, images: [...(prev.images || []), reader.result] }))
                } else {
                    setNewProduct(prev => ({ ...prev, images: [...(prev.images || []), reader.result] }))
                }
            }
            reader.readAsDataURL(file)
        })
    }

    // ── Tags ──
    const addTag = (tag, isEdit = false) => {
        if (!tag.trim()) return
        if (isEdit) {
            if (!(editingProduct.tags || []).includes(tag))
                setEditingProduct(prev => ({ ...prev, tags: [...(prev.tags || []), tag] }))
        } else {
            if (!newProduct.tags.includes(tag))
                setNewProduct(prev => ({ ...prev, tags: [...prev.tags, tag] }))
        }
    }
    const removeTag = (tag, isEdit = false) => {
        if (isEdit) setEditingProduct(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
        else setNewProduct(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
    }

    // ── Reusable form ──
    const renderForm = (data, setter, isEdit = false) => (
        <>
            <div className="form-section-title">Product Information</div>
            <div className="form-grid">

                <div className="form-group">
                    <label>Product Name *</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setter(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Oversize T-Shirt"
                    />
                </div>

                <div className="form-group">
                    <label>Price (Rs) *</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={data.price}
                        onChange={e => setter(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="e.g. 2650.00"
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        value={data.category || ''}
                        onChange={e => setter(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="Type or pick below…"
                    />
                    {categories.length > 0 && (
                        <div className="category-chips">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`category-chip${data.category === cat ? ' active' : ''}`}
                                    onClick={() => setter(prev => ({ ...prev, category: cat }))}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label>Badge (optional)</label>
                    <input
                        type="text"
                        value={data.badge || ''}
                        onChange={e => setter(prev => ({ ...prev, badge: e.target.value }))}
                        placeholder="e.g. New, Sale, Hot"
                    />
                </div>

                <div className="form-group full-width">
                    <label>Description *</label>
                    <textarea
                        value={data.description}
                        onChange={e => setter(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Product description shown on the shop card"
                        rows={3}
                    />
                </div>

                <div className="form-group">
                    <label>In Stock</label>
                    <div className="stock-toggle-row">
                        <label className="stock-toggle">
                            <input
                                type="checkbox"
                                checked={data.inStock !== false}
                                onChange={e => setter(prev => ({ ...prev, inStock: e.target.checked }))}
                            />
                            <span className="toggle-slider" />
                        </label>
                        <span className="stock-label">{data.inStock !== false ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="form-group full-width">
                    <label>Tags</label>
                    <div className="tag-input-row">
                        <input
                            type="text"
                            value={isEdit ? editTagInput : tagInput}
                            onChange={e => isEdit ? setEditTagInput(e.target.value) : setTagInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ',') {
                                    e.preventDefault()
                                    const val = isEdit ? editTagInput : tagInput
                                    addTag(val, isEdit)
                                    isEdit ? setEditTagInput('') : setTagInput('')
                                }
                            }}
                            placeholder="Type tag and press Enter"
                        />
                        <button type="button" className="btn-add-tag" onClick={() => {
                            const val = isEdit ? editTagInput : tagInput
                            addTag(val, isEdit)
                            isEdit ? setEditTagInput('') : setTagInput('')
                        }}>Add</button>
                    </div>
                    <div className="tags-list">
                        {(data.tags || []).map(tag => (
                            <span key={tag} className="tag-chip">
                                {tag}
                                <button type="button" onClick={() => removeTag(tag, isEdit)}><FaTimes /></button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Images */}
                <div className="form-group full-width">
                    <label>Product Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={e => handleImageUpload(e, isEdit)}
                    />
                    {/* Image URL fallback */}
                    <input
                        type="url"
                        value={data.image || ''}
                        onChange={e => setter(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="Or paste an image URL…"
                        style={{ marginTop: '0.5rem' }}
                    />
                    {(data.images || []).length > 0 && (
                        <div className="image-preview-grid">
                            {(data.images || []).map((img, idx) => (
                                <div key={idx} className="image-preview-item">
                                    <img src={img} alt={`Preview ${idx}`} />
                                    <button
                                        type="button"
                                        className="remove-img-btn"
                                        onClick={() => setter(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </>
    )

    return (
        <div className="manage-products admin-page admin-content">
            {/* Header */}
            <div className="products-header">
                <h1><FaShoppingBag style={{ marginRight: '0.5rem' }} />Manage Shop Products</h1>
                <div className="header-actions">
                    <button
                        className="manage-categories-btn"
                        onClick={() => setShowCategoryManager(v => !v)}
                    >
                        <FaTags /> Manage Categories
                    </button>
                    {!isAddingNew && (
                        <button className="add-product-btn" onClick={() => setIsAddingNew(true)}>
                            <FaPlus /> Add New Product
                        </button>
                    )}
                </div>
            </div>

            {/* Category Manager */}
            {showCategoryManager && (
                <motion.div
                    className="category-manager-panel"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h3><FaTags /> Shop Categories</h3>
                    <p className="category-manager-hint">These categories appear as quick-pick chips when adding/editing a product.</p>
                    <div className="category-manager-input-row">
                        <input
                            type="text"
                            value={categoryInput}
                            onChange={e => setCategoryInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCategory() } }}
                            placeholder="New category name…"
                        />
                        <button type="button" className="btn-add-category" onClick={addCategory}>
                            <FaPlus /> Add
                        </button>
                    </div>
                    <div className="category-manager-list">
                        {categories.length === 0 && <span className="no-categories">No categories yet.</span>}
                        {categories.map(cat => (
                            <span key={cat} className="category-manager-chip">
                                {cat}
                                <button type="button" onClick={() => removeCategory(cat)}><FaTimes /></button>
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}

            {error && <div className="error-banner">{error}</div>}
            {loading && <div className="loading-banner">Saving…</div>}

            {/* Add New Product Form */}
            {isAddingNew && (
                <motion.div
                    className="product-form-card"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h3>Add New Product</h3>
                    {renderForm(newProduct, setNewProduct, false)}
                    <div className="form-actions">
                        <button onClick={() => setIsAddingNew(false)} className="btn-cancel">
                            <FaTimes /> Cancel
                        </button>
                        <button onClick={handleAddProduct} className="btn-save" disabled={loading}>
                            <FaSave /> Add Product
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Edit Modal */}
            {editingProduct && (
                <motion.div
                    className="product-form-card edit-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="edit-modal-inner">
                        <h3>Edit Product: {editingProduct.name}</h3>
                        {renderForm(editingProduct, setEditingProduct, true)}
                        <div className="form-actions">
                            <button onClick={() => setEditingProduct(null)} className="btn-cancel">
                                <FaTimes /> Cancel
                            </button>
                            <button onClick={handleSaveEdit} className="btn-save" disabled={loading}>
                                <FaSave /> Save Changes
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Products Grid */}
            {!isAddingNew && !editingProduct && (
                <div className="shop-products-grid">
                    {products.map(product => (
                        <motion.div key={product._id || product.id} className="shop-product-card" layout>
                            <div className="product-thumb">
                                {product.image || product.images?.[0] ? (
                                    <img src={product.image || product.images?.[0]} alt={product.name} />
                                ) : (
                                    <div className="no-image"><FaImage /><span>No Image</span></div>
                                )}
                                {product.badge && <span className="product-badge">{product.badge}</span>}
                                {product.inStock === false && <span className="out-of-stock-badge">Out of Stock</span>}
                            </div>
                            <div className="product-info-block">
                                <h3>{product.name}</h3>
                                <p className="product-cat-label">{product.category}</p>
                                <p className="product-price-label">Rs {parseFloat(product.price || 0).toFixed(2)}</p>
                                <p className="product-desc-preview">{product.description}</p>
                                {(product.tags || []).length > 0 && (
                                    <div className="product-tags-row">
                                        {product.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="product-tag-chip">{tag}</span>
                                        ))}
                                        {product.tags.length > 3 && <span className="product-tag-more">+{product.tags.length - 3}</span>}
                                    </div>
                                )}
                            </div>
                            <div className="product-card-actions">
                                <button onClick={() => setEditingProduct({ ...product })} className="btn-edit" title="Edit">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(product._id || product.id)} className="btn-delete" title="Delete">
                                    <FaTrash />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {products.length === 0 && !isAddingNew && !loading && (
                <div className="no-products">
                    <FaShoppingBag size={48} />
                    <h3>No products yet</h3>
                    <p>Click "Add New Product" to add your first shop item</p>
                </div>
            )}
        </div>
    )
}

export default ManageProducts
