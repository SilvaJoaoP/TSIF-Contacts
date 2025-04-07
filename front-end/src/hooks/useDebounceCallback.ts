import { useRef } from "react";

type IDebounceCallback = () => void;

export default function useDebounceCallback<
  T extends Function = IDebounceCallback
>(callback: T, delay = 500) {
  const timer = useRef<number | null>(null);

  return (...args: any[]) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callback(...args);
      timer.current = null;
    }, delay);
  };
}
