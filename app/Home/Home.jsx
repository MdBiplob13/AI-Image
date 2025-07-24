"use client";
import { useState, useRef, useEffect } from "react";

export default function ImageModifier() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Reset previous state
    setPreviewUrl(URL.createObjectURL(file));
    setResultUrl(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!fileInputRef.current?.files[0] || !prompt.trim()) {
      setError("Please upload an image and enter a prompt");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", fileInputRef.current.files[0]);
      formData.append("prompt", prompt);

      const response = await fetch("/api/modify-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      
    } catch (err) {
      console.error("Generation failed:", err);
      setError(err.message || "Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Clean up object URLs when component unmounts
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [previewUrl, resultUrl]);

  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold mb-10 text-center text-indigo-700">
          Create Stunning Images with the Power of <span className="text-pink-500">AI</span>
        </h1>

        {/* Image upload + output section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Upload box */}
          <div className="h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors">
            <label className="w-full h-full flex flex-col justify-center items-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Upload preview"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <>
                  <span className="text-4xl mb-2">📁</span>
                  <p className="text-gray-500">Click to upload image</p>
                  <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG</p>
                </>
              )}
            </label>
          </div>

          {/* Result image */}
          <div className="h-64 bg-gray-50 border border-gray-200 rounded-lg flex flex-col justify-center items-center overflow-hidden relative">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-gray-500">Generating your image...</p>
              </div>
            ) : resultUrl ? (
              <>
                <img 
                  src={resultUrl} 
                  alt="AI generated result" 
                  className="w-full h-full object-contain"
                />
                
              </>
            ) : (
              <div className="text-center text-gray-400">
                <span className="text-4xl block mb-2">🖼️</span>
                <p>Your result will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Prompt input + button */}
        <div className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
              Modification Prompt
            </label>
            <input
              id="prompt"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe how you'd like to modify the image..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-red-500 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isLoading || !previewUrl || !prompt.trim()}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              isLoading || !previewUrl || !prompt.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isLoading ? "Processing..." : "Generate Modified Image"}
          </button>
        </div>
      </div>
    </div>
  );
}