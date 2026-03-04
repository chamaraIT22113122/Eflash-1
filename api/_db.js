// Shared MongoDB connection helper for Vercel Serverless Functions
const { MongoClient } = require('mongodb');

let client = null;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI, {
            connectTimeoutMS: 5000,
            serverSelectionTimeoutMS: 5000,
        });
        try {
            await client.connect();
        } catch (err) {
            client = null; // allow retry on next invocation
            throw err;
        }
    }
    return client.db('eflash');
}

// CORS is handled via vercel.json to avoid duplicate headers
function setCorsHeaders(res) { }

// Handle preflight and guard. Returns true if request handled.
function handlePreflightAndGuard(req, res) {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }
    if (!process.env.MONGODB_URI) {
        res.status(503).json({
            error: 'Database not configured',
            message: 'MONGODB_URI environment variable is missing. Set it in the Vercel dashboard.',
        });
        return true;
    }
    return false;
}

module.exports = { connectToDatabase, setCorsHeaders, handlePreflightAndGuard };
