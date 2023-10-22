import axios from 'axios';

const apiKey = process.env.OPEN_AI_API_KEY;
const endpoint = process.env.OPEN_AI_ENDPOINT;

const generateImage = async (prompt) => {
  const apiUrl = `${endpoint}/openai/images/generations:submit?api-version=2023-06-01-preview`;

  try {
    const response = await axios.post(
      apiUrl,
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error generating image:', error.message);
    throw error;
  }
};

const isConfigured = () => {
  return Boolean(apiKey && endpoint);
};

export { generateImage, isConfigured };


