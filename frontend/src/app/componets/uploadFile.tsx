import React, { useRef, useState } from "react";

type UploadBoxProps = {
  onFileSelected: (file: File) => void;
};

const UploadBox: React.FC<UploadBoxProps> = ({ onFileSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`
        ${dragActive ? "border-2 border-blue-500 bg-blue-50" : "border-2 border-dashed border-gray-300 bg-gray-50"}
        rounded-xl
        p-8
        text-center
        cursor-pointer
        transition-all
        max-w-md
        w-full
        min-h-[150px]
        flex
        flex-col
        justify-center
        mx-auto
        my-8
      `}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
      />
      <span className="text-lg text-gray-800">
        {dragActive
          ? "Drop your file here"
          : "Drag & drop your csv file here or click to select"}
      </span>
    </div>
  );
};

export default UploadBox;