const WEBSITE_DATA = require('../website-data.json');

exports.handler = async function(event, context) {
  console.log('Function started');
  
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return {
      statusCode: 200,
      headers
    };
  }

  try {
    let fullUrl;
    const postData = JSON.parse(event.body || '{}');
    
    if (event.path.includes('scrape')) {
      // Since we're using static data, just return success
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          chunkCount: WEBSITE_DATA.websiteData.totalChunks, 
          timestamp: WEBSITE_DATA.websiteData.lastUpdated
        })
      };
    } else if (event.path.includes('query')) {
      // Build URL with embeddings included from our static file
      fullUrl = 'https://lincolnpolynia.app.n8n.cloud/webhook-test/chatbot/query';
      
      const queryParams = new URLSearchParams();
      queryParams.append('query', postData.query);
      queryParams.append('userId', postData.userId || 'anonymous');
      queryParams.append('storedEmbeddings', JSON.stringify(WEBSITE_DATA.websiteData.embeddings));
      
      fullUrl += '?' + queryParams.toString();
      
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          response: data.text || data.response || "I don't have enough information to answer that question."
        })
      };
    }
    
  } catch (error) {
    console.error('Error in proxy function:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message
      })
    };
  }
};
