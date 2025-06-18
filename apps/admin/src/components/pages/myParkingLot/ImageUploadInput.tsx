'use client';
import ImageThumbnailList from '@/components/common/ImageThumbnailList';
import ImageUploadDropzone from '@/components/common/ImageUploadDropzone';
import { AddParkingLotStoreDataType } from '@/types/addParkingLotDataTypes';
import { useEffect, useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

export default function ImageUploadInput() {
  const { setValue, getValues } = useFormContext();
  const { errors, touchedFields } = useFormState<AddParkingLotStoreDataType>();
  const [images, setImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const initialImages = getValues('parkingLotImage.images') || [];
      setImages(initialImages);
      setIsInitialized(true);
    }
  }, [getValues, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      setValue('parkingLotImage.images', images);
    }
  }, [images, isInitialized, setValue]);

  return (
    <section className="space-y-4">
      <ImageUploadDropzone
        setImages={setImages}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        imagesCount={images.length}
      />
      {errors.parkingLotImage?.images?.message && (
        <p className="text-sm text-red-500">
          {errors.parkingLotImage.images.message}
        </p>
      )}
      {images.length < 5 && <hr />}
      <ImageThumbnailList images={images} setImages={setImages} />
      <p className="text-sm text-gray-3">
        · 첫 번째 이미지는 기본 썸네일 이미지로 사용됩니다.
      </p>
    </section>
  );
}
