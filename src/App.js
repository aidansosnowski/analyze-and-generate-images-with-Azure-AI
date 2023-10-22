import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const handleAnalyzeClick = () => {
    // Perform image analysis here and update the result
    setResult(`Analyzing image: ${inputValue}`);
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
