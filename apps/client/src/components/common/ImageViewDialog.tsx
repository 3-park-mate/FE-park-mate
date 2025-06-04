import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/base/dialog';
import Image from 'next/image';

export default function ImageViewDialog({
  children,
  imgSrc,
}: {
  children: React.ReactNode;
  imgSrc: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" p-0 bg-white overflow-hidden border-none">
        <DialogTitle className="text-center pt-4">QR코드</DialogTitle>
        <DialogDescription className="hidden" />
        <div className="relative aspect-square">
          <Image
            src={imgSrc}
            alt="image-large"
            fill
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
