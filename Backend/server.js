const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Hugging Face API configuration
const HUGGINGFACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

// Content generation endpoint
app.post('/api/generate-content', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const { topic, ageRange, contentType } = req.body;

    if (!topic || !ageRange || !contentType) {
      console.error('Missing required fields:', { topic, ageRange, contentType });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!HUGGINGFACE_API_KEY) {
      console.error('Hugging Face API key is not configured');
      return res.status(500).json({ error: 'API configuration error' });
    }

    // Prepare the prompt based on content type and parameters
    let prompt = '';
    switch (contentType) {
      case 'educational':
        prompt = `Create an educational story about ${topic} suitable for ${ageRange} year olds. 
                  The story should be informative, engaging, and include key concepts about ${topic}.
                  Don't provide any information about the author or the story.`;
        break;
      case 'adventure':
        prompt = `Create an adventure story about ${topic} suitable for ${ageRange} year olds. 
                  The story should be exciting, include a journey or quest, and teach about ${topic} through the adventure.
                  Don't provide any information about the author or the story.`;
        break;
      case 'interactive':
        prompt = `Create an interactive quiz about ${topic} suitable for ${ageRange} year olds. 
                  The quiz should include questions, choices, and opportunities for the reader to engage with the content about ${topic}.`;
        break;
      case 'explainer':
        prompt = `Create a simple explainer about ${topic} suitable for ${ageRange} year olds. 
                  The content should break down complex concepts about ${topic} into easy-to-understand parts.`;
        break;
      case 'dialogue':
        prompt = `Create a dialogue-based story about ${topic} suitable for ${ageRange} year olds. 
                  The content should use conversations between characters to explain concepts about ${topic}.`;
        break;
      default:
        prompt = `Create a story about ${topic} suitable for ${ageRange} year olds.`;
    }

    console.log('Prompt:', prompt);

    // Call Hugging Face API
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.1
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
      }
    );

    console.log('Received response from AI');

    let generatedContent = response.data[0].generated_text;
    
    // Remove the prompt from the generated content
    if (generatedContent.includes(prompt)) {
      generatedContent = generatedContent.replace(prompt, '').trim();
    }

    const content = {
      id: Date.now(),
      topic,
      ageRange,
      contentType,
      title: `The Adventures of ${topic}`,
      content: generatedContent,
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      ...content
    });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate content',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 