import Image from "next/image";

const PHOTO_CARD_SRC = "/aug-2026/photo.png";

export function PhotoCard({
  className = "",
  rotate = -6,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <div
      className={`congrats-photo-card rounded-[3px] p-1.5 pb-4 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative h-[90px] w-[70px] overflow-hidden border border-black/20 shadow-md">
        <Image
          className="border-4 border-white"
          src={PHOTO_CARD_SRC}
          alt="Văn Kiều Bảo Trân"
          fill
          sizes="80px"
          style={{ objectFit: "cover", objectPosition: "50% 14%" }}
        />
      </div>
    </div>
  );
}
