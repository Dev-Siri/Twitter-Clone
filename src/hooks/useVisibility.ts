import { useEffect, useState } from "react";

export default function useVisibility(element: HTMLElement | null) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (element) {
      const observer = new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      );

      observer.observe(element);

      return () => observer.disconnect();
    }
  }, [element]);

  return isIntersecting;
}
