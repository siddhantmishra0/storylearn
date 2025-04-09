const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Hugging Face API configuration
const HUGGINGFACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const HUGGING_FACE_API_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

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
  generatedContent = `Once upon a time in a magical land called Computerville, there lived a tiny superhero named Micro. Micro was not your ordinary superhero; he was a mighty microprocessor! He resided inside a magnificent machine called a computer, which sat proudly on the desk of a wise sorcerer named Professor Wiz.

Now, Micro had an extraordinary power. He could perform countless calculations at lightning speed, faster than even the quickest fairies could blink! And he loved to use his powers to help solve problems and make life easier for everyone in Computerville.

One sunny day, Micro received an urgent message from the mayor of Computerville, who was frantically waving a sheet of paper. "Micro," he cried, "our beloved town is losing its color! Our pictures are fading, and our music is becoming muffled. We need you to restore the magic!"

Micro sprang into action, eager to save Computerville. He traveled through the busiest arteries of the computer, known as data paths, making his way towards the Graphics Palace and the Music Meadows.

At the Graphics Palace, Micro discovered that the colors were disappearing because the images were not being drawn correctly. He found out that this was due to a problem with the instructions the Central Processing Unit (CPU) was sending. So, Micro worked tirelessly to rewrite these instructions, ensuring they were clear and concise. Once this was done, the CPU happily followed them, drawing beautiful, vibrant pictures once more.

Next, Micro went to the Music Meadows where he heard the sad tunes of muffled melodies. Here, he found out that the problem was with the sound waves. To fix it, Micro used his incredible calculation skills to adjust the volume levels and frequencies, restoring the beautiful symphony of sounds that filled the air.

As Micro returned to Professor Wiz, the grateful residents of Computerville celebrated their hero's triumphant return. From then on, Micro continued to work tirelessly, performing calculations, solving problems, and maintaining harmony within the magical world of Computerville.

So you see, dear young friends, a microprocessor may be small, but it holds great power. Just like our brave little friend, Micro, it performs countless calculations, helps solve problems, and keeps everything running smoothly. Isn't that amazing?`;
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

    if (!HUGGINGFACE_API_KEY) {
      console.error("Hugging Face API key is not configured");
      return res.status(500).json({ error: "API configuration error" });
    }

    // Prepare the prompt based on content type and parameters
    let prompt = "";
    switch (contentType) {
      case "educational":
        prompt = `Create an educational story about ${topic} suitable for ${ageRange} year olds. 
                  The story should be informative, engaging, and include key concepts about ${topic}.
                  Don't provide any information about the author or the story.`;
        break;
      case "adventure":
        prompt = `Create an adventure story about ${topic} suitable for ${ageRange} year olds. 
                  The story should be exciting, include a journey or quest, and teach about ${topic} through the adventure.
                  Don't provide any information about the author or the story.`;
        break;
      case "interactive":
        prompt = `Create an interactive quiz about ${topic} suitable for ${ageRange} year olds. 
                  The quiz should include questions, choices, and opportunities for the reader to engage with the content about ${topic}.`;
        break;
      case "explainer":
        prompt = `Create a simple explainer about ${topic} suitable for ${ageRange} year olds. 
                  The content should break down complex concepts about ${topic} into easy-to-understand parts.`;
        break;
      case "dialogue":
        prompt = `Create a dialogue-based story about ${topic} suitable for ${ageRange} year olds. 
                  The content should use conversations between characters to explain concepts about ${topic}.`;
        break;
      default:
        prompt = `Create a story about ${topic} suitable for ${ageRange} year olds.`;
    }

    console.log("Prompt:", prompt);

    // Call Hugging Face API
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.1,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Received response from AI");

    let generatedContent = response.data[0].generated_text;

    // Remove the prompt from the generated content
    if (generatedContent.includes(prompt)) {
      generatedContent = generatedContent.replace(prompt, "").trim();
    }

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
    console.error("Detailed error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate content",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
