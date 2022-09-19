import { useEffect, useRef } from "react";

export default function useEventListener(eventType, callback, element) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const isBrowser = (() => typeof window !== "undefined")();
    element = isBrowser ? window : null;

    if (element == null) return;
    const handler = (e) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}
