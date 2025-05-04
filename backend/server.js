import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from 'url';

// Load environment variables from root directory
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables validation
const config = {
  endpoint: process.env.AZURE_ENDPOINT,
  apiKey: process.env.AZURE_API_KEY,
  deployment: process.env.DEPLOYMENT_NAME,
  apiVersion: process.env.API_VERSION
};

// Validate required environment variables
Object.entries(config).forEach(([key, value]) => {
  if (!value) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// API routes
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt?.trim()) {
    return res.status(400).json({ error: "Valid prompt is required" });
  }

  try {
    console.log("🎨 Generating image for prompt:", prompt);

    const response = await fetch(
      `${config.endpoint}/openai/deployments/${config.deployment}/images/generations?api-version=${config.apiVersion}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': config.apiKey,
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          n: 1,
          size: "1024x1024"
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Azure API Error:", errorData);
      return res.status(response.status).json({
        error: errorData.error?.message || "Failed to generate image"
      });
    }

    const data = await response.json();
    
    if (!data.data?.[0]?.url) {
      throw new Error("Invalid response format from Azure API");
    }

    console.log("✅ Image generated successfully");
    res.json({
      imageUrl: data.data[0].url,
      revisedPrompt: data.data[0].revised_prompt || prompt
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Image generation failed" });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Serve React app - moved after API routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Catch-all route for client-side routing
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

export default app;