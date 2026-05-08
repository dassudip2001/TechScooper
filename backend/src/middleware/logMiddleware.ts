import { NextFunction, Request, Response } from "express";
// import { writeLog } from "../services/logService";
import { LogAction } from "../models/Log";
import { writeLog } from "../services/logService";

export const logMiddleware =
  (action: LogAction) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const originalJson = res.json.bind(res);

    res.json = function (data: unknown) {
      // Only log on successful responses
      if (res.statusCode < 400) {
        const body = data as Record<string, unknown>;

        writeLog({
          action,
          productId: req.params.id
            ? Number(req.params.id)
            : ((body?.id as number) ?? null),
          userId: req.user?.id ?? null,
          payload: req.body as Record<string, unknown>,
        });
      }

      return originalJson(data);
    };

    next();
  };
