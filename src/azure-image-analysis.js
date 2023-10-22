// azure-image-analysis.js

const apiKey = process.env.REACT_APP_AZURE_API_KEY;
const endpoint = process.env.OPEN_AI_ENDPOINT;
// In azure-image-generation.js
function isConfigured() {
    return Boolean(process.env.REACT_APP_AZURE_API_KEY && process.env.REACT_APP_AZURE_ENDPOINT);
  }
  
  export { isConfigured };
  

async function analyzeImage(imageUrl) {
  
    const visualFeatures = 'Description,Tags'; // Customize the visual features as needed
  
    const apiUrl = `${endpoint}/vision/v4.0/analyze?visualFeatures=${visualFeatures}`;
  
    const headers = new Headers({
      'Ocp-Apim-Subscription-Key': apiKey,
      'Content-Type': 'application/json',
    });
  
    const body = JSON.stringify({
      url: imageUrl,
    });
  
    const requestOptions = {
      method: 'POST',
      headers,
      body,
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        const data = await response.json();
        return processAnalysisData(data); // Process the response data
      } else {
        throw new Error(`Azure Vision API request failed with status: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Azure Vision API request failed: ${error.message}`);
    }
  }
  
  function processAnalysisData(data) {
    const captionText = data.captionResult.text;
    const captionConfidence = data.captionResult.confidence;
    const objects = data.objectsResult.values;
    const tags = data.tagsResult.values;
  
    return {
      caption: {
        text: captionText,
        confidence: captionConfidence,
      },
      objects,
      tags,
    };
  }
  
  export { analyzeImage };
  