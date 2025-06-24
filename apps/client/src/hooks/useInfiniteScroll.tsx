import { useEffect, useRef } from 'react';

export default function useInfiniteScroll({
  hasNext,
  fetchNext,
}: {
  hasNext: boolean;
  fetchNext: () => void;
}) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNext || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          fetchNext();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNext, fetchNext]);

  return observerRef;
}
