"use client";
import React from "react";
import { useState } from "react";

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto mt-20">
      <h1 className="text-2xl font-semibold mb-6">
        FLUX.1 Kontext [dev] - Multi Image
      </h1>

      {/* Image upload and preview */}
      <div className="flex gap-6 mb-6">
        {/* Upload box */}
        <div className="w-1/2 h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer">
          <label className="text-gray-500">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
            <div className="flex flex-col items-center">
              <span className="text-3xl">📁</span>
              <p>Drop Media Here</p>
              <p>- or -</p>
              <p className="underline">Click to Upload</p>
            </div>
          </label>
        </div>

        {/* Placeholder for output */}
        <div className="w-1/2 h-64 bg-gray-50 border border-gray-300 rounded-lg flex justify-center items-center">
          {images.length === 0 ? (
            <span className="text-gray-400 text-5xl">🖼️</span>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  className="object-cover w-full h-32 rounded"
                  alt={`preview ${idx}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prompt and Run button */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the desired output composition"
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="bg-indigo-600 text-white px-6 rounded-lg hover:bg-indigo-700">
          Run
        </button>
      </div>

      {/* Advanced Settings */}
      <details className="border border-gray-300 rounded-lg">
        <summary className="bg-gray-100 px-4 py-2 cursor-pointer select-none">
          Advanced Settings
        </summary>
        <div className="p-4 space-y-4">
          {/* Seed Slider */}
          <div>
            <label className="block text-sm mb-1">Seed</label>
            <input
              type="range"
              min="0"
              max="2147483647"
              defaultValue="0"
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
              <span>0</span>
              <span>2147483647</span>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="randomize"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="randomize" className="text-sm">
                Randomize seed
              </label>
            </div>
          </div>

          {/* Guidance Scale Slider */}
          <div>
            <label className="block text-sm mb-1">Guidance Scale</label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              defaultValue="2.5"
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
              <span>1</span>
              <span>10</span>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default HomePage;
