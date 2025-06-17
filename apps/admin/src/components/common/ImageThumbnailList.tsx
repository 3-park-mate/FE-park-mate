'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import ImageViewDialog from './ImageViewDialog';

export default function ImageThumbnailList({
  images,
  onDelete,
}: {
  images: string[];
  onDelete: (url: string) => void;
}) {
  if (images.length === 0) return null;

  return (
    <ul className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {images.map((url, idx) => (
        <li
          key={url}
          className="relative w-full aspect-square rounded-lg overflow-hidden border"
        >
          {idx === 0 && (
            <span className="absolute top-1.5 left-1.5 bg-secondary text-white text-xs px-2 py-0.5 rounded-lg z-10">
              기본
            </span>
          )}
          <button
            type="button"
            onClick={() => onDelete(url)}
            className="absolute top-1.5 right-1.5 z-10 
              bg-white/70 hover:bg-white/90 text-gray-dark-2 
              rounded-full p-1 cursor-pointer duration-100 transition-all"
          >
            <X size={14} />
          </button>
          <ImageViewDialog imgSrc={url} title="이미지 상세보기">
            <Image
              src={url}
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
