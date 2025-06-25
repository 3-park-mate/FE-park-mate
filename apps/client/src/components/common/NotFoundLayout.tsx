'use client';
import { buttonVariants } from '@repo/ui/components/base/button';
import ParkmateLogo from '@repo/ui/components/icon/ParkmateLogo';
import Link from 'next/link';

export default function NotFoundLayout({
  heading,
  subheading,
  buttonHref,
  buttonLabel = '홈으로 돌아가기',
}: {
  heading: string;
  subheading?: string;
  buttonHref: string;
  buttonLabel?: string;
}) {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <h1 className="text-xl font-bold mb-1">{heading}</h1>
        {subheading && <p className="text-gray-2 text-sm">{subheading}</p>}
        <Link
          href={buttonHref}
          className={`${buttonVariants({ variant: 'default' })} mt-6 !text-white`}
        >
          {buttonLabel}
        </Link>
      </div>
      <footer className="w-4/5 border-t border-gray-300 pt-3 pb-6 flex justify-center mx-auto">
        <ParkmateLogo size={14} />
      </footer>
    </main>
  );
}
