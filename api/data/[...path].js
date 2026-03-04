// GET /api/data/:collection
// GET /api/data/:collection/:id
// POST /api/data/:collection
// PUT /api/data/:collection/:id
// DELETE /api/data/:collection/:id
const { ObjectId } = require('mongodb');
const { connectToDatabase, handlePreflightAndGuard } = require('../_db');

module.exports = async (req, res) => {
    if (handlePreflightAndGuard(req, res)) return;

    try {
        const { path } = req.query; // [...path] array
        if (!path || path.length === 0) {
            return res.status(400).json({ error: 'Collection name required' });
        }

        const collectionName = path[0];
        const documentId = path[1];

        const db = await connectToDatabase();
        const collection = db.collection(collectionName);

        switch (req.method) {
            case 'GET':
                if (!documentId) {
                    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
                    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

                    let cursor = collection.find({}).sort({ createdAt: -1 });
                    if (skip > 0) cursor = cursor.skip(skip);
                    if (limit > 0) cursor = cursor.limit(limit);

                    const documents = await cursor.toArray();
                    return res.status(200).json(documents);
                } else {
                    const document = await collection.findOne({ _id: new ObjectId(documentId) });
                    if (!document) return res.status(404).json({ error: `${collectionName} not found` });
                    return res.status(200).json(document);
                }

            case 'POST':
                const newDocument = {
                    ...req.body,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                const insertResult = await collection.insertOne(newDocument);
                const createdDocument = await collection.findOne({ _id: insertResult.insertedId });
                return res.status(201).json(createdDocument);

            case 'PUT':
                if (!documentId) return res.status(400).json({ error: 'Document ID required' });

                const updateData = { ...req.body, updatedAt: new Date() };
                delete updateData._id;

                const updateResult = await collection.updateOne(
                    { _id: new ObjectId(documentId) },
                    { $set: updateData }
                );
                if (updateResult.matchedCount === 0) return res.status(404).json({ error: `${collectionName} not found` });

                const updatedDocument = await collection.findOne({ _id: new ObjectId(documentId) });
                return res.status(200).json(updatedDocument);

            case 'DELETE':
                if (!documentId) return res.status(400).json({ error: 'Document ID required' });

                const deleteResult = await collection.deleteOne({ _id: new ObjectId(documentId) });
                if (deleteResult.deletedCount === 0) return res.status(404).json({ error: `${collectionName} not found` });

                return res.status(200).json({ message: `${collectionName} deleted successfully` });

            default:
                return res.status(405).json({ error: 'Method not allowed' });
        }

    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
