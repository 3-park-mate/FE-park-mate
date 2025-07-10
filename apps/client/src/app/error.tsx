'use client';
import NotFoundLayout from '@/components/common/NotFoundLayout';

export default function errorPage({ error }: { error: Error }) {
  return (
    <>
      <NotFoundLayout
        heading="알 수 없는 오류가 발생했습니다."
        subheading={`오류: ${error}`}
        buttonHref="/"
      />
    </>
  );
}
