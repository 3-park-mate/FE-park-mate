import CommonInput from '@repo/ui/components/common/CommonInput';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import ParkmateLogo from '@repo/ui/components/icon/ParkmateLogo';
import { ChevronLeft } from 'lucide-react';

export default function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-13 flex items-center justify-center relative">
        <div className="absolute left-0">
          <ChevronLeft className="ml-3" />
        </div>
        <h1 className="font-semibold">로그인</h1>
      </header>
      <main className="flex flex-col items-center">
        <section className="flex flex-col items-center justify-center h-50">
          <ParkmateLogo size={25} className="mb-1.5" />
          <p className="text-sm text-gray-3">내 손 안의 주차장 앱</p>
        </section>
        <PaddedLayout className="w-full">
          <form>
            <CommonInput />
          </form>
        </PaddedLayout>
      </main>
    </div>
  );
}
