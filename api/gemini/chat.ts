import { processChatQuery } from '../../src/server/geminiService';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Phương thức không được hỗ trợ. Vui lòng sử dụng POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { question } = body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Câu hỏi không hợp lệ.' });
    }

    const result = await processChatQuery(question);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('API Error in /api/gemini/chat:', err);
    return res.status(500).json({
      answer: 'Hiện tại hệ thống đang bận. Vui lòng thử lại sau giây lát.',
      citations: []
    });
  }
}
