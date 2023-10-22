// azure-image-generation.js

const apiKey = process.env.OPEN_AI_API_KEY;
const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;

async function generateImage(prompt) {
  const apiUrl = `${endpoint}/v1/images`;

  const headers = new Headers({
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  });

  const body = JSON.stringify({
    prompt,
  });

  const requestOptions = {
    method: 'POST',
    headers,
    body,
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Azure OpenAI Service request failed with status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Azure OpenAI Service request failed: ${error.message}`);
  }
}

export { generateImage };
