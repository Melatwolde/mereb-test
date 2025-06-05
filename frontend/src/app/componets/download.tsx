'use client';
import React from "react";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

type DownLoadProps = {
  fileName: string;
  fileSize: number;
  downloadUrl?: string;
};

const DownLoad: React.FC<DownLoadProps> = ({ fileName, fileSize, downloadUrl }) => {
  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = `http://localhost:4000${downloadUrl}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col gap-3">
    <div className="text-start font-bold text-[19px]">Downlaod File</div>
    <div className="w-[450px] min-h-[70px] bg-white rounded-xl shadow flex items-center gap-4 px-5 py-3 mx-auto">
      <div className="bg-amber-100 h-10 w-10 rounded-md flex items-center justify-center font-bold text-amber-800 text-sm">
        CSV
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium truncate text-start">{fileName}</div>
        <div className="text-xs text-gray-500 text-start">
          {(fileSize / (1024 * 1024)).toFixed(2)} MB
        </div>
      </div>

      <button onClick={handleDownload} className="hover:scale-110 transition-transform">
        <DownloadRoundedIcon className="text-gray-700" />
      </button>
    </div>
    </div>
  );
};

export default DownLoad;
