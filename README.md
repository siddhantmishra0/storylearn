# StoryLearn - AI-Powered Educational Content Generator

A modern web application that generates interactive, personalized learning content for children of all ages using Google Gemini AI. Create educational stories, adventures, quizzes, explainers, and dialogues tailored to specific age groups and learning styles.

---

## 🎯 Features

### Content Generation
- **Educational Stories**: Informative narratives with key concepts and facts
- **Adventure Stories**: Exciting journeys with obstacles, character development, and plot twists
- **Interactive Quizzes**: Multiple-choice questions with scoring systems and explanations
- **Simple Explainers**: Break down complex topics into easy-to-understand sections
- **Character Dialogues**: Conversations between characters explaining concepts

### Personalization
- **Age-Appropriate Content**: Generate content tailored to specific age groups (3-5, 6-8, 9-12, 13-15, 16+)
- **Topic Flexibility**: Generate content on any topic
- **Content Type Selection**: Choose from 5 different content formats

### User Experience
- **Text-to-Speech**: Hear stories read aloud with multiple voice options
- **Voice Selection**: Choose from all available system voices with language support
- **Content History**: Automatically saves generated content to local storage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **User Authentication**: Simple login/registration system
- **Dark Mode Support**: Modern UI with accessibility considerations

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2.0 with Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS 3.3.5
- **Icons**: Lucide React
- **Authentication**: Context API with localStorage
- **Build Tool**: Vite 5.0.0

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **AI API**: Google Generative Language API (Gemini)
- **HTTP Client**: Axios
- **Configuration**: Dotenv for environment variables
- **CORS**: Enabled for cross-origin requests

### Development Tools
- **ESLint**: Code quality and style checking
- **PostCSS**: CSS transformation with Tailwind
- **Autoprefixer**: Browser compatibility

---

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **Git** (for version control)
- **Google Gemini API Key** (get one from [Google AI Studio](https://aistudio.google.com/apikey))

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd storylearn3
```

### Step 2: Install Backend Dependencies

```bash
cd Backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file in the `Backend` directory:

```bash
cd ../Backend
```

Add the following environment variables:

```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
PORT=5001
```

**To get a Google Gemini API Key:**
1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy the generated key
4. Paste it into your `.env` file

### Step 5: Verify Setup

Check if everything is installed correctly:

```bash
# Backend
node --version
npm --version

# Frontend
cd ../Frontend
npm --version
```

---

## 🎬 Running the Application

### Start the Backend Server

```bash
cd Backend
npm start
```

Expected output:
```
Server running on port 5001
```

The backend will be available at `http://localhost:5001`

### Start the Frontend Development Server

Open a new terminal and run:

```bash
cd Frontend
npm run dev
```

Expected output:
```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
```

Open your browser and navigate to `http://localhost:5173/`

---

## 📂 Project Structure

```
storylearn3/
├── Backend/
│   ├── node_modules/
│   ├── server.js              # Main Express server
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables (create this)
│   ├── GEMINI_SETUP.md        # Gemini API setup guide
│   └── package-lock.json
│
├── Frontend/
│   ├── src/
│   │   ├── main.jsx           # Application entry point
│   │   ├── App.jsx            # Main app component
│   │   ├── index.css          # Global styles
│   │   ├── App.css            # App-specific styles
│   │   ├── assets/            # Static assets
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Login.jsx      # Login page
│   │   │   ├── Register.jsx   # Registration page
│   │   │   ├── Dashboard.jsx  # Main content generation page
│   │   │   └── History.jsx    # View generated content history
│   │   ├── components/
│   │   │   └── Navbar.jsx     # Navigation bar
│   │   └── contexts/
│   │       └── AuthContext.jsx # Authentication context
│   ├── public/
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── eslint.config.js       # ESLint configuration
│   ├── index.html             # HTML entry point
│   ├── package.json           # Frontend dependencies
│   └── package-lock.json
│
├── README.md                  # This file
├── package-lock.json          # Root lock file
└── .git/                      # Git repository
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5001
```

### Endpoints

#### 1. Generate Content (Production)
**Endpoint**: `POST /api/generate-content`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "topic": "Solar System",
  "ageRange": "9-12",
  "contentType": "educational"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "id": 1711841122431,
  "topic": "Solar System",
  "ageRange": "9-12",
  "contentType": "educational",
  "title": "The Adventures of Solar System",
  "content": "Comprehensive educational story about the solar system...",
  "createdAt": "2026-03-30T16:28:42.000Z"
}
```

**Response** (Error - 500):
```json
{
  "success": false,
  "error": "Failed to generate content",
  "details": "Error message from Gemini API",
  "hint": "Make sure your GOOGLE_GEMINI_API_KEY is valid..."
}
```

**Parameters**:
- `topic` (string, required): Topic to generate content about
- `ageRange` (string, required): Age range - "3-5", "6-8", "9-12", "13-15", or "16+"
- `contentType` (string, required): "educational", "adventure", "interactive", "explainer", or "dialogue"

---

#### 2. Test Endpoint (Mock Data)
**Endpoint**: `POST /test/generate-content`

**Purpose**: Generate mock content for testing without using API quota

**Request Body**: Same as `/api/generate-content`

**Response**: Same structure as production endpoint but with pre-written mock content

---

## 🎮 Usage Guide

### Creating Content

1. **Register/Login**
   - Go to the Home page
   - Click "Get Started" or "Sign In"
   - Create an account or log in with existing credentials
   - Credentials are stored in browser localStorage (development only)

2. **Generate Content**
   - Navigate to Dashboard
   - Fill in the form:
     - **Topic**: Enter any topic (e.g., "Dinosaurs", "Space", "Photosynthesis")
     - **Age Range**: Select appropriate age group
     - **Content Type**: Choose format for content
   - Click "Generate Learning Content"
   - Wait for content generation (may take 10-30 seconds)

3. **Interact with Content**
   - **Read Aloud**: Click the speaker icon to hear content read aloud
   - **Select Voice**: Choose preferred voice from dropdown
   - **View Details**: See topic, age range, and content type as tags
   - **Create New**: Generate different content
   - **View History**: Check previously generated content

### Viewing History

- Click "View History" on any generated content
- See up to 10 most recent items
- Each item shows:
  - Title and topic
  - Generated date
  - Quick preview of content
  - Age range and content type

---

## 🔧 Configuration

### Backend Configuration

Edit `Backend/server.js` to customize:

**API Model** (Line 17):
```javascript
const GOOGLE_GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";
```

**Token Limits** (Line 137):
```javascript
generationConfig: {
  maxOutputTokens: 3000,  // Increase for longer content
  temperature: 0.7,       // 0-2: Lower = more focused, Higher = creative
  topP: 0.95,            // 0-1: Nucleus sampling parameter
},
```

### Frontend Configuration

Edit `Frontend/vite.config.js` to customize:

**Path Aliases**:
```javascript
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  }
}
```

**API Endpoint** (in `Dashboard.jsx` line 13):
```javascript
const response = await fetch(
  "http://localhost:5001/api/generate-content",  // Change if running on different port
  ...
);
```

---

## 🎨 Customization

### Prompt Engineering

To customize generated content, modify prompts in `Backend/server.js` (Lines 82-112):

```javascript
case "educational":
  prompt = `Create a comprehensive and detailed educational story about ${topic}...`;
  break;
```

### Styling

- **Tailwind CSS**: Modify `Frontend/tailwind.config.js`
- **Global Styles**: Edit `Frontend/src/index.css`
- **Component Styles**: Edit `Frontend/src/App.css`

### Colors and Branding

Primary color: Purple (used throughout UI)
- Buttons: `bg-purple-600 hover:bg-purple-700`
- Accents: `text-purple-600`

Edit color values in any component for rebranding.

---

## ❌ Troubleshooting

### Backend Issues

#### ❌ Port Already in Use
**Error**: `EADDRINUSE: address already in use :::5001`

**Solution**:
```bash
# Find process using port 5001
netstat -ano | findstr :5001

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use different port
PORT=5002 npm start
```

#### ❌ Google Gemini API 404 Error
**Error**: `models/gemini-pro is not found for API version v1`

**Solution**:
1. Verify API key is valid: `echo $GOOGLE_GEMINI_API_KEY`
2. Check Generative Language API is enabled in Google Cloud Console
3. Ensure billing is configured for the project
4. Use `/test/generate-content` endpoint for testing

#### ❌ API Key Not Set
**Error**: `Google Gemini API key is not configured`

**Solution**:
```bash
# Check if .env file exists in Backend directory
ls -la Backend/.env

# Create .env if missing
echo "GOOGLE_GEMINI_API_KEY=your_key_here" > Backend/.env
echo "PORT=5001" >> Backend/.env
```

---

### Frontend Issues

#### ❌ Cannot Connect to Backend
**Error**: `Failed to generate content` / `Error generating content`

**Solution**:
1. Ensure backend is running: `npm start` in Backend directory
2. Check backend is on port 5001: `lsof -i :5001`
3. Verify API endpoint in Dashboard.jsx line 13
4. Check browser console (F12) for CORS errors

#### ❌ Text-to-Speech Not Working
**Error**: No audio when clicking speaker icon

**Solution**:
1. Check browser supports Web Speech API (Chrome, Edge, Safari)
2. Ensure voices are loaded (check console)
3. Try different voice from dropdown
4. Check if browser has permission to access audio
5. Refer to [Audio Feature Documentation](#audio-feature-fixes)

#### ❌ Content Not Saving to History
**Error**: History page is empty

**Solution**:
1. Check browser localStorage is enabled
2. Clear browser cache and retry
3. Open DevTools (F12) → Application → Local Storage → Check if data exists
4. Verify localStorage quota not exceeded

#### ❌ Vite Server Not Starting
**Error**: `Port 5173 is in use` or build errors

**Solution**:
```bash
# Use different port
npm run dev -- --port 5174

# Clear build cache
rm -rf node_modules/.vite
npm run dev
```

---

### General Troubleshooting

#### Restart Everything
```bash
# Kill processes
pkill -f "npm"
pkill -f "node"

# Clear caches
rm -rf Frontend/node_modules/.vite
rm -rf Frontend/dist

# Reinstall and restart
cd Backend && npm install && npm start
# In new terminal:
cd Frontend && npm install && npm run dev
```

#### Check Logs

**Backend logs**: Terminal where you ran `npm start`
**Frontend logs**: Browser DevTools Console (F12 → Console)

#### Enable Debug Mode

In `Dashboard.jsx`, uncomment to see detailed logs:
```javascript
console.log("Backend response:", data);
console.log("API Key configured:", !!GOOGLE_GEMINI_API_KEY);
```

---

## 📚 Additional Documentation

- **Gemini API Setup**: See [GEMINI_SETUP.md](Backend/GEMINI_SETUP.md)
- **React Router**: https://reactrouter.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Vite Documentation**: https://vitejs.dev/
- **Google Generative AI API**: https://ai.google.dev/

---

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch: `git checkout -b feature/YourFeature`
2. Make your changes
3. Commit: `git commit -m 'Add YourFeature'`
4. Push: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📋 Project Checklist

- [x] Frontend React setup with Vite
- [x] Backend Express server
- [x] Google Gemini API integration
- [x] User authentication (localStorage-based)
- [x] Content generation (5 types)
- [x] Text-to-speech with voice selection
- [x] Content history
- [x] Responsive design
- [x] Error handling
- [x] Environment configuration

---

## 🎯 Future Enhancements

- [ ] Backend database (MongoDB/PostgreSQL) for persistent user data
- [ ] User profiles with progress tracking
- [ ] Content customization settings
- [ ] Multiple language support
- [ ] Advanced analytics dashboard
- [ ] Content sharing and export (PDF/Word)
- [ ] AI-powered quiz scoring and feedback
- [ ] Image generation for stories
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration features

---

## 📝 Notes

### Development Mode vs Production

**Current Setup** (Development):
- Authentication: localStorage-based (not secure)
- Content: Not persisted between sessions
- Suitable for: Testing, learning, development

**For Production**:
- Implement proper backend authentication (JWT tokens)
- Use database for persistent storage
- Enable HTTPS
- Implement rate limiting
- Add content moderation
- Use production Gemini API keys with restrictions

### Performance Optimization

- Content generation takes 10-30 seconds (Gemini API latency)
- Text-to-speech takes 5-10 seconds depending on content length
- Voice loading may take 1-2 seconds on first page load
- History stores only last 10 items to manage localStorage quota

### Browser Support

- **Recommended**: Chrome/Edge/Firefox/Safari (latest versions)
- **Text-to-Speech**: Chrome, Edge, Safari (Firefox partial support)
- **Minimum**: ES2020 compatible browsers

---

## 📞 Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review browser console for error messages (F12)
3. Check backend logs in terminal
4. Verify environment configuration
5. Review [GEMINI_SETUP.md](Backend/GEMINI_SETUP.md) for API issues

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🎓 Learning Resources

This project demonstrates:
- Modern React patterns and hooks
- Express.js backend development
- AI API integration
- Authentication and state management
- Responsive web design with Tailwind CSS
- Component-based architecture
- Error handling and user feedback

Perfect for learning full-stack web development!

---

**Last Updated**: March 30, 2026  
**Version**: 1.0.0  
**Status**: Active Development
