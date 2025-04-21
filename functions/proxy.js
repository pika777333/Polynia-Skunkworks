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
    // Use fixed URLs instead of building them dynamically
    let fullUrl;
    const postData = JSON.parse(event.body || '{}');
    
    if (event.path.includes('scrape')) {
      // Build URL with query parameters for scrape
      fullUrl = 'https://lincolnpolynia.app.n8n.cloud/webhook-test/chatbot/scrape';
      if (postData.targetWebsite) {
        fullUrl += `?targetWebsite=${encodeURIComponent(postData.targetWebsite)}`;
      }
    } else if (event.path.includes('query')) {
      // Build URL with query parameters for query
      fullUrl = 'https://lincolnpolynia.app.n8n.cloud/webhook-test/chatbot/query';
      if (postData.query) {
        fullUrl += `?query=${encodeURIComponent(postData.query)}`;
        if (postData.userId) {
          fullUrl += `&userId=${encodeURIComponent(postData.userId)}`;
        }
      }
    } else {
      throw new Error('Unknown endpoint requested');
    }
    
    console.log('Request details:', {
      path: event.path,
      method: 'GET',
      targetUrl: fullUrl
    });
    
    // Forward the request to N8N using GET without a body
    console.log('Attempting to fetch from N8N...');
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
      // No body for GET requests
    });
    
    console.log('N8N response status:', response.status);
    
    // For debugging, return whatever response we get, even if it's an error
    const responseText = await response.text();
    console.log('N8N response body:', responseText);
    
    // Try to parse as JSON if possible
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      // If not valid JSON, return as raw text
      data = { raw: responseText };
    }
    
    // If we got a successful response, create a proper success response
    if (response.ok) {
      // For scrape requests
      if (event.path.includes('scrape')) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            chunkCount: data.chunkCount || 5,
            timestamp: new Date().toISOString()
          })
        };
      }
      // For query requests
      else {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            // Check if N8N returns text property instead of response
            response: data.text || data.response || "I don't have enough information to answer that question."
          })
        };
      }
    }
    
    // Otherwise return the error we got
    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error in proxy function:', error.message);
    
    // Create mock success responses for debugging
    if (event.path.includes('scrape')) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          chunkCount: 5, 
          timestamp: new Date().toISOString(),
          debug: {
            error: error.message
          }
        })
      };
    } else {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          response: "I encountered an error processing your request. Please try again or try a different question.",
          debug: {
            error: error.message
          }
        })
      };
    }
  }
};
