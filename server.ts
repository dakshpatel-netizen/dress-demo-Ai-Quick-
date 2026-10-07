import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json({ limit: '50mb' }));

  // Initialize Gemini AI Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API endpoint for realistic garment analysis & photorealistic model fitting
  app.post('/api/generate-tryon', async (req: Request, res: Response): Promise<void> => {
    try {
      const { imageBase64, gender, imageName } = req.body;

      if (!imageBase64) {
        res.status(400).json({ error: 'Image is required' });
        return;
      }

      // Format image data
      let base64Data = imageBase64;
      let mimeType = 'image/jpeg';
      if (imageBase64.includes(';base64,')) {
        const parts = imageBase64.split(';base64,');
        mimeType = parts[0].replace('data:', '') || 'image/jpeg';
        base64Data = parts[1];
      }

      // Step 1: Analyze garment characteristics
      let garmentAnalysis = {
        garmentType: 'clothing',
        colors: 'as shown',
        pattern: 'original',
        fabric: 'natural',
        suggestedBackground: 'warm sunlit minimalist studio architecture with soft diffused lighting',
      };

      try {
        if (process.env.GEMINI_API_KEY) {
          const analysisResponse = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: {
              parts: [
                {
                  inlineData: {
                    mimeType,
                    data: base64Data,
                  },
                },
                {
                  text: `Analyze this uploaded fashion product garment image. Return a concise JSON with:
1. "garmentType": (e.g., Saree, Lehenga, Western Dress, Utility Blazer, Jacket, Kurti, T-Shirt, Hoodie, Kidswear, etc.)
2. "colors": exact color palette and shades
3. "pattern": embroidery, prints, textures, borders, or solid style
4. "fabric": silk, satin, denim, cotton, wool, etc.
5. "suggestedBackground": most suitable professional fashion photoshoot setting (e.g., modern architectural gallery, luxury heritage courtyard, contemporary studio loft, bright lifestyle setting) suitable for ${gender}.
Return strict JSON only.`,
                },
              ],
            },
          });

          const rawText = analysisResponse.text || '';
          const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanedJson);
          if (parsed && parsed.garmentType) {
            garmentAnalysis = { ...garmentAnalysis, ...parsed };
          }
        }
      } catch (err) {
        console.warn('Garment analysis fallback:', err);
      }

      // Respond with structured fitting metadata and background guidance
      res.json({
        success: true,
        garmentAnalysis,
        gender: gender || 'female',
      });
    } catch (error: any) {
      console.error('Error generating try-on:', error);
      res.status(500).json({ error: error.message || 'Generation failed' });
    }
  });

  // In development, hook up Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
