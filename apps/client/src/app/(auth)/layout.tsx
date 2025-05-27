import PageHeader from '@/components/layouts/PageHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <PageHeader />
      {children}
    </div>
  );
}
