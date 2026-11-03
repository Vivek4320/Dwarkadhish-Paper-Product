/** The customisable bits of one cover design, stored as JSON on a cart item. */
export type CartDesign = {
  coverText: string;
  backCoverText: string;
  frontTextColor: string;
  backTextColor: string;
  frontBold: boolean;
  backBold: boolean;
  frontItalic: boolean;
  backItalic: boolean;
  frontTextPosition: { x: number; y: number };
  backTextPosition: { x: number; y: number };
  frontTextSize: number;
  backTextSize: number;
  frontZoom: number;
  backZoom: number;
};

export const DEFAULT_DESIGN: CartDesign = {
  coverText: "",
  backCoverText: "",
  frontTextColor: "#FFFFFF",
  backTextColor: "#FFFFFF",
  frontBold: true,
  backBold: true,
  frontItalic: false,
  backItalic: false,
  frontTextPosition: { x: 75, y: 48 },
  backTextPosition: { x: 23, y: 48 },
  frontTextSize: 24,
  backTextSize: 24,
  frontZoom: 1,
  backZoom: 1,
};

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const text = (v: unknown, fallback: string) =>
  typeof v === "string" ? v.slice(0, 64) : fallback;
const color = (v: unknown, fallback: string) =>
  typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v) ? v : fallback;
const bool = (v: unknown, fallback: boolean) =>
  typeof v === "boolean" ? v : fallback;
const num = (v: unknown, fallback: number, min: number, max: number) =>
  typeof v === "number" && Number.isFinite(v)
    ? Math.min(max, Math.max(min, v))
    : fallback;
const point = (v: unknown, fallback: { x: number; y: number }) =>
  isObject(v)
    ? { x: num(v.x, fallback.x, 0, 100), y: num(v.y, fallback.y, 0, 100) }
    : fallback;

/** Whitelists and clamps whatever the browser sent. Safe to store and render. */
export function sanitizeDesign(raw: unknown): CartDesign {
  const d = DEFAULT_DESIGN;
  const r = isObject(raw) ? raw : {};
  return {
    coverText: text(r.coverText, d.coverText),
    backCoverText: text(r.backCoverText, d.backCoverText),
    frontTextColor: color(r.frontTextColor, d.frontTextColor),
    backTextColor: color(r.backTextColor, d.backTextColor),
    frontBold: bool(r.frontBold, d.frontBold),
    backBold: bool(r.backBold, d.backBold),
    frontItalic: bool(r.frontItalic, d.frontItalic),
    backItalic: bool(r.backItalic, d.backItalic),
    frontTextPosition: point(r.frontTextPosition, d.frontTextPosition),
    backTextPosition: point(r.backTextPosition, d.backTextPosition),
    frontTextSize: num(r.frontTextSize, d.frontTextSize, 8, 120),
    backTextSize: num(r.backTextSize, d.backTextSize, 8, 120),
    frontZoom: num(r.frontZoom, d.frontZoom, 1, 2.5),
    backZoom: num(r.backZoom, d.backZoom, 1, 2.5),
  };
}
