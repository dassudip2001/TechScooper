
import { useState, useRef } from "react";
import axios from "axios";
import { UploadIcon } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/data";
import { getImageUrl } from "@/lib/cloudfont";




interface FileUploadProps {
  accept?: string; // input accept attribute
  allowedTypes?: ("image" | "video")[];
  onFileSelect?: (file: File) => void;
  // Returns both key (DB) and url (preview)
  onUploadComplete?: (data: { key: string; url: string }) => void;
}

export default function UploadFile({
  accept,
  allowedTypes,
  onFileSelect,
  onUploadComplete,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string>("");
  const [previewType, setPreviewType] = useState<"image" | "video" | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true);
      const type = file.type.startsWith("video") ? "video" : "image";

      // 1. Get presigned URL
      const { data } = await axiosInstance.post(API_ENDPOINTS.UPLOAD_URL, {
        fileName: file.name,
        contentType: file.type,
        type,
      });

      const { uploadUrl, key } = data;

      // 2. Upload directly to S3
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (e) => {
          if (e.total) {
            const percent = Math.round((e.loaded * 100) / e.total);
            console.log("Upload:", percent, "%");
          }
        },
      });

      
      const publicUrl = getImageUrl(key);
      setPreview(publicUrl);

      onUploadComplete?.({ key, url: publicUrl });
      return { key, url: publicUrl };
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFile = async (file: File | null) => {
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (
      (allowedTypes?.includes("image") === false && isImage) ||
      (allowedTypes?.includes("video") === false && isVideo)
    ) {
      alert("This file type is not allowed");
      return;
    }

    if (!isImage && !isVideo) {
      alert("Please upload an image or video file");
      return;
    }

    if (isVideo && file.size > 200 * 1024 * 1024) {
      alert("Video too large (max 200mb)");
      return;
    }
    // Parent-level validation
    if (onFileSelect && onFileSelect(file) !== undefined) {
      return;
    }

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setPreviewType(isVideo ? "video" : "image");

    onFileSelect?.(file);
    const result = await uploadFile(file);

    // Clean up local preview URL after upload completes
    // Only revoke if we have a server URL to replace it
    if (result?.url) {
      URL.revokeObjectURL(localPreview);
      setPreview(result.url);
    }
  };

  const handleButtonClick = () => fileInputRef.current?.click();

  return (
    <div className="bg-white rounded-2xl pt-0 p-8">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
          isDragging ? "border-gray-400" : "border-gray-300"
        } bg-gray-50/50 hover:border-gray-400 hover:bg-gray-50`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
          // accept="image/png,image/jpeg,image/gif,video/mp4"
          disabled={isUploading}
        />

        {preview ? (
          <div className="relative w-full max-w-full flex items-center justify-center">
            {/* <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-50 w-auto h-auto object-contain rounded-xl"
            /> */}
            {previewType === "image" && (
              <img
                src={preview}
                alt="Image Preview"
                className="max-w-full max-h-50 w-auto h-auto object-contain rounded-xl"
              />
            )}

            {previewType === "video" && (
              <video
                src={preview}
                controls
                autoPlay
                muted
                playsInline
                className="max-w-full max-h-50 w-auto h-auto object-contain rounded-xl bg-black"
              />
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-16 h-16 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="47.12"
                    strokeDashoffset="35.34"
                  />
                </svg>
              </div>
            )}
          </div>
        ) : (
          <>
            {isUploading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <svg
                  className="w-16 h-16 animate-spin mb-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(0, 0, 0, 0.1)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="47.12"
                    strokeDashoffset="35.34"
                    className="text-gray-600"
                  />
                </svg>
                <p className="text-gray-700 font-medium">Uploading...</p>
              </div>
            ) : (
              <>
                <UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-700 mb-2 font-medium">
                  Drag and drop your {accept?.split("/")[1]} here
                </p>
                <p className="text-gray-500 text-sm mb-4">or</p>
                <button
                  type="button"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition font-medium"
                  onClick={handleButtonClick}
                  disabled={isUploading}
                >
                  Choose File
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}