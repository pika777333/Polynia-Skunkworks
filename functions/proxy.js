exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  try {
    // Get the target URL from your N8N webhook
    const targetUrl = event.path.replace('/api/proxy/', '');
    const fullUrl = 'https://lincolnpolynia.app.n8n.cloud/webhook-test/chatbot/' + targetUrl;
    
    // Forward the request to N8N
    const response = await fetch(fullUrl, {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: event.body
    });
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
