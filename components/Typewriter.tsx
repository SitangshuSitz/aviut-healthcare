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

  // An invisible copy of the longest word reserves its space, so the heading
  // wraps the same way and keeps the same height whichever word is showing.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <span className={`inline-grid text-left ${className}`}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {longest}
        <span className="typewriter-caret" />
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap">
        {text}
        <span className="typewriter-caret" />
      </span>
      <span className="sr-only">{words[0]}</span>
    </span>
  );
}
