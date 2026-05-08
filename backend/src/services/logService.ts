import { Log, LogAction } from "../models/Log";

interface LogPayload {
  action: LogAction;
  productId: number | null;
  userId: number | null;
  payload: Record<string, unknown>;
}

export async function writeLog(data: LogPayload): Promise<void> {
  try {
    await Log.create(data);
  } catch (err) {
    // Never let a log failure crash the main request
    console.error("[MongoDB Log Error]", err);
  }
}
