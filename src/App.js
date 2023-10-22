import React, { useState } from 'react';
import { analyzeImage } from './azure-image-analysis';
import { generateImage } from './azure-image-generation';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyzeClick = async () => {
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
          <p>Generated Image:</p>
          <img src={generatedImageUrl} alt="Generated Image" />
        </>
      )}
    </div>
  );
}

export default App;

