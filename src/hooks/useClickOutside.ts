import { useEffect } from "react";

export default function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => unknown,
) {
  useEffect(() => {
    const handleClickEvent = (e : MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClickEvent);
    return () => document.removeEventListener("click", handleClickEvent);
  }, [ref, callback]);
}
