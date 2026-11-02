"use client";

import { useEffect, useRef } from "react";

type Props = {
  templateImage: string;
  backImage: string | null;
  frontImage: string | null;
  backZoom: number;
  frontZoom: number;
};

const WIDTH = 1200;
const HEIGHT = 440;
const PHOTO_AREAS = {
  back: { left: 58, top: 72, width: 470, height: 292 },
  front: { left: 672, top: 72, width: 470, height: 292 },
};

export default function BookSpreadEditor({
  templateImage,
  backImage,
  frontImage,
  backZoom,
  frontZoom,
}: Props) {
  const elementRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let canvas: import("fabric").Canvas | undefined;

    async function initialize() {
      const fabric = await import("fabric");
      if (disposed || !elementRef.current) return;

      canvas = new fabric.Canvas(elementRef.current, {
        width: WIDTH,
        height: HEIGHT,
        selection: true,
        preserveObjectStacking: true,
        backgroundColor: "#ffffff",
      });

      const background = await fabric.FabricImage.fromURL(templateImage, {
        crossOrigin: "anonymous",
      });
      if (disposed || !canvas) return;

      background.set({
        left: 0,
        top: 0,
        scaleX: WIDTH / (background.width || WIDTH),
        scaleY: HEIGHT / (background.height || HEIGHT),
        selectable: false,
        evented: false,
      });
      canvas.backgroundImage = background;

      async function addPhoto(
        src: string | null,
        area: (typeof PHOTO_AREAS)["back"],
        zoom: number,
        label: string,
      ) {
        if (!src || !canvas) return;
        const photo = await fabric.FabricImage.fromURL(src);
        if (disposed || !canvas) return;

        const naturalWidth = photo.width || area.width;
        const naturalHeight = photo.height || area.height;
        const fitScale = Math.min(
          area.width / naturalWidth,
          area.height / naturalHeight,
        );
        const scale = fitScale * zoom;

        photo.set({
          left: area.left + (area.width - naturalWidth * scale) / 2,
          top: area.top + (area.height - naturalHeight * scale) / 2,
          scaleX: scale,
          scaleY: scale,
          cornerStyle: "circle",
          cornerColor: "#D71920",
          borderColor: "#D71920",
          transparentCorners: false,
          padding: 5,
          clipPath: new fabric.Rect({
            left: area.left,
            top: area.top,
            width: area.width,
            height: area.height,
            absolutePositioned: true,
          }),
        });
        photo.set("name", label);
        canvas.add(photo);
      }

      await addPhoto(backImage, PHOTO_AREAS.back, backZoom, "Back cover photo");
      await addPhoto(
        frontImage,
        PHOTO_AREAS.front,
        frontZoom,
        "Front cover photo",
      );
      if (!disposed && canvas) {
        canvas.setActiveObject(
          canvas.getObjects().at(-1) ?? canvas.getObjects()[0],
        );
        canvas.requestRenderAll();
      }
    }

    void initialize();

    return () => {
      disposed = true;
      if (canvas) void canvas.dispose();
    };
  }, [templateImage, backImage, frontImage, backZoom, frontZoom]);

  return (
    <div className="w-full overflow-hidden rounded-[3px] bg-white">
      <canvas
        ref={elementRef}
        aria-label="Interactive notebook cover editor. Select, move, and resize uploaded photos."
        className="block h-auto w-full touch-pan-y"
      />
      <p className="px-2 py-2 text-center text-[10px] text-[#77716E]">
        Select a photo to move or resize it. Template artwork stays in the
        background.
      </p>
    </div>
  );
}
