"use client";

import { useState } from "react";
import { HiCloudUpload, HiX, HiCheck } from "react-icons/hi";

interface FileUploadProps {
  type: "document" | "video";
  onUploadComplete: (url: string) => void;
  currentFile?: string;
  label: string;
}

export default function FileUpload({
  type,
  onUploadComplete,
  currentFile,
  label,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(currentFile || "");
  const [error, setError] = useState("");

  const acceptedTypes = type === "document"
    ? ".pdf"
    : ".mp4,.mov,.avi,.webm";

  const maxSize = type === "document" ? "50MB" : "500MB";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedFile(data.data.url);
        onUploadComplete(data.data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setUploadedFile("");
    onUploadComplete("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {uploadedFile ? (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <HiCheck className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              File uploaded successfully
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 truncate">
              {uploadedFile}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="flex-shrink-0 p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 transition"
          >
            <HiX className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            accept={acceptedTypes}
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id={`file-upload-${type}`}
          />
          <label
            htmlFor={`file-upload-${type}`}
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition ${
              uploading
                ? "border-primary bg-primary/5 cursor-not-allowed"
                : "border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <HiCloudUpload
                className={`h-10 w-10 mb-3 ${
                  uploading
                    ? "text-primary animate-pulse"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
              {uploading ? (
                <p className="text-sm text-primary font-medium">
                  Uploading...
                </p>
              ) : (
                <>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {type === "document" ? "PDF" : "MP4, MOV, AVI, WebM"} (Max {maxSize})
                  </p>
                </>
              )}
            </div>
          </label>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Upload a {type === "document" ? "PDF document" : "video file"} from your computer
      </p>
    </div>
  );
}
