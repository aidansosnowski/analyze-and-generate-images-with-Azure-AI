import React, { useState } from 'react';
import { analyzeImage } from './azure-image-analysis'; // Import the analyzeImage function
import dotenv from 'dotenv';
dotenv.config();


function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const handleAnalyzeClick = async () => {
    if (inputValue) {
      try {
        const analysisResult = await analyzeImage(inputValue);
        setResult(JSON.stringify(analysisResult, null, 2));
      } catch (error) {
        setResult(`Error: ${error.message}`);
      }
    } else {
      setResult('Please enter a valid URL or prompt.');
    }
  };

  const handleGenerateClick = () => {
    // Perform image generation here and update the result
    setResult(`Generating image from: ${inputValue}`);
  };

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
    </div>
  );
}

export default App;

