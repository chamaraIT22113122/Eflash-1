const { MongoClient, ObjectId } = require('mongodb');

let client = null;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
    }
    return client.db('eflash');
}

// CORS headers — allow cross-origin calls from GitHub Pages
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};

exports.handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('products');
        // Strip prefix for both direct and proxied access:
        //   Direct:  /.netlify/functions/products[/id]
        //   Proxied: /api/products[/id]  (via netlify.toml redirect)
        const rawPath = event.path || '';
        const subPath = rawPath.replace(/^.*\/products/, '');
        const pathParts = subPath.split('/').filter(Boolean);

        switch (event.httpMethod) {
            // ── GET ──────────────────────────────────────────────────────────────
            case 'GET':
                if (pathParts.length === 0) {
                    // Get all products — exclude base64 images array to stay under 6MB limit.
                    // The `image` thumbnail URL field is kept for card display.
                    const products = await collection
                        .find({}, { projection: { images: 0 } })
                        .sort({ createdAt: -1 })
                        .toArray();
                    return { statusCode: 200, headers, body: JSON.stringify(products) };
                } else {
                    const product = await collection.findOne({ _id: new ObjectId(pathParts[0]) });
                    if (!product) return { statusCode: 404, headers, body: JSON.stringify({ error: 'Product not found' }) };
                    return { statusCode: 200, headers, body: JSON.stringify(product) };
                }

            // ── POST ─────────────────────────────────────────────────────────────
            case 'POST': {
                const newProduct = {
                    ...JSON.parse(event.body),
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                const insertResult = await collection.insertOne(newProduct);
                const created = await collection.findOne({ _id: insertResult.insertedId });
                return { statusCode: 201, headers, body: JSON.stringify(created) };
            }

            // ── PUT ──────────────────────────────────────────────────────────────
            case 'PUT': {
                if (pathParts.length === 0) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Product ID required' }) };
                const updateData = { ...JSON.parse(event.body), updatedAt: new Date() };
                delete updateData._id;
                const updateResult = await collection.updateOne(
                    { _id: new ObjectId(pathParts[0]) },
                    { $set: updateData }
                );
                if (updateResult.matchedCount === 0) return { statusCode: 404, headers, body: JSON.stringify({ error: 'Product not found' }) };
                const updated = await collection.findOne({ _id: new ObjectId(pathParts[0]) });
                return { statusCode: 200, headers, body: JSON.stringify(updated) };
            }

            // ── DELETE ───────────────────────────────────────────────────────────
            case 'DELETE': {
                if (pathParts.length === 0) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Product ID required' }) };
                const deleteResult = await collection.deleteOne({ _id: new ObjectId(pathParts[0]) });
                if (deleteResult.deletedCount === 0) return { statusCode: 404, headers, body: JSON.stringify({ error: 'Product not found' }) };
                return { statusCode: 200, headers, body: JSON.stringify({ message: 'Product deleted successfully' }) };
            }

            default:
                return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
        }

    } catch (error) {
        console.error('Database error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error', message: error.message })
        };
    }
};
