import { NextResponse } from "next/server";
import { handleError, jsonError } from "../../../lib/api-errors";
import { resolveOwner } from "../../../lib/cart-owner";
import {
  ALLOWED_PHOTO_TYPES,
  MAX_PHOTO_BYTES,
  MAX_PHOTOS_PER_OWNER,
  cleanup,
  countPhotos,
  savePhoto,
  sniffImageType,
} from "../../../lib/photo-store";

/** Upload one cover photo. Body = the raw image bytes (JPEG, PNG or WEBP). */
export async function POST(request: Request) {
  try {
    const declared = request.headers.get("content-type")?.split(";")[0].trim();
    if (!declared || !ALLOWED_PHOTO_TYPES.includes(declared)) {
      return jsonError("Please upload a JPG, PNG or WEBP image.", 415);
    }
    const length = Number(request.headers.get("content-length"));
    if (length > MAX_PHOTO_BYTES) {
      return jsonError("The image must be 5 MB or smaller.", 413);
    }

    const data = Buffer.from(await request.arrayBuffer());
    if (data.length === 0) return jsonError("The image is empty.", 400);
    if (data.length > MAX_PHOTO_BYTES) {
      return jsonError("The image must be 5 MB or smaller.", 413);
    }
    const actual = sniffImageType(data);
    if (!actual) return jsonError("That file is not a valid image.", 415);

    const owner = await resolveOwner(true);
    if (!owner) return jsonError("Could not identify your cart.", 400);
    if ((await countPhotos(owner)) >= MAX_PHOTOS_PER_OWNER) {
      return jsonError(
        "Too many photos. Remove some items from your cart.",
        429,
      );
    }

    const id = await savePhoto(owner, actual, data);
    void cleanup().catch((error) => console.error("Cleanup failed:", error));
    return NextResponse.json({ id, url: `/api/photos/${id}` }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
