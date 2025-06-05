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
  title,
  imgSrc,
}: {
  children: React.ReactNode;
  title?: string;
  imgSrc: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="p-0 bg-white overflow-hidden border-none">
        <DialogTitle className="text-center pt-4">{title}</DialogTitle>
        <DialogDescription className="hidden" />
        <div className="relative">
          <Image
            src={imgSrc}
            alt="image-large"
            width={800}
            height={600}
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
