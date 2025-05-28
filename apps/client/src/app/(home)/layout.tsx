export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative bg-inner-background-gray">
      {children}
    </div>
  );
}
