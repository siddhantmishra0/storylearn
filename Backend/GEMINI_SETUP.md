# Google Gemini API Setup Guide

## Issue: 404 Error with Gemini API

If you're getting a 404 error when calling `/api/generate-content`, it means your Google Gemini API key is either:
1. Invalid or expired
2. Not configured properly in Google Cloud Console
3. Associated with a project that doesn't have the Generative Language API enabled

## How to Fix

### Step 1: Create/Verify Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Make sure you have billing enabled

### Step 2: Enable Generative Language API
1. Go to **APIs & Services** > **Library**
2. Search for **"Generative Language API"**
3. Click on it and press **Enable**

### Step 3: Create API Key
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy the generated API key
4. Update your `.env` file:
   ```
   GOOGLE_GEMINI_API_KEY=your_new_api_key_here
   ```

### Step 4: Verify Installation
Restart the backend server and test with the test endpoint first:

```bash
curl -X POST http://localhost:5001/test/generate-content \
  -H "Content-Type: application/json" \
  -d '{"topic":"dinosaurs","ageRange":"5","contentType":"educational"}'
```

This will return mock data and confirm the backend is working.

### Step 5: Test Gemini API
Once the test endpoint works and you have a valid API key, try:

```bash
curl -X POST http://localhost:5001/api/generate-content \
  -H "Content-Type: application/json" \
  -d '{"topic":"dinosaurs","ageRange":"5","contentType":"educational"}'
```

## Using the Test Endpoint (Fallback)

While setting up Gemini, you can use the `/test/generate-content` endpoint to develop and test your frontend:
- It returns mock data instantly
- No API key required
- Perfect for development and testing

The Frontend is currently configured to use `/api/generate-content`, but you can switch back to `/test/generate-content` in `src/pages/Dashboard.jsx` line 13 if needed.

Update the `GOOGLE_GEMINI_API_URL` in `server.js` if you want to use a different model.

## Support

- Google Generative AI Documentation: https://ai.google.dev/docs
- API Reference: https://ai.google.dev/api/rest
