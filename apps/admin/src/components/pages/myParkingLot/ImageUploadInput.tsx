'use client';

import { deleteFileFromS3, uploadFileToS3 } from '@/actions/common/s3-service';
import ImageThumbnailList from '@/components/common/ImageThumbnailList';
import ImageUploadDropzone from '@/components/common/ImageUploadDropzone';
import { useState } from 'react';

export default function ImageUploadInput() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleAddImages = async (files: File[]) => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      try {
        const url = await uploadFileToS3(file, 'parkingLot');
        uploadedUrls.push(url);
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    setImageUrls((prev) => [...prev, ...uploadedUrls]);
  };

  const handleDeleteImage = async (url: string) => {
    try {
      await deleteFileFromS3(url);
      setImageUrls((prev) => prev.filter((img) => img !== url));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <section className="space-y-7">
      <ImageUploadDropzone
        onFilesSelected={handleAddImages}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        imagesCount={imageUrls.length}
      />
      {imageUrls.length < 5 && <hr />}
      <ImageThumbnailList images={imageUrls} onDelete={handleDeleteImage} />
      <p className="text-sm text-gray-3">
        · 첫 번째 이미지는 기본 썸네일 이미지로 사용됩니다.
      </p>
    </section>
  );
}
