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
    const collection = db.collection('reviews');
    const path = event.path?.replace('/.netlify/functions/reviews', '') || '';
    const pathParts = path.split('/').filter(p => p);

    switch (event.httpMethod) {
      case 'GET':
        if (pathParts.length === 0) {
          // Get all reviews
          const reviews = await collection.find({}).sort({ createdAt: -1 }).toArray();
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(reviews)
          };
        } else {
          // Get single review by ID
          const reviewId = pathParts[0];
          const review = await collection.findOne({ _id: new ObjectId(reviewId) });
          
          if (!review) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: 'Review not found' })
            };
          }
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(review)
          };
        }

      case 'POST':
        // Create new review
        const newReview = {
          ...JSON.parse(event.body),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const insertResult = await collection.insertOne(newReview);
        const createdReview = await collection.findOne({ _id: insertResult.insertedId });
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(createdReview)
        };

      case 'PUT':
        // Update review
        if (pathParts.length === 0) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Review ID required' })
          };
        }
        
        const updateReviewId = pathParts[0];
        const updateData = {
          ...JSON.parse(event.body),
          updatedAt: new Date()
        };
        
        // Remove _id from updateData if present
        delete updateData._id;
        
        const updateResult = await collection.updateOne(
          { _id: new ObjectId(updateReviewId) },
          { $set: updateData }
        );
        
        if (updateResult.matchedCount === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Review not found' })
          };
        }
        
        const updatedReview = await collection.findOne({ _id: new ObjectId(updateReviewId) });
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedReview)
        };

      case 'DELETE':
        // Delete review
        if (pathParts.length === 0) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Review ID required' })
          };
        }
        
        const deleteReviewId = pathParts[0];
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(deleteReviewId) });
        
        if (deleteResult.deletedCount === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Review not found' })
          };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Review deleted successfully' })
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