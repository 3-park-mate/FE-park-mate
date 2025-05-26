import SignInForm from '@/components/pages/auth/signIn/SignInForm';
import ParkmateLogo from '@repo/ui/components/icon/ParkmateLogo';

export default function page() {
  return (
    <main className="flex flex-col items-center">
      <section className="flex flex-col items-center justify-center h-48 pt-10">
        <ParkmateLogo size={25} className="mb-1.5" />
        <p className="text-sm text-gray-3">내 손 안의 주차장 앱</p>
      </section>
      <SignInForm />
    </main>
  );
}
