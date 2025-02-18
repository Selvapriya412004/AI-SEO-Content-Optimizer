import React, { useState } from "react";

const AnalyzeForm = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent form refresh

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),  // Sending the URL to Flask server
      });

      const data = await response.json();
      if (data.error) {
        setResult("Error: " + data.error);
      } else {
        setResult(data.optimized);  // You can customize how to display results
      }
    } catch (error) {
      setResult("Request failed: " + error);
    }
  };

  return (
    <div>
      <h1>Analyze a URL</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit">Analyze</button>
      </form>

      {result && <div><h2>Result:</h2><p>{result}</p></div>}
    </div>
  );
};

export default AnalyzeForm;
