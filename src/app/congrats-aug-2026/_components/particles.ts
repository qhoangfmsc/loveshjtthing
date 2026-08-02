export const BURST_COLORS = ["#e7c9a9", "#c98a95", "#9c2438", "#f3e3c8"];

export interface Sparkle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export interface BurstParticle {
  id: number;
  color: string;
  size: number;
  tx: number;
  ty: number;
  rotate: number;
  duration: number;
  delay: number;
}

export function generateBurst(count: number): BurstParticle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
    const distance = 70 + Math.random() * 90;
    return {
      id: i,
      color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
      size: 5 + Math.random() * 5,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance,
      rotate: -90 + Math.random() * 180,
      duration: 0.7 + Math.random() * 0.4,
      delay: Math.random() * 0.15,
    };
  });
}

export function generateSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 8 + Math.random() * 84,
    top: 8 + Math.random() * 84,
    size: 2 + Math.random() * 3,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 6,
  }));
}
