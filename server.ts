import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { disanRecords, processChatQuery } from './src/server/geminiService';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  // Dev server must run strictly on port 3000
  const port = 3000;

  app.use(express.json());

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      recordsCount: disanRecords.length,
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  // API: Get disan records
  app.get('/api/disan', (req, res) => {
    res.json(disanRecords);
  });

  // API: Gemini Q&A with strict grounding
  app.post('/api/gemini/chat', async (req, res) => {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Câu hỏi không hợp lệ.' });
    }

    const result = await processChatQuery(question);
    return res.json(result);
  });

  // Setup Vite in middleware mode for dev or serve dist in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
