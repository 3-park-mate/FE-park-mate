import { useState, useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps<T, CursorType> {
  fetchData: (cursor?: CursorType) => Promise<{
    content: T[];
    nextCursor?: CursorType;
    hasNext: boolean;
  }>;
  initialCursor?: CursorType;
  filterDuplicateItems?: (existingItems: T[], newItems: T[]) => T[];
}

export function useInfiniteScroll<T, CursorType>({
  fetchData,
  initialCursor,
  filterDuplicateItems = (existing, newItems) => newItems,
}: UseInfiniteScrollProps<T, CursorType>) {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState<CursorType | undefined>(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const { content, nextCursor, hasNext } = await fetchData(cursor);
      setItems((prev) => [...prev, ...filterDuplicateItems(prev, content)]);
      setCursor(nextCursor);
      setHasMore(hasNext);
    } catch (error) {
      console.error('Failed to load more items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, isLoading, hasMore, fetchData, filterDuplicateItems]);

  useEffect(() => {
    loadMoreItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && hasMore && !isLoading) {
          loadMoreItems();
        }
      },
      {
        rootMargin: '0px 0px 200px 0px',
        threshold: 0.1,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreItems, hasMore, isLoading]);

  return { items, isLoading, hasMore, loaderRef };
}
