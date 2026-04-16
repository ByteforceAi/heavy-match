"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Props {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom";
}

export default function Tooltip({ text, children, position = "top" }: Props) {
  const [show, setShow] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPress = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = useCallback(() => { timeout.current = setTimeout(() => setShow(true), 300); }, []);
  const leave = useCallback(() => { if (timeout.current) clearTimeout(timeout.current); setShow(false); }, []);
  const touchStart = useCallback(() => { longPress.current = setTimeout(() => setShow(true), 500); }, []);
  const touchEnd = useCallback(() => { if (longPress.current) clearTimeout(longPress.current); setTimeout(() => setShow(false), 2000); }, []);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
    if (longPress.current) clearTimeout(longPress.current);
  }, []);

  return (
    <span className="relative inline-flex"
      onMouseEnter={enter} onMouseLeave={leave}
      onTouchStart={touchStart} onTouchEnd={touchEnd}
    >
      {children}
      {show && (
        <span className={`absolute z-[100] px-3 py-2 bg-[#26313f] text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap animate-fade-in pointer-events-none max-w-[200px] text-center ${
          position === "top" ? "bottom-full mb-2 left-1/2 -translate-x-1/2" : "top-full mt-2 left-1/2 -translate-x-1/2"
        }`}>
          {text}
        </span>
      )}
    </span>
  );
}
