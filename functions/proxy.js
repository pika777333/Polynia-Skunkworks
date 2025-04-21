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
    // Extract endpoint (scrape or query)
    const pathParts = event.path.split('/');
    const endpoint = pathParts[pathParts.length - 1];
    const fullUrl = `https://lincolnpolynia.app.n8n.cloud/webhook-test/chatbot/${endpoint}`;
    
    console.log('Request details:', {
      endpoint: endpoint,
      method: event.httpMethod,
      targetUrl: fullUrl
    });
    
    // Forward the request to N8N
    console.log('Attempting to fetch from N8N...');
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: event.body
    });
    
    console.log('N8N response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`N8N responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully received JSON response from N8N');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error in proxy function:', error.message);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message
      })
    };
  }
};
