"use client";

import { useEffect, useState } from "react";

// Types each word, pauses, deletes it, then moves to the next.
export function Typewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Keep the first word static for people who prefer reduced motion
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAnimate(true);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const word = words[index];
    let delay = deleting ? 45 : 90;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === "") delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [animate, deleting, index, text, words]);

  return (
    <span className={className}>
      <span aria-hidden="true">{text}</span>
      <span className="typewriter-caret" aria-hidden="true" />
      <span className="sr-only">{words[0]}</span>
    </span>
  );
}
