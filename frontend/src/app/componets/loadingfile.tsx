import React from "react";

type FileProgressProps = {
  fileName: string;
  fileSize: number;
  progress: number;
  onCancel?: () => void;
};

const FileProgress: React.FC<FileProgressProps> = ({fileName,fileSize,progress, onCancel,}) => {
  return (
    <div className="flex flex-col gap-3">
    <div className="text-start font-bold text-[19px]">Uploading File</div>
      <div className="w-[450px] min-h-[70px] bg-white rounded-xl shadow flex items-center gap-4 px-5 py-3 mx-auto">
        <div className="bg-amber-100 h-10 w-10 rounded-md flex items-center justify-center font-bold text-amber-800 text-sm">
          CSV
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium truncate">{fileName}</div>
          <div className="text-xs text-gray-500">
            {(fileSize / (1024 * 1024)).toFixed(2)} MB
          </div>
          {progress < 100 && (
            <>
              <div className="w-full bg-gray-200 rounded h-2 mt-2 overflow-hidden">
                <div
                  className="h-1 bg-blue-500 rounded transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">{progress}%</div>
            </>
          )}
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="ml-2 bg-transparent border-none cursor-pointer text-xl leading-none text-zinc-800"
            type="button">  ×</button>
        )}
      </div>
    </div>
  );
};

export default FileProgress;
