import type { ReactElement } from "react";
import { Activity, Category } from "@/lib/types";

const INK = "#2b2118";
const line = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

const BG: Record<Category, string> = {
  "Minute to Win It": "#fde68a",
  Icebreaker: "#bae6fd",
  Energiser: "#fecaca",
  "Team Skills": "#bbf7d0",
  "Trust & Communication": "#e9d5ff",
  "Active & Physical": "#fed7aa",
  "Creative & Craft": "#fbcfe8",
  "Virtual Friendly": "#c7d2fe",
};

const SHIRTS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];
const SKINS = ["#fcd7b6", "#e8b48f", "#c68642", "#8d5524", "#f1c27d"];
const HAIRS = ["#2b2118", "#6b4226", "#d4a017", "#a0522d", "#111827"];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

// Props are drawn around (0,0), roughly within ±34 units.
const PROPS: Record<string, () => ReactElement> = {
  balloon: () => (
    <g>
      <path d="M0,16 C4,24 -4,30 3,38" fill="none" {...line} strokeWidth={1.5} />
      <ellipse cx={0} cy={-8} rx={18} ry={23} fill="#ef4444" {...line} />
      <path d="M-4,15 L4,15 L0,19 Z" fill="#ef4444" {...line} strokeWidth={1.5} />
      <ellipse cx={-7} cy={-16} rx={4} ry={7} fill="#fff" opacity={0.6} />
    </g>
  ),
  cookie: () => (
    <g>
      <circle r={26} fill="#d9a066" {...line} />
      {[[-10, -8], [8, -12], [12, 6], [-4, 10], [-14, 8], [2, -1]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.2} fill="#5b3a1e" />
      ))}
    </g>
  ),
  box: () => (
    <g>
      <path d="M-6,-10 C-14,-30 8,-34 4,-18 C14,-28 18,-12 8,-8" fill="#fff" {...line} />
      <rect x={-28} y={-10} width={56} height={34} rx={4} fill="#60a5fa" {...line} />
      <ellipse cx={0} cy={-10} rx={14} ry={4} fill="#1e3a8a" />
      <circle cx={-14} cy={8} r={4} fill="#fff" {...line} strokeWidth={1.5} />
      <circle cx={14} cy={10} r={4} fill="#fff" {...line} strokeWidth={1.5} />
    </g>
  ),
  straw: () => (
    <g transform="rotate(20)">
      <rect x={-4} y={-34} width={8} height={62} fill="#fff" {...line} />
      {[-26, -14, -2, 10, 22].map((y) => (
        <path key={y} d={`M-4,${y} L4,${y - 5}`} stroke="#ef4444" strokeWidth={3} />
      ))}
      <circle cx={0} cy={34} r={6} fill="#f59e0b" {...line} />
    </g>
  ),
  candy: () => (
    <g>
      {[["#ef4444", -14, 6], ["#3b82f6", 12, 8], ["#10b981", 0, -12], ["#f59e0b", -2, 22]].map(([c, x, y], i) => (
        <g key={i}>
          <ellipse cx={x as number} cy={y as number} rx={11} ry={9} fill={c as string} {...line} />
          <text x={x as number} y={(y as number) + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill="#fff">m</text>
        </g>
      ))}
    </g>
  ),
  cups: () => (
    <g>
      {[[-20, 14], [0, 14], [20, 14], [-10, -4], [10, -4], [0, -22]].map(([x, y], i) => (
        <path key={i} d={`M${x - 9},${y} L${x + 9},${y} L${x + 7},${y + 17} L${x - 7},${y + 17} Z`} fill={i % 2 ? "#f43f5e" : "#fb7185"} {...line} strokeWidth={2} />
      ))}
    </g>
  ),
  egg: () => (
    <g>
      <ellipse cx={0} cy={0} rx={19} ry={25} fill="#fff7e6" {...line} />
      <path d="M-12,-4 L-6,2 L-1,-5 L5,2 L11,-4" fill="none" {...line} strokeWidth={2} />
      <ellipse cx={-7} cy={-12} rx={3} ry={5} fill="#fff" />
    </g>
  ),
  plane: () => (
    <g>
      <path d="M-34,24 Q-30,10 -18,12" fill="none" stroke={INK} strokeWidth={1.5} strokeDasharray="3 4" />
      <path d="M-24,8 L32,-18 L-4,20 Z" fill="#fff" {...line} />
      <path d="M-4,20 L2,2 L32,-18" fill="#e5e7eb" {...line} />
    </g>
  ),
  spoon: () => (
    <g>
      <path d="M-4,4 L28,28" {...line} strokeWidth={5} stroke="#9ca3af" />
      <path d="M-4,4 L28,28" fill="none" stroke={INK} strokeWidth={1} />
      <ellipse cx={-12} cy={-4} rx={16} ry={10} fill="#d1d5db" {...line} transform="rotate(40 -12 -4)" />
      <ellipse cx={-13} cy={-14} rx={10} ry={13} fill="#fff7e6" {...line} />
    </g>
  ),
  pingpong: () => (
    <g>
      <rect x={-10} y={10} width={9} height={22} rx={3} fill="#92400e" {...line} transform="rotate(-25 -6 20)" />
      <circle cx={-10} cy={-4} r={20} fill="#ef4444" {...line} />
      <circle cx={22} cy={-22} r={7} fill="#fff" {...line} />
    </g>
  ),
  speech: () => (
    <g>
      <path d="M-34,-30 h40 a8,8 0 0 1 8,8 v16 a8,8 0 0 1 -8,8 h-24 l-10,10 v-10 h-6 a8,8 0 0 1 -8,-8 v-16 a8,8 0 0 1 8,-8 Z" fill="#fff" {...line} />
      {[-24, -14, -4].map((x) => <circle key={x} cx={x} cy={-14} r={2.5} fill={INK} />)}
      <path d="M-4,4 h34 a7,7 0 0 1 7,7 v14 a7,7 0 0 1 -7,7 h-2 v9 l-10,-9 h-22 a7,7 0 0 1 -7,-7 v-14 a7,7 0 0 1 7,-7 Z" fill="#fde047" {...line} />
      <path d="M6,18 h20" {...line} strokeWidth={2} />
    </g>
  ),
  card: () => (
    <g>
      <rect x={-26} y={-30} width={52} height={60} rx={4} fill="#fff" {...line} />
      <rect x={-26} y={-30} width={52} height={12} rx={4} fill="#3b82f6" {...line} />
      {[-9, 3, 15].map((y) => <path key={y} d={`M-26,${y + 3} H26`} stroke={INK} strokeWidth={1} />)}
      {[-9, 9].map((x) => <path key={x} d={`M${x},-18 V30`} stroke={INK} strokeWidth={1} />)}
      {[[-17, -12], [0, 0], [17, 12], [-17, 24]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill="#ef4444" opacity={0.8} />)}
    </g>
  ),
  stopwatch: () => (
    <g>
      <rect x={-5} y={-36} width={10} height={8} rx={2} fill="#9ca3af" {...line} />
      <circle r={26} cy={2} fill="#fff" {...line} />
      <circle r={20} cy={2} fill="#fef3c7" />
      <path d="M0,2 L0,-12 M0,2 L10,8" {...line} />
      <circle r={2.5} cy={2} fill={INK} />
    </g>
  ),
  island: () => (
    <g>
      <path d="M-36,26 Q-24,20 -12,26 T12,26 T36,26" fill="none" stroke="#0ea5e9" strokeWidth={3} />
      <ellipse cx={0} cy={20} rx={30} ry={9} fill="#fcd34d" {...line} />
      <path d="M2,18 Q-2,0 6,-20" fill="none" stroke="#92400e" strokeWidth={5} strokeLinecap="round" />
      <path d="M6,-20 Q-14,-30 -24,-14 M6,-20 Q20,-34 32,-18 M6,-20 Q4,-36 -8,-34 M6,-20 Q24,-20 26,-4" fill="none" stroke="#16a34a" strokeWidth={5} strokeLinecap="round" />
    </g>
  ),
  handshake: () => (
    <g>
      <rect x={-36} y={-6} width={26} height={16} rx={4} fill="#3b82f6" {...line} />
      <rect x={10} y={-6} width={26} height={16} rx={4} fill="#10b981" {...line} />
      <ellipse cx={0} cy={2} rx={14} ry={10} fill="#e8b48f" {...line} />
      <path d="M-6,-4 L-6,8 M0,-6 L0,10 M6,-4 L6,8" stroke={INK} strokeWidth={1.2} />
      <path d="M-20,-24 l4,6 M0,-30 v8 M20,-24 l-4,6" {...line} stroke="#f59e0b" />
    </g>
  ),
  signpost: () => (
    <g>
      <rect x={-3} y={-30} width={6} height={64} fill="#92400e" {...line} />
      <path d="M-2,-26 H26 L34,-18 L26,-10 H-2 Z" fill="#f59e0b" {...line} />
      <path d="M2,-4 H-26 L-34,4 L-26,12 H2 Z" fill="#3b82f6" {...line} />
    </g>
  ),
  lightning: () => <path d="M6,-34 L-18,4 H-2 L-10,34 L20,-8 H4 Z" fill="#facc15" {...line} />,
  apple: () => (
    <g>
      <path d="M0,-14 C-24,-26 -30,10 -12,24 C-6,28 6,28 12,24 C30,10 24,-26 0,-14 Z" fill="#ef4444" {...line} />
      <path d="M0,-14 L2,-28" {...line} />
      <path d="M2,-24 Q14,-34 20,-22 Q10,-18 2,-24 Z" fill="#22c55e" {...line} strokeWidth={1.5} />
    </g>
  ),
  wave: () => (
    <g>
      <path d="M-36,20 C-26,-30 20,-30 24,-4 C12,-16 -4,-6 6,6 C-10,4 -20,12 -16,20 Z" fill="#38bdf8" {...line} />
      <path d="M-36,26 Q-24,18 -12,26 T12,26 T36,26" fill="none" stroke="#0284c7" strokeWidth={3} />
    </g>
  ),
  hand: () => (
    <g>
      {[-15, -5, 5, 15].map((x, i) => (
        <rect key={x} x={x - 4} y={-30 + Math.abs(i - 1.5) * 4} width={9} height={30} rx={4.5} fill="#fcd7b6" {...line} strokeWidth={2} />
      ))}
      <rect x={-20} y={-6} width={40} height={32} rx={12} fill="#fcd7b6" {...line} />
      <rect x={-32} y={-2} width={9} height={22} rx={4.5} fill="#fcd7b6" {...line} strokeWidth={2} transform="rotate(-35 -28 8)" />
    </g>
  ),
  music: () => (
    <g>
      <path d="M-12,18 V-22 L20,-30 V10" fill="none" {...line} strokeWidth={3} />
      <path d="M-12,-22 L20,-30 V-20 L-12,-12 Z" fill={INK} />
      <ellipse cx={-18} cy={18} rx={9} ry={7} fill="#8b5cf6" {...line} />
      <ellipse cx={14} cy={10} rx={9} ry={7} fill="#ec4899" {...line} />
    </g>
  ),
  rope: () => (
    <g>
      <path d="M-38,10 C-24,-14 -10,26 0,0 C10,-26 24,14 38,-10" fill="none" stroke="#b45309" strokeWidth={9} strokeLinecap="round" />
      <path d="M-38,10 C-24,-14 -10,26 0,0 C10,-26 24,14 38,-10" fill="none" stroke="#fcd34d" strokeWidth={2} strokeDasharray="4 5" />
      <circle r={8} fill="#b45309" {...line} />
    </g>
  ),
  tower: () => (
    <g>
      <path d="M-24,30 L0,-18 L24,30 M-12,6 H12 M-24,30 H24 M-18,18 L6,-6 M18,18 L-6,-6" fill="none" stroke="#eab308" strokeWidth={2.5} strokeLinecap="round" />
      <rect x={-9} y={-34} width={18} height={16} rx={6} fill="#fff" {...line} />
    </g>
  ),
  cone: () => (
    <g>
      <path d="M0,-32 L18,24 H-18 Z" fill="#f97316" {...line} />
      <path d="M-8,-4 H8 M-12,10 H12" stroke="#fff" strokeWidth={5} />
      <rect x={-28} y={24} width={56} height={8} rx={2} fill="#f97316" {...line} />
    </g>
  ),
  heart: () => (
    <path d="M0,28 C-40,0 -30,-34 0,-16 C30,-34 40,0 0,28 Z" fill="#f43f5e" {...line} />
  ),
  blindfold: () => (
    <g>
      <circle r={26} fill="#fcd7b6" {...line} />
      <rect x={-27} y={-10} width={54} height={13} rx={3} fill="#7c3aed" {...line} />
      <path d="M26,-4 L38,-14 M26,0 L38,6" {...line} stroke="#7c3aed" strokeWidth={4} />
      <path d="M-8,14 Q0,20 8,14" fill="none" {...line} />
    </g>
  ),
  pencil: () => (
    <g transform="rotate(-35)">
      <rect x={-8} y={-30} width={16} height={46} fill="#facc15" {...line} />
      <rect x={-8} y={-38} width={16} height={9} rx={2} fill="#f9a8d4" {...line} />
      <path d="M-8,16 L0,32 L8,16 Z" fill="#fde68a" {...line} />
      <path d="M-3,26 L0,32 L3,26 Z" fill={INK} />
    </g>
  ),
  flag: () => (
    <g>
      <rect x={-22} y={-34} width={5} height={68} fill="#78716c" {...line} />
      <path d="M-17,-32 C0,-40 10,-24 30,-30 V0 C10,6 0,-10 -17,-2 Z" fill="#ef4444" {...line} />
      <circle cx={6} cy={-15} r={5} fill="#fff" />
    </g>
  ),
  sack: () => (
    <g>
      <path d="M-18,-20 C-30,0 -30,28 -18,32 H18 C30,28 30,0 18,-20 Z" fill="#c2a36b" {...line} />
      <path d="M-18,-20 L-10,-30 H10 L18,-20" fill="#c2a36b" {...line} />
      <path d="M-14,-20 H14" {...line} stroke="#7c2d12" strokeWidth={3} />
    </g>
  ),
  volleyball: () => (
    <g>
      <path d="M-38,-26 V30 M38,-26 V30 M-38,-26 H38 M-38,-14 H38" stroke={INK} strokeWidth={1.5} fill="none" />
      <circle cy={8} r={20} fill="#fff" {...line} />
      <path d="M-20,8 Q0,-8 20,8 M0,-12 Q-8,8 4,28 M-14,-6 Q6,6 14,24" fill="none" stroke="#3b82f6" strokeWidth={2} />
    </g>
  ),
  plant: () => (
    <g>
      <path d="M0,4 Q-26,-6 -22,-28 Q-4,-24 0,4 Z" fill="#22c55e" {...line} />
      <path d="M0,4 Q24,-4 24,-26 Q4,-24 0,4 Z" fill="#16a34a" {...line} />
      <path d="M0,4 Q-4,-20 2,-34 Q10,-18 0,4 Z" fill="#4ade80" {...line} />
      <path d="M-18,4 H18 L13,32 H-13 Z" fill="#ea580c" {...line} />
    </g>
  ),
  paint: () => (
    <g>
      <path d="M-4,-30 C-40,-30 -40,26 -4,28 C8,28 4,16 12,14 C28,12 34,-30 -4,-30 Z" fill="#fef3c7" {...line} />
      {[["#ef4444", -18, -12], ["#3b82f6", -2, -18], ["#10b981", 14, -10], ["#f59e0b", -20, 8]].map(([c, x, y], i) => (
        <circle key={i} cx={x as number} cy={y as number} r={6} fill={c as string} />
      ))}
      <path d="M14,34 L36,4" {...line} strokeWidth={4} stroke="#92400e" />
      <path d="M34,6 L40,-4" {...line} strokeWidth={6} stroke="#ec4899" />
    </g>
  ),
  laptop: () => (
    <g>
      <rect x={-28} y={-28} width={56} height={38} rx={4} fill="#1f2937" {...line} />
      <rect x={-23} y={-23} width={46} height={28} rx={2} fill="#93c5fd" />
      <circle cx={-6} cy={-12} r={2} fill={INK} />
      <circle cx={6} cy={-12} r={2} fill={INK} />
      <path d="M-6,-5 Q0,0 6,-5" fill="none" {...line} strokeWidth={2} />
      <path d="M-36,10 H36 L30,20 H-30 Z" fill="#9ca3af" {...line} />
    </g>
  ),
  cotton: () => (
    <g>
      {[[-14, 4, 13], [4, -6, 15], [18, 8, 12], [-2, 14, 11]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#fff" {...line} strokeWidth={2} />
      ))}
    </g>
  ),
  puzzle: () => (
    <g>
      <path d="M-30,-28 H-6 a6,6 0 1 1 12,0 H30 V-4 a6,6 0 1 0 0,12 V30 H-30 Z" fill="#a78bfa" {...line} />
      <path d="M0,-28 V30 M-30,0 H30" stroke={INK} strokeWidth={1.2} strokeDasharray="3 3" />
      <rect x={4} y={4} width={22} height={22} fill="#fbbf24" {...line} strokeWidth={2} />
    </g>
  ),
  bottle: () => (
    <g>
      <path d="M-5,-34 H5 V-24 C16,-18 16,-10 16,-4 V30 H-16 V-4 C-16,-10 -16,-18 -5,-24 Z" fill="#e0f2fe" {...line} />
      <path d="M-15,6 H15 V29 H-15 Z" fill="#38bdf8" />
      <rect x={-6} y={-38} width={12} height={6} rx={2} fill="#2563eb" {...line} />
      <path d="M22,-26 a10,10 0 0 1 8,12 M26,-20 l4,6 l6,-4" fill="none" {...line} strokeWidth={2} />
    </g>
  ),
  chopsticks: () => (
    <g>
      <path d="M-30,-30 L10,20" {...line} strokeWidth={5} stroke="#b45309" />
      <path d="M-18,-34 L16,16" {...line} strokeWidth={5} stroke="#d97706" />
      <circle cx={14} cy={22} r={9} fill="#ec4899" {...line} />
      <ellipse cx={0} cy={32} rx={24} ry={5} fill="#fff" {...line} strokeWidth={2} />
    </g>
  ),
  dice: () => (
    <g>
      <rect x={-30} y={-6} width={28} height={28} rx={5} fill="#fff" {...line} transform="rotate(-10 -16 8)" />
      <rect x={2} y={-26} width={28} height={28} rx={5} fill="#ef4444" {...line} transform="rotate(12 16 -12)" />
      {[[-22, 2], [-10, 14], [-16, 8]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.6} fill={INK} />)}
      {[[10, -18], [22, -18], [10, -6], [22, -6]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.6} fill="#fff" />)}
    </g>
  ),
  paperclip: () => (
    <g>
      <path d="M-22,-8 V14 a10,10 0 0 0 20,0 V-18 a7,7 0 0 0 -14,0 V10" fill="none" stroke="#6b7280" strokeWidth={4} strokeLinecap="round" />
      <path d="M4,-2 V20 a10,10 0 0 0 20,0 V-12 a7,7 0 0 0 -14,0 V16" fill="none" stroke="#3b82f6" strokeWidth={4} strokeLinecap="round" />
    </g>
  ),
  feather: () => (
    <g transform="rotate(25)">
      <path d="M0,-34 C22,-20 18,14 0,28 C-18,14 -22,-20 0,-34 Z" fill="#38bdf8" {...line} />
      <path d="M0,-30 V36" {...line} strokeWidth={2} />
      <path d="M0,-12 L10,-18 M0,0 L-11,-6 M0,10 L10,4" {...line} strokeWidth={1.5} />
    </g>
  ),
  book: () => (
    <g>
      <rect x={-28} y={12} width={56} height={14} rx={2} fill="#3b82f6" {...line} />
      <rect x={-24} y={-2} width={50} height={14} rx={2} fill="#10b981" {...line} />
      <rect x={-26} y={-16} width={52} height={14} rx={2} fill="#ef4444" {...line} />
      <path d="M-20,-9 H18 M-16,5 H20 M-22,19 H22" stroke="#fff" strokeWidth={2} />
    </g>
  ),
  hat: () => (
    <g>
      <ellipse cx={0} cy={20} rx={34} ry={8} fill="#1f2937" {...line} />
      <path d="M-20,20 V-20 C-20,-28 20,-28 20,-20 V20" fill="#1f2937" {...line} />
      <rect x={-20} y={6} width={40} height={8} fill="#ef4444" />
    </g>
  ),
  star: () => (
    <path d="M0,-32 L9,-10 L32,-10 L14,4 L20,28 L0,14 L-20,28 L-14,4 L-32,-10 L-9,-10 Z" fill="#facc15" {...line} />
  ),
  ball: () => (
    <g>
      <circle r={26} fill="#fff" {...line} />
      <path d="M0,-26 A26,26 0 0 1 22,14 L0,0 Z" fill="#ef4444" />
      <path d="M-22,14 A26,26 0 0 1 0,-26 L0,0 Z" fill="#3b82f6" />
      <path d="M22,14 A26,26 0 0 1 -22,14 L0,0 Z" fill="#facc15" />
      <circle r={26} fill="none" {...line} />
      <circle r={5} fill="#fff" {...line} strokeWidth={1.5} />
    </g>
  ),
  camera: () => (
    <g>
      <rect x={-12} y={-24} width={20} height={10} rx={2} fill="#374151" {...line} />
      <rect x={-32} y={-16} width={64} height={42} rx={8} fill="#4b5563" {...line} />
      <circle cy={5} r={15} fill="#e5e7eb" {...line} />
      <circle cy={5} r={8} fill="#1e3a8a" />
      <circle cx={-3} cy={2} r={2.5} fill="#fff" />
      <rect x={18} y={-10} width={8} height={5} fill="#fde047" />
    </g>
  ),
  chair: () => (
    <g>
      <rect x={-18} y={-34} width={36} height={32} rx={6} fill="#f97316" {...line} />
      <rect x={-22} y={-2} width={44} height={10} rx={3} fill="#fb923c" {...line} />
      <path d="M-18,8 V32 M18,8 V32" {...line} strokeWidth={4} />
    </g>
  ),
  mat: () => (
    <g>
      <path d="M-36,4 L-12,-24 L36,-10 L12,22 Z" fill="#22c55e" {...line} />
      <path d="M-24,-10 L24,4" stroke="#fff" strokeWidth={2} strokeDasharray="5 4" />
      {[[-30, 2], [-12, -20], [30, -9], [12, 18]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.5} fill="#e5e7eb" {...line} strokeWidth={1} />)}
    </g>
  ),
  key: () => (
    <g transform="rotate(-30)">
      <circle cx={-18} cy={0} r={13} fill="#facc15" {...line} />
      <circle cx={-18} cy={0} r={5} fill="#fff" />
      <rect x={-6} y={-4} width={38} height={8} fill="#facc15" {...line} />
      <path d="M22,4 V12 M30,4 V10" {...line} strokeWidth={4} stroke="#facc15" />
    </g>
  ),
  water: () => (
    <g>
      <path d="M-24,-10 A24,18 0 0 1 24,-10" fill="none" {...line} />
      <path d="M-22,-8 H22 L16,30 H-16 Z" fill="#94a3b8" {...line} />
      <ellipse cx={0} cy={-8} rx={22} ry={5} fill="#38bdf8" {...line} strokeWidth={2} />
      <path d="M30,-20 q4,8 0,10 q-4,-2 0,-10 Z M34,0 q3,6 0,8 q-3,-2 0,-8 Z" fill="#38bdf8" {...line} strokeWidth={1.2} />
    </g>
  ),
  ribbon: () => (
    <g>
      <path d="M14,14 C30,24 30,34 40,30" fill="none" stroke="#ec4899" strokeWidth={3} />
      <circle r={22} fill="#ec4899" {...line} />
      <path d="M-18,-8 Q0,-2 16,-16 M-20,6 Q0,12 20,-4 M-12,18 Q4,10 18,8" fill="none" stroke="#9d174d" strokeWidth={2} />
    </g>
  ),
  disc: () => (
    <g>
      <path d="M-36,-18 Q-20,-30 -8,-20" fill="none" stroke={INK} strokeWidth={1.5} strokeDasharray="3 4" />
      <ellipse cx={4} cy={0} rx={30} ry={12} fill="#8b5cf6" {...line} />
      <ellipse cx={4} cy={-2} rx={18} ry={6} fill="#a78bfa" />
    </g>
  ),
  target: () => (
    <g>
      {[28, 20, 12, 5].map((r, i) => <circle key={r} r={r} fill={i % 2 ? "#fff" : "#ef4444"} {...line} strokeWidth={2} />)}
      <path d="M2,-2 L34,-30" {...line} strokeWidth={3} stroke="#92400e" />
      <path d="M30,-34 L40,-34 L34,-26 Z M28,-30 L28,-40 L36,-34 Z" fill="#10b981" />
    </g>
  ),
  shoe: () => (
    <g>
      <path d="M-32,-10 C-32,-22 -14,-22 -12,-12 C-6,-4 14,-2 28,2 C36,4 36,16 30,18 H-32 Z" fill="#3b82f6" {...line} />
      <path d="M-32,12 H34" stroke="#fff" strokeWidth={5} />
      <path d="M-12,-10 L-6,-2 M-6,-12 L0,-4" stroke="#fff" strokeWidth={2} />
    </g>
  ),
  trophy: () => (
    <g>
      <path d="M-20,-30 H20 V-8 A20,20 0 0 1 -20,-8 Z" fill="#facc15" {...line} />
      <path d="M-20,-24 H-30 V-14 A10,10 0 0 0 -18,-6 M20,-24 H30 V-14 A10,10 0 0 1 18,-6" fill="none" {...line} />
      <rect x={-5} y={10} width={10} height={10} fill="#eab308" {...line} />
      <rect x={-16} y={20} width={32} height={10} rx={2} fill="#92400e" {...line} />
      <path d="M0,-24 L3,-17 L10,-17 L4,-12 L6,-5 L0,-9 L-6,-5 L-4,-12 L-10,-17 L-3,-17 Z" fill="#fff" />
    </g>
  ),
  scissors: () => (
    <g>
      <path d="M-4,4 L32,-26 M-4,-4 L32,26" {...line} strokeWidth={4} stroke="#9ca3af" />
      <circle cx={-16} cy={-12} r={10} fill="none" stroke="#ef4444" strokeWidth={5} />
      <circle cx={-16} cy={12} r={10} fill="none" stroke="#ef4444" strokeWidth={5} />
      <circle r={3} fill={INK} />
    </g>
  ),
  mic: () => (
    <g transform="rotate(-20)">
      <rect x={-5} y={2} width={10} height={32} rx={4} fill="#1f2937" {...line} />
      <circle cy={-14} r={16} fill="#9ca3af" {...line} />
      <path d="M-12,-22 H12 M-14,-14 H14 M-12,-6 H12" stroke="#4b5563" strokeWidth={1.5} />
      <path d="M22,-30 l6,-6 M26,-18 h8 M22,-6 l6,6" {...line} stroke="#f59e0b" />
    </g>
  ),
  lightbulb: () => (
    <g>
      <path d="M0,-30 A20,20 0 0 1 12,6 V14 H-12 V6 A20,20 0 0 1 0,-30 Z" fill="#fde047" {...line} />
      <rect x={-10} y={14} width={20} height={12} rx={2} fill="#9ca3af" {...line} />
      <path d="M-5,4 L0,-8 L5,4" fill="none" {...line} strokeWidth={1.5} />
      <path d="M-30,-18 l-6,-4 M30,-18 l6,-4 M-32,0 h-6 M32,0 h6 M0,-38 v-4" {...line} stroke="#f59e0b" />
    </g>
  ),
};


function Person({
  x,
  seed,
  armsUp,
  facingRight,
}: {
  x: number;
  seed: number;
  armsUp: boolean;
  facingRight: boolean;
}) {
  const shirt = SHIRTS[seed % SHIRTS.length];
  const skin = SKINS[(seed >>> 3) % SKINS.length];
  const hair = HAIRS[(seed >>> 6) % HAIRS.length];
  const dir = facingRight ? 1 : -1;

  return (
    <g>
      <path d={`M${x - 6},122 L${x - 9},142 M${x + 6},122 L${x + 9},142`} {...line} strokeWidth={4} />
      {armsUp ? (
        <path d={`M${x - 11},102 L${x - 24},82 M${x + 11},102 L${x + 24},82`} {...line} strokeWidth={4} />
      ) : (
        <path d={`M${x + 11 * dir},104 L${x + 28 * dir},94 M${x - 11 * dir},104 L${x - 18 * dir},122`} {...line} strokeWidth={4} />
      )}
      <rect x={x - 14} y={96} width={28} height={30} rx={11} fill={shirt} {...line} />
      <circle cx={x} cy={80} r={16} fill={skin} {...line} />
      <path d={`M${x - 16},79 C${x - 17},58 ${x + 17},58 ${x + 16},79 Q${x + 6},68 ${x - 16},79 Z`} fill={hair} {...line} strokeWidth={1.5} />
      <circle cx={x - 5 + 2 * dir} cy={80} r={2} fill={INK} />
      <circle cx={x + 5 + 2 * dir} cy={80} r={2} fill={INK} />
      <path d={`M${x - 5 + 2 * dir},86 Q${x + 2 * dir},92 ${x + 5 + 2 * dir},86`} fill="none" {...line} strokeWidth={2} />
      <circle cx={x - 9} cy={86} r={2.5} fill="#f472b6" opacity={0.5} />
      <circle cx={x + 9} cy={86} r={2.5} fill="#f472b6" opacity={0.5} />
    </g>
  );
}

export function ActivityIllustration({
  activity,
  className,
}: {
  activity: Activity;
  className?: string;
}) {
  if (activity.imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={activity.imageUrl} alt={activity.name} className={`${className ?? ""} object-cover`} />
    );
  }

  const seed = hash(activity.id);
  const bg = BG[activity.category] ?? "#e5e7eb";
  const Prop = PROPS[activity.illustration ?? ""] ?? PROPS.star;
  const solo = activity.groupSizeMin <= 1;
  const crowd = activity.groupSizeMax >= 30;
  const armsUp = activity.energyLevel === "High";

  return (
    <svg
      viewBox="0 0 240 160"
      role="img"
      aria-label={`Cartoon illustration of ${activity.name}`}
      className={className}
    >
      <rect width={240} height={160} fill={bg} />
      <circle cx={210} cy={26} r={14} fill="#fff" opacity={0.55} />
      {[0, 1, 2, 3, 4].map((i) => {
        const r = (seed >>> (i * 5)) & 31;
        return (
          <circle
            key={i}
            cx={20 + ((r * 7 + i * 43) % 200)}
            cy={12 + ((r * 3 + i * 11) % 40)}
            r={2 + (i % 3)}
            fill={SHIRTS[(r + i) % SHIRTS.length]}
            opacity={0.5}
          />
        );
      })}
      {crowd &&
        [86, 102, 118, 134, 150].map((cx, i) => (
          <circle key={cx} cx={cx} cy={124} r={7} fill={SKINS[(seed + i) % SKINS.length]} {...line} strokeWidth={1.5} />
        ))}
      <ellipse cx={120} cy={150} rx={130} ry={22} fill="#fff" opacity={0.45} />
      <g transform="translate(120 72)">
        <Prop />
      </g>
      <Person x={solo ? 190 : 42} seed={seed} armsUp={armsUp} facingRight={!solo} />
      {!solo && <Person x={198} seed={seed >>> 9} armsUp={armsUp} facingRight={false} />}
    </svg>
  );
}
