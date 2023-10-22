import React, { useState } from 'react';
import { analyzeImage } from './azure-image-analysis';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State to store the image URL

  const handleAnalyzeClick = async () => {
    if (inputValue) {
      try {
        const analysisResult = await analyzeImage(inputValue);
        setResult(JSON.stringify(analysisResult, null, 2));
        setImageUrl(inputValue); // Set the image URL for display
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
    setImageUrl(''); // Clear the image URL when generating
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

      {/* Display the image if imageUrl is not empty */}
      {imageUrl && <img src={imageUrl} alt="Analyzing Image" />}
    </div>
  );
}

export default App;
