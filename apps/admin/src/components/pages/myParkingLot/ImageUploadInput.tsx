'use client';

import { useCallback, useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { Input } from '@repo/ui/components/base/input';

export default function ImageUploadInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
    );
    setImages((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).filter((file) =>
      file.type.startsWith('image/')
    );
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <section className="space-y-7">
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
      <hr />
      {images.length > 0 && (
        <ul className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((file, idx) => (
            <li
              key={idx}
              className="relative w-full aspect-square rounded-lg overflow-hidden border"
            >
              {idx === 0 && (
                <span className="absolute top-1.5 left-1.5 bg-secondary text-white text-xs px-2 py-0.5 rounded-lg z-10">
                  기본
                </span>
              )}
              <Image
                src={URL.createObjectURL(file)}
                alt={`이미지 ${idx + 1}`}
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </li>
          ))}
        </ul>
      )}
      <p className="text-sm text-gray-3">
        · 첫 번째 이미지는 기본 썸네일 이미지로 사용됩니다.
      </p>
    </section>
  );
}
