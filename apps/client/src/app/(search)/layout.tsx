import SearchHeader from '@/components/pages/search/SearchHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-light-3">
      <header className="sticky top-0 w-full z-50">
        <SearchHeader />
      </header>
      {children}
    </div>
  );
}
