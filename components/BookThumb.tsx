import type { CartDesign } from "../lib/cart-design";
import { TEMPLATE_ART } from "../lib/templates";

type Props = {
  templateId: string;
  frontPhotoUrl: string | null;
  backPhotoUrl: string | null;
  design: CartDesign;
};

/** Read-only picture of a designed notebook (back | spine | front). */
export default function BookThumb({
  templateId,
  frontPhotoUrl,
  backPhotoUrl,
  design,
}: Props) {
  const art = TEMPLATE_ART[templateId] ?? TEMPLATE_ART["1"];
  const { start, end } = art.spine;
  const fill = { position: "absolute", top: 0, bottom: 0 } as const;

  const text = (
    value: string,
    pos: { x: number; y: number },
    color: string,
    size: number,
    bold: boolean,
    italic: boolean,
  ) =>
    value && (
      <span
        style={{
          position: "absolute",
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -50%)",
          color,
          fontSize: `${(size / 666) * 100}cqw`,
          fontWeight: bold ? 700 : 400,
          fontStyle: italic ? "italic" : "normal",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "2000 / 1414",
        overflow: "hidden",
        containerType: "inline-size",
        background: "#fff",
      }}
    >
      <img
        src={art.image}
        alt=""
        style={{ ...fill, width: "100%", height: "100%" }}
      />
      {backPhotoUrl && (
        <img
          src={backPhotoUrl}
          alt=""
          style={{
            ...fill,
            left: 0,
            width: `${start}%`,
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      {frontPhotoUrl && (
        <img
          src={frontPhotoUrl}
          alt=""
          style={{
            ...fill,
            left: `${end}%`,
            width: `${100 - end}%`,
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      <img
        src={art.overlay}
        alt=""
        style={{ ...fill, width: "100%", height: "100%" }}
      />
      {text(
        design.backCoverText,
        design.backTextPosition,
        design.backTextColor,
        design.backTextSize,
        design.backBold,
        design.backItalic,
      )}
      {text(
        design.coverText,
        design.frontTextPosition,
        design.frontTextColor,
        design.frontTextSize,
        design.frontBold,
        design.frontItalic,
      )}
    </div>
  );
}
