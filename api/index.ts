import express from 'express';
import { disanRecords, processChatQuery } from '../src/server/geminiService';

const app = express();

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
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.json(disanRecords);
});

// API: Gemini Q&A with strict grounding
app.post('/api/gemini/chat', async (req, res) => {
  const { question } = req.body || {};

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Câu hỏi không hợp lệ.' });
  }

  const result = await processChatQuery(question);
  return res.json(result);
});

export default app;
