const { MongoClient, ObjectId } = require('mongodb');

let client = null;

// Database connection helper — 5 s timeout so the function never hangs
// long enough for Netlify to kill it with a platform-level 500 (no CORS headers).
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    try {
      await client.connect();
    } catch (connErr) {
      client = null;   // allow retry on next invocation
      throw connErr;
    }
  }
  return client.db('eflash');
}

// CORS headers — always include these in every response
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};

exports.handler = async (event, context) => {
  // Prevent Lambda from waiting for idle MongoDB connections
  context.callbackWaitsForEmptyEventLoop = false;

  // Always respond to preflight with CORS headers — before any DB work
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Guard: MONGODB_URI must be configured in Netlify environment variables
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set');
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({ error: 'Database not configured', message: 'MONGODB_URI environment variable is missing. Set it in the Netlify dashboard under Site settings > Environment variables.' })
    };
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('projects');
    // Strip prefix for both direct and proxied access:
    //   Direct:  /.netlify/functions/projects[/id]
    //   Proxied: /api/projects[/id]  (via netlify.toml redirect)
    const rawPath = event.path || '';
    const subPath = rawPath.replace(/^.*\/projects/, '');
    const pathParts = subPath.split('/').filter(p => p);

    switch (event.httpMethod) {
      case 'GET':
        if (pathParts.length === 0) {
          // Exclude base64 images array to stay under Netlify's 6MB response limit.
          // The `thumbnail` URL field is kept for card display.
          const projects = await collection
            .find({}, { projection: { images: 0 } })
            .sort({ createdAt: -1 })
            .toArray();
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(projects)
          };
        } else {
          // Get single project by ID
          const projectId = pathParts[0];
          const project = await collection.findOne({ _id: new ObjectId(projectId) });

          if (!project) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: 'Project not found' })
            };
          }

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(project)
          };
        }

      case 'POST':
        // Create new project
        const newProject = {
          ...JSON.parse(event.body),
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const insertResult = await collection.insertOne(newProject);
        const createdProject = await collection.findOne({ _id: insertResult.insertedId });

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(createdProject)
        };

      case 'PUT':
        // Update project
        if (pathParts.length === 0) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Project ID required' })
          };
        }

        const updateProjectId = pathParts[0];
        const updateData = {
          ...JSON.parse(event.body),
          updatedAt: new Date()
        };

        // Remove _id from updateData if present
        delete updateData._id;

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(updateProjectId) },
          { $set: updateData }
        );

        if (updateResult.matchedCount === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Project not found' })
          };
        }

        const updatedProject = await collection.findOne({ _id: new ObjectId(updateProjectId) });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedProject)
        };

      case 'DELETE':
        // Delete project
        if (pathParts.length === 0) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Project ID required' })
          };
        }

        const deleteProjectId = pathParts[0];
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(deleteProjectId) });

        if (deleteResult.deletedCount === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Project not found' })
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Project deleted successfully' })
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