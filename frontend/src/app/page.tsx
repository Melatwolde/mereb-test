import Image from "next/image";
'use client';
import UploadFiles from '@/app/File/page';
export default function Home() {
  return (
   <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      {/* <UploadFiles uploadUrl={"http://localhost:4000/upload"}/> */}
      <UploadFiles />
   </div>
  );
}
