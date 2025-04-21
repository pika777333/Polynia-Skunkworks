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
    if (event.path.includes('scrape')) {
      fullUrl = 'https://lincolnpolynia.app.n8n.cloud/webhook-test/chatbot/scrape';
    } else if (event.path.includes('query')) {
      fullUrl = 'https://lincolnpolynia.app.n8n.cloud/webhook-test/chatbot/query';
    } else {
      throw new Error('Unknown endpoint requested');
    }
    
    // Extract data from the POST body
    const postData = JSON.parse(event.body || '{}');
    
    // For scrape requests, add the target website as a query parameter
    if (event.path.includes('scrape') && postData.targetWebsite) {
      fullUrl += `?targetWebsite=${encodeURIComponent(postData.targetWebsite)}`;
    }
    
    // For query requests, add the query as a query parameter
    if (event.path.includes('query') && postData.query) {
      fullUrl += `?query=${encodeURIComponent(postData.query)}&userId=${encodeURIComponent(postData.userId || 'anonymous')}`;
    }
    
    console.log('Request details:', {
      path: event.path,
      method: 'GET',  // Now using GET
      targetUrl: fullUrl,
      originalBody: event.body
    });
    
    // Forward the request to N8N using GET instead of POST
    console.log('Attempting to fetch from N8N...');
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
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
      data = { raw: responseText };
    }
    
    return {
      statusCode: response.status,
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
