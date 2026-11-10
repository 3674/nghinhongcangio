import { disanData } from '../src/data/disanData';

export default function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).json({
    status: 'ok',
    recordsCount: disanData.length,
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
  });
}
