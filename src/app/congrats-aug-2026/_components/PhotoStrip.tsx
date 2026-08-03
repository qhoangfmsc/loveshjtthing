import Image from "next/image";

const STRIP_FRAMES = [
  { pos: "62% 10%", scale: 1, src: "/aug-2026/strip_1.png" },
  { pos: "48% 20%", scale: 1, src: "/aug-2026/strip_2.png" },
  { pos: "68% 14%", scale: 1, src: "/aug-2026/strip_3.png" },
];

export function PhotoStrip({
  className = "",
  rotate = 5,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <div
      className={`congrats-photobooth-strip flex flex-col border border-black/20 shadow-md ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {STRIP_FRAMES.map((f, i) => (
        <div
          key={i}
          className={`relative h-[54px] w-[54px] overflow-hidden border-x-4 border-b-4 border-white ${i === 0 ? "border-t-4" : "border-t-0"}`}
        >
          <Image
            src={f.src}
            alt=""
            fill
            sizes="48px"
            style={{
              objectFit: "cover",
              objectPosition: f.pos,
              transform: `scale(${f.scale})`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
