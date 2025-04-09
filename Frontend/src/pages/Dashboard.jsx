"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Sparkles, Clock, AlertCircle, Volume2, VolumeX } from "lucide-react";

// Replace the mock generateContent function with the actual API call
const generateContent = async (topic, ageRange, storyType) => {
  try {
    console.log("Sending request to backend:", { topic, ageRange, storyType });

    const response = await fetch(
      "http://localhost:5001/test/generate-content", //"http://localhost:5001/api/generate-content" --> "http://localhost:5001/test/generate-content"
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType: storyType,
          topic,
          ageRange,
        }),
      }
    );

    const data = await response.json();
    console.log("Backend response:", data);

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate content");
    }

    if (!data.success) {
      throw new Error(data.error || "Failed to generate content");
    }

    const content = {
      id: Date.now(),
      topic,
      ageRange,
      storyType,
      title: `The Adventures of ${topic}`,
      content: data.content,
      createdAt: data.createdAt,
    };

    // Save to history in localStorage
    const history = JSON.parse(localStorage.getItem("contentHistory") || "[]");
    history.unshift(content);
    localStorage.setItem(
      "contentHistory",
      JSON.stringify(history.slice(0, 10))
    ); // Keep only last 10 items

    return content;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error(
      error.message || "Failed to generate content. Please try again."
    );
  }
};

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const [topic, setTopic] = useState("");
  const [ageRange, setAgeRange] = useState("6-8");
  const [storyType, setStoryType] = useState("educational");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [voiceType, setVoiceType] = useState(10);

  // useEffect(() => {
  //   handleTextToSpeech();
  // }, [voiceType]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      return setError("Please enter a topic");
    }

    setError("");
    setLoading(true);

    try {
      const content = await generateContent(topic, ageRange, storyType);
      setGeneratedContent(content);
    } catch (err) {
      setError("Failed to generate content. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  const handleNewContent = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setGeneratedContent(null);
    setTopic("");
  };

  const handleTextToSpeech = () => {
    if (!speechSynthesis || !generatedContent) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // const utterance = new SpeechSynthesisUtterance(generatedContent.content)
      // utterance.onend = () => setIsSpeaking(false)
      // utterance.onerror = () => setIsSpeaking(false)
      // speechSynthesis.speak(utterance)
      // setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(generatedContent.content);

      // Retrieve the list of available voices
      const voices = speechSynthesis.getVoices();
      console.log("Available voices:", voices);
      // Select a voice suitable for storytelling
      // const storytellingVoice = voices.find(
      //   (voice) =>
      //     voice.name.includes("Narrator") || voice.name.includes("Storyteller")
      // );

      // Assign the selected voice to the utterance
      if (voices.length > 0) {
        utterance.voice = voices[voiceType];
      } else {
        console.warn(
          "Suitable storytelling voice not found. Using default voice."
        );
      }

      // Set pitch and rate for storytelling tone
      utterance.pitch = 1.0; // Normal pitch
      utterance.rate = 0.9; // Slightly slower rate for clear narration

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {currentUser.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Generate interactive learning content on any topic
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generation Form */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-2 rounded-full">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold ml-3">
              Create New Learning Content
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-start mb-6">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                What topic would you like to learn about?
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g. Solar System, Ancient Egypt, Photosynthesis"
              />
            </div>

            <div>
              <label
                htmlFor="ageRange"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Age Range
              </label>
              <select
                id="ageRange"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="3-5">3-5 years</option>
                <option value="6-8">6-8 years</option>
                <option value="9-12">9-12 years</option>
                <option value="13-15">13-15 years</option>
                <option value="16+">16+ years</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="storyType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Content Type
              </label>
              <select
                id="storyType"
                value={storyType}
                onChange={(e) => setStoryType(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="educational">Educational Story</option>
                <option value="adventure">Adventure Story</option>
                <option value="interactive">Interactive Quiz</option>
                <option value="explainer">Simple Explainer</option>
                <option value="dialogue">Character Dialogue</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating Content...
                  </>
                ) : (
                  "Generate Learning Content"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Generated Content Display */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {generatedContent ? (
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-gray-800">
                  {generatedContent.title}
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleTextToSpeech}
                    className="text-purple-600 hover:text-purple-800 p-2 rounded-full hover:bg-purple-50"
                    title={isSpeaking ? "Stop Reading" : "Read Aloud"}
                  >
                    {isSpeaking ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={handleNewContent}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    Create New
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="selectVoice"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Voice
                </label>
                <select
                  id="storyType"
                  value={voiceType}
                  onChange={(e) => {
                    setVoiceType(e.target.value);
                  }}
                  className="block w-full px-3 py-2 mb-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="10">Female</option>
                  <option value="4">Male</option>
                </select>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {generatedContent.topic}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Age: {generatedContent.ageRange}
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {generatedContent.storyType}
                </span>
              </div>

              <div className="prose max-w-none">
                {generatedContent.content
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    Generated on{" "}
                    {new Date(generatedContent.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/history")}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                >
                  View History
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Sparkles className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No content generated yet
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Fill out the form to generate your first learning content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
