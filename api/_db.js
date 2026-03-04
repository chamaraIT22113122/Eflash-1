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

// Apply CORS headers to every response
function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
}

// Handle OPTIONS preflight and missing MONGODB_URI guard.
// Returns true if the request was handled (caller should return early).
function handlePreflightAndGuard(req, res) {
    setCorsHeaders(res);
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }
    if (!process.env.MONGODB_URI) {
        res.status(503).json({
            error: 'Database not configured',
            message: 'MONGODB_URI environment variable is missing. Set it in the Vercel dashboard under Project Settings > Environment Variables.',
        });
        return true;
    }
    return false;
}

module.exports = { connectToDatabase, setCorsHeaders, handlePreflightAndGuard };
