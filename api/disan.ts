import { disanRecords } from '../src/server/geminiService.ts';

export default function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).json(disanRecords);
}
