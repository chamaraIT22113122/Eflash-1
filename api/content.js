const { kv } = require('@vercel/kv');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

module.exports = async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).end();
  }

  // Set CORS headers for all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  try {
    if (req.method === 'GET') {
      const content = await kv.get('siteContent');
      return res.status(200).json(content || null); // Return null if nothing is saved yet
    } 
    
    if (req.method === 'POST') {
      const newContent = req.body;
      
      if (!newContent) {
        return res.status(400).json({ error: 'No content provided' });
      }

      await kv.set('siteContent', newContent);
      return res.status(200).json({ success: true, message: 'Content saved successfully' });
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('KV Error:', error);
    
    // Check if error is related to missing KV config
    if (error.message.includes('KV_REST_API_URL') || !process.env.KV_REST_API_URL) {
      return res.status(503).json({ 
        error: 'Database not configured',
        message: 'KV environment variables are missing. Please link a Vercel Storage KV database.' 
      });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
