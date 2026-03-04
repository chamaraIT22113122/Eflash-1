// GET /api/reviews
// POST /api/reviews
const { connectToDatabase, handlePreflightAndGuard } = require('./_db');

module.exports = async (req, res) => {
    if (handlePreflightAndGuard(req, res)) return;

    try {
        const db = await connectToDatabase();
        const collection = db.collection('reviews');

        if (req.method === 'GET') {
            const reviews = await collection.find({}).sort({ createdAt: -1 }).toArray();
            return res.status(200).json(reviews);
        }

        if (req.method === 'POST') {
            const newReview = {
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const insertResult = await collection.insertOne(newReview);
            const created = await collection.findOne({ _id: insertResult.insertedId });
            return res.status(201).json(created);
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
