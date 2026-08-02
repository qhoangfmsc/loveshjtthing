import Image from "next/image";

export function WaxSeal({
  size = 58,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`congrats-wax-seal relative ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo_2.png"
        alt=""
        fill
        sizes={`${size}px`}
        className="rounded-full"
      />
    </div>
  );
}
