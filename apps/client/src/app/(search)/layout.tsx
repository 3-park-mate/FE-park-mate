import SearchHeader from '@/components/pages/search/SearchHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchHeader />
      {children}
    </>
  );
}
