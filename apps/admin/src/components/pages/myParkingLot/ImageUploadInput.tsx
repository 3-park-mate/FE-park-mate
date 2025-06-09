'use client';
import ImageThumbnailList from '@/components/common/ImageThumbnailList';
import ImageUploadDropzone from '@/components/common/ImageUploadDropzone';
import { useState } from 'react';

export default function ImageUploadInput() {
  const [images, setImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section className="space-y-7">
      <ImageUploadDropzone
        setImages={setImages}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        imagesCount={images.length}
      />
      {images.length < 5 && <hr />}
      <ImageThumbnailList images={images} setImages={setImages} />
      <p className="text-sm text-gray-3">
        · 첫 번째 이미지는 기본 썸네일 이미지로 사용됩니다.
      </p>
    </section>
  );
}
