import React, { useState } from "react";
import UploadBox from "@/app/componets/uploadFile";
import DownLoad from "@/app/componets/download";
import FileProgress from "@/app/componets/loadingfile";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelected = (file: File) => {
    setUploadedFile(file);
    setProgress(0);
    setError(null);
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append("file", file);

    let fakeProgress = 0;
    const minUploadTime = 3000;
    const intervalTime = 50;
    const steps = minUploadTime / intervalTime;
    const increment = 100 / steps;

    const interval = setInterval(() => {
      fakeProgress += increment;
      setProgress(Math.min(Math.round(fakeProgress), 99));
    }, intervalTime);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/upload", true);

    xhr.onload = () => {
      clearInterval(interval);
      const elapsed = Math.min(minUploadTime, Date.now() - startTime);
      const remaining = minUploadTime - elapsed;
      if (remaining > 0) {
        setTimeout(() => {
          setProgress(100);
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            setDownloadUrl(response.downloadUrl);
          } else {
            setError("Upload failed: " + xhr.responseText);
          }
        }, remaining);
      } else {
        setProgress(100);
        if (xhr.status === 1000) {
          const response = JSON.parse(xhr.responseText);
          setDownloadUrl(response.downloadUrl);
        } else {
          setError("Upload failed: " + xhr.responseText);
        }
      }
    };

    xhr.onerror = () => {
      clearInterval(interval);
      setError("Upload failed: Network error");
    };

    const startTime = Date.now();
    xhr.send(formData);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center text-zinc-700">
      <UploadBox onFileSelected={handleFileSelected} />

      {uploadedFile && (
        <FileProgress fileName={uploadedFile.name} fileSize={uploadedFile.size} progress={progress} />
      )}
      {downloadUrl && uploadedFile && (
        <div className="mt-8 text-center flex flex-col items-center">
          <DownLoad
            fileName={uploadedFile.name.replace(/\.csv$/i, "_processed.csv")}
            fileSize={uploadedFile.size}
            downloadUrl={downloadUrl}
          />
          {/* <a
            href={`http://localhost:4000${downloadUrl}`}
            download
            className="mt-4 inline-block px-6 py-2 border border-gray-300 bg-gray-50 text-neutral-700 rounded-lg font-medium no-underline"
          >
            Download Processed CSV
          </a> */}
        </div>
      )}
      {error && (
        <div className="text-red-600 text-base mt-4">{error}</div>
      )}
    </div>
  );
}