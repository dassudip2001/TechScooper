import { Request, Response } from "express";

import { randomUUID } from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../lib/s3";

export async function upload(req: Request, res: Response) {
  try {
    const { fileName, contentType, type } = req.body;
    const ext = fileName.split(".").pop();
    const key = `artwork-uploads/${type}s/${randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 60 * 5, // 5 minutes
    });

    return res.status(200).json({
      uploadUrl,
      key,
    });
  } catch (error) {
    console.error("Error in POST /api/upload-url:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
}
