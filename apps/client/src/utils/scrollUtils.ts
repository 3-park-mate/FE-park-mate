import { RefObject } from 'react';

export function scrollToBottomUtil(
  endRef: RefObject<HTMLElement | null>,
  smooth: boolean = true
) {
  endRef.current?.scrollIntoView({
    behavior: smooth ? 'smooth' : 'auto',
  });
}

export function checkScrollBottomUtil({
  onChange,
}: {
  onChange: (isAtBottom: boolean) => void;
}) {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;
  const isAtBottom = scrollTop + windowHeight >= documentHeight - 15;

  onChange(isAtBottom);
}
