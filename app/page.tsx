"use client";

import { useEffect, useRef, useState } from "react";

// Heart SVG path
const HEART_PATH =
  "M256 448l-30.164-27.211C93.74 297.355 16 227.634 16 141.961 16 69.474 72.033 16 141.961 16c40.076 0 78.56 18.878 104.039 48.758C271.479 34.878 309.963 16 350.039 16 419.967 16 476 69.474 476 141.961c0 85.673-77.74 155.394-209.836 278.828z";

// Mini heart colors
const HEART_COLORS = [
  "#ff2d6b",
  "#ff6b9d",
  "#ff85b3",
  "#ff4081",
  "#e91e63",
  "#f48fb1",
  "#ff80ab",
  "#f06292",
  "#ec407a",
  "#ffb3c6",
];

interface MiniHeart {
  id: number;
  left: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  endRotate: number;
}

interface Sparkle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

function generateHearts(count: number): MiniHeart[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 12 + Math.random() * 20,
    color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 15,
    endRotate: -45 + Math.random() * 90,
  }));
}

function generateSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 10 + Math.random() * 80,
    top: 10 + Math.random() * 80,
    size: 2 + Math.random() * 5,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 6,
  }));
}

export default function Home() {
  // Generate on client only to avoid hydration mismatch
  const [hearts, setHearts] = useState<MiniHeart[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [visible, setVisible] = useState(false);
  const messageSectionRef = useRef<HTMLDivElement>(null);
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    // Only generate random elements on client
    setHearts(generateHearts(18));
    setSparkles(generateSparkles(25));
    // Trigger entrance animation
    const t = setTimeout(() => setVisible(true), 200);

    // Log visit
    const enterTime = Date.now();
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "visit",
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      }),
    }).catch(() => {});

    // Track exit
    let exitSent = false;
    const sendExit = () => {
      if (exitSent) return;
      exitSent = true;
      const duration = Math.round((Date.now() - enterTime) / 1000);
      const data = JSON.stringify({ event: "exit", duration });
      // sendBeacon is more reliable on page close
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/visit", new Blob([data], { type: "application/json" }));
      } else {
        fetch("/api/visit", { method: "POST", headers: { "Content-Type": "application/json" }, body: data, keepalive: true }).catch(() => {});
      }
    };

    const onVisChange = () => {
      if (document.visibilityState === "hidden") sendExit();
    };
    document.addEventListener("visibilitychange", onVisChange);
    window.addEventListener("beforeunload", sendExit);

    return () => {
      clearTimeout(t);
      document.removeEventListener("visibilitychange", onVisChange);
      window.removeEventListener("beforeunload", sendExit);
    };
  }, []);

  useEffect(() => {
    let scrollSent = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMessageVisible(true);
          // Track scroll (only once)
          if (!scrollSent) {
            scrollSent = true;
            fetch("/api/visit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ event: "scroll" }),
            }).catch(() => {});
          }
        }
      },
      { threshold: 0.3 }
    );
    if (messageSectionRef.current) {
      observer.observe(messageSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="landing-scene" id="hero">
        {/* Floating Mini Hearts */}
        <div className="floating-hearts">
          {hearts.map((h) => (
            <div
              key={h.id}
              className="mini-heart"
              style={
                {
                  left: `${h.left}%`,
                  "--size": `${h.size}px`,
                  "--duration": `${h.duration}s`,
                  "--delay": `${h.delay}s`,
                  "--end-rotate": `${h.endRotate}deg`,
                  "--glow-color": h.color,
                } as React.CSSProperties
              }
            >
              <svg viewBox="0 0 492 492" fill={h.color}>
                <path d={HEART_PATH} />
              </svg>
            </div>
          ))}
        </div>

        {/* Sparkles */}
        <div className="sparkles-container">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="sparkle"
              style={
                {
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  "--spark-size": `${s.size}px`,
                  "--spark-duration": `${s.duration}s`,
                  "--spark-delay": `${s.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Main Heart + Name */}
        <div
          className="heart-container"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.3)",
            transition:
              "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <svg
            className="heart-svg"
            viewBox="0 0 492 492"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="heartGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  className="heart-gradient-stop-1"
                  stopOpacity="1"
                />
                <stop
                  offset="50%"
                  className="heart-gradient-stop-2"
                  stopOpacity="1"
                />
                <stop
                  offset="100%"
                  className="heart-gradient-stop-3"
                  stopOpacity="1"
                />
              </linearGradient>
              <filter id="heartGlow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={HEART_PATH}
              fill="url(#heartGrad)"
              filter="url(#heartGlow)"
            />
          </svg>

          {/* Name */}
          <div className="name-overlay">
            <h1 className="name-text">Văn Kiều Bảo Trân</h1>
            <p className="name-sub">✨ em bé đáng iuu ✨</p>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="bottom-section">
          <p className="love-message">
            Hôm nay của em thế nào rùi?{" "}
            <span className="love-emoji">🌙</span>
          </p>
        </div>

        {/* Scroll Hint */}
        <div className="scroll-hint">
          <span>kéo xuống nè</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ===== MESSAGE SECTION ===== */}
      <section
        className="message-section"
        id="message"
        ref={messageSectionRef}
      >
        {/* Background sparkles for section 2 */}
        <div className="sparkles-container">
          {sparkles.slice(0, 12).map((s) => (
            <div
              key={`s2-${s.id}`}
              className="sparkle"
              style={
                {
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  "--spark-size": `${s.size}px`,
                  "--spark-duration": `${s.duration + 1}s`,
                  "--spark-delay": `${s.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div
          className="message-card"
          style={{
            opacity: messageVisible ? 1 : 0,
            transform: messageVisible
              ? "translateY(0) scale(1)"
              : "translateY(40px) scale(0.95)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2>Cố lên nha em bé</h2>
          <p>
            Bé Trân làm gì anh cũng sẽ ủng hộ hết lunn, 
            nhớ ăn uống đủ với nghỉ ngơi nhiều hơn nữa nhaa 🌿
          </p>
        </div>
      </section>
    </>
  );
}
