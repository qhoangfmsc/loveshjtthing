"use client";

import { useEffect, useState } from "react";
import MusicBackground from "@/components/MusicBackground";
import { Flower } from "./_components/Flower";
import { WaxSeal } from "./_components/WaxSeal";
import { PhotoCard } from "./_components/PhotoCard";
import { PhotoStrip } from "./_components/PhotoStrip";
import {
  type BurstParticle,
  type Sparkle,
  generateBurst,
  generateSparkles,
} from "./_components/particles";

export default function CongratsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [burst, setBurst] = useState<BurstParticle[]>([]);

  useEffect(() => {
    setSparkles(generateSparkles(14));
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setBurst(generateBurst(10));
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <main className="congrats-page-bg relative flex h-dvh flex-col items-center justify-center overflow-hidden px-[clamp(1rem,4vw,3rem)] py-[clamp(0.75rem,3dvh,3rem)] font-sans">
      <MusicBackground
        src="/sounds/theme.mp3"
        volume={1}
        className="bg-[#4a1120]/80 text-[#e7c9a9] ring-1 ring-[#c9a86a]/40 hover:bg-[#5c1220]/90"
      />

      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="particle-spark particle-spark--gold"
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

      <div
        className={`relative z-10 flex w-full flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-95 opacity-0"
        }`}
      >
        <div className="relative w-full max-w-[clamp(20rem,min(58vw,72dvh),30rem)] [perspective:1800px]">
          {/* Soft blurred floral props, for flatlay depth */}
          <Flower
            color="#7a1628"
            size={64}
            className="pointer-events-none absolute -top-16 left-11 z-0 opacity-40 blur-[2px] sm:-top-8 sm:-left-12"
          />
          <Flower
            color="#c98a95"
            size={44}
            className="pointer-events-none absolute -top-18 right-2 z-0 opacity-35 blur-[2px] sm:-right-9"
          />
          <Flower
            color="#c98a95"
            size={44}
            className="pointer-events-none absolute -right-7 -bottom-5 z-0 opacity-35 blur-[2px] sm:-right-9"
          />
          <Flower
            color="#c98a95"
            size={44}
            className="pointer-events-none absolute -bottom-12 left-4 z-0 opacity-35 blur-[2px] sm:-right-9"
          />
          <Flower
            color="#7a1628"
            size={64}
            className="pointer-events-none absolute right-8 -bottom-16 z-0 opacity-40 blur-[2px] sm:-top-8 sm:-left-12"
          />
          <div className="congrats-book-ground-shadow" />

          {isOpen && (
            <div className="pointer-events-none absolute top-10 left-1/2 z-30 h-0 w-0">
              {burst.map((b) => (
                <div
                  key={b.id}
                  className="particle-burst"
                  style={
                    {
                      "--tx": `${b.tx}px`,
                      "--ty": `${b.ty}px`,
                      "--burst-size": `${b.size}px`,
                      "--burst-duration": `${b.duration}s`,
                      "--burst-delay": `${b.delay}s`,
                      "--burst-rotate": `${b.rotate}deg`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="h-full w-full rounded-full"
                    style={{
                      background: b.color,
                      boxShadow: `0 0 6px ${b.color}`,
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* The book: a page (always present) + a cover that hinges open on
              the left edge, like turning the front cover of a book. */}
          <div className="congrats-book relative z-10 rotate-[-1.5deg]">
            {/* Photo + strip float in above the book once opened — absolute,
                so they never add to the book's own height/layout. */}
            <div
              className={`pointer-events-none absolute -top-13 left-2 z-30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen
                  ? "translate-y-0 opacity-100 delay-300"
                  : "translate-y-3 opacity-0"
              }`}
            >
              <PhotoCard rotate={-8} />
            </div>
            <div
              className={`pointer-events-none absolute -top-14 -right-6 z-30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen
                  ? "translate-y-0 opacity-100 delay-500"
                  : "translate-y-3 opacity-0"
              }`}
            >
              <PhotoStrip rotate={6} />
            </div>

            <div className="congrats-book-page paper-grain relative z-0 rounded-2xl px-[clamp(1.25rem,5vw,2.5rem)] pt-[clamp(1rem,4dvh,2.25rem)] pb-[clamp(0.85rem,3dvh,1.75rem)] text-center text-[#3d1420]">
              <p className="font-script mb-[clamp(0.3rem,1dvh,0.375rem)] text-[clamp(0.8rem,min(4vw,3dvh),1.15rem)] text-[#8a2e40]">
                Congratulations to
              </p>
              <h2 className="congrats-card-title font-hand mb-[clamp(0.5rem,1.6dvh,0.75rem)] text-[clamp(1.5rem,min(9.5vw,7dvh),2.6rem)] leading-none">
                Van Kieu Bao Tran
              </h2>

              <div className="h-[clamp(0.5rem,2dvh,1rem)]" />
              <div className="flex flex-col items-start justify-start gap-[clamp(0.3rem,1dvh,0.5rem)] text-left">
                <p className="mb-[clamp(0.4rem,1.4dvh,0.75rem)] font-serif text-[clamp(0.7rem,2.1dvh,0.92rem)] leading-[1.5] text-[#3d1420] italic">
                  Em đã dành thật nhiều tâm huyết và cố gắng để hoàn thành rất
                  là tốt sự kiện lần này rùi. Anh rất tự hào vì em đã luôn kiên
                  trì và hết mình với đam mê.
                </p>
                <p className="mb-[clamp(0.4rem,1.4dvh,0.75rem)] font-serif text-[clamp(0.7rem,2.1dvh,0.92rem)] leading-[1.5] text-[#3d1420] italic">
                  Dù anh không có ở đó để tận mắt chứng kiến em tỏa sáng, nhưng
                  anh chắc chắn rằng em đã làm rất tốt. Chúc mừng vợ yêu.
                </p>
                <p className="mb-[clamp(0.5rem,1.8dvh,1rem)] font-serif text-[clamp(0.7rem,2.1dvh,0.92rem)] leading-[1.5] text-[#3d1420] italic">
                  Nghỉ ngơi và ăn uống đủ nhé! Anh thương em.
                </p>
              </div>

              <div className="h-[clamp(0.5rem,2dvh,1rem)]" />

              <div className="flex flex-row items-center justify-between text-right">
                <button
                  type="button"
                  onClick={handleClose}
                  className="ml-1 text-[0.66rem] tracking-[0.06em] text-[#8a2e40]/55 decoration-[rgba(122,20,40,0.3)] underline-offset-4 transition-colors duration-200 hover:text-[#5c1220]"
                >
                  ←
                </button>
                <div className="font-hand text-[clamp(1.25rem,4.2dvh,2.125rem)] leading-none text-[#7a1628]">
                  anh&nbsp;&nbsp;Hoàng
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpen}
              aria-label="Mở thiệp chúc mừng"
              tabIndex={isOpen ? -1 : 0}
              className={`congrats-book-cover absolute inset-0 z-20 cursor-pointer border-none bg-transparent p-0 font-sans focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-[#e7c9a9] ${
                isOpen ? "is-open pointer-events-none" : ""
              }`}
            >
              <div className="congrats-book-cover-face absolute inset-0 flex flex-col items-center justify-center gap-[clamp(0.5rem,1.6dvh,0.75rem)] px-6 pb-10">
                <p className="font-serif text-[clamp(0.55rem,min(2.2vw,1.8dvh),0.7rem)] font-semibold tracking-[0.26em] text-[#8a2e40] uppercase">
                  Global Fashion Week All Stars
                </p>
                <p className="font-hand text-[clamp(1.7rem,min(8.5vw,6.5dvh),2.6rem)] leading-none text-[#7a1628]">
                  Bao Tran
                </p>
                {/* Seal tucked into the corner, off-center on purpose */}
                <div className="absolute right-8 bottom-6">
                  <WaxSeal size={40} />
                </div>
              </div>
              <div className="congrats-book-cover-back absolute inset-0" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
