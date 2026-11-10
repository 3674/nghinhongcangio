import { disanRecords } from '../src/server/geminiService.ts';

export default function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).json({
    status: 'ok',
    recordsCount: disanRecords.length,
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
  });
}
