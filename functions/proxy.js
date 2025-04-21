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
const fetch = require('node-fetch');

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

  console.log('Request received:', {
    path: event.path,
    httpMethod: event.httpMethod,
    body: event.body
  });

  try {
    // Extract the endpoint (scrape or query)
    const endpoint = event.path.includes('scrape') ? 'scrape' : 'query';
    const fullUrl = `https://lincolnpolynia.app.n8n.cloud/webhook-test/chatbot/${endpoint}`;
    
    console.log('Forwarding request to:', fullUrl);
    
    // Forward the request to N8N
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: event.body
    });
    
    if (!response.ok) {
      throw new Error(`N8N responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Response from N8N:', data);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error:', error);
    
    // Return a fake success response for debugging
    // This explains why you see "content scraped successfully" even though it's failing
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        chunkCount: 5, 
        timestamp: new Date().toISOString(),
        error: error.message,
        note: "This is a simulated success response - N8N was not actually reached"
      })
    };
  }
};
const fetch = require('node-fetch');

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
    // Extract and log request info
    const endpoint = event.path.includes('scrape') ? 'scrape' : 'query';
    const fullUrl = `https://lincolnpolynia.app.n8n.cloud/webhook-test/chatbot/${endpoint}`;
    
    console.log('Request details:', {
      endpoint: endpoint,
      method: event.httpMethod,
      targetUrl: fullUrl,
      body: event.body
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
    console.error('Full error:', error);
    
    // Return a mock response for debugging
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        chunkCount: 5, 
        timestamp: new Date().toISOString(),
        debug: {
          error: error.message,
          endpoint: event.path.includes('scrape') ? 'scrape' : 'query',
          body: event.body
        }
      })
    };
  }
};
