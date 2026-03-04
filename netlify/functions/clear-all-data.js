const { MongoClient } = require('mongodb');

let client = null;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI, {
            connectTimeoutMS: 8000,
            serverSelectionTimeoutMS: 8000,
        });
        await client.connect();
    }
    return client.db('eflash');
}

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed. Use POST.' }) };
    }

    if (!process.env.MONGODB_URI) {
        return { statusCode: 503, headers, body: JSON.stringify({ error: 'MONGODB_URI not set' }) };
    }

    try {
        const db = await connectToDatabase();

        const projectsResult = await db.collection('projects').deleteMany({});
        const productsResult = await db.collection('products').deleteMany({});

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: 'All data cleared successfully',
                deletedProjects: projectsResult.deletedCount,
                deletedProducts: productsResult.deletedCount
            })
        };
    } catch (error) {
        console.error('Clear data error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to clear data', message: error.message })
        };
    }
};
