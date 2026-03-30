import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Google Gemini API configuration
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GOOGLE_GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

app.post("/test/generate-content", async (req, res) => {
  const { topic, ageRange, contentType } = req.body;
  if (!topic || !ageRange || !contentType) {
    console.error("Missing required fields:", {
      topic,
      ageRange,
      contentType,
    });
    return res.status(400).json({ error: "Missing required fields" });
  }

  const generatedContent = `Once upon a time in a world full of wonder and magic, there lived many interesting characters. Our story is about ${topic}, a subject that has fascinated people for countless generations. 

In the beginning, our hero found themselves in an extraordinary situation involving ${topic}. The adventure began when they discovered something truly remarkable. As they explored deeper, they encountered challenges that tested their knowledge and courage. Each obstacle taught them something new and valuable about ${topic}.

Throughout their journey, they met allies who helped them understand the true nature and importance of ${topic}. Together, they overcame difficulties and learned about the hidden aspects of this fascinating topic. The landscape changed around them as they traveled, filled with beautiful descriptions and exciting encounters.

Our hero discovered that ${topic} was far more complex and wonderful than they had ever imagined. They learned about the history, the connections, and the significance of ${topic} in the world. Along the way, they made important discoveries that would change their perspective forever.

As the sun set on their adventure, they realized they had grown as a person. They understood ${topic} in ways they never could have before. The lessons they learned would stay with them forever, shaping their future and helping them guide others.

In the end, our hero returned home with newfound knowledge and appreciation for ${topic}. They shared their stories and discoveries with everyone they met. And from that day forward, people understood and appreciated ${topic} in entirely new and meaningful ways. Their adventure became a legend that inspired others to explore and learn about the wonders of ${topic}. The end.`;
  
  const content = {
    id: Date.now(),
    topic,
    ageRange,
    contentType,
    title: `The Adventures of ${topic}`,
    content: generatedContent,
    createdAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    ...content,
  });
});

// Content generation endpoint
app.post("/api/generate-content", async (req, res) => {
  try {
    console.log("Received request:", req.body);
    const { topic, ageRange, contentType } = req.body;

    if (!topic || !ageRange || !contentType) {
      console.error("Missing required fields:", {
        topic,
        ageRange,
        contentType,
      });
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!GOOGLE_GEMINI_API_KEY) {
      console.error("Google Gemini API key is not configured");
      return res.status(500).json({ error: "API configuration error" });
    }

    // Prepare the prompt based on content type and parameters
    let prompt = "";
    switch (contentType) {
      case "educational":
        prompt = `Create a comprehensive and detailed educational story about ${topic} suitable for ${ageRange} year olds. 
                  The story should be informative, engaging, well-structured and include multiple key concepts and facts about ${topic}.
                  Include sections with: introduction, main plot with detailed explanations, educational elements, interesting facts, and a meaningful conclusion.
                  Make it 500-800 words long with depth and richness. Don't provide any information about the author or the story metadata.`;
        break;
      case "adventure":
        prompt = `Create a long, exciting and detailed adventure story about ${topic} suitable for ${ageRange} year olds. 
                  The story should include: an engaging introduction, a compelling journey or quest with obstacles and challenges, character development, 
                  exciting action sequences, teaching opportunities about ${topic}, plot twists, and a satisfying conclusion.
                  Make it 600-900 words long. Ensure it is rich in description and narrative detail. Don't provide any information about the author or the story metadata.`;
        break;
      case "interactive":
        prompt = `Create a comprehensive interactive quiz about ${topic} suitable for ${ageRange} year olds. 
                  Include at least 8-10 detailed questions with multiple choice options (A, B, C, D).
                  For each question, provide the correct answer and a brief explanation.
                  Include a scoring system at the end. Make it engaging and educational with proper formatting.
                  Structure: Introduction, Questions with answers, Final score interpretation. Don't provide any information about the author or the quiz metadata.`;
        break;
      case "explainer":
        prompt = `Create a thorough, extensive and easy-to-understand explainer about ${topic} suitable for ${ageRange} year olds. 
                  Break down complex concepts about ${topic} into multiple easy-to-understand sections and subsections.
                  Use simple language, relatable examples, analogies, and visual descriptions. 
                  Include: What is ${topic}?, Key characteristics, How it works, Why it's important, Fun facts, and Real-world examples.
                  Make it 500-750 words long and comprehensive. Don't provide any information about the author or the explainer metadata.`;
        break;
      case "dialogue":
        prompt = `Create a long, engaging dialogue-based story about ${topic} suitable for ${ageRange} year olds. 
                  Feature at least 2-3 characters having detailed conversations that explain concepts about ${topic}.
                  Include: character introductions, multiple back-and-forth conversations, questions and answers about ${topic},
                  discoveries, lessons learned, and a meaningful ending. Make it 500-800 words long with natural, 
                  engaging dialogue. Don't provide any information about the author or the story metadata.`;
        break;
      default:
        prompt = `Create a detailed, long and engaging story about ${topic} suitable for ${ageRange} year olds. 
                  Make it comprehensive with rich descriptions, interesting characters, engaging plot, and educational value.
                  Aim for 400-600 words minimum. Don't provide any information about the author or the story metadata.`;
    }

    console.log("Prompt:", prompt);
    console.log("API Key configured:", !!GOOGLE_GEMINI_API_KEY);
    console.log("Calling Gemini API endpoint");

    // Call Google Gemini API
    const response = await axios.post(
      `${GOOGLE_GEMINI_API_URL}?key=${GOOGLE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 3000,
          temperature: 0.7,
          topP: 0.95,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Received response from AI");

    let generatedContent =
      response.data.candidates[0].content.parts[0].text;

    const content = {
      id: Date.now(),
      topic,
      ageRange,
      contentType,
      title: `The Adventures of ${topic}`,
      content: generatedContent,
      createdAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      ...content,
    });
  } catch (error) {
    console.error("Detailed error:", error.message);
    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response data:", error.response.data);
    }
    
    let errorDetails = error.message;
    if (error.response?.data?.error?.message) {
      errorDetails = error.response.data.error.message;
    }
    
    res.status(500).json({
      success: false,
      error: "Failed to generate content",
      details: errorDetails,
      hint: "Make sure your GOOGLE_GEMINI_API_KEY is valid and has access to the Gemini models. Use /test/generate-content for testing.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
