"use client";

import React, { useState } from "react";
import { FileText, Download, Calendar, User, Upload, X, Check } from "lucide-react";

export interface DocumentVersion {
  id: string;
  version: string;
  title: string;
  description?: string;
  pdfPath: string;
  uploadDate: string;
  uploadedBy: string;
  fileSize: string;
}

interface DocumentVersionsProps {
  versions: DocumentVersion[];
  onUpload?: (file: File, versionData: Omit<DocumentVersion, 'id' | 'pdfPath' | 'fileSize'>) => void;
  allowUpload?: boolean;
}

const DocumentVersions: React.FC<DocumentVersionsProps> = ({
  versions,
  onUpload,
  allowUpload = false,
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState({
    version: "",
    title: "",
    description: "",
    uploadedBy: "",
  });
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setUploadFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setUploadFile(file);
      }
    }
  };

  const handleSubmit = () => {
    if (uploadFile && onUpload && uploadData.version && uploadData.title) {
      onUpload(uploadFile, {
        ...uploadData,
        uploadDate: new Date().toISOString(),
      });
      resetUploadForm();
    }
  };

  const resetUploadForm = () => {
    setShowUploadModal(false);
    setUploadFile(null);
    setUploadData({
      version: "",
      title: "",
      description: "",
      uploadedBy: "",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Document Versions
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Access all versions of this document
          </p>
        </div>
        {allowUpload && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primaryho dark:bg-primary dark:hover:bg-primaryho"
          >
            <Upload className="h-4 w-4" />
            <span>Upload New Version</span>
          </button>
        )}
      </div>

      {/* Versions List */}
      <div className="space-y-4">
        {versions.map((version, index) => (
          <div
            key={version.id}
            className="group relative overflow-hidden rounded-lg border border-stroke bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-strokedark dark:bg-blacksection"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Version Info */}
              <div className="flex flex-1 items-start gap-4">
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <FileText className="h-6 w-6 text-primary" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20">
                      v{version.version}
                    </span>
                    {index === 0 && (
                      <span className="inline-flex items-center rounded-full bg-meta/10 px-3 py-1 text-xs font-semibold text-meta dark:bg-meta/20">
                        Latest
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                    {version.title}
                  </h3>
                  {version.description && (
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                      {version.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(version.uploadDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      <span>{version.uploadedBy}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      <span>{version.fileSize}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <a
                href={version.pdfPath}
                download
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-stroke bg-gray-50 text-gray-600 transition-all hover:bg-primary hover:text-white dark:border-strokedark dark:bg-btndark dark:text-gray-400 dark:hover:bg-primary dark:hover:text-white"
                aria-label={`Download version ${version.version}`}
              >
                <Download className="h-5 w-5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-xl border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-blacksection">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stroke p-6 dark:border-strokedark">
              <h3 className="text-xl font-bold text-black dark:text-white">
                Upload New Document Version
              </h3>
              <button
                onClick={resetUploadForm}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-btndark"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* File Upload Area */}
              <div
                className={`mb-6 rounded-lg border-2 border-dashed p-8 text-center transition-all ${
                  dragActive
                    ? "border-primary bg-primary/5 dark:bg-primary/10"
                    : "border-stroke dark:border-strokedark"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadFile ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-meta/10 dark:bg-meta/20">
                      <Check className="h-8 w-8 text-meta" />
                    </div>
                    <p className="text-sm font-medium text-black dark:text-white">
                      {uploadFile.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={() => setUploadFile(null)}
                      className="text-sm text-primary hover:underline"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black dark:text-white">
                        Drag and drop your PDF file here, or
                      </p>
                      <label className="mt-1 inline-block cursor-pointer text-sm text-primary hover:underline">
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        browse
                      </label>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      PDF files only, max 50MB
                    </p>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Version Number *
                    </label>
                    <input
                      type="text"
                      value={uploadData.version}
                      onChange={(e) =>
                        setUploadData({ ...uploadData, version: e.target.value })
                      }
                      placeholder="e.g., 1.0.0"
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary dark:border-strokedark dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Uploaded By *
                    </label>
                    <input
                      type="text"
                      value={uploadData.uploadedBy}
                      onChange={(e) =>
                        setUploadData({ ...uploadData, uploadedBy: e.target.value })
                      }
                      placeholder="Your name"
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary dark:border-strokedark dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    value={uploadData.title}
                    onChange={(e) =>
                      setUploadData({ ...uploadData, title: e.target.value })
                    }
                    placeholder="e.g., API Documentation"
                    className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary dark:border-strokedark dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Description (Optional)
                  </label>
                  <textarea
                    value={uploadData.description}
                    onChange={(e) =>
                      setUploadData({ ...uploadData, description: e.target.value })
                    }
                    placeholder="Brief description of changes or notes"
                    rows={3}
                    className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary dark:border-strokedark dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-stroke p-6 dark:border-strokedark">
              <button
                onClick={resetUploadForm}
                className="rounded-lg border border-stroke px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-btndark"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!uploadFile || !uploadData.version || !uploadData.title || !uploadData.uploadedBy}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-primaryho disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary dark:hover:bg-primaryho"
              >
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentVersions;
