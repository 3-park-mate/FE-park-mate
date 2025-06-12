import SearchHeader from '@/components/pages/search/SearchHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-light-3">
      <SearchHeader />
      {children}
    </div>
  );
}
