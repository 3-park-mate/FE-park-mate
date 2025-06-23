import NotFoundLayout from '@/components/common/NotFoundLayout';

export default function NotFoundPage() {
  return (
    <NotFoundLayout
      heading="페이지를 찾을 수 없습니다."
      subheading="요청하신 페이지가 존재하지 않거나 이동되었어요."
      buttonHref="/"
    />
  );
}
