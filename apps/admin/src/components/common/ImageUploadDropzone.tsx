'use client';

import { useCallback, useRef } from 'react';
import { ImagePlus } from 'lucide-react';
import { Input } from '@repo/ui/components/base/input';
import { cn } from '@repo/ui/lib/utils';

export default function ImageUploadDropzone({
  onFilesSelected,
  isDragging,
  setIsDragging,
  imagesCount,
}: {
  onFilesSelected: (files: File[]) => void;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  imagesCount?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith('image/')
      );
      onFilesSelected(droppedFiles);
    },
    [onFilesSelected, setIsDragging]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).filter((file) =>
      file.type.startsWith('image/')
    );
    onFilesSelected(selectedFiles);
  };

  if (imagesCount && imagesCount >= 5) return null;

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      className={cn(
        'flex flex-col gap-2 items-center justify-center border-2 border-dashed rounded-xl px-6 py-12 cursor-pointer transition bg-gray-light-1',
        isDragging ? 'border-secondary bg-muted/30' : 'border-gray-1'
      )}
    >
      <ImagePlus size={28} className="text-gray-3" />
      <p className="text-sm text-gray-3 flex items-center gap-1.5 break-keep text-center">
        클릭하여 이미지를 등록하거나 이곳에 드래그하세요.
      </p>
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden"
      />
    </div>
  );
}
