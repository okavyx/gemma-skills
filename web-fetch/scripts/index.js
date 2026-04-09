window['ai_edge_gallery_get_result'] = async (dataStr, secret) => {
  try {
    const jsonData = JSON.parse(dataStr || '{}');
    const { url, method = 'GET', headers = {}, body } = jsonData;

    if (!url || !url.startsWith('https://')) {
      return JSON.stringify({ error: 'URL must use https://' });
    }

    // Auth token from secret parameter
    const authToken = secret || '';
    if (!authToken) {
      return JSON.stringify({ error: 'No auth token provided. Please enter your access token when adding this skill.' });
    }

    const proxyUrl = 'https://gemma-skills-fetch.nyvins.workers.dev/';

    const fetchOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': authToken,
        ...headers
      }
    };
    if (body && method !== 'GET') {
      fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(proxyUrl, {
      ...fetchOptions,
      body: JSON.stringify({ url, method, headers, body })
    });

    const contentType = response.headers.get('content-type') || '';
    let result;

    if (response.status === 401) {
      return JSON.stringify({ error: 'Invalid access token. Please check your token and try again.' });
    }

    if (contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = await response.text();
      if (result.length > 50000) {
        result = result.substring(0, 50000) + '\n[output truncated]';
      }
    }

    if (!response.ok) {
      return JSON.stringify({
        error: `Proxy error: HTTP ${response.status}`,
        status: response.status,
        result
      });
    }

    return JSON.stringify({ result });
  } catch (e) {
    return JSON.stringify({ error: `Fetch failed: ${e.message}` });
  }
};