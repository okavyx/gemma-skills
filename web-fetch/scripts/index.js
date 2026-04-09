window['ai_edge_gallery_get_result'] = async (dataStr, secret) => {
  try {
    const jsonData = JSON.parse(dataStr || '{}');
    const { url, method = 'GET', headers = {}, body } = jsonData;

    if (!url || !url.startsWith('https://')) {
      return JSON.stringify({ error: 'URL must use https://' });
    }

    const proxyUrl = 'https://gemma-skills-fetch.nyvins.workers.dev/';

    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, method, headers, body })
    });

    const contentType = response.headers.get('content-type') || '';
    let result;

    if (contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = await response.text();
      if (result.length > 50000) {
        result = result.substring(0, 50000) + '\n[output truncated]';
      }
    }

    return JSON.stringify({ result });
  } catch (e) {
    return JSON.stringify({ error: `Fetch failed: ${e.message}` });
  }
};