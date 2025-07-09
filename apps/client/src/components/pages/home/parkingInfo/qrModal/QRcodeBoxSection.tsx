import ImageViewDialog from '@/components/common/ImageViewDialog';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import Image from 'next/image';

export default function QRcodeBoxSection() {
  return (
    <PaddedSection className="flex flex-col items-center">
      <p className="text-center text-gray-2 pt-2 pb-4 text-sm break-keep">
        주차장의 리더기에 아래 QR 코드를 인식시켜 주세요.
      </p>
      <ImageViewDialog imgSrc="/img/qr-image.png" title="QR코드">
        <div className="relative w-[35vw] max-w-[200px] min-w-[140px] aspect-square bg-white rounded-lg drop-shadow-lg flex justify-center items-center">
          <Image
            src="/img/qr-image.png"
            alt="qr-image"
            fill
            sizes="(max-width: 768px) 140px, 35vw"
            className="object-contain p-4"
          />
        </div>
      </ImageViewDialog>
    </PaddedSection>
  );
}
