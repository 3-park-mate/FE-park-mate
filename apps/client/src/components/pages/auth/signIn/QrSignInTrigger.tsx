'use client';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function QrSignInTrigger() {
  const router = useRouter();

  useEffect(() => {
    const signInWithQr = async () => {
      const res = await signIn('credentials', {
        email: 'guest-login',
        password: '1!234567e',
        redirect: false,
      });
      if (res?.ok) {
        router.push('/');
      }
    };

    signInWithQr();
  }, [router]);

  return (
    <div className="flex justify-center items-center pt-40">
      <p className="me-3">게스트 로그인 중...</p>
      <DotSpinner />
    </div>
  );
}
