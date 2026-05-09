import { Request, Response } from "express";
import { Log } from "../models/Log";

export async function getLogs(req: Request, res: Response): Promise<void> {
  const { action, productId, userId, page = 1, limit = 20 } = req.query;

  const filter: Record<string, unknown> = {};
  if (action) filter.action = action;
  if (productId) filter.productId = Number(productId);
  if (userId) filter.userId = Number(userId);

  const [logs, total] = await Promise.all([
    Log.find(filter)
      .sort({ timestamp: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit),
    Log.countDocuments(filter),
  ]);

  res.json({ logs, total, page: +page, pages: Math.ceil(total / +limit) });
}
