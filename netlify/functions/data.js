const { MongoClient, ObjectId } = require('mongodb');

let client = null;

// Database connection helper
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
  }
  return client.db('eflash');
}

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};

exports.handler = async (event, context) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const db = await connectToDatabase();
    const path = event.path?.replace('/.netlify/functions/data', '') || '';
    const pathParts = path.split('/').filter(p => p);
    
    // First part is the collection name
    const collectionName = pathParts[0];
    
    if (!collectionName) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Collection name required' })
      };
    }
    
    const collection = db.collection(collectionName);
    const remainingPath = pathParts.slice(1);

    switch (event.httpMethod) {
      case 'GET':
        if (remainingPath.length === 0) {
          // Get all documents from collection
          const query = event.queryStringParameters || {};
          const limit = query.limit ? parseInt(query.limit) : 0;
          const skip = query.skip ? parseInt(query.skip) : 0;
          
          let cursor = collection.find({}).sort({ createdAt: -1 });
          
          if (skip > 0) cursor = cursor.skip(skip);
          if (limit > 0) cursor = cursor.limit(limit);
          
          const documents = await cursor.toArray();
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(documents)
          };
        } else {
          // Get single document by ID
          const documentId = remainingPath[0];
          const document = await collection.findOne({ _id: new ObjectId(documentId) });
          
          if (!document) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: `${collectionName} not found` })
            };
          }
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(document)
          };
        }

      case 'POST':
        // Create new document
        const newDocument = {
          ...JSON.parse(event.body),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const insertResult = await collection.insertOne(newDocument);
        const createdDocument = await collection.findOne({ _id: insertResult.insertedId });
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(createdDocument)
        };

      case 'PUT':
        // Update document
        if (remainingPath.length === 0) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Document ID required' })
          };
        }
        
        const updateDocumentId = remainingPath[0];
        const updateData = {
          ...JSON.parse(event.body),
          updatedAt: new Date()
        };
        
        // Remove _id from updateData if present
        delete updateData._id;
        
        const updateResult = await collection.updateOne(
          { _id: new ObjectId(updateDocumentId) },
          { $set: updateData }
        );
        
        if (updateResult.matchedCount === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: `${collectionName} not found` })
          };
        }
        
        const updatedDocument = await collection.findOne({ _id: new ObjectId(updateDocumentId) });
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedDocument)
        };

      case 'DELETE':
        // Delete document
        if (remainingPath.length === 0) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Document ID required' })
          };
        }
        
        const deleteDocumentId = remainingPath[0];
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(deleteDocumentId) });
        
        if (deleteResult.deletedCount === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: `${collectionName} not found` })
          };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: `${collectionName} deleted successfully` })
        };

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};