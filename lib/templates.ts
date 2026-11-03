/** Template artwork + where the spine sits (percent of the full wrap-around). */
export const TEMPLATE_ART: Record<
  string,
  { image: string; overlay: string; spine: { start: number; end: number } }
> = {
  "1": {
    image: "/Templates/Template-1.png",
    overlay: "/Templates/Template-1-overlay.png",
    spine: { start: 47.1, end: 52.8 },
  },
  "2": {
    image: "/Templates/Template-2.png",
    overlay: "/Templates/Template-2-overlay.png",
    spine: { start: 48.0, end: 51.8 },
  },
  "3": {
    image: "/Templates/Template-3.png",
    overlay: "/Templates/Template-3-overlay.png",
    spine: { start: 47.8, end: 51.9 },
  },
  "4": {
    image: "/Templates/Template-4.png",
    overlay: "/Templates/Template-4-overlay.png",
    spine: { start: 48.4, end: 52.3 },
  },
};
