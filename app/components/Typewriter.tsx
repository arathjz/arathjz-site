import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  showCursorAfter?: boolean;
  onComplete?: () => void;
}

export default function Typewriter({
  text,
  className,
  speed = 60,
  startDelay = 0,
  showCursorAfter = false,
  onComplete,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && !started) {
      if (startDelay > 0) {
        const timer = setTimeout(() => setStarted(true), startDelay);
        return () => clearTimeout(timer);
      }
      setStarted(true);
    }
  }, [inView, started, startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [started, displayed, text, speed, onComplete]);

  return (
    <span ref={ref} className={className}>
      {displayed || "\u200B"}
      {started && (displayed.length < text.length || showCursorAfter) && (
        <span className="inline-block bg-accent ml-0.5 animate-blink" style={{ width: "0.08em", height: "0.85em", verticalAlign: "-0.08em" }} />
      )}
    </span>
  );
}
