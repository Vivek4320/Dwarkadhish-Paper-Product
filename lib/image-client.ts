/** Browser-only helpers for preparing a cover photo for upload. */

const MAX_SIDE = 2400;
const MAX_BYTES = 4 * 1024 * 1024;

async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  return (await fetch(dataUrl)).blob();
}

function loadImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read the image."));
    };
    img.src = url;
  });
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality?: number) {
  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, type, quality),
  );
}

/**
 * Shrinks big photos (longest side <= 2400px). Small photos that are already
 * under the size limit are sent untouched. Oversized PNGs fall back to JPEG.
 */
export async function prepareImage(dataUrl: string): Promise<Blob> {
  const original = await dataUrlToBlob(dataUrl);
  const img = await loadImage(original);
  const longest = Math.max(img.naturalWidth, img.naturalHeight);
  if (longest <= MAX_SIDE && original.size <= MAX_BYTES) return original;

  const scale = Math.min(1, MAX_SIDE / longest);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return original;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const keepType = original.type === "image/png" ? "image/png" : "image/jpeg";
  let out = await toBlob(canvas, keepType, 0.9);
  if (!out || out.size > MAX_BYTES)
    out = await toBlob(canvas, "image/jpeg", 0.88);
  return out ?? original;
}
