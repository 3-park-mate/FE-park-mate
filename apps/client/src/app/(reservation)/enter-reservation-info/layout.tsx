export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-5 min-h-screen bg-inner-background-gray">
      <header className="text-[24px] font-semibold py-10">
        예약 정보를 입력해주세요.
      </header>
      {children}
    </div>
  );
}
