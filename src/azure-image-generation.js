// azure-image-generation.js

const apiKey = process.env.OPEN_AI_API_KEY;
const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;

async function generateImage(prompt, n = 1, size = '1024x1024') {
  const apiUrl = `${endpoint}/openai/images/generations:submit?api-version=2023-06-01-preview`;

  const headers = new Headers({
    'Content-Type': 'application/json',
    'api-key': apiKey,
  });

  const body = JSON.stringify({
    prompt,
    n,
    size,
  });

  const requestOptions = {
    method: 'POST',
    headers,
    body,
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Azure OpenAI Service request failed with status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Azure OpenAI Service request failed: ${error.message}`);
  }
}

export { generateImage };
