import React, { useState, useEffect } from 'react';
import { analyzeImage, isConfigured as isAnalysisConfigured } from './azure-image-analysis';
import { generateImage, isConfigured as isGenerationConfigured } from './azure-image-generation';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true); // State to track configuration status

  // Check if both Azure services are configured
  useEffect(() => {
    const isAzureConfigured = isAnalysisConfigured() && isGenerationConfigured();
    setIsConfigured(isAzureConfigured);
  }, []);

  const handleAnalyzeClick = async () => {
    // Check if Azure services are configured before making the call
    if (!isConfigured) {
      setResult('Azure AI services are not properly configured.');
      return;
    }

    if (inputValue) {
      try {
        const analysisResult = await analyzeImage(inputValue);
        setResult(JSON.stringify(analysisResult, null, 2));
        setGeneratedImageUrl('');
      } catch (error) {
        setResult(`Error: ${error.message}`);
      }
    } else {
      setResult('Please enter a valid URL or prompt.');
    }
  };

  const handleGenerateClick = async () => {
    // Check if Azure services are configured before making the call
    if (!isConfigured) {
      setResult('Azure AI services are not properly configured.');
      return;
    }

    if (inputValue) {
      try {
        setIsLoading(true);
        const generationResult = await generateImage(inputValue);
        setGeneratedImageUrl(generationResult.url);
        setIsLoading(false);
      } catch (error) {
        setGeneratedImageUrl('');
        setResult(`Error: ${error.message}`);
      }
    } else {
      setGeneratedImageUrl('');
      setResult('Please enter a valid prompt.');
    }
  }

  return (
    <div>
      <h1>Image Analysis and Generation</h1>

      {isConfigured ? null : (
        <div>
          <p>Azure AI services are not properly configured.</p>
          <p>Please set the required environment variables.</p>
        </div>
      )}

      <label htmlFor="inputField">Enter URL or Prompt:</label>
      <input
        type="text"
        id="inputField"
        placeholder="Enter URL or Prompt"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAnalyzeClick}>Analyze Image</button>
      <button onClick={handleGenerateClick}>Generate Image</button>

      <div id="result">{result}</div>

      {isLoading ? <p>Loading...</p> : null}

      {generatedImageUrl && (
        <>
          <p>Generated:</p>
          <img src={generatedImageUrl} alt="Generated" />
        </>
      )}
    </div>
  );
}

export default App;

