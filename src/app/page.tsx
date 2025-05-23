"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setImageUrl(data.imageUrl);
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center bg-gray-100">
      <h1 className="text-3xl font-extrabold text-center text-blue-700">
        💬 AI Image Generator
      </h1>
      <br />

      {/* Floating Label Textarea */}
      <div className="relative w-full max-w-lg">
        <label
          htmlFor="prompt"
          className="absolute left-4 top-3 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
          Enter your image prompt
        </label>
        <br></br>
        <textarea
          id="prompt"
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder=" "
          className="peer w-full rounded-lg border border-gray-300 p-4 pt-5 text-sm text-gray-800 placeholder-transparent shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Buttons */}
      {/* Buttons */}
      <div className="flex justify-end space-x-6 mt-4 w-full max-w-lg">
        <button
          onClick={generateImage}
          disabled={loading || !prompt.trim()}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow disabled:opacity-50 disabled:cursor-not-allowed">
          🚀 {loading ? "Generating..." : "Generate Image"}
        </button>
        &nbsp;
        <button
          onClick={() => setPrompt("")}
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
          ❌ Clear
        </button>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated"
          className="mt-10 max-w-lg rounded-lg shadow-lg"
        />
      )}
    </main>
  );
}
