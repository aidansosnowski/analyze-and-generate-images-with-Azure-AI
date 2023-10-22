import React, { useState } from 'react';
import { analyzeImage } from './azure-image-analysis';
import { generateImage } from './azure-image-generation'; // Import the generateImage function
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(''); // State to store the generated image URL
  const [isLoading, setIsLoading] = useState(false); // State to track API call loading

  const handleAnalyzeClick = async () => {
    if (inputValue) {
      try {
        const analysisResult = await analyzeImage(inputValue);
        setResult(JSON.stringify(analysisResult, null, 2));
        setGeneratedImageUrl(''); // Clear the generated image URL
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
        setIsLoading(true); // Set loading state
        const generationResult = await generateImage(inputValue); // Call the generateImage function
        setGeneratedImageUrl(generationResult.url); // Set the generated image URL
        setIsLoading(false); // Clear loading state
      } catch (error) {
        setGeneratedImageUrl(''); // Clear the generated image URL on error
        setResult(`Error: ${error.message}`);
      }
    } else {
      setGeneratedImageUrl(''); // Clear the generated image URL if no input
      setResult('Please enter a valid prompt.');
    }
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

      {/* Display the generated image if generatedImageUrl is not empty */}
      {generatedImageUrl && (
        <>
          <p>Generated Image:</p>
          <img src={generatedImageUrl} alt="Generated Image" />
        </>
      )}

      {isLoading && <p>Loading...</p>} {/* Show loading indicator */}
    </div>
  );
}

export default App;
