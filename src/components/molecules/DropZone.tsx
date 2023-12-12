import React, { useRef, useState } from "react";

export default function DropZone({
  onChange,
  children,
}: {
  children: React.ReactNode;
  onChange: (files: FileList) => void;
}) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const refCounter = useRef(0);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={`flex justify-center items-center rounded-md border border-dashed h-32 p-1 ${
        dragActive ? "bg-slate-200" : ""
      }`}
      onDragEnter={() => {
        refCounter.current += 1;
        setDragActive(true);
      }}
      onDragLeave={() => {
        refCounter.current -= 1;
        if (refCounter.current === 0) {
          setDragActive(false);
        }
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {children}
    </div>
  );
}
