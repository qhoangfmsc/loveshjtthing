"use client";

import { useEffect, useRef, useState } from "react";

interface MusicBackgroundProps {
  /** Path under /public to the audio file, e.g. "/sounds/theme.mp3". */
  src: string;
  volume?: number;
  /** Extra classes to theme the toggle button per page (bg/text/ring colors). */
  className?: string;
}

const UNLOCK_EVENTS = ["pointerdown", "touchstart", "keydown", "click"] as const;

/**
 * Ambient background music, reusable across milestone pages.
 *
 * Starts muted+autoplaying the instant this mounts (the one thing every
 * browser allows unprompted), then unmutes itself on the visitor's first
 * interaction of any kind — click, tap, or keypress, anywhere on the page,
 * not just the button. The button just reflects/toggles play state.
 */
export default function MusicBackground({
  src,
  volume = 1,
  className = "",
}: MusicBackgroundProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.play().catch(() => {});

    const stopListening = () =>
      UNLOCK_EVENTS.forEach((event) => window.removeEventListener(event, unlock));

    const unlock = () => {
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          stopListening();
        })
        .catch(() => {});
    };

    UNLOCK_EVENTS.forEach((event) => window.addEventListener(event, unlock));
    return stopListening;
  }, [volume]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.muted || audio.paused) {
      audio.muted = false;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop autoPlay muted preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"}
        aria-pressed={playing}
        className={`fixed top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-transform hover:scale-105 ${className}`}
      >
        {playing ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
      </button>
    </>
  );
}

function SpeakerOnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
      <path
        d="M15.5 8.5a5 5 0 0 1 0 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18.3 5.7a9.5 9.5 0 0 1 0 12.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
      <path
        d="M15.5 9.5l5 5M20.5 9.5l-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
