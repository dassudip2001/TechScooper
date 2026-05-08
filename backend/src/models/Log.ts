// src/models/mongo/Log.ts
import mongoose, { Document, Schema } from "mongoose";

export type LogAction = "createProduct" | "updateProduct" | "deleteProduct";

export interface ILog extends Document {
  action: LogAction;
  productId: number | null;
  userId: number | null;
  payload: Record<string, unknown>;
  timestamp: Date;
}

const logSchema = new Schema<ILog>({
  action: {
    type: String,
    enum: ["createProduct", "updateProduct", "deleteProduct"],
    required: true,
  },
  productId: { type: Number, default: null },
  userId: { type: Number, default: null },
  payload: { type: Schema.Types.Mixed, default: {} },
  timestamp: { type: Date, default: Date.now },
});

logSchema.index({ action: 1, timestamp: -1 });
logSchema.index({ productId: 1 });
logSchema.index({ userId: 1 });

export const Log = mongoose.model<ILog>("Log", logSchema);
