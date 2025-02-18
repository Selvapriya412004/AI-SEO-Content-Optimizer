import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const App = () => {
  const [url, setUrl] = useState("");
  const [originalContent, setOriginalContent] = useState("No data yet.");
  const [optimizedContent, setOptimizedContent] = useState("No suggestions yet.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzePage = async () => {
    if (!url) {
      setError("❌ Please enter a valid URL.");
      return;
    }

    setError(""); // Clear previous errors
    setLoading(true);
    setOriginalContent("Fetching data...");
    setOptimizedContent("Processing AI suggestions...");

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.error) {
        setError(`❌ Error: ${data.error}`);
        setOriginalContent("Error fetching content.");
        setOptimizedContent("AI optimization failed.");
      } else {
        setOriginalContent(JSON.stringify(data.original, null, 2));
        setOptimizedContent(data.optimized);
      }
    } catch (error) {
      setLoading(false);
      setError("❌ Server error. Check backend connection.");
      setOriginalContent("Error fetching data.");
      setOptimizedContent("Error processing AI suggestions.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-lg bg-white text-center mt-10">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">AI SEO Content Analyzer</h1>

      {/* URL Input */}
      <div className="mb-4 flex">
        <input
          type="text"
          className="w-full p-3 border rounded-l-lg focus:outline-none"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="px-5 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
          onClick={analyzePage}
        >
          Analyze
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center justify-center text-gray-600">
          <AiOutlineLoading3Quarters className="animate-spin mr-2" />
          Analyzing content...
        </div>
      )}

      {/* Original Content */}
      <h2 className="text-xl font-semibold mt-6 text-gray-700">📄 Original Content</h2>
      <pre className="text-left bg-gray-100 p-4 overflow-x-auto border rounded-lg text-sm">
        {originalContent}
      </pre>

      {/* Optimized Content */}
      <h2 className="text-xl font-semibold mt-6 text-green-600">🚀 AI-Optimized SEO Suggestions</h2>
      <pre className="text-left bg-gray-100 p-4 overflow-x-auto border rounded-lg text-sm">
        {optimizedContent}
      </pre>
    </div>
  );
};

export default App;
