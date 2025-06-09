'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import ImageViewDialog from './ImageViewDialog';

export default function ImageThumbnailList({
  images,
  setImages,
}: {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}) {
  const handleRemoveImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  if (images.length === 0) return null;

  return (
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
          <button
            type="button"
            onClick={() => handleRemoveImage(idx)}
            className="absolute top-1.5 right-1.5 z-10 
              bg-white/70 hover:bg-white/90 text-gray-dark-2 
              rounded-full p-1 cursor-pointer duration-100 transition-all"
          >
            <X size={14} />
          </button>
          <ImageViewDialog
            imgSrc={URL.createObjectURL(file)}
            title="이미지 상세보기"
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={`이미지 ${idx + 1}`}
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </ImageViewDialog>
        </li>
      ))}
    </ul>
  );
}
