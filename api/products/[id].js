// PUT /api/products/:id
// DELETE /api/products/:id
// GET /api/products/:id
const { ObjectId } = require('mongodb');
const { connectToDatabase, handlePreflightAndGuard } = require('../_db');

function isValidObjectId(id) {
    return typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
}

module.exports = async (req, res) => {
    if (handlePreflightAndGuard(req, res)) return;

    try {
        const { id } = req.query;
        if (!isValidObjectId(id)) {
            if (req.method === 'PUT' || req.method === 'DELETE') {
                return res.status(400).json({ error: 'Invalid product ID format. This product may have been created in offline mode and cannot be updated/deleted via the database.' });
            }
            return res.status(400).json({ error: 'Invalid product ID format' });
        }

        const db = await connectToDatabase();
        const collection = db.collection('products');

        if (req.method === 'GET') {
            const product = await collection.findOne({ _id: new ObjectId(id) });
            if (!product) return res.status(404).json({ error: 'Product not found' });
            return res.status(200).json(product);
        }

        if (req.method === 'PUT') {
            const updateData = { ...req.body, updatedAt: new Date() };
            delete updateData._id;

            const updateResult = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
            );
            if (updateResult.matchedCount === 0) return res.status(404).json({ error: 'Product not found' });

            const updated = await collection.findOne({ _id: new ObjectId(id) });
            return res.status(200).json(updated);
        }

        if (req.method === 'DELETE') {
            const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
            if (deleteResult.deletedCount === 0) return res.status(404).json({ error: 'Product not found' });
            return res.status(200).json({ message: 'Product deleted successfully' });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
